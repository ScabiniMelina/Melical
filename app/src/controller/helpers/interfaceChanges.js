import {
    databaseOperation
} from "./fetchRequest.js";

import {
    fillSelects,
    fillForm,
    fillTable,
    addAlert
} from "./fillTemplates.js";

/*
------------------------------------------------------------------
CAMBIOS POR CADA SECCIÓN
--------------------------------------------------------------------
*/

//Al cargar cualquier nueva sección, cambia el titulo y coloca el html correspondiente
async function loadSection(file, title) {
    try {
        //Elimina todas las alertas previas de la sección
        document.getElementById('alertContainer').innerHTML = '';
        const sectionTitle = document.getElementById('sectionTitle');
        const container = document.getElementById('pageContainer');
        const response = await fetch(file);
        const html = await response.text();
        container.innerHTML = await html;
        sectionTitle.innerHTML = await title;
    } catch (error) {
        console.log('error ' + error);
    }
    //await formularyChanges();
}

//Se cambia la interfaz poniendo la sección que corresponde y cambiando el titulo, se llenan todos los selects con opciones, se cargan las tablas y se activa la busqueda dentro de la tabla
//TODO: DETECTA CLICK EN LOS BOTONES DE MENU,LAS FILAS DE LAS TABLAS,Y LOS OTROS BOTONES
export async function changeSection(element) {
    console.log("xhangeSection")
    let path = "./view/pages/menu/";
    let sectionTitle = element.dataset.title;
    let sectionFile = element.dataset.file;
    let searchId = element.dataset.id;
    await loadSection(`${path}${sectionFile}`, sectionTitle).then(() => {
        loadTable();
        fillSelects();
        if (searchId) {
            fillForm(searchId);
        }
    })
}

/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
CAMBIOS POR TABLA
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

//TODO: PONER EN  EL TBODY DE TODAS LAS TABLAS DE TODAS LAS SECCIONES  LA CLASE loadTable junto con el data-file correspondiente, CREAR EL ARCHIVO PHP QUE TRAE LA DATA
//Carga los datos de una tabla que pertenece a una sección
async function loadTable() {
    try {
        const tbody = document.querySelector(".loadTable");
        if (tbody) {
            const file = tbody.dataset.file;
            const data = await databaseOperation("get", file);
            await fillTable(data, tbody);
        }
    } catch (error) {
        console.log("error " + error);
    }
}



//TODO: HACER QUE FUNCIONEN TODOS LOS BOTONES DE BUSQUEDA DE TODAS LAS SECCIONES QUE TENGAN UNA TABLA, HACIENDO LO SIGUIENTE:
//los datos a recolectar para la búsqueda tienen que estar en un formulario que tengan la clase searchFormulary y el botón de búsqueda tiene que tener un data-file que trae la info correspondiente del .php,este botón también tiene que tener la clase .searchButton, ejemplo en getPatientSearch.php, patientSearch.html  
export async function searchTableInformation(e) {
    try {
        const searchFormulary = e.target;
        const tbody = document.querySelector(".loadTable");
        const searchButton = e.submitter;
        const file = searchButton.dataset.file;
        const dataForm = new FormData(searchFormulary);
        console.log(dataForm.get("id"));
        databaseOperation("get", file, dataForm).then((data) =>
            fillTable(data, tbody)
        );
    } catch (error) {
        console.log("error " + error);
    }
}

//Cambia la acción de todos los botones guardar a actualizar
export async function changeSaveButtonsAction() {
    let buttons = document.querySelectorAll(".postInformation");
    buttons.forEach(btn => {
        changeSaveButtonAction(btn)
    })
}

//Cambia la accion del boton guardar a actualizar
export async function changeSaveButtonAction(btn) {
    if (btn.innerHTML === "Guardar") {
        btn.innerHTML = "Actualizar";
        btn.classList.replace("postInformation", "putInformation")
        // btn.dataset.method = "put";
    }
}

export async function updateFormInformation(e) {
    const btn = e.submitter;
    // const method = btn.dataset.method;
    const file = btn.dataset.file;
    const form = e.target;
    const formData = new FormData(form)
    formData.append("id", form.dataset.id)
    const data = await databaseOperation("put", file, formData)
    addAlert(data['msg']);
}

export async function saveFormInformation(e) {
    const btn = e.submitter;
    // const method = btn.dataset.method;
    const file = btn.dataset.file;
    const form = e.target;
    const formData = new FormData(form);
    const data = await databaseOperation("post", file, formData);
    form.dataset.id = data['id'];
    addAlert(data['msg']);
    await changeSaveButtonAction(btn);
}