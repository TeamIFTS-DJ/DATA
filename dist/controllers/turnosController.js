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
const turnosModel_1 = __importDefault(require("../models/turnosModel"));
class TurnosController {
    listadoturnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //  console.log(req.header("Authorization")); *///Observamos el valor del token
            const turnos = yield turnosModel_1.default.listarTurnos();
            return res.status(200).json(turnos);
        });
    }
    nuevoTurno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = req.body;
            //  const result= await turnosModel.create(turno);
            console.log(turno);
            res.render("partials/testTurno");
            // return res.json({ message: 'Turno agendado con éxito: ' });
        });
    }
}
const turnosController = new TurnosController();
exports.default = turnosController;
//# sourceMappingURL=turnosController.js.map