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

class HistoriaClinicaModel {
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
	
        // Admin task
        async listAllClinicFiles() {
        		
            const clinicalFile = await this.db.query('SELECT * FROM historiaclinica');
            return clinicalFile[0];
        }
   

	//Devuelve un objeto cuya fila en la tabla mascotas coincide con el id.
	//Si no la encuentra devuelve null
	async findPet(id: string) {
		const found: any = await this.db.query('SELECT * FROM mascotas WHERE id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
	}
	//Devuelve un objeto cuya fila en la tabla mascotas coincide con el nombre.
	//Si no la encuentra devuelve null
	async findPetByName(nombre: string) {
		const found: any = await this.db.query('SELECT * FROM mascotas WHERE nombre = ?', [nombre]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (found.length > 1)
			return found[0][0];
		return null;
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
	async crear(pet: object) {
		const result = (await this.db.query('INSERT INTO mascotas SET ?', [pet]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(pet: object, id: string) {
		const result = (await this.db.query('UPDATE mascotas SET ? WHERE ID = ?', [pet, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el registro de la mascota indicado por id
	async eliminar(id: string) {
		
		const pet = (await this.db.query('DELETE FROM mascotas WHERE ID = ?', [id]))[0].affectedRows;
		console.log(pet);
		return pet;
	}



}



const historiaClinicaModel:HistoriaClinicaModel = new HistoriaClinicaModel();
export default historiaClinicaModel;
