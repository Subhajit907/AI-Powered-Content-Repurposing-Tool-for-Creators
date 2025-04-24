import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, isLoading, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Don't show header on auth page
  if (location === "/auth") {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-primary-500 text-2xl font-bold cursor-pointer">
                ReContent<span className="text-secondary-500">AI</span>
              </span>
            </Link>
          </div>
          {user && (
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/">
                <span className={`${location === "/" ? "text-primary-500" : "text-slate-800 hover:text-primary-500"} font-medium cursor-pointer`}>
                  Dashboard
                </span>
              </Link>
              <Link href="/projects">
                <span className={`${location === "/projects" ? "text-primary-500" : "text-slate-800 hover:text-primary-500"} font-medium cursor-pointer`}>
                  Projects
                </span>
              </Link>
              <Link href="/templates">
                <span className={`${location === "/templates" ? "text-primary-500" : "text-slate-800 hover:text-primary-500"} font-medium cursor-pointer`}>
                  Templates
                </span>
              </Link>
              <Link href="/settings">
                <span className={`${location === "/settings" ? "text-primary-500" : "text-slate-800 hover:text-primary-500"} font-medium cursor-pointer`}>
                  Settings
                </span>
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : user ? (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <span className="hidden md:block mr-3 text-sm font-medium">{user.username}</span>
                    <div className="h-8 w-8 rounded-full bg-secondary-500 flex items-center justify-center text-white">
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
