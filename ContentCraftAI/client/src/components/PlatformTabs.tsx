import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlatformTabsProps {
  activeTab: 'all' | 'tiktok' | 'youtube' | 'instagram';
  onTabChange: (tab: 'all' | 'tiktok' | 'youtube' | 'instagram') => void;
}

export default function PlatformTabs({ activeTab, onTabChange }: PlatformTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as any)}>
        <TabsList className="w-full justify-start h-auto px-0 bg-transparent">
          <TabsTrigger 
            value="all" 
            className={`data-[state=active]:border-primary-500 data-[state=active]:text-primary-500
              border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm rounded-none`}
          >
            All Platforms
          </TabsTrigger>
          <TabsTrigger 
            value="tiktok" 
            className={`data-[state=active]:border-primary-500 data-[state=active]:text-primary-500
              border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm rounded-none ml-8`}
          >
            TikTok
          </TabsTrigger>
          <TabsTrigger 
            value="youtube" 
            className={`data-[state=active]:border-primary-500 data-[state=active]:text-primary-500
              border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm rounded-none ml-8`}
          >
            YouTube Shorts
          </TabsTrigger>
          <TabsTrigger 
            value="instagram" 
            className={`data-[state=active]:border-primary-500 data-[state=active]:text-primary-500
              border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm rounded-none ml-8`}
          >
            Instagram Reels
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
