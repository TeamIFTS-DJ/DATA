"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Admin routes ok!!!');
            //res.render("partials/principal");
        });
        this.router.delete('/eliminar', adminController_1.default.delete);
    }
}
//Exportamos el enrutador con 
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
//# sourceMappingURL=adminRoutes.js.map