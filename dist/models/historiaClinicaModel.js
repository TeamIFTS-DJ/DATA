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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield promise_1.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'sanlorenzo',
            database: 'petcontrol',
            connectionLimit: 10
        });
        return connection; //devolvemos el manejador de conexion
    });
}
exports.connect = connect;
// import { createPool } from 'mysql2/promise';
class HistoriaClinicaModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'localhost',
                user: 'root',
                password: 'sanlorenzo',
                database: 'petcontrol',
                connectionLimit: 10
            });
        });
    }
    // Admin task
    listAllClinicFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const clinicalFile = yield this.db.query('SELECT * FROM historiaclinica');
            return clinicalFile[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla mascotas coincide con el id.
    //Si no la encuentra devuelve null
    findPet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascotas WHERE id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    //Devuelve un objeto cuya fila en la tabla mascotas coincide con el nombre.
    //Si no la encuentra devuelve null
    findPetByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.db.query('SELECT * FROM mascotas WHERE nombre = ?', [nombre]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (found.length > 1)
                return found[0][0];
            return null;
        });
    }
    //BUSCAR MASCOTAS SEGUN NOMBRE DE CLIENTE
    // async findPetByClientes(nombre: string) {
    // 	const found: any = await this.db.query('SELECT * FROM mascotas inner join  WHERE email = ?', [mail]);
    // 	//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
    // 	if (found.length > 1)
    // 		return found[0][0];
    // 	return null;
    // }
    //Devuelve 1 si logro crear un nuevo registro de la tabla mascotas
    crear(pet) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO mascotas SET ?', [pet]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro actualizar el usuario indicado por id
    actualizar(pet, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE mascotas SET ? WHERE ID = ?', [pet, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el registro de la mascota indicado por id
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pet = (yield this.db.query('DELETE FROM mascotas WHERE ID = ?', [id]))[0].affectedRows;
            console.log(pet);
            return pet;
        });
    }
}
const historiaClinicaModel = new HistoriaClinicaModel();
exports.default = historiaClinicaModel;
//# sourceMappingURL=historiaClinicaModel.js.map