import {
  loadSection,
  databaseOperation
} from "./helpers/fetchRequest.js";

import {
  activateMenuFunctions
} from "./menu.js";

import {
  activateServiceWorker
} from "./sw.js";

import {
  fillTable,
  fillSelects,
  fillForm,
} from "./helpers/fillTemplates.js";

document.addEventListener("DOMContentLoaded", () => {
  activateServiceWorker();
  activateMenuFunctions();

  document.addEventListener("click", (e) => {

    //Botón link del menu: funciona
    if (e.target.matches(".link_nav , .link_nav *")) {
      console.log("menu")
      changeSection(e.target.closest(".link_nav"))
    }

    //Fila de las tablas
    if (e.target.matches(".tableRow , .tableRow *")) {
      console.log("fila")
      changeSection(e.target.closest(".tableRow"));
    }

    /*Botón agregar elemento en sección*/
    if (e.target.matches(".addButton , .addButton *")) {
      console.log("agregar")
      changeSection(e.target.closest(".addButton"));
    }



    //Botón Cerrar sesión
    if (e.target.matches("#btnLogout, #btnLogout *")) {
      fetch("./model/logout.php");
    }

  })

  document.addEventListener("keydown", (e) => {
    //Cambios en los inputs
    console.log("key")
  })

  document.addEventListener("submit", (e) => {
    if (e.target.matches(".searchFormulary")) {
      searchTableInformation(e);
    }
  })

});

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
//los datos a recolectar para la búsqueda tienen que estar en un formulario que tengan la clase searchFormulary y el botón de búsqueda tiene que tener un data-file que trae la info correspondiente del .php,este botón también tiene que tener la clase .searchButton, también hay que crear el archivo php que trae la info de la base de datos  uno por cada sección
async function searchTableInformation(e) {
  try {
    e.preventDefault();
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


//Se cambia la interfaz poniendo la sección que corresponde y cambiando el titulo, se llenan todos los selects con opciones, se cargan las tablas y se activa la busqueda dentro de la tabla
//TODO: DETECTA CLICK EN LOS BOTONES DE MENU,LAS FILAS DE LAS TABLAS,Y LOS OTROS BOTONES
async function changeSection(element) {
  console.log("xhangeSection")
  let path = "./view/pages/menu/";
  let sectionTitle = element.dataset.title;
  let sectionFile = element.dataset.file;
  let searchId = element.dataset.id;
  loadSection(`${path}${sectionFile}`, sectionTitle).then(() => {
    loadTable();
    // activateSearchButton();
    fillSelects();
    if (searchId) {
      fillForm(searchId);
    }
  })
}

async function fillMainSection() {
  loadTable();
  fillSelects();

}
async function fillSecondarySection(searId) {
  fillSelects();
  fillForm(searchId);
}


async function formularyChanges() {
  let modifiedSections = new Array();
  let modified = false;
  document.querySelectorAll(".sectionFormulary").forEach(sectionFormulary => {
    console.log(modified)
    sectionFormulary.querySelectorAll('select, input').forEach(element => {
      element.addEventListener('change', () => {
        modifiedSections[`${sectionFormulary.dataset.name}`] = true;
        showModalSaveChanges(getModified())
        console.log(modifiedSections);
        console.log(modified)
      })
    })
    console.log(sectionFormulary)
    console.log(sectionFormulary.querySelector('.sectionButton'))

    sectionFormulary.querySelector('.sectionButton').addEventListener("click", () => {
      modifiedSections[`${sectionFormulary.dataset.name}`] = false;
      getModified();
    })
  })

  function getModified() {
    modified = false;
    for (const modifiedSection in modifiedSections) {
      if (modifiedSections[modifiedSection] == true) {
        modified = true;
        console.log("modified " + modified);
      }
    }
    return modified;
  }
}