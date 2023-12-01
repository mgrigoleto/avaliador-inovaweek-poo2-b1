import { Prisma } from '@prisma/client';
import { Request, Response} from "express";
import AvaliacaoServices from '../services/AvaliacaoServices';

class AvaliacaoController{
    
    constructor(){}

    async createAval(req: Request, res: Response){
        const dados: Prisma.AvaliacaoCreateInput = req.body;

        try{
            if(dados.datahora !== null && dados.nota !== null && (dados.avaliadorAluno !== null || dados.avaliadorProfessor !== null)){
                const newaval = await AvaliacaoServices.createAval(dados)
                
                if(newaval == null){
                    res.status(400).json({
                        status:'error',
                        message:'Insira os dados corretamente',
                    })
                }
                else{
                    res.status(200).json({
                        status: 'ok',
                        newaval: newaval
                    })
                }       
            }else{
                res.status(400).json({
                    status:'error',
                    message:'Insira todos os dados orbigatórios.'
                })
            }
        }catch(error){
            res.status(500).json({
                error: error,
                message: 'Erro interno no servidor.'
            })
        }
    }

    async listAvaliacao(req: Request, res: Response){
        const avals = await AvaliacaoServices.listAvals();

        try{
            if(avals == null){
                res.status(400).json({
                   status:'error',
                   message:'Avaliação não encontrada.' 
                })
            }
            else{
                res.render('avaliacoes', { avals: avals })
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                message:'Erro interno no servidor.'
            })
        }
    }

    async updateAval(req: Request, res: Response){
        try{
            const id = req.params.id;
            const dados: Prisma.AvaliacaoUpdateInput = req.body;
            const updatedaval = await AvaliacaoServices.updateAval(id, dados);

            if(id == null || updatedaval == null){
                res.status(400).json({
                    status:'error',
                    message:'Avaliacao não encontrada'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    updatedaval: updatedaval
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        } 
    }

    async deleteAval(req: Request, res: Response){
        try{ 
            const id= req.params.id;
            const deletedaval = await AvaliacaoServices.deleteAval(id);

            if(id == null || deletedaval == null){
                res.status(400).json({
                    status:'error',
                    message:'Avaliação não encontrada.'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    deletedaval: deletedaval
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        }
    }
} export default new AvaliacaoController();