"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FolderOpen,
  User,
  LogOut,
  Settings,
  Sparkles,
  TrendingUp,
  Clock,
  MoreVertical,
  Search,
  Filter,
  Zap,
  Target,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import CreateProjectForm from "@/components/forms/create-project-form";

interface Project {
  id: string;
  name: string;
  createdDate: string;
  lastModified: string;
  status: "active" | "completed" | "archived";
}

export default function DashboardPage() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/diverse-user-avatars.png",
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary border-primary/20";
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "archived":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b bg-emerald-900">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/25">
                <Target className="h-5 w-5 " />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">
                  RCCE
                </h1>
                <p className="text-xs text-primary-foreground/80">
                  Realtime Collaborative Code Editor
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 w-64 bg-white/20 border-white/30 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/30"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/30"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-primary-foreground">
                {user.name}
              </span>
              <span className="text-xs text-primary-foreground/80">
                {user.email}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-white/30 transition-all duration-300 hover:bg-white/20"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 p-2 glass border-border/50"
                align="end"
              >
                <div className="flex items-center gap-3 p-3 border-b border-border/50 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-primary-foreground/80">
                      {user.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuItem className="rounded-lg">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-lg text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Create New Project Section */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center border">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Create New Project
                </div>
                <CardDescription className="text-base mt-1">
                  Launch your next big idea with our premium project management
                  tools.
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <CreateProjectForm />
          </CardContent>
        </Card>

        {/* My Projects Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              My Projects
            </h2>
            <p className="text-muted-foreground text-lg flex items-center gap-3">
              Manage and access all your projects in one premium workspace.
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 font-medium"
              >
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </Badge>
            </p>
          </div>
          {projects.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gradient-to-r from-card/80 to-card/60 px-4 py-2 rounded-full backdrop-blur-sm border border-border/50">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>
                {projects.filter((p) => p.status === "active").length} active
              </span>
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-20 border-dashed border-2 border-primary/20 glass-card bg-gradient-to-br from-card/50 to-card/30">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="h-24 w-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-primary/10">
                  <FolderOpen className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                  No projects yet
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Get started by creating your first project above. Transform
                  your ideas into reality with our premium tools.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span>Your premium workspace awaits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Projects Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group relative overflow-hidden glass-card shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-border/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                        {project.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getStatusColor(
                          project.status
                        )} font-medium px-3 py-1 text-xs border`}
                      >
                        {project.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center backdrop-blur-sm border border-primary/10">
                        <CalendarDays className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          Created
                        </div>
                        <div className="text-xs">
                          {formatDate(project.createdDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center backdrop-blur-sm border border-secondary/10">
                        <Clock className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          Last Modified
                        </div>
                        <div className="text-xs">
                          {formatDate(project.lastModified)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Open Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
