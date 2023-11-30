import { Prisma } from '@prisma/client';
import { Request, Response} from "express";
import AlunoServices from '../services/AlunoServices';

class AlunoController{
    
    constructor(){}

    async createAluno(req: Request, res: Response){
        const dados: Prisma.AlunoCreateInput = req.body;

        try{
            if(dados.nome !== "" && dados.matricula !== null){
                const newaluno = await AlunoServices.createAluno(dados)
                
                if(newaluno == null){
                    res.status(400).json({
                        status:'error',
                        message:'Dados duplicados.',
                    })
                }
                else{
                    res.status(200).json({
                        status: 'ok',
                        newaluno: newaluno
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

    async listAlunos(req: Request, res: Response){
        const alunos = await AlunoServices.listAlunos();

        try{
            if(alunos == null){
                res.status(400).json({
                   status:'error',
                   message:'Aluno não encontrado.' 
                })
            }
            else{
                res.status(200).json({
                    status:'ok',
                    alunos: alunos
                })
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                message:'Erro interno no servidor.'
            })
        }
    }

    async updateAluno(req: Request, res: Response){
        try{
            const matricula = req.params.matricula;
            const dados: Prisma.AlunoUpdateInput = req.body;
            const updatedaluno = await AlunoServices.updateAluno(matricula, dados);

            if(matricula == null || updatedaluno == null){
                res.status(400).json({
                    status:'error',
                    message:'Aluno não encontrado'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    updatedaluno: updatedaluno
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        } 
    }

    async deleteAluno(req: Request, res: Response){
        try{ 
            const matricula= req.params.matricula;
            const deletedaluno = await AlunoServices.deleteAluno(matricula);

            if(matricula == null || deletedaluno == null){
                res.status(400).json({
                    status:'error',
                    message:'Aluno não encontrado.'
                })
            }
            else{
                res.send(200).json({
                    status:'ok',
                    deletedaluno: deletedaluno
                })
            }
        }catch(error){
            res.send(500).json({
                error:error,
                message:'Erro interno no servidor.'
            })
        }
    }
} export default new AlunoController();