import {loadSection,databaseOperation} from "./helpers/fetchRequest.js";
import { activateMenuFunctions} from "./menu.js";

console.log("main");
document.addEventListener("DOMContentLoaded", () => {

  activateMenuFunctions();

  //Recorro todo los items del menu y cuando le hago click a uno de ellos, hace la peticion del html correspondiente y ejecuta una función especifica de la sección.
  let functionList = [loadScheduleSection,loadStudySection,loadRoomsSection,loadResourcesSection,loadPatientsSection,loadSettingsSection,loadProfileSection];
  document.querySelectorAll(".link_nav").forEach( linkNav  =>{
    linkNav.addEventListener("click",(e)=>{
      let functionName = linkNav.dataset.callback
      let sectionTitle =  e.currentTarget.dataset.title;
      let sectionFile =  e.currentTarget.dataset.file;
      loadSection(`./view/pages/menu/${sectionFile}.html`,sectionTitle)
      .then(searchFunction(functionName,functionList))
    })
  })
  
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



