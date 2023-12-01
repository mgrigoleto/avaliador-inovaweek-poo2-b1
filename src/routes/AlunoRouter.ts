import { Router } from "express";
import AlunoController from "../controllers/AlunoController";

const AlunoRouter = Router();

AlunoRouter.get('/list-alunos', AlunoController.listAlunos)

AlunoRouter.post('/create-aluno', AlunoController.createAluno);

AlunoRouter.put('/update-aluno', AlunoController.updateAluno);

AlunoRouter.delete('/delete-aluno', AlunoController.deleteAluno);

export default AlunoRouter;