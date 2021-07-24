import {loadSection,databaseOperation} from "./helpers/fetchRequest.js";
import { activateMenuFunctions} from "./menu.js";
import {activateServiceWorker} from "./sw.js";
import {fillTable,fillSelects} from "./helpers/fillTemplates.js";


document.addEventListener("DOMContentLoaded", () => {

  activateServiceWorker();
  activateMenuFunctions();

  //Recorro todo los items del menu y cuando le hago click a uno de ellos, hace la peticion del html correspondiente y ejecuta una función especifica de la sección.
  let functionList = [loadScheduleSection,loadStudySection,loadRoomsSection,loadResourcesSection,loadPatientsSection,loadSettingsSection,loadProfileSection];
  document.querySelectorAll(".link_nav").forEach( linkNav  =>{
    linkNav.addEventListener("click",(e)=>{
      let functionName = linkNav.dataset.callback
      let sectionTitle =  e.currentTarget.dataset.title;
      let sectionFile =  e.currentTarget.dataset.file;
      loadSection(`./view/pages/menu/${sectionFile}.html`,sectionTitle)
      .then(()=>{
        loadTable()
        fillSelects()
      })
      .then(()=>searchFunction(functionName,functionList))
    })
  })
  
  //Cerrar sesión
  document.getElementById("btnLogout").addEventListener("click", () => fetch("../model/logout.php"))
})

//Función que busca en una lista de funciones la función a ejecutar
function searchFunction(functionName , functionList){
  for (let functionItem of functionList) {
    if(functionItem.name == functionName){
      functionItem();
      break;
    }
  }
}

//TODO: PONER EN  EL TBODY DE TODAS LAS TABLAS DE TODAS LAS SECCIONES  LA CLASE loadTable junto con el data-file correspondiente, CREAR EL ARCHIVO PHP QUE TRAE LA DATA
//Carga los datos de una tabla que pertenece a una sección 
async function loadTable(){
  const tbody = document.querySelector(".loadTable")
  if(tbody){
    const file = tbody.dataset.file
    const data = await databaseOperation("get",file)
    await fillTable(data,tbody)
  }
}

//Funciones que ejecuta cada sección cuando se carga 
async function loadScheduleSection(){
  console.log("cronograma");
}

async function loadStudySection(){
  console.log("Study");
}

async function loadRoomsSection(){
  console.log("Rooms");
}

async function loadResourcesSection(){
  console.log("Resources");
}

async function loadPatientsSection(){
  console.log("Patients");
}

async function loadSettingsSection(){
  console.log("Settings");
}

async function loadProfileSection(){
  console.log("Profile");
}



