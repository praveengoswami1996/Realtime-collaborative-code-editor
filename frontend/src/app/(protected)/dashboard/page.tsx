"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FolderOpen,
  Sparkles,
  TrendingUp,
  Clock,
  MoreVertical,
  Zap,
} from "lucide-react";
import CreateProjectForm from "@/components/forms/create-project-form";
import useGetProjects from "@/hooks/queries/projects/useGetProjects";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  name: string;
  owner: string;
  documents: string[];
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetProjects();
  const { projects } = data || {};

  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if(isLoading) {
    return (
      <div>Please wait....</div>
    )
  }

  if(isError) {
    return (
      <div>Error fetching data.</div>
    )
  }

  return (
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
              {projects?.length}{" "}
              {projects?.length === 1 ? "project" : "projects"}
            </Badge>
          </p>
        </div>
        {projects?.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gradient-to-r from-card/80 to-card/60 px-4 py-2 rounded-full backdrop-blur-sm border border-border/50">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>5 active</span>
          </div>
        )}
      </div>

      {projects?.length === 0 ? (
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
                Get started by creating your first project above. Transform your
                ideas into reality with our premium tools.
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
          {projects?.map((project: Project) => (
            <Card
              key={project._id}
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
                    <Badge className={`font-medium px-3 py-1 text-xs border`}>
                      Active
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
                      <div className="font-medium text-foreground">Created</div>
                      <div className="text-xs">
                        {formatDate(project.createdAt)}
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
                        {formatDate(project.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={() => router.push(`/project/${project._id}`)} className="w-full h-12 text-white font-medium transition-all duration-300 hover:scale-105">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Open Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Projects shared with me section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Shared with me
          </h2>
          <p className="text-muted-foreground text-lg flex items-center gap-3">
            list of projects in which you are collaborator
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 font-medium"
            >
              {projects?.length}{" "}
              {projects?.length === 1 ? "project" : "projects"}
            </Badge>
          </p>
        </div>
      </div>
    </main>
  );
}
