"use client";
import React from "react";
import useGetProjectDetailsById from "@/hooks/queries/projects/useGetProjectDetailsById";
import { useParams } from "next/navigation";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectInfo from "./ProjectInfo";
import dayjs from "dayjs";
import CollaboratorsList from "./CollaboratorsList";
import DocumentsList from "./DocumentsList";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useGetProjectDetailsById(
    projectId as string
  );
  const { project } = data || {};

  console.log("ye Dekh project", project);


  if (isLoading) {
    return <div>Please wait while we make everything ready for you</div>;
  }

  if (isError) {
    return <div>Something went wrong. Please try again later</div>;
  }

  return (
    <>
      <ProjectDetailsHeader 
        projectName={project.name}
        projectOwnerName={project.owner.name}
        collaboratorsCount={project.collaborators.length}
        documentsCount={project.documents.length}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Project Info */}
          <ProjectInfo 
            projectName={project.name}
            ownerName={project.owner.name}
            createdAt={dayjs(project.createdAt).format("DD MMM YYYY")}
            documentsCount={project.documents.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collaborator Section */}
            <CollaboratorsList 
                collaborators={project.collaborators}
                ownerId={project.owner._id}
            />

            {/* Document List */}
            <DocumentsList 
                documents={project.documents}
            />

          </div>
        </div>
      </div>
    </>
  );
}
