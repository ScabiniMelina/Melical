import {databaseOperation} from "./fetchRequest.js";

//TODO PONER EN CADA TABLA DE LAS SECCIONES LO SIGUIENTE:
//LLena los datos de una tabla, en el html que contiene la tabla hay que poner como id del template tableRowTemplate, el tr tiene que tener la clase tableRow y cada td(celda) tiene que tener un name que indique cual es la columna del registro que se tiene que insertar en ella ejemplo en patientSearch.html
export async function fillTable(data,container) {
    try{
        container.innerHTML = "";
        const tpl = document.getElementById("tableRowTemplate").content;
        const fragment = document.createDocumentFragment();
        data.forEach( element => {
            tpl.querySelector(".tableRow").dataset.id = element.ID;
            tpl.querySelectorAll("td").forEach( cell => {
                let columnTable = cell.getAttribute("name");
                cell.textContent = element[columnTable];
            })
            const clone = tpl.cloneNode(true);
            fragment.appendChild(clone);
        })  
        container.appendChild(fragment);
    }catch(error){
        console.log("error "+error);
    }
}

//TODO: PONERLE A TODOS LOS SELECTS DE TODAS LAS SECIONES  LA CLASE getSelectOption y el data-file correspondiente al php que trae los datos, se tiene que pedir como primer columna el id de la tabla y como segunda el nombre de la  opcion
//Rellena las opciones de todos los selects de una sección 
export async function fillSelects() {
    const selects = document.querySelectorAll(".getSelectOption");
    selects.forEach(select => {
        let options = "";
        const file = select.dataset.file;
        databaseOperation("get",file)
        .then((data)=>{
            data.forEach( option => {
                options += '<option data-id="' + option[0] + '" value="' + option[0] + '">' + option[1] + '</option>';
            })
            select.innerHTML = options;
        })
    })
}



async function fillPatientDataForm(data) {
  let form  = document.getElementById("patientGeneralInformationFormulary")
  form.dataset.id = data[0].ID_DNI;
  form.querySelector('[name = "patientDni"]').value = data[0].dni
  form.querySelector('[name = "patientName"]').value = data[0].name
  form.querySelector('[name = "patientSurname"]').value = data[0].surname
  form.querySelector('[name = "patientDateBirth"]').value = data[0].date_birth
  form.querySelector('[name = "patientGender"]').value = (data[0].gender < 3) ? data[0].gender : "vacio";
  form.querySelector('[name = "patientPhone"]').value = data[0].phone
  form.querySelector('[name = "patientLocation"]').value = data[0].location
  form.querySelector('[name = "patientAddress"]').value = data[0].address
  form.querySelector('[name = "patientAddressNumber"]').value = data[0].address_number
  form.querySelector('[name = "patientEmail"]').value = data[0].email
  form.querySelector('[name = "patientCuil"]').value = data[0].cuil
}
