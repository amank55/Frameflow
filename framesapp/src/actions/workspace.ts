"use server"
import { currentUser } from "@clerk/nextjs/server"
import { Client } from "../lib/prisma"
export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }
    
        const isUserInWorkspace = await Client.workSpace.findUnique({
          where: {
            id: workspaceId,
            OR: [
              {
                User: {
                  clerkid: user.id,
                },
              },
              {
                members: {
                  every: {
                    User: {
                      clerkid: user.id,
                    },
                  },
                },
              },
            ],
          },
        })
        return {
          status: 200,
          data: { workspace: isUserInWorkspace },
        }
      } catch (error) {
        return {
          status: 403,
          data: { workspace: null },
        }
      }
    }

    export const getWorkspaceFolders = async (workSpaceId: string) => {
      try {
        const isFolders = await Client.folder.findMany({
          where: {
            workSpaceId,
          },
          include: {
            _count: {
              select: {
                videos: true,
              },
            },
          },
        })
        if (isFolders && isFolders.length > 0) {
          return { status: 200, data: isFolders }
        }
        return { status: 404, data: [] }
      } catch (error) {
        return { status: 403, data: [] }
      }
    }

    export const getAllUserVideos = async (workSpaceId: string) => {
      try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const videos = await Client.video.findMany({
          where: {
            OR: [{ workSpaceId }, { folderId: workSpaceId }],
          },
          select: {
            id: true,
            title: true,
            createdAt: true,
            source: true,
            processing: true,
            Folder: {
              select: {
                id: true,
                name: true,
              },
            },
            User: {
              select: {
                firstname: true,
                lastname: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
    
        if (videos && videos.length > 0) {
          return { status: 200, data: videos }
        }
    
        return { status: 404 }
      } catch (error) {
        return { status: 400 }
      }
    }
    
    export const getWorkSpaces = async () => {
      try {
        const user = await currentUser()
    
        if (!user) return { status: 404 }
    
        const workspaces = await Client.user.findUnique({
          where: {
            clerkid: user.id,
          },
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
            members: {
              select: {
                WorkSpace: {
                  select: {
                    id: true,
                    name: true,
                    type: true,
                  },
                },
              },
            },
          },
        })
    
        if (workspaces) {
          return { status: 200, data: workspaces }
        }
      } catch (error) {
        return { status: 400 }
      }
    }
    
    export const createWorkspace = async (name: string) => {
      try {
        const user = await currentUser()
        if (!user) return { status: 404 }
        const authorized = await Client.user.findUnique({
          where: {
            clerkid: user.id,
          },
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        })
    
        if (authorized?.subscription?.plan === 'PRO') {
          const workspace = await Client.user.update({
            where: {
              clerkid: user.id,
            },
            data: {
              workspace: {
                create: {
                  name,
                  type: 'PUBLIC',
                },
              },
            },
          })
          if (workspace) {
            return { status: 201, data: 'Workspace Created' }
          }
        }
        return {
          status: 401,
          data: 'You are not authorized to create a workspace.',
        }
      } catch (error) {
        return { status: 400 }
      }
    }
    