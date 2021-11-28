import {
	activateMenuFunctions
} from './menu.js';

import {
	validateForms,
	changeSection,
	showOrHidePassword,
	searchTableInformation,
	formOperation,
	removeBadge,
	addBadge,
	modifyBadge,
	getElementsToDoAnOperationOnTheBadge,
	addDatalistGrouping,
	addDatalistGroupingsFromFilterMenu,
	executeSectionChangeFunctions,
	loadTable,
	showInputPreview,
	deleteImage,
	cleanFormulary,
	cleanGalery,
	addDirtyInputClass,
	isThereAnyUnsavedModificationOnThePage,
	changeSaveButtonAction
} from "./helpers/interfaceChanges.js";


import {
	fillCardContainers,
	fillChartContainers,
	fillCardContainer,
	fillSelects,
	fillSelect
} from "./helpers/fillTemplates.js";

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
				if (icon && icon.matches('.bx-slider-alt')) {
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
			const pagerContainer = currentPageElement.closest('#pagerContainer');
			if (pagerContainer.classList.contains('getInformationBySearch')) {
				searchTableInformation(currentPage);
			} else {
				loadTable(currentPage);
			}
		}

		//Botón mostrar y censurar contraseña
		if (e.target.matches('#show_password, #show_password *')) {
			const btn = e.target.closest('#show_password');
			const icon = btn.querySelector('.icon');
			const container = btn.closest('.passwordContainer');
			const passwordInput = container.querySelector('#passwordInput');
			showOrHidePassword(passwordInput, icon);
		}

		//Botón eliminar imagen 
		if (e.target.matches('.bxs-x-circle')) {
			deleteImage(e);
		}

		//Botón cerrar del modal
		if (e.target.matches('.modal [data-bs-dismiss="modal"]')) {
			const modal = e.target.closest('.modal');
			const galery = modal.querySelector('.imgGalery');
			const progressBarContainer = modal.querySelector('.progress')
			const form = modal.querySelector('form');
			if (form) cleanFormulary(form);
			if (galery) cleanGalery(galery, progressBarContainer);
		}

		if (e.target.matches('.lazyLoadButton')) {
			const cardContainer = e.target.closest('.fillCardContainer');
			fillCardContainer(cardContainer)
		}

		//Rellena el input oculto de etapa del formulario modal de la seccion de historia clinicas cuando se presiona el disparador del modal
		if (e.target.matches('.putStageToTheInputOfTheModalForm')) {
			const btn = e.target;
			const modalId = btn.dataset.bsTarget;
			const stage = btn.dataset.stage;
			const modal = document.querySelector(modalId)
			const stageInput = modal.querySelector(`form  input.stage`)
			stageInput.value = stage;
		}

		//Botón disparador de un modal, cooloca al modal el contenedor que se tiene que actualizar
		if (e.target.matches('[data-bs-toggle="modal"]')) {
			const btn = e.target;
			const containerToUpdateName = btn.dataset.containerToUpdate;
			const modalId = btn.dataset.bsTarget;
			const modal = document.querySelector(modalId);
			const submitButton = modal.querySelector("[type=submit]");
			if (containerToUpdateName) {
				submitButton.dataset.containerToUpdate = containerToUpdateName;
			}
			//Card que abre un modal para actualizarse
			if (e.target.matches('.editableCard')) {
				if (submitButton.classList.contains(".postInformation")) {
					changeSaveButtonAction(submitButton)
				}

			}

		}


	})

	//Botón colapsable ocultar
	document.addEventListener('hide.bs.collapse', function (e) {
		const btn = document.querySelector('[data-bs-target="#' + e.target.id + '"]');
		btn.innerHTML = btn.innerHTML.replace('Ocultar', 'Mostrar');
	})

	document.addEventListener('show.bs.collapse', function (e) {
		const btn = document.querySelector('[data-bs-target="#' + e.target.id + '"]');
		btn.innerHTML = btn.innerHTML.replace('Mostrar', 'Ocultar');
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

		if (e.target.type == "file" && e.target.matches(".changeProgressBar")) {
			showInputPreview(e)
		}
		//actualizar la informacion de otros selects apartir de la dependencia de uno
		if (e.target.matches('.selectWithDependency')) {
			const currentSelect = e.target;
			const currentOption = currentSelect.options[currentSelect.selectedIndex].value;
			const selectsId = e.target.dataset.selectDependency.split(",");
			const form = e.target.closest('form');
			const dataForm = new FormData(form);
			selectsId.forEach(selectId => {
				const select = document.querySelector(selectId);
				fillSelect(select, dataForm);
			})
		}
	});

	document.addEventListener('submit', (e) => {
		e.preventDefault();

		//Botón buscar de la sección principal donde hay tablas
		if (e.target.matches('.searchFormulary')) searchTableInformation();

		//Botón guardar información
		if (e.submitter.matches('.postInformation')) formOperation('post', e);

		//Botón actualizar información
		if (e.submitter.matches('.putInformation')) formOperation('put', e);

		//Botón eliminar información
		if (e.submitter.matches('.deleteInformation')) formOperation('delete', e);

		//Botón buscar información 
		if (e.submitter.matches('.searchInformation')) formOperation('get', e);

		//Botón buscar de la sección filtros
		if (e.target.matches('.searchAndChangeSection')) {
			const dataForm = new FormData(e.target);
			e.preventDefault();
			changeSection(e.submitter).then(() => {
				const cardContainers = document.querySelectorAll(".awaitDataformAndFillCardContainer");
				cardContainers.forEach(cardContainer => {
					fillCardContainer(cardContainer, dataForm);
				})
				fillChartContainers(dataForm);
			})

		}
	});

	document.addEventListener("keyup", (e) => {
		//Cambios en los inputs del dni y el cuil
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