
async function saveOrUpdateInformation(btn, form ,idName){
  //Guarda Y/o actualiza la información de una sección en la que se agrega un nuevo valor en la bd
  btn.addEventListener("click", (e) => {
    console.log(form)
    console.log(btn)
    console.log(idName)
    console.log(e.target.innerHTML)
    
    let formData = new FormData(form);
    if (e.target.dataset.file.includes("update")) {
      formData.append(idName, form.dataset.id)
    }
    console.log(formData)
    setInformation(e.target, formData)
    .then(() => {
      if (e.innerHTML == "Guardar") {
        e.innerHTML = "Guardar cambios"
        e.dataset.file = e.dataset.file.replace("set", "update");
      }
    })
 })
}


// async function setInformation(btn, data) {

//   let file = btn.dataset.file;
//   const response = await fetch("../php/" + file + ".php", {
//     method: "POST",
//     body: data
//   })
//   const text = await response.text();
//   console.log(text);

// }

// //Obtiene información de la base de datos
// async function getInformation(file, data){
//   const response = await fetch("../php/" + file + ".php", {
//     method: "GET",
//     body: data
//   })
//   return await response.json();
// }

//Al cargar cualquier nueva seccion, cambia el titulo y coloca el html correspondiente
export async function loadSection(file, title) {
  try{
    //Elimina todas las alertas previas de la sección
    document.getElementById('alertContainer').innerHTML = "";
    const sectionTitle = document.getElementById("sectionTitle");
    const container = document.getElementById("pageContainer");
    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = await html;
    sectionTitle.innerHTML = await title;
  }
  catch(error){
    console.log("error "+error);
  }
  // //await formularyChanges();
}

//Sirve para obtener, insertar, actualizar o eliminar datos de la bd
export async function databaseOperation(method,file,dataForm){
  try{
    const response = await fetch("./model/"+method+"/" + file + ".php", {
      method: method,
      body: dataForm
    })
    return await response.json;
  }catch(error){
    console.log("error "+error);
  }
}