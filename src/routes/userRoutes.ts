import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';


class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('USER ROUTES OK!!!');
            //res.render("partials/principal");
        });


		this.router.get('/list',userController.list);
		this.router.post('/add', authController.addUser);
		this.router.put('/update', userController.update);
	}
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;