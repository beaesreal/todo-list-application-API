// IMPORTACIONES

import React, { useState, useEffect } from "react";


// LISTA DE TAREAS

const Home = () => {


	// CONSTANTES

	const [tarea, setTarea] = useState("");
	const [listaTareas, setlistaTareas] = useState([]);


	// AÑADIR TAREA CON ID ÚNICO

	const agregarTarea = () => {
		enviarTarea();
		setlistaTareas([...listaTareas, { label: tarea, done: false }]);
		setTarea("");
	};

	useEffect(() => {
		traerTarea();
	}, []);


	// ELIMINAR LA TAREA

	const eliminarTareas = indexItem => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let listaNueva = listaTareas.filter(
			(todo, index) => index !== indexItem
		);

		var raw = JSON.stringify(listaNueva);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/br2022",
			requestOptions
		)
			.then(response => response.json())
			.then(result => traerTarea())
			.catch(error => console.log("error", error));
	};


	// TRAER LA TAREA

	function traerTarea() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/br2022",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setlistaTareas(result))
			.catch(error => console.log("error", error));
	}


	// ENVIAR TAREA

	function enviarTarea() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([
			...listaTareas,
			{ label: tarea, done: false }
		]);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/br2022",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}


	// RETORNO FUNC HOME

	return (
		<div className="col-6 mx-auto bg-white shadow mt-5 rounded pb-5">
			<div className="row">
				<h1 className="p-2 my-4 col mx-5">Lista de tareas</h1>
			</div>
			<div className="row px-5">
				<div className="col-10  input-groupp">
					<input
						className="form-control"
						type="text"
						placeholder="¿Qué tienes que hacer hoy?"
						value={tarea}
						onChange={e => setTarea(e.target.value)}></input>
				</div>
				<div className="col-2">
					<button onClick={agregarTarea} className="btn btn-dark btn-add">
					<i className="fas fa-solid fa-plus" />
					</button>
				</div>
				<div className="col-10 ">
					<ul className="list-group my-3 ">
					
						{listaTareas.map((item, index) => {
							return (
								
								<li key={index} className="list-group-item p-1 py-1 px-3">
									{item.label}
								
									<button
										className="btn"
										onClick={() => eliminarTareas(index)}>
										<i className="fas fa-trash-alt pb-2" />
									</button>
									
								</li>
							);
						})}
					</ul>
				</div>
				<div className="col-10 text-left recuento pt-2">
					<strong>{listaTareas.length}</strong> tarea(s) por hacer
				</div>
			</div>
		</div>
	);
}

export default Home;