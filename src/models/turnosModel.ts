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



class TurnosModel {
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
	

	async listarTurnos() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const usuarios = await this.db.query('SELECT * FROM turnos');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}

	//Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async buscarTurnosPorId(id: string) {
		const found: any = await this.db.query('SELECT * FROM turnos WHERE id = ?', [id]);
		
		if (found.length > 1)
			return found[0][0];
		return null;
	}
	
	


	//Devuelve 1 si logro crear un nuevo turno de la tabla turnos
	async create(turno: object) {
		const result = (await this.db.query('INSERT INTO turnos SET ?', [turno]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el turno indicado por id
	async modificarTurno(turno: object, id: string) {
		const result = (await this.db.query('UPDATE turnos SET ? WHERE ID = ?', [turno, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(id: string) {
		
		const turno= (await this.db.query('DELETE FROM turnos WHERE ID = ?', [id]))[0].affectedRows;
		console.log(turno);
		return turno;
	}



}

const turnosModel: TurnosModel = new TurnosModel();
export default turnosModel;

