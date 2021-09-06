import {Request, Response } from 'express';
import userModel from '../models/userModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";
//const nodemailer = require('nodemailer');
import {transporter} from '../config/mailer'
const dtenv = require('dotenv');

class AuthController{
    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.findMail(usuario);
        console.log(usuario, password);
        if (!result) {
            return res.status(404).json({ message: "Usuario no registrado" });
           
        }else{
            const passOk = await userModel.validarPassword(password, result.password);
 

            if (passOk && result.email == usuario) {
                
                
                if (result?.rol === "admin") {
                    req.session.admin = true;
                    // res.status(200).json({mssagge:"login admin ok!"});
                   
                }
                req.session.admin = false;
                
                //  res.status(200).json({mssagge:"login user ok!"});
    
                // const token: string = jwt.sign({ _id: result.id },process.env.SECRETORPRIVATEKEY, {expiresIn: '1h'});
                // return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol:result.rol , expiracion:expiresIn});
                  const token: string = jwt.sign({ _id: result.id } ,'SECRETORPIVATEKEY', {expiresIn: '1h'});
                 return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol:result.rol});
            }

            if (result.email != usuario || result.password != password) {
                return res.status(403).json({message:"Usuario y/o contraseña incorrectos!!"})
            }
            console.log(res);
       
        }


       
    }

    public async restorePwd(req:Request, res:Response){
        const usuario = req.params;

    }
    public async addUser(req:Request,res:Response){
		const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        
        //res.send('Usuario agregado!!!');
        const busqueda = await userModel.findMail(usuario.email);
        usuario.password = await userModel.encriptPass(usuario.password);
        
       
        
        if (!busqueda) {

            try{

                const result = await userModel.create(usuario);
                
                    await transporter.sendMail({
                        from: '"PET CONTROL 👻" <info@petcontrolsoftware.com>',
                        to:usuario.email,
                        subject:'Registro PET CONTROL exitoso!!',
                        html:`Hola ${usuario.nombre}, gracias por ustilizar PET CONTROL SOFTWARE Gestion Veterinaria,
                        ya podés ingresar a nuestro sitio clickeando el siguiente enlace:
                        <a button href="http://localhost:4200/auth/login"> Pet Control Software | Gestión Veterinaria </a>`
                    });
                console.log(transporter);
        

            }
            catch(err){

                console.log("error:", err);


            }
        
            return res.status(200).json({ message: 'El usuario se ha registrado con éxito!!!! Usuario: ' + usuario.nombre });
        }
        
        if(busqueda){
            return res.status(403).json({message:"El usuario ya se encuentra registrado!"});
        }
        
        

        
      

	}
    public home(req: Request, res: Response) {
        if (!req.session.auth) {
            // req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            // res.redirect("./error");
        }
        console.log(req.body);
        
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

}
    

    const authController = new AuthController();
    export default authController;

