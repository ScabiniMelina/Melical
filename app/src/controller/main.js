import {
	activateMenuFunctions
} from './menu.js';

import {
	validateForms,
	changeSection,
	showOrHidePassword,
	searchDatabaseInformation,
	searchTableInformation,
	formOperation,
	removeBadge,
	addBadge,
	modifyBadge,
	getElementsToDoAnOperationOnTheBadge,
	addDatalistGrouping,
	addDatalistGroupingsFromFilterMenu,
	executeSectionChangeFunctions,
} from './helpers/interfaceChanges.js';

import {
	loadTable
} from "./helpers/interfaceChanges.js";

document.addEventListener('DOMContentLoaded', () => {
	activateMenuFunctions();
	validateForms();
	document.addEventListener('click', (e) => {
		//Botón items del menu
		if (e.target.matches('.link_nav , .link_nav *')) changeSection(e.target.closest('.link_nav'));

		//Filas de las tablas y boton de retroceder de historias clinicas
		if (e.target.matches('.tableRow , .tableRow *')) {
			changeSection(e.target.closest('.tableRow'))
			// .then(() => changeSaveButtonsAction());
		}

		//Botón cambiar de sección(btn más, btn filtros, btn reconocimiento facial y dactilar)
		if (e.target.matches('.changeSectionButton , .changeSectionButton *')) {
			const btn = e.target.closest('.changeSectionButton');
			const icon = btn.querySelector('i');
			changeSection(btn).then(() => {
				//Botón filtros
				if (icon.matches('.bx-slider-alt')) {
					addDatalistGroupingsFromFilterMenu();
				}
			});
		}

		//Botón cerrar del badge
		if (e.target.matches('.badgeElement i.bx-x-circle')) {
			const badge = e.target.closest('.badgeElement');
			const idToDelete = badge.dataset.id;
			let elementToDelete = document.querySelector('#containerFilterElements [data-id="' + idToDelete + '"]');
			removeBadge(elementToDelete, idToDelete);
		}

		//Botón Cerrar sesión
		if (e.target.matches('#btnLogout, #btnLogout *')) fetch('./model/logout.php');

		//Botón agregar y eliminar datalistGrouping
		if (e.target.matches('.btn-datalist *, .btn-datalist')) {
			const btn = e.target.closest('.btn-datalist');
			const icon = btn.querySelector('i');
			if (icon.matches('.bx-plus')) {
				addDatalistGrouping(e.target.closest('.tab-pane'));
			}

			if (icon.matches('.bx-minus')) {
				const elementToDelete = e.target.closest('.datalistGrouping');
				const badgeId = elementToDelete.dataset.id;
				removeBadge(elementToDelete, badgeId);
			}
		}

		//Botón item del paginador
		if (e.target.matches('.page-item, .page-item *')) {
			const currentPageElement = e.target.closest('.page-link');
			const currentPage = currentPageElement.innerHTML;
			// const container = e.target.closest("#pagerContainer");
			// const amountOfPages = container.dataset.pages;
			loadTable(currentPage);
		}

		//Botón mostrar y censurar contraseña
		if (e.target.matches('#show_password, #show_password *')) {
			const btn = e.target.closest('#show_password');
			const icon = btn.querySelector('.icon');
			const container = btn.closest('.passwordContainer');
			const passwordInput = container.querySelector('#passwordInput');
			showOrHidePassword(passwordInput, icon);
		}

		// //Botón colapsable mostrar y ocultar 
		// if (e.target.matches('.btn[data-bs-toggle= "collapse"]')) {
		// 	changeCollapsibleButtonText(e.target);
		// }
	})

	//Botón colapsable ocultar
	document.addEventListener('hide.bs.collapse', function (e) {
		const btn = document.querySelector('[data-bs-target="#' + e.target.id + '"]');
		btn.innerHTML = btn.innerHTML.replace('Ocultar', 'Mostrar');
		console.log(e);
	})

	document.addEventListener('show.bs.collapse', function (e) {
		const btn = document.querySelector('[data-bs-target="#' + e.target.id + '"]');
		btn.innerHTML = btn.innerHTML.replace('Mostrar', 'Ocultar');
		console.log(e);
	})

	document.addEventListener('change', (e) => {
		//Cambios en los selects de la seccion filtros
		if (e.target.matches('.datalistGrouping select, input.filterInput,  select.filterInput')) {
			let [badgeOption, badgeId, elementToDelete] = getElementsToDoAnOperationOnTheBadge(e);
			modifyBadge(badgeId, badgeOption, elementToDelete);
		}

		if (e.target.matches(' #pageContainer input, #pageContainer select, #pageContainer textarea')) {
			addDirtyInputClass(e.target);
		}
	});

	document.addEventListener('submit', (e) => {
		e.preventDefault();

		//Botón buscar de la sección principal donde hay tablas
		if (e.target.matches('.searchFormulary')) searchTableInformation(e);

		//Botón guardar información
		if (e.submitter.matches('.postInformation')) formOperation('post', e);

		//Botón actualizar información
		if (e.submitter.matches('.putInformation')) formOperation('put', e);

		//Botón eliminar información
		if (e.submitter.matches('.deleteInformation')) formOperation('delete', e);

		// Botón buscar información 
		if (e.submitter.matches('.searchInformation')) formOperation('get', e);

		//Botón buscar de la sección de filtros
		if (e.target.matches('.searchPatientsByFilter')) searchDatabaseInformation(e);
	});

	document.addEventListener("keyup", (e) => {
		//Cambios en los inputs del dni y el cuil
		console.log(e)
		if (e.target.matches("#form1 [name='dni']")) {
			const cuilInput = document.querySelector("#form1 [name='tramitNumber']");
			cuilInput.value = e.target.value;

		}

		if (e.target.matches("#form1 [name='tramitNumber']")) {
			const dniInput = document.querySelector("#form1 [name='dni']");
			dniInput.value = e.target.value;

		}

	});
})

window.addEventListener("beforeunload", function (e) {
	if (isThereAnyUnsavedModificationOnThePage()) {
		var confirmationMessage = "\o/";
		e.returnValue = confirmationMessage;
		return confirmationMessage;
	}
});

//Si tiene la clase dirtyInput se la saca, porque el elemento coincide con el valor por defecto, sino se la agrega, el parametro element se refiere al input/textarea/select
export function addDirtyInputClass(element) {
	const currentValue = element.value;
	if (currentValue != element.defaultValue) {
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