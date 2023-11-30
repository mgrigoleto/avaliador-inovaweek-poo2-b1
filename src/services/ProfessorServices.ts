import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProfessorServices{
    constructor(){};

    async listProfs(matricula?:number){
        try{
            if(matricula){
                const prof = await prisma.professor.findUnique({
                    where: {
                        matricula
                    }
                });
                return prof;
            }else{
                const profs = await prisma.professor.findMany();
                return profs;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async createProf(prof: Prisma.ProfessorCreateInput){
        try{
            const newprof = await prisma.professor.create({
                data: prof
            });
            return newprof;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async updateProf(matricula: number, prof: Prisma.ProfessorUpdateInput){
        try{
            const updatedprof = await prisma.professor.update({
                where: {
                    matricula
                },
                data: prof
            });
            return updatedprof;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteProf(matricula: number){
        try{
            const deletedprof = await prisma.professor.delete({
                where: {
                    matricula
                }
            });
            return deletedprof;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
export default new ProfessorServices();