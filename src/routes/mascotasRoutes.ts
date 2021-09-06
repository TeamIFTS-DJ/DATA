import { Router, Request, Response } from 'express';
class MascotasRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Pacientes routes ok!!!');
            //res.render("partials/principal");
        });
	}
}

//Exportamos el enrutador con 

const mascotasRoutes = new MascotasRoutes();
export default mascotasRoutes.router;