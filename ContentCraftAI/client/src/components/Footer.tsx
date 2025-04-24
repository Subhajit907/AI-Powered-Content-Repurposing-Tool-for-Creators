import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              ReContent<span className="text-secondary-500">AI</span>
            </h3>
            <p className="text-slate-300 text-sm">
              Transform your long-form videos into platform-specific short content with the power of AI.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/">
                  <span className="hover:text-white cursor-pointer">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="hover:text-white cursor-pointer">Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/templates">
                  <span className="hover:text-white cursor-pointer">Templates</span>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <span className="hover:text-white cursor-pointer">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-300 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
            <p className="text-slate-300 text-sm">Email: support@recontentai.com</p>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} ReContentAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
