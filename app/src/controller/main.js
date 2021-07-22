import {loadSection,databaseOperation} from "./helpers/fetchRequest.js";

console.log("main");
document.addEventListener("DOMContentLoaded", () => {
  //Recorro todo los items del menu y cuando le hago click a uno de ellos, hace la peticion del html correspondiente y ejecuta una función especifica de la sección.
  let functionList = [schedule,hola];
  document.querySelectorAll(".link_nav").forEach( linkNav  =>{
    linkNav.addEventListener("click",(e)=>{
      let functionName = linkNav.dataset.callback
      let sectionTitle =  e.currentTarget.dataset.title;
      let sectionFile =  e.currentTarget.dataset.file;
      loadSection(`./view/pages/menu/${sectionFile}.html`,sectionTitle)
      .then(searchFunction(functionName,functionList))
    })
  })

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

async function schedule(){
  console.log("horario")
}

function hola (){
  console.log("hola")
}