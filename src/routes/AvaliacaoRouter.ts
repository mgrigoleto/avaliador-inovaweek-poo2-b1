import { Router } from "express";
import AvaliacaoController from "../controllers/AvaliacaoController";

const AvaliacaoRouter = Router();

AvaliacaoRouter.get('/list-avaliacoes', AvaliacaoController.listAvaliacao)

AvaliacaoRouter.post('/create-avaliacao', AvaliacaoController.createAval);

AvaliacaoRouter.put('/update-avaliacao', AvaliacaoController.updateAval);

AvaliacaoRouter.delete('/delete-avaliacao', AvaliacaoController.deleteAval);

export default AvaliacaoRouter;