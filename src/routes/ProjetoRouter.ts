import { Router } from "express";
import ProjetoController from "../controllers/ProjetoController";

const ProjetoRouter = Router();

ProjetoRouter.get('/list-projetos', ProjetoController.listProjs)

ProjetoRouter.post('/create-projeto', ProjetoController.createProj);

ProjetoRouter.put('/update-projeto', ProjetoController.updateProj);

ProjetoRouter.delete('/delete-projeto', ProjetoController.deleteProj);

export default ProjetoRouter;