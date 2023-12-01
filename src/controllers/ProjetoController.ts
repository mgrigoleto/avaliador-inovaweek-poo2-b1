import { Prisma } from '@prisma/client';
import { Request, Response} from "express";
import ProjetoServices from '../services/ProjetoServices';

class ProjetoController{
    
    constructor(){}

    async createProj(req: Request, res: Response){
        const dados: Prisma.ProjetoCreateInput = req.body;

        try{
            if(dados.nome !== "" && dados.area !== ""){
                const newproj = await ProjetoServices.createProj(dados)
                
                if(newproj == null){
                    res.status(400).json({
                        status:'error',
                        message:'Dados duplicados.',
                    })
                }
                else{
                    res.status(200).json({
                        status: 'ok',
                        newproj: newproj
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

    async listProjs(req: Request, res: Response){
        const projs = await ProjetoServices.listProjs();

        try{
            if(projs == null){
                res.status(400).json({
                   status:'error',
                   message:'Projeto não encontrado.' 
                })
            }
            else{
                res.render('projetos', { projs: projs })
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                message:'Erro interno no servidor.'
            })
        }
    }

    async updateProj(req: Request, res: Response){
        try{
            const id = req.params.id;
            const dados: Prisma.ProjetoUpdateInput = req.body;
            const updatedproj = await ProjetoServices.updateProj(id, dados);

            if(id == null || updatedproj == null){
                res.status(400).json({
                    status:'error',
                    message:'Projeto não encontrado'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    updatedproj: updatedproj
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        } 
    }

    async deleteProj(req: Request, res: Response){
        try{ 
            const id= req.params.id;
            const deletedproj = await ProjetoServices.deleteProj(id);

            if(id == null || deletedproj == null){
                res.status(400).json({
                    status:'error',
                    message:'Projeto não encontrado.'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    deletedproj: deletedproj
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        }
    }
} export default new ProjetoController();