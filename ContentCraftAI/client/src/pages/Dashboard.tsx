import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import FileUploader from '@/components/FileUploader';
import TranscriptionSection from '@/components/TranscriptionSection';
import GeneratedContentSection from '@/components/GeneratedContentSection';
import PricingSection from '@/components/PricingSection';
import { repurposeContent } from '@/lib/api';
import { PlatformOutput } from '@shared/schema';
import { VideoInfo } from '@/types';

export default function Dashboard() {
  const [videoId, setVideoId] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | undefined>();
  const [generatedContent, setGeneratedContent] = useState<PlatformOutput[]>([]);

  const repurposeMutation = useMutation({
    mutationFn: repurposeContent,
    onSuccess: (data) => {
      setGeneratedContent(data.contents);
    },
  });

  const handleUploadComplete = (id: number, transcriptText: string) => {
    setVideoId(id);
    setTranscript(transcriptText);
    
    // Estimate word count
    const wordCount = transcriptText.split(/\s+/).filter(Boolean).length;
    
    setVideoInfo(prev => ({
      ...prev as VideoInfo,
      videoId: id,
      wordCount,
    }));
  };

  const handleGenerateContent = () => {
    if (transcript) {
      repurposeMutation.mutate({ 
        transcript, 
        videoId: videoId || undefined 
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">AI Content Repurposing</h1>
        <p className="mt-2 text-slate-600">Transform your long-form videos into platform-specific short content with one click</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-primary">
            <h2 className="text-xl font-semibold text-white">Step 1: Upload Your Video</h2>
          </div>
          
          <FileUploader onUploadComplete={handleUploadComplete} />
          
          <TranscriptionSection 
            transcript={transcript}
            isLoading={false}
            videoInfo={videoInfo}
            onGenerateContent={handleGenerateContent}
          />
        </section>

        <GeneratedContentSection 
          isGenerating={repurposeMutation.isPending}
          generatedContent={generatedContent}
        />
      </div>
      
      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
}
