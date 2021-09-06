"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnosController_1 = __importDefault(require("../controllers/turnosController"));
// import {verifyToken} from '.' 
class TurnosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Turnos routes ok!!!');
            //res.render("partials/principal");
        });
        this.router.get('/listado', turnosController_1.default.listadoturnos);
        this.router.get('/nuevo', turnosController_1.default.nuevoTurno);
    }
}
//Exportamos el enrutador con 
const turnosRoutes = new TurnosRoutes();
exports.default = turnosRoutes.router;
//# sourceMappingURL=turnosRoutes.js.map