import { Router, Request, Response } from 'express';
import turnosController from '../controllers/turnosController';
// import {verifyToken} from '.' 
class TurnosRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Turnos routes ok!!!');
            //res.render("partials/principal");
        });


		this.router.get('/listado', turnosController.listadoturnos);
		this.router.get('/nuevo', turnosController.nuevoTurno);
	}
}

//Exportamos el enrutador con 

const turnosRoutes = new TurnosRoutes();
export default turnosRoutes.router;