import { Router, Request, Response } from 'express';
import adminController from '../controllers/adminController';
class AdminRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Admin routes ok!!!');
            //res.render("partials/principal");
        });


		this.router.delete('/eliminar',  adminController.delete);
	}
}

//Exportamos el enrutador con 

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;