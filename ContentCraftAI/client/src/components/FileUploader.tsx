import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, CloudUpload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

interface FileUploaderProps {
  onUploadComplete: (videoId: number, transcript: string) => void;
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const { toast } = useToast();
  const { uploadFile, uploadProgress, videoInfo, cancelUpload } = useFileUpload();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > 500 * 1024 * 1024) { // 500MB
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please upload a file smaller than 500MB.',
      });
      return;
    }
    
    // Check file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload MP4, MOV, or AVI files only.',
      });
      return;
    }
    
    setUploadState('uploading');
    
    try {
      const { videoId, transcript } = await uploadFile(file);
      onUploadComplete(videoId, transcript);
      setUploadState('complete');
    } catch (error) {
      setUploadState('idle');
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }, [toast, uploadFile, onUploadComplete, user, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi'],
    },
    disabled: uploadState !== 'idle',
    maxFiles: 1,
  });

  const handleCancel = () => {
    cancelUpload();
    setUploadState('idle');
  };

  const handleReset = () => {
    setUploadState('idle');
  };

  return (
    <div className="p-6">
      {uploadState === 'idle' && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragActive ? 'border-primary-400 bg-primary-50/50' : 'border-slate-300 hover:border-primary-400'}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-50 text-primary-500">
              <CloudUpload className="h-8 w-8" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900">Drag and drop your video here</p>
              <p className="text-sm text-slate-500">or click to browse from your device</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Supports MP4, MOV, AVI up to 500MB</p>
            </div>
            <Button>Select File</Button>
          </div>
        </div>
      )}
      
      {uploadState === 'uploading' && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-900">{videoInfo?.fileName || 'Uploading...'}</span>
            <span className="text-sm text-slate-500">{videoInfo?.fileSize ? Math.round(videoInfo.fileSize / (1024 * 1024)) + 'MB' : ''}</span>
          </div>
          <Progress value={uploadProgress} className="h-2.5" />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">{uploadProgress}% complete</span>
            <Button variant="ghost" size="sm" className="text-xs text-error-500 font-medium h-auto p-0" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {uploadState === 'complete' && videoInfo && (
        <div className="mt-6">
          <div className="flex items-center p-4 bg-slate-50 rounded-lg">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-900">{videoInfo.fileName}</p>
              <p className="text-xs text-slate-500">
                {Math.round(videoInfo.fileSize / (1024 * 1024))}MB
                {videoInfo.duration ? ` • ${Math.floor(videoInfo.duration / 60)}:${String(videoInfo.duration % 60).padStart(2, '0')} minutes` : ''}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-error-500" onClick={handleReset}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
