import {createPool} from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';


export async function connect(){
	const connection = await createPool({
		host: 'localhost',
		port:3306,
		user: 'root',
     	password:'sanlorenzo',
		database: 'petcontrol',
		connectionLimit: 10
	});
	return connection; //devolvemos el manejador de conexion
}

// import { createPool } from 'mysql2/promise';

class ClientesModel {
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
	

	async listarClientes() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const usuarios = await this.db.query('SELECT * FROM clientes');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}

	//Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
	//Si no la encuentra devuelve null
	async buscarIdClientes(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM clientes WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	//Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
	//Si no la encuentra devuelve null
	async buscarNombreClientes(nombre: string) {
		const encontrado: any = await this.db.query('SELECT * FROM clientes WHERE nombre = ?', [nombre]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	async findMailClientes(mail: string) {
		const found: any = await this.db.query('SELECT * FROM clientes WHERE email = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crear(cliente: object) {
		const result = (await this.db.query('INSERT INTO clientes SET ?', [cliente]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(usuario: object, id: string) {
		const result = (await this.db.query('UPDATE clientes SET ? WHERE ID = ?', [usuario, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(id: string) {
		
		const cliente = (await this.db.query('DELETE FROM clientes WHERE ID = ?', [id]))[0].affectedRows;
		console.log(cliente);
		return cliente;
	}



}



const clientesModel: ClientesModel = new ClientesModel();
export default clientesModel;

