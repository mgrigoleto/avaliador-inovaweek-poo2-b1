import { Prisma } from '@prisma/client';
import { Request, Response} from "express";
import ProfessorServices from '../services/ProfessorServices';

class ProfessorController{
    
    constructor(){}

    async createProf(req: Request, res: Response){
        const dados: Prisma.ProfessorCreateInput = req.body;

        try{
            if(dados.nome !== "" && dados.matricula !== null){
                const newprof = await ProfessorServices.createProf(dados)
                
                if(newprof == null){
                    res.status(400).json({
                        status:'error',
                        message:'Dados duplicados.',
                    })
                }
                else{
                    res.status(200).json({
                        status: 'ok',
                        newprof: newprof
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

    async listProfs(req: Request, res: Response){
        const profs = await ProfessorServices.listProfs();

        try{
            if(profs == null){
                res.status(400).json({
                   status:'error',
                   message:'Professor não encontrado.' 
                })
            }
            else{
                res.status(200).json({
                    status:'ok',
                    profs: profs
                })
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                message:'Erro interno no servidor.'
            })
        }
    }

    async updateProf(req: Request, res: Response){
        try{
            const matricula = req.params.matricula;
            const dados: Prisma.ProfessorUpdateInput = req.body;
            const updatedprof = await ProfessorServices.updateProf(matricula, dados);

            if(matricula == null || updatedprof == null){
                res.status(400).json({
                    status:'error',
                    message:'Professor não encontrado'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    updated: updatedprof
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        } 
    }

    async deleteProf(req: Request, res: Response){
        try{ 
            const matricula= req.params.matricula;
            const deletedprof = await ProfessorServices.deleteProf(matricula);

            if(matricula == null || deletedprof == null){
                res.status(400).json({
                    status:'error',
                    message:'Professor não encontrado.'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    deletedprof: deletedprof
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        }
    }
} export default new ProfessorController();