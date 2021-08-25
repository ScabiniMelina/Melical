import { activateMenuFunctions } from './menu.js';

import {
	changeSection,
	changeSaveButtonsAction,
	searchTableInformation,
	saveFormInformation,
	updateFormInformation,
	removeBadge,
	addBadge,
	addDatalistGrouping,
	addDatalistGroupingsFromFilterMenu
} from './helpers/interfaceChanges.js';

document.addEventListener('DOMContentLoaded', () => {
	activateMenuFunctions();

	document.addEventListener('click', (e) => {
		//Botón items del menu
		if (e.target.matches('.link_nav , .link_nav *')) changeSection(e.target.closest('.link_nav'));

		//Filas de las tablas
		if (e.target.matches('.tableRow , .tableRow *')) {
			changeSection(e.target.closest('.tableRow')).then(() => changeSaveButtonsAction());
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
	});

	// document.addEventListener("keydown", (e) => {
	//   //Cambios en los inputs
	//   console.log("keydown" + e)
	// })

	document.addEventListener('change', (e) => {
		//Cambios en los selects de la seccion filtros
		if (e.target.matches('.datalistGrouping select, input.filterInput,  select.filterInput')) {
			let [ badgeOption, badgeId, elementToDelete ] = getElementsToDoAnOperationOnTheBadge(e);
			modifyBadge(badgeId, badgeOption, elementToDelete);
		}
	});

	document.addEventListener('submit', (e) => {
		e.preventDefault();

		//Botón buscar de la sección principal donde hay tablas
		if (e.target.matches('.searchFormulary')) searchTableInformation(e);

		//Botón guardar información
		if (e.submitter.matches('.postInformation')) saveFormInformation(e);

		//Botón actualizar información
		if (e.submitter.matches('.putInformation')) updateFormInformation(e);
	});
});

function modifyBadge(badgeId, badgeOption, elementToDelete) {
	const badge = document.querySelector('.badgeElement[data-id="' + badgeId + '"]');
	if (badge) {
		//Si hay badge modifica el valor existente sino crea uno nuevo
		badge.querySelector('span').textContent = badgeOption;
		if (badgeOption == '') {
			removeBadge(elementToDelete, badgeId);
		}
	} else {
		addBadge(badgeOption, badgeId);
	}
}

function getElementsToDoAnOperationOnTheBadge(e) {
	const elementToDelete = e.target.closest('[data-id]');
	const badgeId = elementToDelete.dataset.id;
	let badgeOption;
	const element =
		elementToDelete.querySelector('select') || elementToDelete.querySelector('input') || elementToDelete;
	if (element.matches('select')) {
		badgeOption = element.options[element.selectedIndex].text;
	}

	if (element.matches('input')) {
		badgeOption = element.value;
	}

	return [ badgeOption, badgeId, elementToDelete ];
}

async function formularyChanges() {
	let modifiedSections = new Array();
	let modified = false;
	document.querySelectorAll('.sectionFormulary').forEach((sectionFormulary) => {
		console.log(modified);
		sectionFormulary.querySelectorAll('select, input').forEach((element) => {
			element.addEventListener('change', () => {
				modifiedSections[`${sectionFormulary.dataset.name}`] = true;
				showModalSaveChanges(getModified());
				console.log(modifiedSections);
				console.log(modified);
			});
		});
		console.log(sectionFormulary);
		console.log(sectionFormulary.querySelector('.sectionButton'));

		sectionFormulary.querySelector('.sectionButton').addEventListener('click', () => {
			modifiedSections[`${sectionFormulary.dataset.name}`] = false;
			getModified();
		});
	});

	function getModified() {
		modified = false;
		for (const modifiedSection in modifiedSections) {
			if (modifiedSections[modifiedSection] == true) {
				modified = true;
				console.log('modified ' + modified);
			}
		}
		return modified;
	}
}
