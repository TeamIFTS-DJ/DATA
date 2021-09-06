"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const clientesModel_1 = __importDefault(require("../models/clientesModel"));
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
class UserController {
    //registro
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield userModel_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.admin) {
                req.session.admin = false;
                return res.status(404).json({ message: 'Debes ser administrador para acceder a esta sección!' });
                // console.log(req.body);
            }
            else {
                //res.send('Usuario '+ req.params.id +' Eliminado!!!');
                const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
                const result = yield userModel_1.default.eliminar(id);
            }
            //  return res.json({ text: 'deleting a user ' + id });
            // res.send('Usuario eliminado...' + id);
            // alert('Usuario eliminado!!' )
            res.redirect('../control');
            // res.render('partials/userDeleted');
        });
    }
    listMascotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*   console.log(req.body);
              
    
            //const clients = await mascotasModel.listarClientes();
            return res.json(clients);
        }
        
    
        public async listClientes(req: Request, res: Response) {
            /*   console.log(req.body);
              console.log(req.header("Authorization")); */ //Observamos el valor del token
            const clients = yield clientesModel_1.default.listarClientes();
            return res.json(clients);
        });
    }
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Controles');
            if (!req.session.auth) {
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
                // res.redirect("/");
            }
            const usuarios = yield userModel_1.default.listar();
            const users = usuarios;
            res.render('partials/controls', { users: usuarios });
        });
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (!req.session.auth) {
                // res.redirect("/");
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
            }
            console.log(req.body);
            let usuario = req.body.usuario;
            var usuarios = [];
            console.log(usuario);
            if (usuario.length > 0) {
                for (let elemento of usuario) {
                    const encontrado = yield userModel_1.default.buscarId(elemento);
                    if (encontrado) {
                        usuarios.push(encontrado);
                        console.log(encontrado);
                    }
                }
            }
            console.log(usuarios);
            res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
            // res.send('Recibido!!!');
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
    showError(req, res) {
        // res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
    //FIN CRUD
    // public notSignedUp(req:Request,res:Response){
    // 	console.log(req.body);
    // 	res.render("partials/notSignedUp");
    // }
    updateV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield userModel_1.default.buscarId(id);
            res.render('partials/update', { user: result });
        });
    }
    updateC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            if (req.body.rol == "Admin" || req.body.rol == "User") {
                yield userModel_1.default.actualizar(req.body, id);
            }
            res.redirect('../control');
        });
    }
}
const userController = new UserController();
exports.default = userController;
// import { Request, Response } from 'express';
// import userModel from '../models/userModel';
// import AdminRoutes from '../routes/adminRoutes';
// import flash from "connect-flash";
// import jwt from "jsonwebtoken";
// class UserController {
//     // public signin(req: Request, res: Response) {
//     //     // console.log(req.body);
//     //     //res.send('Sign In!!!');
//     //     // res.render("partials/signinForm");
//     // }
//     // public async login(req: Request, res: Response) {
//     //     const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
//     //     const result = await userModel.buscarMail(usuario);
//     //     console.log(usuario, password);
//     //     if (!result) {
//     //         return res.status(404).json({ message: "Usuario no registrado" });
//     //         //res.render("partials/signinForm", { error });
//     //     }
//     //     else {
//     //         if (result.email == usuario && result.password == password) {
//     //             req.session.user = result;
//     //             req.session.auth = true;
//     //             req.session.carrito = [];
//     //             req.session.total = 0;
//     //             //req.flash('confirmacion', 'Bienvenido ' + result.nombre + '!!');
//     //             if (result?.rol === "admin") {
//     //                 req.session.admin = true;
//     //                 //    return res.redirect("../admin/home")
//     //             } else {
//     //                 req.session.admin = false;
//     //             }
//     //             //return res.redirect("./home");
//     //             const token: string = jwt.sign({ _id: result.id }, "secretKey");
//     //             return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol:result.rol });
//     //         }
//     //     }
//     //     res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
//     // }
//     public async login(req: Request, res: Response) {
//         const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
//         const result = await userModel.findMail(usuario);
//         console.log(usuario, password);
//         if (!result) {
//             return res.status(404).json({ message: "Usuario no registrado" });
//         }else{
//             const passOk = await userModel.validarPassword(password, result.password);
//             if (passOk && result.email == usuario) {
//                 req.session.user = result;
//                 req.session.auth = true;
//                 if (result?.rol === "admin") {
//                     req.session.admin = true;
//                 }
//                 req.session.admin = false;
//                 const token: string = jwt.sign({ _id: result.id }, "secretKey");
//                 return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol:result.rol});
//             }
//         }
//     }
//     public showError(req: Request, res: Response) {
//         res.render("partials/error");
//     }
//     //registro
//     public signup(req: Request, res: Response) {
//         console.log(req.body);
//         res.render("partials/signupForm");
//     }
//     public home(req: Request, res: Response) {
//         if (!req.session.auth) {
//             // req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
//             // res.redirect("./error");
//         }
//         console.log(req.body);
//         // res.render("partials/home", { mi_session: true });
//     }
//     //CRUD
//     public async list(req: Request, res: Response) {
//         /*   console.log(req.body);
//           console.log(req.header("Authorization")); *///Observamos el valor del token
//         const usuarios = await userModel.listar();
//         return res.json(usuarios);
//     }
//     public async find(req: Request, res: Response) {
//         console.log(req.params.id);
//         const { id } = req.params;
//         const usuario = await userModel.buscarId(id);
//         if (usuario)
//             return res.json(usuario);
//         res.status(404).json({ text: "Usuario no registrado" });
//     }
//     // public async addUser(req: Request, res: Response) {
//     //     const usuario = req.body;
//     //     delete usuario.repassword;
//     //     console.log(req.body);
//     //     const busqueda = await userModel.buscarNombre(usuario.nombre);
//     //     console.log("ACA TU BUSCQUEDA PAPA" + busqueda)
//     //     if (!busqueda) {
//     //         const result = await userModel.crear(usuario);
//     //         return res.status(200).json({ message: 'User saved!!' });
//     //     } else {
//     //         return res.status(403).json({ message: 'User exists!!' });
//     //     }
//     // }
//     public async addUser(req:Request,res:Response){
// 		const usuario = req.body;
//         delete usuario.repassword;
//         console.log(req.body);
//         //res.send('Usuario agregado!!!');
//         const busqueda = await userModel.findMail(usuario.email);
//         usuario.password = await userModel.encriptPass(usuario.password);
//         if (!busqueda) {
//             const result = await userModel.create(usuario);
//             //  return res.json({ message: 'Usuario creado correctamente!!' });   
//             // res.redirect('./signin');
//         }
//         return res.json({ message: 'Usuario registrado!!' });
// 	}
//     public async update(req: Request, res: Response) {
//         console.log(req.body);
//         const { id } = req.params;
//         const result = await userModel.actualizar(req.body, id);
//         return res.json({ text: 'updating a user ' + id });
//     }
//     public async delete(req: Request, res: Response) {
//         console.log(req.body);
//         const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
//         const result = await userModel.eliminar(id);
//         // res.redirect('../control');
//     }
//     //FIN CRUD
//     // public async control(req: Request, res: Response) {
//     //     if (!req.session.auth) {
//     //         req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
//     //         res.redirect("./error");
//     //     }
//     //     const usuarios = await userModel.listar();
//     //     res.render('partials/controls', { users: usuarios, mi_session: true });
//     // }
//     // public auxiliar(req: Request, res: Response) {
//     //     res.render('templates/auxiliar')
//     // }
//     public async procesar(req: Request, res: Response) {
//         if (!req.session.auth) {
//             req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
//             res.redirect("./error");
//         }
//         let usuario = req.body.usuario;
//         var usuarios: any = [];
//         console.log(usuario);
//         if (usuario !== undefined) {
//             for (let elemento of usuario) {
//                 const encontrado = await userModel.buscarId(elemento);
//                 if (encontrado) {
//                     usuarios.push(encontrado);
//                 }
//             }
//         }
//         console.log(usuarios);
//         res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true });
//     }
//     public endSession(req: Request, res: Response) {
//         console.log(req.body);
//         req.session.user = {};
//         req.session.auth = false;
//         req.session.destroy(() => console.log("Session finalizada"));
//         res.redirect("/");
//     }
// }
// const userController = new UserController();
// export default userController;
//# sourceMappingURL=userController.js.map