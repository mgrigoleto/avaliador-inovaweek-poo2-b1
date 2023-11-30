import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProjetoServices{
    constructor(){};

    async listProjs(id?:string){
        try{
            if(id){
                const proj = await prisma.projeto.findUnique({
                    where: {
                        id
                    }
                });
                return proj;
            }else{
                const projs = await prisma.projeto.findMany();
                return projs;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async createProj(proj: Prisma.ProjetoCreateInput){
        try{
            const newproj = await prisma.projeto.create({
                data: proj
            });
            return newproj;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async updateProj(id: string, proj: Prisma.ProjetoUpdateInput){
        try{
            const updatedproj = await prisma.projeto.update({
                where: {
                    id
                },
                data: proj
            });
            return updatedproj;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteProj(id: string){
        try{
            const deletedproj = await prisma.projeto.delete({
                where: {
                    id
                }
            });
            return deletedproj;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
export default new ProjetoServices();