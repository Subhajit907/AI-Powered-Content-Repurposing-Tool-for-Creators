export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-primary">
          <h2 className="text-xl font-semibold text-white">Account Settings</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    defaultValue="Sarah Davis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    defaultValue="sarah@example.com"
                  />
                </div>
              </div>
            </div>
            
            {/* API Keys Section */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">API Keys</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gemini API Key</label>
                  <div className="flex">
                    <input 
                      type="password" 
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
                      defaultValue="•••••••••••••••••••••••••••"
                    />
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-r-md border-y border-r border-slate-300">
                      Show
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Used for AI content generation</p>
                </div>
              </div>
            </div>
            
            {/* Preferences Section */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">Content Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    id="autoGenerate" 
                    type="checkbox" 
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-300 rounded" 
                    defaultChecked
                  />
                  <label htmlFor="autoGenerate" className="ml-2 block text-sm text-slate-700">
                    Automatically generate content after upload
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="saveHistory" 
                    type="checkbox" 
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-300 rounded" 
                    defaultChecked
                  />
                  <label htmlFor="saveHistory" className="ml-2 block text-sm text-slate-700">
                    Save content generation history
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md mr-3">
              Cancel
            </button>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}