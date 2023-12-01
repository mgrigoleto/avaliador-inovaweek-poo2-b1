import { Router } from "express";
import ProfessorController from "../controllers/ProfessorController";
const ProfessorRouter = Router();

ProfessorRouter.get('/list-professores', ProfessorController.listProfs)

ProfessorRouter.post('/create-professor', ProfessorController.createProf);

ProfessorRouter.put('/update-professor', ProfessorController.updateProf);

ProfessorRouter.delete('/delete-professor', ProfessorController.deleteProf);

export default ProfessorRouter;