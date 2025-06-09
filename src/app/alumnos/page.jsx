'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AlumnosCard from '../../components/AlumnosCard';

function calcularEdad(fechaNacimientoStr) {
	if (!fechaNacimientoStr) return 'N/A';
	const fechaNacimiento = new Date(fechaNacimientoStr);
	const hoy = new Date();
	let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
	const mes = hoy.getMonth() - fechaNacimiento.getMonth();

	if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
		edad--;
	}
	return edad;
}

export default function AlumnosPage() {
	const [alumnos, setAlumnos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchAlumnos() {
			try {
				const response = await fetch('/api/alumnos');
				if (!response.ok) {
					throw new Error('HTTP error! estado: ${response.status} - ${response.statusText}');
				}
				const data = await response.json();

				const alumnosComplete = data.map(alumno => ({
					...alumno,
					edad: calcularEdad(alumno.fecha_nacimiento)
				}));

				setAlumnos(alumnosComplete);

			} catch (e) {
				console.error('Error al cargar los alumnos:', e);
				setError('Error al cargar los alumnos. Intétalo de nuevo.');
			} finally {
				setLoading(false);
			}
		}

		fetchAlumnos();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)] flex items-center justify-center">
				<p className="text-xl text-gray-700">Cargando alumnos...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)] flex items-center justify-center">
				<p className="text-xl text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-68px)]">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-4 sm:sm-0">Lista de alumnos</h2>
				<Link href="/alumnos/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
					Añadir alumnos
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{alumnos.length > 0 ? (
					alumnos.map((alumno) => (
						<AlumnosCard key={alumno.id} alumno={alumno} />
					))
				) : (
					<p className="text-gray-600 col-span-full text-center text-lg py-8">
						No hay alumnos agregados :( ¡Añade uno!
					</p>
				)}
			</div>
		</div>
	);
}


















