import ProjectModel from "../models/project.model";

type CreateProjectParams = {
    name: string;
}

export const createProject = async (data: CreateProjectParams, ownerId: string) => {
    const project = await ProjectModel.create({
        name: data.name,
        owner: ownerId,
        documents: [],
        collaborators: [ownerId] // Owner of the project will be the default collaborator
    })
    return { project };
}