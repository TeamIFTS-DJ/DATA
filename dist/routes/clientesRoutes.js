"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ClientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Clientes routes OK!!!');
            //res.render("partials/principal");
        });
    }
}
//Exportamos el enrutador con 
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
//# sourceMappingURL=clientesRoutes.js.map