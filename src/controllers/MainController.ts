import { Request, Response } from 'express';

class MainController{

    constructor(){}

    renderMainPage(req: Request, res: Response){
        res.render('home');
    }

}

export default new MainController();