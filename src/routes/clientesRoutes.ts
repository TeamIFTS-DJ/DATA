import { Router, Request, Response } from 'express';
class ClientesRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Clientes routes OK!!!');
            //res.render("partials/principal");
        });
	}
}

//Exportamos el enrutador con 

const  clientesRoutes = new  ClientesRoutes();
export default  clientesRoutes.router;