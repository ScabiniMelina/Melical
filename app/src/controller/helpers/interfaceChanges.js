import {
	databaseOperation
} from './fetchRequest.js';

import {
	fillSelects,
	fillForm,
	fillTable,
	fillSelect
} from './fillTemplates.js';

//-------------------- CAMBIOS UTILES GLOBALMENTE EN CUALQUIER SECCIÓN--------------------------

//TODO: MELI ARREGLAR EL CSS DEL ALERT EN TAMAÑO ESCRITORIO
export async function addAlert(msg) {
	//Agrega una alerta en la pantalla, necesita como parámetro un array que tenga com indice un tipo y un mensaje
	try {
		const type = msg['type'];
		const text = msg['text'];
		const container = document.getElementById('alertContainer');
		const alertTypes = {
			success: {
				icon: 'bxs-check-circle',
				color: 'alert-success'
			},
			info: {
				icon: 'bxs-info-circle',
				color: 'alert-primary'
			},
			error: {
				icon: 'bxs-error',
				color: 'alert-danger'
			}
		};
		const tpl = document.getElementById('alertTemplate').content;
		let alertId = parseInt(tpl.querySelector('.alert').dataset.id);
		let clone = tpl.cloneNode(true);
		tpl.querySelector('.alert').dataset.id = alertId + 1;
		clone.querySelector('.alert').classList.add(alertTypes[type]['color']);
		clone.querySelector('i').classList.add(alertTypes[type]['icon']);
		clone.querySelector('span').textContent = text;
		container.appendChild(clone);
		setTimeout(() => {
			const alertNode = container.querySelector('.alert[data-id="' + alertId + '"]');
			if (alertNode) {
				const alert = new bootstrap.Alert(alertNode);
				alert.close();
			}
		}, 2500);
	} catch (error) {
		console.log('error ' + error);
	}
}

//-------------------- CAMBIOS POR CADA SECCIÓN--------------------------

async function loadSection(file, title) {
	//Al cargar cualquier nueva sección, cambia el titulo y coloca el html correspondiente
	try {
		document.getElementById('alertContainer').innerHTML = ''; //Elimina todas las alertas previas de la sección
		const sectionTitle = document.getElementById('sectionTitle');
		const container = document.getElementById('pageContainer');
		const response = await fetch(file);
		const html = await response.text();
		container.innerHTML = html;
		sectionTitle.innerHTML = title;
	} catch (error) {
		console.log('error ' + error);
	}
	//await formularyChanges();
}

export async function changeSection(element) {
	//Se cambia la interfaz poniendo la sección que corresponde, cargando el html que va, se llenan todos los selects con opciones, se cargan las tablas y se activa la búsqueda dentro de la tabla
	let path = './view/pages/menu/';
	let sectionTitle = element.dataset.title;
	let sectionFile = element.dataset.file;
	let searchId = element.dataset.id;
	await loadSection(`${path}${sectionFile}`, sectionTitle).then(() => {
		loadTable();
		fillSelects();
		if (searchId) {
			fillForm(searchId);
		}
	});
}

//-------------------- CAMBIOS EN LAS TABLAS--------------------------

//TODO: ALEX PONER EN  EL TBODY DE TODAS LAS TABLAS DE TODAS LAS SECCIONES  LA CLASE loadTable junto con el data-file correspondiente, CREAR EL ARCHIVO PHP QUE TRAE LA DATA
export async function loadTable(selectedPagerItem = null) {
	//Carga los datos de una tabla que pertenece a una sección
	try {
		const tbody = document.querySelector('.loadTable');
		const dataForm = new FormData();
		if (selectedPagerItem) {
			dataForm.append("pageNumber", selectedPagerItem);
		}

		if (tbody) {
			const file = tbody.dataset.file;
			const data = await databaseOperation('get', file, dataForm);
			await fillTable(data, tbody);
		}
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function searchDatabaseInformation(e) {
	const searchFormulary = e.target;
	const searchButton = e.submitter;
	const file = searchButton.dataset.file;
	const dataForm = new FormData(searchFormulary);
	databaseOperation('get', file, dataForm).then((data) => console.log(data));
}

//TODO: ALEX HACER QUE FUNCIONEN TODOS LOS BOTONES DE BUSQUEDA DE TODAS LAS SECCIONES QUE TENGAN UNA TABLA, HACIENDO LO SIGUIENTE: los datos a recolectar para la búsqueda tienen que estar en un formulario que tengan la clase .searchFormulary y el botón de búsqueda tiene que tener un data-file que busca la info correspondiente del .php, este botón también tiene que tener la clase .searchButton, EJEMPLO en getPatientSearch.php, patientSearch.html
export async function searchTableInformation(e) {
	//busca información y la coloca en una tabla
	try {
		const searchFormulary = e.target;
		const searchButton = e.submitter;
		const file = searchButton.dataset.file;
		const dataForm = new FormData(searchFormulary);
		const tbody = document.querySelector('.loadTable');
		console.log(dataForm.get('id'));
		databaseOperation('get', file, dataForm).then((data) => fillTable(data, tbody));
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function changeSaveButtonsAction() {
	try {
		//Cambia la acción de todos los botones guardar a actualizar
		let buttons = document.querySelectorAll('.postInformation');
		buttons.forEach((btn) => {
			changeSaveButtonAction(btn);
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function changeSaveButtonAction(btn) {
	try {
		//Cambia la acción del botón guardar a actualizar
		if (btn.innerHTML === 'Guardar') {
			btn.innerHTML = 'Actualizar';
			btn.classList.replace('postInformation', 'putInformation');
			// btn.dataset.method = "put";
		}
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function updateFormInformation(e) {
	try {
		//Actualiza la información de un formulario
		const [btn, file, form, formData] = getElementsToDoAnOperationOnTheForm(e)
		const data = await databaseOperation('put', file, formData);
		addAlert(data['msg']);
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function saveFormInformation(e) {
	try {
		//Guarda información de un formulario
		const [btn, file, form, formData] = getElementsToDoAnOperationOnTheForm(e)
		const data = await databaseOperation('post', file, formData);
		const forms = getForms(form);
		putIdToForms(forms, data['id'])
		addAlert(data['msg']);
		if (data["msg"]['type'] !== "error") {
			await changeSaveButtonAction(btn);
		}
	} catch (error) {
		console.log('error ' + error);
	}
}


function getElementsToDoAnOperationOnTheForm(e) {
	try {
		const btn = e.submitter;
		const file = btn.dataset.file;
		const form = e.target;
		const formData = new FormData(form);
		if (form.dataset.id) {
			formData.append('id', form.dataset.id);
		}
		return [btn, file, form, formData]
	} catch (error) {
		console.log('error ' + error);
	}

}

export function putIdToForms(forms, id) {
	try {
		forms.forEach(form => {
			form.dataset.id = id;
		})
	} catch (error) {
		console.log('error ' + error);
	}

}

export function getForms(form) {
	try {
		const forms = [form];
		if (form.dataset.forms) {
			const otherForms = form.dataset.forms.split(",");
			otherForms.forEach(formToAdd => {
				const newForm = document.querySelector(formToAdd);
				forms.push(newForm);
			})
		}
		return forms;
	} catch (error) {
		console.log('error ' + error);
	}
}

//-------------------- CAMBIOS EN LA SECCIÓN FILTROS--------------------------

export function removeBadge(elementToDelete, idToDelete, orderToDeleteElement = true) {
	const container = elementToDelete.parentNode;
	const badgeContainer = document.getElementById('badgeContainer');
	const badgeToDelete = badgeContainer.querySelector('.badgeElement[data-id="' + idToDelete + '"]');
	const element =
		elementToDelete.querySelector('select') || elementToDelete.querySelector('input') || elementToDelete;
	if (element.matches('select')) {
		element.options[0].selected = true;
		if (container.children.length > 1 && idToDelete >= 5 && orderToDeleteElement) {
			container.removeChild(elementToDelete);
		}
	}

	if (element.matches('input')) element.value = '';
	if (badgeToDelete) badgeContainer.removeChild(badgeToDelete);
}

export function addBadge(text, id) {
	//Crea un botón tipo badge, se usa en la página de filtros al eligir un elemento para filtrar
	const badgeContainer = document.getElementById('badgeContainer');
	const fragment = document.createDocumentFragment();
	const tpl = document.getElementById('badgeTemplate').content.cloneNode(true);
	tpl.querySelector('span').textContent = text;
	tpl.querySelector('button').dataset.id = id;
	fragment.appendChild(tpl);
	badgeContainer.appendChild(fragment);
}

export async function addDatalistGroupingsFromFilterMenu() {
	//Recorre todas las secciones del menu de la página de filtros, con el objetivo de llenar con un select con un botón de agregar y otro de quitar, en cada sección del menu que se necesite. El item del menu tiene que tener la clase .fillDatalistGrouping .fillSelectsFromFilterMenu
	document.querySelectorAll('.addDatalistGroupingFromFilterMenu').forEach((navElement) => {
		const container = document.querySelector(navElement.dataset.bsTarget);
		addDatalistGrouping(container);
	});
}

export async function addDatalistGrouping(container) {
	//Crea un select con un botón de agregar y otro de quitar
	try {
		const tpl = document.getElementById('datalistTemplate').content;
		const fragment = document.createDocumentFragment();
		const rowId = parseInt(tpl.querySelector('.datalistGrouping').dataset.id) + 1;
		const selectType = container.dataset.condition;
		const selectName = container.dataset.name;
		const file = container.dataset.file;
		tpl.querySelector('.datalistGrouping').dataset.id = rowId;
		//Se enlaza la fila con las opciones del datalist con el input que busca las opciones
		tpl.querySelector('select').id = 'list' + rowId;
		tpl.querySelector('select').name = selectName;

		// tpl.querySelector("input").setAttribute("list", "list" + rowId);
		// tpl.querySelector("datalist").className = navElement.dataset.datalist + rowId;
		fragment.appendChild(tpl.cloneNode(true));
		container.appendChild(fragment);
		const select = container.querySelector('.datalistGrouping[data-id="' + rowId + '"] select');
		select.dataset.condition = selectType;
		select.dataset.file = file;
		fillSelect(select);
	} catch (error) {
		console.log('error ' + error);
	}
}