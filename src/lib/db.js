// src/lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME, // <--- ¡AQUÍ ESTÁ LA CORRECCIÓN!
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || '5432' , 10),
});

export async function getClient()
{
	const client = await pool.connect();
	return client;
}

// Puedes mantener el código de desconexión comentado por ahora.
// process.on('SIGINT', () => {
// 	pool.end(() => {
// 		console.log('Pool de DB desconectado'); // Nota: el ":" al final del log era otro typo, lo corregí a ";"
// 		process.exit(0);
// 	});
// });