import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, LogIn } from 'lucide-react';
import PlatformTabs from './PlatformTabs';
import PlatformCard from './PlatformCard';
import { PlatformOutput } from '@shared/schema';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface GeneratedContentSectionProps {
  isGenerating: boolean;
  generatedContent: PlatformOutput[];
}

export default function GeneratedContentSection({ 
  isGenerating, 
  generatedContent 
}: GeneratedContentSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'tiktok' | 'youtube' | 'instagram'>('all');
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const filterContentByPlatform = () => {
    if (activeTab === 'all') return generatedContent;
    return generatedContent.filter(content => 
      content.platform.toLowerCase().includes(activeTab.toLowerCase())
    );
  };

  const handleDownloadAll = () => {
    // Check if user is logged in before allowing download
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in or create an account to download content.',
        variant: 'default',
      });
      navigate('/auth');
      return;
    }
    
    // Create a text file with all content
    const text = generatedContent.map(content => {
      return `
=== ${content.platform.toUpperCase()} ===
TITLE: ${content.title}

SCRIPT:
${content.script}

CAPTIONS:
${content.captions}

`;
    }).join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'repurposed-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-primary">
        <h2 className="text-xl font-semibold text-white">Step 2: Review Generated Content</h2>
      </div>
      
      <div className="p-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Generating Content</h3>
            <p className="text-sm text-slate-500 text-center max-w-md">
              Our AI is repurposing your video for TikTok, YouTube Shorts, and Instagram Reels. This may take a few minutes.
            </p>
          </div>
        ) : (
          generatedContent.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-slate-900">Your Repurposed Content</h3>
                <div>
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={handleDownloadAll}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </div>
              </div>
              
              <PlatformTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {filterContentByPlatform().map((content, index) => (
                  <PlatformCard key={index} content={content} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
