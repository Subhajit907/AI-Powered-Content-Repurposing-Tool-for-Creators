import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Edit, LogIn } from 'lucide-react';
import { PlatformOutput } from '@shared/schema';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface PlatformCardProps {
  content: PlatformOutput;
}

export default function PlatformCard({ content }: PlatformCardProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const getPlatformStyles = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok':
        return {
          bgColor: 'bg-[#FE2C55]',
          hoverBgColor: 'hover:bg-[#E5294D]',
          ringColor: 'focus:ring-[#FE2C55]',
          icon: 'fab fa-tiktok'
        };
      case 'youtube shorts':
        return {
          bgColor: 'bg-[#FF0000]',
          hoverBgColor: 'hover:bg-[#E60000]',
          ringColor: 'focus:ring-[#FF0000]',
          icon: 'fab fa-youtube'
        };
      case 'instagram reels':
        return {
          bgColor: 'instagram-gradient',
          hoverBgColor: 'hover:from-[#7834A2] hover:to-[#E51A1A]',
          ringColor: 'focus:ring-[#FD1D1D]',
          icon: 'fab fa-instagram'
        };
      default:
        return {
          bgColor: 'bg-primary-500',
          hoverBgColor: 'hover:bg-primary-600',
          ringColor: 'focus:ring-primary-500',
          icon: 'fas fa-video'
        };
    }
  };
  
  const styles = getPlatformStyles(content.platform);
  
  const handleDownload = () => {
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
    
    const text = `
=== ${content.platform.toUpperCase()} ===
TITLE: ${editedContent.title}

SCRIPT:
${editedContent.script}

CAPTIONS:
${editedContent.captions}
`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.platform.replace(/\s+/g, '-').toLowerCase()}-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`${styles.bgColor} px-4 py-3 flex items-center`}>
        <i className={`${styles.icon} text-white mr-2`}></i>
        <h4 className="font-medium text-white">{content.platform}</h4>
      </div>
      <div className="p-4">
        <h5 className="font-bold text-sm mb-2">SUGGESTED TITLE</h5>
        <p className="text-sm font-medium mb-4 p-2 bg-slate-50 rounded">{editedContent.title}</p>
        
        <h5 className="font-bold text-sm mb-2">SCRIPT</h5>
        <div className="bg-slate-50 p-3 rounded max-h-32 overflow-y-auto mb-4">
          <p className="text-sm whitespace-pre-line">{editedContent.script}</p>
        </div>
        
        <h5 className="font-bold text-sm mb-2">CAPTIONS</h5>
        <div className="bg-slate-50 p-3 rounded max-h-32 overflow-y-auto mb-4 text-xs text-slate-600">
          <p className="whitespace-pre-line">{editedContent.captions}</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className={`flex-1 inline-flex justify-center items-center ${styles.bgColor} ${styles.hoverBgColor} ${styles.ringColor}`}
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="inline-flex justify-center items-center">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit {content.platform} Content</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Textarea 
                    id="title"
                    value={editedContent.title}
                    onChange={(e) => setEditedContent({...editedContent, title: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="script">Script</Label>
                  <Textarea 
                    id="script"
                    value={editedContent.script}
                    onChange={(e) => setEditedContent({...editedContent, script: e.target.value})}
                    className="mt-1 min-h-[200px]"
                  />
                </div>
                <div>
                  <Label htmlFor="captions">Captions</Label>
                  <Textarea 
                    id="captions"
                    value={editedContent.captions}
                    onChange={(e) => setEditedContent({...editedContent, captions: e.target.value})}
                    className="mt-1 min-h-[200px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
