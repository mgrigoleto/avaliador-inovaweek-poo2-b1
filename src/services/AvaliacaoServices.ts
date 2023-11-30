import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AvaliacaoServices{
    constructor(){};

    async listAvals(id?:string){
        try{
            if(id){
                const aval = await prisma.avaliacao.findUnique({
                    where: {
                        id
                    }
                });
                return aval;
            }else{
                const avals = await prisma.avaliacao.findMany();
                return avals;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async createAval(aval: Prisma.AvaliacaoCreateInput){
        try{
            const newaval = await prisma.avaliacao.create({
                data: aval
            });
            return newaval;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async updateAval(id: string, aval: Prisma.AvaliacaoUpdateInput){
        try{
            const updatedaval = await prisma.avaliacao.update({
                where: {
                    id
                },
                data: aval
            });
            return updatedaval;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteAval(id: string){
        try{
            const deletedaval = await prisma.avaliacao.delete({
                where: {
                    id
                }
            });
            return deletedaval;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
export default new AvaliacaoServices();