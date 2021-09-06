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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const nodemailer = require('nodemailer');
const mailer_1 = require("../config/mailer");
const dtenv = require('dotenv');
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.findMail(usuario);
            console.log(usuario, password);
            if (!result) {
                return res.status(404).json({ message: "Usuario no registrado" });
            }
            else {
                const passOk = yield userModel_1.default.validarPassword(password, result.password);
                if (passOk && result.email == usuario) {
                    if ((result === null || result === void 0 ? void 0 : result.rol) === "admin") {
                        req.session.admin = true;
                        // res.status(200).json({mssagge:"login admin ok!"});
                    }
                    req.session.admin = false;
                    //  res.status(200).json({mssagge:"login user ok!"});
                    // const token: string = jwt.sign({ _id: result.id },process.env.SECRETORPRIVATEKEY, {expiresIn: '1h'});
                    // return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol:result.rol , expiracion:expiresIn});
                    const token = jsonwebtoken_1.default.sign({ _id: result.id }, 'SECRETORPIVATEKEY', { expiresIn: '1h' });
                    return res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol: result.rol });
                }
                if (result.email != usuario || result.password != password) {
                    return res.status(403).json({ message: "Usuario y/o contraseña incorrectos!!" });
                }
                console.log(res);
            }
        });
    }
    restorePwd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.params;
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModel_1.default.findMail(usuario.email);
            usuario.password = yield userModel_1.default.encriptPass(usuario.password);
            if (!busqueda) {
                try {
                    const result = yield userModel_1.default.create(usuario);
                    yield mailer_1.transporter.sendMail({
                        from: '"PET CONTROL 👻" <info@petcontrolsoftware.com>',
                        to: usuario.email,
                        subject: 'Registro PET CONTROL exitoso!!',
                        html: `Hola ${usuario.nombre}, gracias por ustilizar PET CONTROL SOFTWARE Gestion Veterinaria,
                        ya podés ingresar a nuestro sitio clickeando el siguiente enlace:
                        <a button href="http://localhost:4200/auth/login"> Pet Control Software | Gestión Veterinaria </a>`
                    });
                    console.log(mailer_1.transporter);
                }
                catch (err) {
                    console.log("error:", err);
                }
                return res.status(200).json({ message: 'El usuario se ha registrado con éxito!!!! Usuario: ' + usuario.nombre });
            }
            if (busqueda) {
                return res.status(403).json({ message: "El usuario ya se encuentra registrado!" });
            }
        });
    }
    home(req, res) {
        if (!req.session.auth) {
            // req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            // res.redirect("./error");
        }
        console.log(req.body);
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=authController.js.map