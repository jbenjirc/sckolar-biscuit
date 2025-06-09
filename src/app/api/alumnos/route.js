import { getClient } from '@/lib/db';

export async function GET(request) {
	let client;
	try
	{
		client = await getClient();
		const result = await client.query('SELECT id, nombre, ap_pat, ap_mat, matricula, correo, fecha_registro, nivel, fecha_nacimiento FROM alumnos;');

		return new Response(JSON.stringify(result.rows), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error al obtener alumnos:', error);

		return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} finally {
		if (client) {
			client.release();
		}
	}
}

export async function POST(request) {
	let client;
	try
	{
		client = await getClient();
		const body = await request.json();
		const { nombre, ap_pat, ap_mat, matricula, edad, correo, nivel } = body;

		if (!nombre || !ap_pat || !ap_mat || !matricula || !nivel) {
			return new Response(JSON.stringify({ error : 'Faltan campos obligatorios: nombre, ap_pat, ap_mat, matricula, nivel, fecha_nacimiento'}), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		const result = await client.query(
			'INSERT INTO alumnos (nombre, ap_pat, ap_mat, matricula, correo, nivel, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
			[nombre, ap_pat, ap_mat, matricula, correo, nivel, fecha_nacimiento]
		);

		return new Response(JSON.stringify(result.rows[0]), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error al crear alumno:', error);

		if (error.code === '23505' && error.constraint === 'alumnos_matricula_key') {
			return new Response(JSON.stringify({ error: 'La matrícula ya existe. Debe ser única.' }), {
				status: 409,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		return new Response(JSON.stringify({ error: 'Error interno del servidor al crear alumno' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} finally {
		if (client) {
			client.release();
		}
	}
}