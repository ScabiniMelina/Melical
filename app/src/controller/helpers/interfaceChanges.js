import {
	databaseOperation
} from './fetchRequest.js';

import {
	fillSelects,
	fillForm,
	fillTable,
	fillSelect,
	fillCardContainer,
	fillCardContainers,
	fillGalery,
	fillGaleries,
	setInputDefaultValue
} from './fillTemplates.js';

//-------------------- CAMBIOS UTILES GLOBALMENTE EN CUALQUIER SECCIÓN--------------------------

//EVITA QUE SE ENVIE EL FORMULARIO CUANDO LOS DATOS REQUERIDOS  NO ESTAN COMPLETOS
export function validateForms() {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			}, false)
		})
}

//TODO: SOFI ARREGLAR EL CSS DEL ALERT EN TAMAÑO ESCRITORIO
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

//LANZA EL MODAL QUE ESTA EN EL INDEX.PHP PARA CAMBIOS SIN GUARDAR
async function showModalUnsavedChanges() {
	const modal = document.getElementById('unsaveChagesModal');
	await showModal(modal);

}

async function showModal(modalElement) {
	const modal = new bootstrap.Modal(modalElement, {
		keyboard: false
	})
	await modal.show();
}


async function hideModal(modalElement) {
	bootstrap.Modal.getInstance(modalElement).hide();
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
}

export async function changeSection(element) {
	try {
		const isDirtyFormulary = isThereAnyUnsavedModificationOnThePage();
		if (isDirtyFormulary) {
			await showModalUnsavedChanges();
			//Botón salir del modal de cambios sin guardar
			document.getElementById('exitModalButton').addEventListener("click", (e) => {
				executeSectionChangeFunctions(element);
			})
		} else {
			await executeSectionChangeFunctions(element);
		}
	} catch (error) {
		console.log('error ' + error);
	}

}

export async function executeSectionChangeFunctions(element) {
	try {
		//Se cambia la interfaz poniendo la sección que corresponde, cargando el html que va, se llenan todos los selects con opciones, se cargan las tablas y se activa la búsqueda dentro de la tabla
		const [file, sectionTitle, searchId] = await getConfigToLoadSection(element);
		await loadSection(file, sectionTitle).then(() => {
			const cardContainers = document.querySelectorAll(".cardContainer");
			loadTable();
			fillSelects();
			fillCardContainers(cardContainers);
			// fillCards();
			validateForms();
			if (searchId) {
				fillForm(searchId);
			}
			fillGaleries();
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

async function getConfigToLoadSection(element) {
	const path = './view/pages/menu/';
	const sectionTitle = element.dataset.title;
	const sectionFile = element.dataset.file;
	const searchId = element.dataset.id;
	return [
		`${path}${sectionFile}`,
		sectionTitle,
		searchId
	]
}

//-------------------- CAMBIOS EN LAS TABLAS--------------------------

export async function loadTable(selectedPagerItem = null) {
	//Carga los datos de una tabla que pertenece a una sección
	// EL TBODY DE TODAS LAS TABLAS DE TODAS LAS SECCIONES TIENE LA CLASE loadTable junto con el data-file correspondiente, CREAR EL ARCHIVO PHP QUE TRAE LA DATA
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

//TODO: ALEX HACER QUE FUNCIONEN TODOS LOS BOTONES DE BUSQUEDA DE TODAS LAS SECCIONES QUE TENGAN UNA TABLA, HACIENDO LO SIGUIENTE: los datos a recolectar para la búsqueda tienen que estar en un formulario que tengan la clase .searchFormulary y el botón de búsqueda tiene que tener un data-file que busca la info correspondiente del .php, este botón también tiene que tener la clase .searchButton, EJEMPLO en getPatientSearch.php, patientSearch.html
export async function searchTableInformation(selectedPagerItem = null) {
	//busca información y la coloca en una tabla
	try {
		const searchFormulary = document.querySelector('.searchFormulary');
		const searchButton = searchFormulary.querySelector('.btn[type="submit"]');
		// const searchFormulary = e.target;
		// const searchButton = e.submitter;
		const file = searchButton.dataset.file;
		const dataForm = new FormData(searchFormulary);
		if (selectedPagerItem) {
			dataForm.append("pageNumber", selectedPagerItem);
		}
		//si paginador agrego la clase data bs target
		const pagerContainer = document.querySelector('#pagerContainer');
		if (pagerContainer) {
			pagerContainer.classList.add('getInformationBySearch');
			// const dataFormTarget = currentPage.parentNode.dataset.dataFormTarget || null
		}
		const tbody = document.querySelector('.loadTable');
		tbody.dataset.file = file;
		console.log(dataForm.get('id'));
		databaseOperation('get', file, dataForm).then((data) => fillTable(data, tbody));
	} catch (error) {
		console.log('error ' + error);
	}
}


//-------------------- CAMBIOS EN EL FORMULARIO --------------------------

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

export async function formOperation(method, e) {
	try {
		const [btn, file, form, formData] = getElementsToDoAnOperationOnTheForm(e)
		const dirtyElements = form.querySelectorAll('.dirtyInput');
		const container = document.getElementById('pageContainer');
		//Si no hay elementos sucios y la opcion es guardar o actualizar y  Si es el contenedor de la pagina principal de la app y no un login o un register
		if (dirtyElements.length == 0 && (method == 'put' || method == 'post') && container) {
			const msg = {
				'type': 'error',
				'text': 'No hay cambios en el formulario'
			};
			addAlert(msg);
		} else {
			//Actualiza, guarda y elimina la información de un formulario
			const data = await databaseOperation(method, file, formData);
			if (form.classList.contains('imageModalForm')) {
				const modal = form.closest('.modal');
				if (modal) {
					await hideModal(modal);
					const modalGalery = modal.querySelector('.imgGalery');
					const progressBarContainer = modal.querySelector('.progress');
					const galeryToUpdate = document.querySelector(form.dataset.galery);
					cleanFormulary(form);
					cleanGalery(modalGalery, progressBarContainer)
					fillGalery(galeryToUpdate);
				}
			}
			addAlert(data['msg']);
			//Si login
			if (btn.classList.contains("authentificationForm") && data["msg"]['type'] == "success") {
				const redirectFile = btn.dataset.redirect;
				window.location.href = redirectFile;
			}

			if (container && data["msg"]['type'] == "success" && (method === 'post' || method === 'put') && !form.classList.contains('modalForm')) {
				//Duplicar id a distintos formularios cuando se guardan
				if (method === 'post') {
					const forms = getForms(form);
					putIdToForms(forms, data['id'])
					await changeSaveButtonAction(btn);
				}
				//Elimina la clase dirtyInput y setea el valor por defecto al guardar o actualizar
				dirtyElements.forEach(dirtyElement => {
					setInputDefaultValue(dirtyElement);
					addDirtyInputClass(dirtyElement);
				})
			}
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

export function modifyBadge(badgeId, badgeOption, elementToDelete) {
	//Si hay un badge ya existente modifica el valor, sino crea uno nuevo, tambiรฉn detecta si no hay una opciรณn valida para poner como texto del badge y elimina ese badge si hay un o ya existente
	const badge = document.querySelector('.badgeElement[data-id="' + badgeId + '"]');
	if (badgeOption == '') {
		if (badge) removeBadge(elementToDelete, badgeId, false);
	} else {
		if (badge) {
			badge.querySelector('span').textContent = badgeOption;
		} else {
			addBadge(badgeOption, badgeId);
		}
	}
}

export function getElementsToDoAnOperationOnTheBadge(e) {
	const elementToDelete = e.target.closest('[data-id]');
	const badgeId = elementToDelete.dataset.id;
	let badgeOption;
	const element =
		elementToDelete.querySelector('select') || elementToDelete.querySelector('input') || elementToDelete;
	if (element.matches('select')) {
		badgeOption = element.options[element.selectedIndex].text;
		const containerDatalistGroupings = element.closest('.tab-pane');
		if (containerDatalistGroupings) {
			const selectsFromSection = containerDatalistGroupings.querySelectorAll('select');
			let duplicateValue = 0;
			selectsFromSection.forEach((select) => {
				if (select.options[select.selectedIndex].text == badgeOption) duplicateValue += 1;
			});
			if (duplicateValue > 1) {
				badgeOption = '';
				element.options[0].selected = true;
			}
		}
	}

	if (element.matches('input')) {
		badgeOption = element.value;
	}

	return [badgeOption, badgeId, elementToDelete];
}

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
	try {
		document.querySelectorAll('.addDatalistGroupingFromFilterMenu').forEach((navElement) => {
			const container = document.querySelector(navElement.dataset.bsTarget);
			addDatalistGrouping(container);
		});
	} catch (error) {
		console.log('error ' + error);
	}
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

//-------------------- CAMBIOS EN LOS INPUTS--------------------------

export function showOrHidePassword(passwordInput, icon) {
	//Muestra o censura una contraseña
	if (passwordInput.type == "password") {
		passwordInput.type = "text";
		icon.classList.replace('fa-eye-slash', 'fa-eye');
	} else {
		passwordInput.type = "password";
		icon.classList.replace('fa-eye', 'fa-eye-slash');
	}
}

export function cleanFormulary(formulary) {
	//Limpia los inputs y selects de un formulario
	if (formulary) {
		const inputs = formulary.querySelectorAll("input , select");
		inputs.forEach(input => {
			input.value = input.defaultValue;
			addDirtyInputClass(input);
		});
	}
}

//Si tiene la clase dirtyInput se la saca, porque el elemento coincide con el valor por defecto, sino se la agrega, el parametro element se refiere al input/textarea/select, si contiene la clase unsavableValue significa que ese input no se lo tendra en cuenta a la hora de guardarlo
export function addDirtyInputClass(element) {
	const currentValue = element.value;
	if (currentValue != element.defaultValue && !element.classList.contains('unsaveableValue')) {
		element.classList.add('dirtyInput')
	} else {
		element.classList.remove('dirtyInput')
	}
}

//Busca todos los inputs en los que hay cambios sin guardar para  devolver true o false dependiendo si hay cambios sin guardar en un input 
export function isThereAnyUnsavedModificationOnThePage() {
	const amountOfDirtyInputs = document.querySelectorAll(".dirtyInput").length;
	if (amountOfDirtyInputs > 0) return true
	return false;
}

//-------------------- CAMBIOS EN LOS INPUTS QUE CARGAN IMAGENES--------------------------

export function showInputPreview(e) {
	try {
		const input = e.target;
		const progressBar = document.querySelector(input.dataset.progressBar);
		const progressBarContainer = progressBar.parentNode;
		const files = input.files;
		const fileContainer = document.querySelector(input.dataset.container);
		let amountProgress = 0;
		let totalSizeToLoad = 0;
		for (let file of files) {
			totalSizeToLoad += file["size"];
		}
		fileContainer.innerHTML = "";

		progressBar.style.width = `0%`;
		if (files.length < 1) {
			progressBarContainer.classList.add('d-none');
		} else {
			progressBarContainer.classList.remove('d-none');
		}

		for (let file of files) {
			let reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.addEventListener("progress", (e) => {
				let progress = Math.round(((amountProgress + e.loaded) * 100.0) / totalSizeToLoad);
				console.log(progress);
				progressBar.style.width = `${progress}%`
			})
			reader.addEventListener("load", (e) => {
				amountProgress += file["size"];
				console.log(e.currentTarget);
				let url = "";
				// let upLoadDocument = document.createElement("IMG");
				if (!file.type.includes("image")) {
					url = "../view/assets/img/doc.png";
				} else {
					url = URL.createObjectURL(file);
				}
				// upLoadDocument.setAttribute("src", url);
				// fileContainer.appendChild(upLoadDocument)
				putImageInGalery(fileContainer, url, false)
			})
		}
	} catch (error) {
		console.log('error ' + error);
	}
}


export function putImageInGalery(galery, imgUrl, hasModal = true) {
	//Pone una imagen en una galeria de imagenes, pide un contenedor del cual saca un id que se va incrementando con cada imagen que agrega, y permite el despliegue de un modal 
	try {
		const fragment = document.createDocumentFragment();
		const imageGaleryTpl = document.getElementById('imageGaleryTemplate').content.cloneNode(true);
		galery.dataset.lastItem = parseInt(galery.dataset.lastItem) + 1;
		const id = galery.dataset.lastItem;
		if (hasModal) {
			imageGaleryTpl.querySelector('.card img').setAttribute('data-bs-target', `#imgModal${id}`);
			imageGaleryTpl.querySelector('.card img').setAttribute('data-bs-toggle', `modal`);
			const modalImageTpl = document.getElementById('imageModal').content.cloneNode(true);
			modalImageTpl.querySelector('.modal').id = `imgModal${id}`;
			//TODO: VALIDAR IS LA IMAGEN ES REAL
			modalImageTpl.querySelector('.modal-content img').setAttribute("src", imgUrl);
			imageGaleryTpl.querySelector('.img-container').append(modalImageTpl)
		} else {
			imageGaleryTpl.querySelector('i').classList.add('d-none');
		}
		imageGaleryTpl.querySelector('.card img').setAttribute("src", imgUrl);
		fragment.appendChild(imageGaleryTpl);
		galery.appendChild(fragment);

	} catch (error) {
		console.log('error ' + error);
	}
}

export async function deleteImage(e) {
	try {
		const btn = e.target;
		const imgContainer = btn.parentNode.parentNode;
		const galery = imgContainer.parentNode;
		const img = imgContainer.querySelector("img");
		const pathToDelete = img.src.replace("https://melical.escuelarobertoarlt.com.ar", "");
		const file = galery.dataset.file;
		const formData = new FormData();
		if (galery.dataset.id) {
			formData.append('id', galery.dataset.id);
		}
		formData.append('pathToDelete', pathToDelete);
		const data = await databaseOperation('delete', file, formData);
		if (data["msg"]['type'] == "success") {
			galery.removeChild(imgContainer);
		} else {
			addAlert(data["msg"]);
		}
	} catch (error) {
		console.log('error ' + error);
	}
}

//Limpia la barra de progreso y la galery 
export function cleanGalery(galery, progressBarContainer) {

	if (galery) {
		galery.innerHTML = "";
	}
	if (progressBarContainer) {
		progressBarContainer.classList.add('d-none');
	}
}