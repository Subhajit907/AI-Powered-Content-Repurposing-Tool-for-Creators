import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface TranscriptionSectionProps {
  transcript: string;
  isLoading: boolean;
  videoInfo?: {
    duration?: number;
    wordCount?: number;
  };
  onGenerateContent: () => void;
}

export default function TranscriptionSection({ 
  transcript, 
  isLoading, 
  videoInfo, 
  onGenerateContent 
}: TranscriptionSectionProps) {
  const [isTranscribed, setIsTranscribed] = useState(false);
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (transcript && !isLoading) {
      setIsTranscribed(true);
    } else {
      setIsTranscribed(false);
    }
  }, [transcript, isLoading]);

  const handleGenerateContent = () => {
    // Allow content generation without login
    onGenerateContent();
  };

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center mb-4">
        <div className="flex-1 border-t border-slate-200"></div>
        <span className="mx-4 text-slate-500 text-sm">Video will be transcribed automatically</span>
        <div className="flex-1 border-t border-slate-200"></div>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
          <span className="text-sm text-slate-600">Processing video transcription...</span>
        </div>
      )}
      
      {isTranscribed && (
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="ml-2 text-sm font-medium text-slate-900">Transcription Complete</h3>
          </div>
          <div className="text-xs text-slate-500 mb-2">
            {videoInfo?.duration && (
              <span>
                {Math.floor(videoInfo.duration / 60)}:{String(videoInfo.duration % 60).padStart(2, '0')} minutes • 
                {videoInfo.wordCount ? ` ${videoInfo.wordCount} words` : ''} • English
              </span>
            )}
          </div>
          <div className="max-h-24 overflow-y-auto text-sm text-slate-600 bg-white p-3 rounded border border-slate-200">
            <p>{transcript}</p>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <Button 
          className="w-full justify-center items-center py-6"
          onClick={handleGenerateContent}
          disabled={!isTranscribed || isLoading}
        >
          <span>Generate Content</span>
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
