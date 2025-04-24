export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Projects</h1>
        <p className="mt-2 text-slate-600">Manage your content repurposing projects</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Recent Projects</h2>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
            New Project
          </button>
        </div>

        {/* Empty state */}
        <div className="text-center py-10">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-slate-100 mb-4">
            <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No projects yet</h3>
          <p className="text-slate-500 mb-6">Start by creating a new content repurposing project</p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md inline-flex items-center">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create First Project
          </button>
        </div>
      </div>
    </div>
  );
}