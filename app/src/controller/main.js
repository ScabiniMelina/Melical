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
  activateChangeSectionButton();
  //Cerrar sesión
  document.getElementById("btnLogout").addEventListener("click", () => fetch("./model/logout.php"));
});

//Función que busca en una lista de funciones la función a ejecutar
function searchFunction(functionName, functionList) {
  for (let functionItem of functionList) {
    if (functionItem.name == functionName) {
      functionItem();
      break;
    }
  }
}

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
async function activateSearchButton() {
  try {
    const searchButton = document.querySelector(".searchButton");
    if (searchButton) {
      const tbody = document.querySelector(".loadTable");
      const searchFormulary = document.querySelector(".searchFormulary");
      searchFormulary.addEventListener("submit", (e) => {
        e.preventDefault();
        const file = searchButton.dataset.file;
        const dataForm = new FormData(e.currentTarget);
        console.log(dataForm.get("id"));
        databaseOperation("get", file, dataForm).then((data) =>
          fillTable(data, tbody)
        );
      });
    }
  } catch (error) {
    console.log("error " + error);
  }
}

//Recorro todo los items del menu,las filas de la tabla, el boton de agregar, detectando el click sobre uno de estos, se cambia la interfaz poniendo la seccion que corresponde y cambiando el titulo, se llenan todos los selects con opciones, se cargan las tablas y se activa la busqueda dentro de la tabla
//TODO: DETECTA CLICK EN LOS BOTONES DE MENU,LAS FILAS DE LAS TABLAS,Y LOS OTROS BOTONES
async function activateChangeSectionButton() {
  // let functionList = [loadScheduleSection,loadStudySection,loadRoomsSection,loadResourcesSection,loadPatientsSection,loadSettingsSection,loadProfileSection];
  let tableRows = document.querySelectorAll(".tableRow");
  let menuButtons = document.querySelectorAll(".link_nav");
  let addButtons = document.querySelectorAll(".addButton");
  let elements = [...tableRows, ...menuButtons, ...addButtons];
  console.log(elements);
  console.log("hola");

  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log("se ejecuta seccion");
      let path = "./view/pages/menu/";
      // let functionName = element.dataset.callback
      let sectionTitle = element.dataset.title;
      let sectionFile = element.dataset.file;
      let searchId = element.dataset.id || "";
      loadSection(`${path}${sectionFile}`, sectionTitle).then(() => {
        loadTable();
        fillSelects();
        activateSearchButton();
        fillForm(searchId);
      }).then(() => {
        activateChangeSectionButton();
      })

      // .then(()=>searchFunction(functionName,functionList))
    })
  });
}

//Funciones que ejecuta cada sección cuando se carga
// async function activateMenuSectionFunctions(){
//   loadTable();
//   fillSelects();
//   activateSearchButton();
// }

// async function activateSecondarySectionFunctions(){
//   fillSelects();
//   activateSearchButton();

// }

// async function loadScheduleSection(){
//   console.log("cronograma");
// }

// async function loadStudySection(){
//   console.log("Study");
// }

// async function loadRoomsSection(){
//   console.log("Rooms");
// }

// async function loadResourcesSection(){
//   console.log("Resources");
// }

// async function loadPatientsSection(){
//   console.log("Patients");
// }

// async function loadSettingsSection(){
//   console.log("Settings");
// }

// async function loadProfileSection(){
//   console.log("Profile");
// }