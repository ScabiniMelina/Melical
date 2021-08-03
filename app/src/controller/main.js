import {
  activateMenuFunctions
} from "./menu.js";

import {
  activateServiceWorker
} from "./sw.js";

import {
  changeSection,
  changeSaveButtonsAction,
  searchTableInformation,
  saveFormInformation,
  updateFormInformation
} from "./helpers/interfaceChanges.js";

document.addEventListener("DOMContentLoaded", () => {
  activateServiceWorker();
  activateMenuFunctions();

  document.addEventListener("click", (e) => {

    //Botón items del menu 
    if (e.target.matches(".link_nav , .link_nav *")) {
      changeSection(e.target.closest(".link_nav"))
    }

    //Filas de las tablas
    if (e.target.matches(".tableRow , .tableRow *")) {
      changeSection(e.target.closest(".tableRow"))
        .then(() => changeSaveButtonsAction());
    }

    //Botón cambiar de seccion(btn más, btn filtros, btn reconocimiento facial y dactilar)
    if (e.target.matches(".changeSectionButton , .changeSectionButton *")) {
      console.log("agregar")
      changeSection(e.target.closest(".changeSectionButton"));
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
    e.preventDefault();
    //Botón buscar de la sección principal donde hay tablas 
    if (e.target.matches(".searchFormulary")) {
      searchTableInformation(e);
    }

    //Botón guardar información
    if (e.submitter.matches(".postInformation")) {
      saveFormInformation(e);
    }

    //Botón actualizar información
    if (e.submitter.matches(".putInformation")) {
      updateFormInformation(e);
    }

  })

});




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
    console.log(modified);
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