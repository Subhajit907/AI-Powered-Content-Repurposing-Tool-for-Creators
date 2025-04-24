export default function Templates() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Content Templates</h1>
        <p className="mt-2 text-slate-600">Pre-made content structures for different platforms</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Available Templates</h2>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            Create Template
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Template Card 1 */}
          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary-500 px-4 py-3">
              <h4 className="font-medium text-white">TikTok Engagement Booster</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-4">Perfect for creating engaging TikTok content that drives views and shares.</p>
              <button className="text-primary-500 text-sm font-medium">Use Template</button>
            </div>
          </div>

          {/* Template Card 2 */}
          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#FF0000] px-4 py-3">
              <h4 className="font-medium text-white">YouTube Shorts Growth</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-4">Optimized for YouTube Shorts algorithm to maximize subscriber growth.</p>
              <button className="text-primary-500 text-sm font-medium">Use Template</button>
            </div>
          </div>

          {/* Template Card 3 */}
          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="instagram-gradient px-4 py-3">
              <h4 className="font-medium text-white">Instagram Reels Converter</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-4">Transform long content into viral Instagram Reels with trending hooks.</p>
              <button className="text-primary-500 text-sm font-medium">Use Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}