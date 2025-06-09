import React from 'react';

const AlumnosCard = ({ alumno }) => (
	<div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
		<h3 className="text-xl font-semibold text-gray-800 mb-1">{alumno.nombre} {alumno.ap_pat} {alumno.ap_mat}</h3>
		<p className="text-gray-600 text-sm">Matrícula: <span className="font-medium">{alumno.matricula}</span></p>
		<p className="text-gray-600 text-sm">Correo: <span className="font-medium">{alumno.correo}</span></p>
		<p className="text-gray-600 text-sm">Nivel: <span className="font-medium">{alumno.nivel}</span></p>
	</div>
);

export default AlumnosCard;