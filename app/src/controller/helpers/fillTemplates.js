import {
	databaseOperation
} from './fetchRequest.js';

import {
	addAlert,
	getForms,
	putIdToForms,
	changeSaveButtonAction,
	putImageInGalery
} from './interfaceChanges.js';

//-------------------- LLENAR TABLAS -------------------------

//TODO:ALEX PONER EN CADA TABLA DE LAS DISTINTAS SECCIONES LO SIGUIENTE: en el html que contiene la tabla hay que poner como id del template tableRowTemplate, el tr tiene que tener la clase tableRow y cada td(celda) tiene que tener un name que indique cual es la columna del registro que se tiene que insertar en ella, EJEMPLO php.También hay qye hacer el sql para esto
export async function fillTable(data, container) {
	//Llena una tabla con los datos obtenidos de la bd
	try {
		const pageContainer = document.getElementById('pagerContainer');
		container.innerHTML = '';
		if (data != undefined && data['db'] != undefined && Object.entries(data.db).length > 0) {
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
			const amountOfPages = getAmountOfPages(data);

			if (amountOfPages > 1 && databaseInformation.length > 0) {
				fillPager(data.amountOfPages, data.currentPage);
			} else {
				if (amountOfPages < 1 && container && amountOfPages != null) {
					container.innerHTML = "";
				}
			}

			if (data['msg'] != undefined && data['msg']['type'] != 'success') {
				addAlert(data['msg']);
			}
		} else {
			const msg = {
				'type': 'error',
				'text': 'No se encontró información'
			}
			addAlert(msg);
			if (pageContainer) {
				pageContainer.innerHTML = "";
			}
		}
	} catch (error) {
		console.log('error ' + error);
	}
}

function getAmountOfPages(data) {
	if (data.amountOfPages) {
		return data.amountOfPages
	} else {
		if (document.querySelector('#pagerContainer')) {
			return document.querySelector('#pagerContainer').dataset.pages;
		} else {
			return null;
		}
	}
}

function fillPager(amountOfPages, currentPage) {

	//Crea el paginador de una tabla
	const container = document.getElementById('pagerContainer');
	const tpl = document.getElementById('pagerItemTemplate').content;
	const fragment = document.createDocumentFragment();
	const amountOfPagesToShow = 5;
	if (container) {
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
		if (currentItem) {
			currentItem.classList.add("active");
		}

	}
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

//-------------------- LLENAR CARDS --------------------------

//TODO ALEX: para llenar un contenedor de tarjetas hay que ponerle al contendor la clase .fillCardContainer y n data-tpl="#templateCorrespondiente" con el id del templete que usara para rellenar, y un data-file con el archivo .php donde sacara la informacion y un data-id que se usara para traer la informacion relacionada con ese id.Adentro de este contenedor debe tener un boton con la clase .lazyLoadButton que tiene que tener data-number-of-cards-loads=0 y data-number-of-items-to-show="cantidad de elementos a mostrar cada vez que se toca este boton, dentro del template poner la clase que coincida con el alias puesto en el sql, poner ademas la clase id junto con  data-id="" para que al redireccionar de pagina traiga informacion con ese id, poner a compañado de esto si es necesario la clase oldId junto con data-old-id="",esto sera util si la pagina a la que redirecciona tiene un boton de volver a la pestaña anterior, permitiendo que vaya a esa pestaña y traiga oda la información necesaria con ese id 
export async function fillCardContainers() {
	try {
		const cardContainers = document.querySelectorAll(".fillCardContainer");
		// Recorro todos los cardContainers
		cardContainers.forEach(cardContainer => {
			fillCardContainer(cardContainer)
		})
	} catch (error) {
		console.log('error ' + error);
	}
}

export function fillCardContainer(cardContainer, dataForm = undefined) {
	//Llena un contenedor de tarjetas
	try {
		//Obtengo el template al cual tengo que rellenar y poner en el contenedor
		const tpl = document.querySelector(cardContainer.dataset.tpl).content;
		const fragment = document.createDocumentFragment();
		//De ese template saco el archivo al que va a hacer la operacion a la base de datos 
		const file = cardContainer.dataset.file;
		const lazyLoadButton = cardContainer.querySelector('.lazyLoadButton');
		if (dataForm == undefined) {
			//Sino hay datos previos(que vengan de otra seccion/pantalla) traigo un id para traer los datos correspondientes a la lista de cards
			const id = cardContainer.dataset.id;
			const oldId = cardContainer.dataset.oldId;
			dataForm = new FormData();
			if (id) dataForm.append('id', id);
			if (oldId) dataForm.append('id', oldId);

		}
		if (lazyLoadButton) {
			lazyLoadButton.classList.remove("d-none");
			dataForm.append('numberOfCardsLoads', lazyLoadButton.dataset.numberOfCardLoads);
			dataForm.append('numberOfItemsToShow', lazyLoadButton.dataset.numberOfItemsToShow);
		}

		//TODO:ENCAPSULAR LO DE ARRIBA EN UNA FUNCION getConfigToFillCardContainer, EVALUAR SI PUEDE SERVIR PARA GRAFICOS
		if (typeof file === 'undefined') {
			const msg = {
				'type': 'error',
				'text': 'Error, no se encontró informacion para llenar las cards'
			}
			addAlert(msg);
		}

		databaseOperation('get', file, dataForm).then((data) => {
			if (data !== undefined && data['db']) {
				const databaseInformation = Object.entries(data.db);
				//Cuando obtiene la informacion de la bd busca un elemento con el cual coincida la clase de este con el alias de la columna de la informacion obtenida  y le coloca la informacion obtenida
				for (const [cardKey, cards] of databaseInformation) {
					const clone = tpl.cloneNode(true);
					for (const [key, data] of Object.entries(cards)) {
						const tplElement = clone.querySelector(`.${key}`);
						if (tplElement) {
							if (key == "id" || key == "oldId") {
								if (key == "id") {
									tplElement.dataset.id = data;
								} else {
									tplElement.dataset.oldId = data;
								}
							} else {
								tplElement.textContent = data;
							}
						}
					}
					fragment.appendChild(clone);
				}


				//Si es una seccion que carga tarjetas con lazy load, selecciono el boton con la clase lazyLoadButton
				if (lazyLoadButton) {
					cardContainer.insertBefore(fragment, lazyLoadButton.parentNode.previousElementSibling);
					const amountOfElements = databaseInformation.length;
					const numberOfItemsToShowPerLoad = lazyLoadButton.dataset.numberOfItemsToShow;
					configLazyLoadButton(lazyLoadButton, amountOfElements, numberOfItemsToShowPerLoad);
				} else {
					cardContainer.appendChild(fragment);
				}
				// if (databaseInformation.length <= 0) {
				// 	btn.classList.add("d-none");
				// }
			}
		});
	} catch (error) {
		console.log('error ' + error);
	}
}

function configLazyLoadButton(btn, amountOfElements, numberOfItemsToShowPerLoad) {

	if (amountOfElements > 0) {
		btn.dataset.numberOfCardLoads = parseInt(btn.dataset.numberOfCardLoads) + 1;
	}

	if (amountOfElements < numberOfItemsToShowPerLoad) {
		btn.classList.add("d-none");
	}

}

//-------------------- LLENAR CHARTS --------------------------


export async function fillChartContainers(dataForm) {
	try {
		const chartContainers = document.querySelectorAll('.fillChart');
		// Recorro todos los chartContainers
		chartContainers.forEach(chartContainer => {
			const file = chartContainer.dataset.file;
			const chartType = chartContainer.dataset.chartType;
			const chartTitle = chartContainer.dataset.chartTitle;
			const ctx = chartContainer.getContext("2d");
			databaseOperation('get', file, dataForm).then((data) => {
				if (data !== undefined && data['db']) {
					fillChartContainer(ctx, chartTitle, chartType, data['db']);
				} else {

				}
			})
		})
	} catch (error) {
		console.log('error ' + error);
	}
}

export function fillChartContainer(ctx, chartTitle, chartType, chartInformation) {
	//Llena un contenedor de gráficos
	try {
		let data = Object.entries(chartInformation['datasets'])
		let datasets = [];
		//Recorro todos los  dataset del eje y 
		data.forEach(([key, value]) => {
			const newData = {
				data: Object.values(value),
				label: key,
			}

			if (chartInformation['chartTypes'][key]) newData.type = chartInformation['chartTypes'][key];
			console.log(newData);
			datasets.push(newData);
		})
		console.log(datasets);
		datasets = addBorderAndBackgroundColorToChartDataset(datasets, chartType);
		//Datos del eje x
		const labels = Object.values(chartInformation["labels"]);
		data = {
			labels: labels,
			datasets: datasets
		};

		let options = {
			layout: {
				padding: 20
			},
			plugins: {
				title: {
					display: true,
					text: chartTitle,
					padding: {
						top: 10,
						bottom: 10
					},
					font: {
						size: 20 // Tamaño del título
					}
				},
				legend: {
					labels: {
						padding: 50
					},
					padding: 50
				},
				animation: {
					duration: 0
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		}

		if (chartType == 'line' || chartType == 'bar') {
			options = Object.assign(options, {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			});
		}

		//Configuración del gráfico
		const config = {
			type: chartType,
			data: data,
			options: options
		};

		const myChart = new Chart(
			ctx,
			config
		);

	} catch (error) {
		console.log('error ' + error);
	}
}

function addBorderAndBackgroundColorToChartDataset(datasets, chartType) {
	let hues = [];
	if (datasets.length == 1 && chartType == 'doughnut' || chartType == 'pie') {
		const backgroundColor = [];
		const borderColor = [];
		//Obtengo un array de matices
		hues = getHues(datasets[0].data.length);
		//LLeno el array de  colores de fondo y colores de borde
		hues.forEach(hue => {
			backgroundColor.push(`hsl(${hue},100%, 63%)`);
			// backgroundColor.push(`hsl(${hue},68%, 65%)`);
			// borderColor.push(`hsl(${hue},68%, 50%)`);
			borderColor.push(`hsl(${hue},100%, 53%)`);
		});
		//Agrego todos esos colores a sus respectivas posiciones en el dataset
		datasets[0].backgroundColor = backgroundColor;
		datasets[0].borderColor = borderColor;
	} else {
		//Obtengo un array de matices
		hues = getHues(datasets.length);
		//Recorro todos los datasets agregandole a cada dato la propiedad color de fondo y color de borde
		datasets.forEach((dataset, index) => {
			dataset.backgroundColor = `hsl(${hues[index]},100%, 63%)`;
			dataset.borderColor = `hsl(${hues[index]},100%, 53%)`;
		});
	}
	return datasets;
}


function getHues(amountOfElements, hueIncrement = 40) {
	//OBTIENE MATICES DE FORMA DISTRIBUIDA PARA CREAR UNA PALETA DE COLORES EN BASE A ESTOS
	//Para sacar una paleta de colores triadicos
	// const hueIncrement = Math.floor(360 / amountOfElements);
	const hues = [];
	let hue = 0 - hueIncrement;
	for (let i = 0; i < amountOfElements; i++) {
		if (hue + hueIncrement > 360) hue = 0
		hue += hueIncrement;
		hues.push(hue);
	}
	return hues;
}

//-------------------- LLENAR FORMULARIOS--------------------------


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
		options += "<option>" + defaultOption + '</option>';
		//Obtiene una condición necesaria para hacer en el select de la sentencia sql
		if (select.dataset.condition !== undefined) {
			dataForm.append('condition', select.dataset.condition);
		}
		databaseOperation('get', file, dataForm).then((data) => {
			if (data) {
				data.forEach((option) => {
					options += '<option value="' + option[0] + '">' + option[1] + '</option>';
				});
				select.innerHTML = options;
				select.options[0].selected = true;
			} else {
				console.log()
			}
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
				if (data['db'] !== undefined && Object.entries(data.db).length > 0) {
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
				}
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

//-------------------- LLENAR GALERIAS--------------------------

export function fillGalery(galery) {
	try {
		galery.innerHTML = "";
		const file = galery.dataset.file;
		const formData = new FormData();
		if (galery.dataset.id) {
			formData.append('id', galery.dataset.id);
		}
		databaseOperation("get", file, formData).then(data => {
			if (data['db'] !== undefined && data.db.images[0] !== undefined) {
				const images = Object.values(data["db"]["images"]);
				images.forEach(image => {
					putImageInGalery(galery, image['path']);
				})
			}
		})
	} catch (error) {
		console.log('error ' + error);
	}
}

export function fillGaleries() {
	const galeries = document.querySelectorAll('.fillGalery');
	galeries.forEach(galery => {
		fillGalery(galery);
	})
}