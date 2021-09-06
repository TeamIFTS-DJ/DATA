import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


export async function connect(){
	const connection = await createPool({
		host: 'us-cdbr-east-03.cleardb.com',
		port:3306,
		user: 'b7146e3523096a',
     	password:'e6432e3b',
		database: 'heroku_110e4ea57743945',
		connectionLimit: 10
	});
	return connection; //devolvemos el manejador de conexion
}

// import { createPool } from 'mysql2/promise';

class EstudiosModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: 'sanlorenzo',
			database: 'petcontrol',
			connectionLimit: 10
		});
		
	}
	

	async listarEstudios() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const estudios = await this.db.query('SELECT * FROM estudios');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return estudios[0];
	}

	//Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async buscarIdEstudio(idEstudio: string) {
		const foundS: any = await this.db.query('SELECT * FROM usuarios WHERE id = ?', [idEstudio]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (foundS.length > 1)
			return foundS[0][0];
		return null;
	}
	//Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
	//Si no la encuentra devuelve null
	async buscarNombre(nombre: string) {
		const foundNameS: any = await this.db.query('SELECT nombreEstudio FROM estudios');
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (foundNameS.length > 1)
			return foundNameS[0][0];
		return null;
	}


	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crear(estudio: object) {
		const result = (await this.db.query('INSERT INTO estudios SET ?', [estudio]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(estudio: object, id: string) {
		const result = (await this.db.query('UPDATE estudios SET ? WHERE IdEstudio = ?', [estudio, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(idEstudio: string) {
		
		const estudio = (await this.db.query('DELETE FROM estudios WHERE IdEstudio = ?', [idEstudio]))[0].affectedRows;
		return estudio;
	}
        async consultaEstudioMascota(id:string){
            return 0;
        }

	
}

//Exportamos el enrutador con 

const estudiosModel: EstudiosModel = new EstudiosModel();
export default estudiosModel;

