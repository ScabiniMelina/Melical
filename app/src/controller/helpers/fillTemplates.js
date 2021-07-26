import {
    databaseOperation
} from "./fetchRequest.js";


//Esta función llena una tabla con los datos obtenidos de la bd
//TODO PONER EN CADA TABLA DE LAS DISTINTAS SECCIONES LO SIGUIENTE: en el html que contiene la tabla hay que poner como id del template tableRowTemplate, el tr tiene que tener la clase tableRow y cada td(celda) tiene que tener un name que indique cual es la columna del registro que se tiene que insertar en ella EJEMPLO en patientSearch.html, getPatientBySearch.php. 
export async function fillTable(data, container) {
    try {
        if (typeof data === "undefined") {
            throw ("No hay data para llenar la tabla");
        }
        container.innerHTML = "";
        const tpl = document.getElementById("tableRowTemplate").content;
        const fragment = document.createDocumentFragment();
        data.forEach(element => {
            tpl.querySelector(".tableRow").dataset.id = element.ID;
            tpl.querySelectorAll("td").forEach(cell => {
                let columnTable = cell.getAttribute("name");
                cell.textContent = element[columnTable];
            })
            const clone = tpl.cloneNode(true);
            fragment.appendChild(clone);
        })
        container.appendChild(fragment);
    } catch (error) {
        console.log("error " + error);
    }
}

//TODO: PONERLE A TODOS LOS SELECTS DE TODAS LAS DISTINTAS SECIONES  LA CLASE getSelectOption y el data-file correspondiente al php que trae los datos, sino existe ese archivo hay que crearlo,y en la sentencia sql del php se tiene que pedir como primer columna el id de la tabla y como segunda el nombre de la  opcion. EJEMPLO en resourceSearch.html
//Rellena las opciones de todos los selects de una sección 
export async function fillSelects() {
    try {
        const selects = document.querySelectorAll(".getSelectOption");
        selects.forEach(select => {
            let options = "";
            const file = select.dataset.file;
            databaseOperation("get", file)
                .then((data) => {
                    data.forEach(option => {
                        options += '<option data-id="' + option[0] + '" value="' + option[0] + '">' + option[1] + '</option>';
                    })
                    select.innerHTML = options;
                })
        })
    } catch (error) {
        console.log("error " + error);
    }
}

//TODO: MELI LLENAR CON LA INFO CORRESPONDIENTE SI EL DATO DEL INPUT ES UNDEFINIED O VACIO O ES UNA OPCION DEL SELECT INVALIDA.
//LLena los formularios que hay en una sección,del primer formulario obtiene el archivo en el que hay que buscar los datos, el id que se require se enviá adjunto, para rellenar todos los formularios, en los inputs y selects el name tiene que coincidir con  el nombre de la columna de la bd, fijate de usar un ALIAS en el php cuando haces la consulta sql y la columna tiene un guion bajo,osea si la columna de la bd es date_birth, vos en el SQL le tenés que poner SELECT date_birth AS dateBirth, osea le sacas el guion y pones la letra que separa la palabra en mayúscula   
export async function fillForm(searchId) {
    try {
        const formularies = document.querySelectorAll(".fillForm");
        if (formularies[0]) {
            const file = formularies[0].dataset.file;
            const dataForm = new FormData();
            dataForm.append("id", searchId);
            databaseOperation("get", file, dataForm)
            formularies.forEach(form => {
                inputs = form.querySelectorAll("input , select");
                inputs.forEach(input => {
                    let columnTable = input.getAttribute("name");
                    input.value = data[0][columnTable];
                })
            })
        }
    } catch (error) {
        console.log("error " + error);
    }

}

// async function fillPatientDataForm(data) {
//   let form  = document.getElementById("patientGeneralInformationFormulary")
//   form.dataset.id = data[0].ID_DNI;
//   form.querySelector('[name = "patientDni"]').value = data[0].dni
//   form.querySelector('[name = "patientName"]').value = data[0].name
//   form.querySelector('[name = "patientSurname"]').value = data[0].surname
//   form.querySelector('[name = "patientDateBirth"]').value = data[0].date_birth
//   form.querySelector('[name = "patientGender"]').value = (data[0].gender < 3) ? data[0].gender : "vacio";
//   form.querySelector('[name = "patientPhone"]').value = data[0].phone
//   form.querySelector('[name = "patientLocation"]').value = data[0].location
//   form.querySelector('[name = "patientAddress"]').value = data[0].address
//   form.querySelector('[name = "patientAddressNumber"]').value = data[0].address_number
//   form.querySelector('[name = "patientEmail"]').value = data[0].email
//   form.querySelector('[name = "patientCuil"]').value = data[0].cuil
// }

//Guarda Y/o actualiza la información de una sección en la que se agrega un nuevo valor en la bd
// async function saveOrUpdateInformation(btn, form, idName) {
//     btn.addEventListener('click', (e) => {
//         console.log(form);
//         console.log(btn);
//         console.log(idName);
//         console.log(e.target.innerHTML);

//         let formData = new FormData(form);
//         if (e.target.dataset.file.includes('update')) {
//             formData.append(idName, form.dataset.id);
//         }
//         console.log(formData);
//         setInformation(e.target, formData).then(() => {
//             if (e.innerHTML == 'Guardar') {
//                 e.innerHTML = 'Guardar cambios';
//                 e.dataset.file = e.dataset.file.replace('set', 'update');
//             }
//         });
//     });
// }