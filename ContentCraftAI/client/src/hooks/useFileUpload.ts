import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { VideoInfo, ApiResponse } from '@/types';

export function useFileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const uploadFile = async (file: File): Promise<{ videoId: number, transcript: string }> => {
    const abortController = new AbortController();
    setController(abortController);
    
    const formData = new FormData();
    formData.append('video', file);
    
    // Reset progress
    setUploadProgress(0);
    
    // Create basic video info
    setVideoInfo({
      videoId: 0,
      fileName: file.name,
      fileSize: file.size,
    });

    try {
      // Use XMLHttpRequest for upload progress tracking
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });
        
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response: ApiResponse<{ videoId: number, transcript: string, duration?: number }> = JSON.parse(xhr.responseText);
              
              if (response.success && response.data) {
                // Update video info with additional details
                setVideoInfo(prev => ({
                  ...prev!,
                  videoId: response.data!.videoId,
                  duration: response.data!.duration,
                }));
                
                resolve({
                  videoId: response.data.videoId,
                  transcript: response.data.transcript || ''
                });
              } else {
                reject(new Error(response.error || 'Upload failed'));
              }
            } catch (error) {
              reject(new Error('Failed to parse response'));
            }
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        });
        
        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });
        
        xhr.addEventListener('abort', () => {
          reject(new Error('Upload aborted'));
        });
        
        xhr.open('POST', '/api/videos/upload');
        xhr.send(formData);
        
        // Connect abort controller to xhr
        abortController.signal.addEventListener('abort', () => {
          xhr.abort();
        });
      });
    } catch (error) {
      throw error;
    } finally {
      setController(null);
    }
  };

  const cancelUpload = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  return {
    uploadFile,
    uploadProgress,
    videoInfo,
    cancelUpload,
  };
}
