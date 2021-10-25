import {
	databaseOperation
} from './fetchRequest.js';

import {
	addAlert,
	getForms,
	putIdToForms,
	changeSaveButtonAction
} from './interfaceChanges.js';

//TODO:ALEX PONER EN CADA TABLA DE LAS DISTINTAS SECCIONES LO SIGUIENTE: en el html que contiene la tabla hay que poner como id del template tableRowTemplate, el tr tiene que tener la clase tableRow y cada td(celda) tiene que tener un name que indique cual es la columna del registro que se tiene que insertar en ella, EJEMPLO php.También hay qye hacer el sql para esto
export async function fillTable(data, container) {
	//Llena una tabla con los datos obtenidos de la bd
	try {
		if (typeof data === 'undefined') {
			throw 'No hay data para llenar la tabla';
		}
		container.innerHTML = '';
		const tpl = document.getElementById('tableRowTemplate').content;
		const fragment = document.createDocumentFragment();
		const databaseInformation = Object.entries(data.db);
		for (const [key, data] of databaseInformation) {
			tpl.querySelector('.tableRow').dataset.id = data.ID;
			tpl.querySelectorAll('td').forEach((cell) => {
				let columnTable = cell.getAttribute('name');
				cell.textContent = data[columnTable];
			});
			const clone = tpl.cloneNode(true);
			fragment.appendChild(clone);
		}
		container.appendChild(fragment);
		const amountOfPages = data.amountOfPages || document.querySelector('#pagerContainer').dataset.pages;
		if (amountOfPages > 1 && databaseInformation.length > 0) {
			fillPager(data.amountOfPages, data.currentPage);
		}
		addAlert(data['msg']);
	} catch (error) {
		console.log('error ' + error);
	}
}

export function fillCards() {
	//Llena una tarjeta con informacion de la base de datos 
	try {
		const cardContainers = document.querySelectorAll(".cardContainer");
		// Recorro todos los cardContainers y obtengo el template del que tengo que rellenar y poner en ese contenedor
		cardContainers.forEach(cardContainer => {
			cardContainer.innerHTML = '';
			const tpl = document.querySelectorAll(cardContainer.dataset.tpl).content;
			//De ese template saco el archivo al que va a hacer la operacion a la base de datos junto con el id necesario para la consulta 
			const fragment = document.createDocumentFragment();
			const file = cardContainer.dataset.file;
			const id = cardContainer.dataset.id;
			const dataForm = new FormData();
			if (id) dataForm.append('id', id);
			if (typeof file === 'undefined') throw 'No hay archivo para buscar la data';
			databaseOperation('get', file, dataForm).then((data) => {
				if (data['db'] === undefined) throw 'No hay data';
				const databaseInformation = Object.entries(data.db);
				//Cuando obtiene la informacion de la bd busca un elemento con el cual coincida la clase de este con el alias de la columna de la informacion obtenida  y le coloca la informacion obtenida
				for (const [key, data] of databaseInformation) {
					const tplElement = tpl.querySelector(`.${data[key]}`);
					if (tplElement) tplElement.textContent = data[key];
					const clone = tpl.cloneNode(true);
					fragment.appendChild(clone);
				}
			});
			cardContainer.appendChild(fragment);
		})
	} catch (error) {
		console.log('error ' + error);
	}
}

function fillPager(amountOfPages, currentPage) {
	//Crea el paginador de una tabla
	const container = document.getElementById('pagerContainer');
	const tpl = document.getElementById('pagerItemTemplate').content;
	const fragment = document.createDocumentFragment();
	const amountOfPagesToShow = 5;
	const [initialItemToShow, finalItemToShow] = getConfigToCreatePager(amountOfPagesToShow, currentPage, amountOfPages, container);

	for (let i = initialItemToShow; i <= finalItemToShow; i++) {
		tpl.querySelector("a").innerHTML = i;
		tpl.querySelector(".page-item").dataset.id = i;
		const clone = tpl.cloneNode(true);
		fragment.appendChild(clone);
	}
	container.appendChild(fragment);

	const previousItem = container.querySelector('.page-item .active');
	if (previousItem) {
		previousItem.classList.remove(".active")
	}
	const currentItem = container.querySelector('.page-item[data-id="' + currentPage + '"]');
	currentItem.classList.add("active");
}

function getConfigToCreatePager(amountOfPagesToShow, currentPage, amountOfPages, container) {
	const numberOfElementsOnTheSide = Math.floor(amountOfPagesToShow / 2);
	let initialItemToShow = currentPage - numberOfElementsOnTheSide;
	let finalItemToShow = parseInt(currentPage) + numberOfElementsOnTheSide;
	if (amountOfPages) container.dataset.pages = amountOfPages;
	amountOfPages = container.dataset.pages;
	container.innerHTML = "";
	if (initialItemToShow <= 0) {
		initialItemToShow = 1;
		while (finalItemToShow < amountOfPagesToShow && finalItemToShow < amountOfPages) {
			finalItemToShow++
		}
	}
	if (finalItemToShow > amountOfPages) {
		finalItemToShow = amountOfPages;
		while (initialItemToShow > 1 && initialItemToShow > (amountOfPages - amountOfPagesToShow - 1)) {
			initialItemToShow--;
		}
		if (finalItemToShow < 1) {
			finalItemToShow = 1
		}
	}
	return [
		initialItemToShow,
		finalItemToShow
	];

}

//TODO: ALEX PONERLE A TODOS LOS SELECTS DE TODAS LAS DISTINTAS SECCIONES: la clase getSelectOption y un data-default="Todos", si ves que lo necesita,también el data-file correspondiente al php que trae los datos, sino existe ese archivo hay que crearlo,y en la sentencia sql del php se tiene que pedir como primer columna el id de la tabla y como segunda el nombre de la  opcion. EJEMPLO en resourceSearch.html
export async function fillSelects() {
	//Rellena las opciones de todos los selects
	try {
		const selects = document.querySelectorAll('.getSelectOption');
		selects.forEach((select) => {
			fillSelect(select);
			setInputDefaultValue(select)
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

export async function fillSelect(select) {
	//Rellena todas las opciones de un select, el select tiene que tener una data-file, en el que va la ruta del php que trae las opciones de la bd, un data-condition opcional para especificar si en la selección de la bd el where necesita una condicion, un data-default opcional que es el texto que aparece como opción por defecto.
	try {
		const file = select.dataset.file;
		const defaultOption = select.dataset.default === undefined ? ' ' : select.dataset.default;
		const dataForm = new FormData();
		let options = '';
		options += "<option value='default'>" + defaultOption + '</option>';
		//Obtiene una condición necesaria para hacer en el select de la sentencia sql
		if (select.dataset.condition !== undefined) {
			dataForm.append('condition', select.dataset.condition);
		}
		databaseOperation('get', file, dataForm).then((data) => {
			data.forEach((option) => {
				options += '<option value="' + option[0] + '">' + option[1] + '</option>';
			});
			select.innerHTML = options;
			select.options[0].selected = true;
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

//TODO: MELI LLENAR CON LA INFO CORRESPONDIENTE SI EL DATO DEL INPUT ES UNDEFINIED O VACIO O ES UNA OPCION DEL SELECT INVALIDA.
export async function fillForm(searchId) {
	//LLena los formularios que hay en una sección,el formulario tiene un data-file que indica el archivo en el que hay que buscar los datos, el id que se require en el parámetro se inserta en el formulario. Para rellenar todos los formularios, en los inputs y selects el name tiene que coincidir con  el nombre de la columna de la bd, es necesario  usar un ALIAS en el php donde haces la consulta sql cuando la columna tiene un guion bajo, osea si la columna de la bd es date_birth, vos en el SQL le tenés que poner SELECT date_birth AS dateBirth, osea le sacas el guion y pones la letra que separa la palabra en mayúscula, ya que el name del input coincide con dateBirth
	try {
		const formularies = document.querySelectorAll('.fillForm');
		const dataForm = new FormData();
		dataForm.append('id', searchId);
		formularies.forEach((form) => {
			const file = form.dataset.file;
			const btn = form.querySelector("button[type=submit]");
			const forms = getForms(form);
			putIdToForms(forms, searchId)
			// form.dataset.id = searchId;
			if (typeof file === 'undefined') throw 'No hay archivo para buscar la data';
			databaseOperation('get', file, dataForm).then((data) => {
				if (data['db'] === undefined) throw 'No hay data';
				const inputs = form.querySelectorAll('input');
				const selects = form.querySelectorAll('select');
				inputs.forEach((input) => {
					const columnTable = input.getAttribute('name');
					input.value = data['db'][0][columnTable];
					setInputDefaultValue(input);
				});
				selects.forEach((select) => {
					const columnTable = select.getAttribute('name');
					const selectedOption = data['db'][0][columnTable];
					if (selectedOption !== null) {
						select.value = selectedOption;
						// select.options[selectedOption].selected = true;
					}
					setInputDefaultValue(select);
				});
				if (data["msg"] === undefined || data["msg"]['type'] !== "error") {
					changeSaveButtonAction(btn);
				}
				if (data['id'] !== undefined) putIdToForms(forms, data['id']);
			});
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

export function setInputDefaultValue(element) {
	//Setear el valor por defecto de un input/select/textarea, esto accion se realiza cuando se guarda o actualiza
	element.defaultValue = element.value;
}