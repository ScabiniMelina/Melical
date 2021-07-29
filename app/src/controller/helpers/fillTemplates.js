import {
    databaseOperation
} from "./fetchRequest.js";

async function addAlert(msg) {
    const type = msg['type'];
    const text = msg['text'];
    const container = document.getElementById('alertContainer');
    const alertTypes = {
        'success': {
            'icon': 'bxs-check-circle',
            'color': 'alert-success'
        },
        'info': {
            'icon': 'bxs-info-circle',
            'color': 'alert-primary'
        },
        'error': {
            'icon': 'bxs-error',
            'color': 'alert-danger'
        }
    };
    const tpl = document.getElementById("alertTemplate").content;
    console.log(tpl);
    let clone = tpl.cloneNode(true);
    console.log(clone);
    let alertId = parseInt(tpl.querySelector('.alert').dataset.id) + 1;
    tpl.querySelector('.alert').dataset.id = alertId;
    clone.querySelector('.alert').classList.add(alertTypes[type]['color'])
    clone.querySelector('i').classList.add(alertTypes[type]['icon'])
    clone.querySelector('span').textContent = text
    container.appendChild(clone);
    setTimeout(() => {
        const alertNode = container.querySelector('.alert[data-id="' + alertId + '"] ');
        if (alertNode) {
            const alert = new bootstrap.Alert(alertNode)
            alert.close()
        }
    }, 2500)
}


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
        const databaseInformation = Object.entries(data.db);
        for (const [key, data] of databaseInformation) {
            tpl.querySelector(".tableRow").dataset.id = data.ID;
            tpl.querySelectorAll("td").forEach(cell => {
                let columnTable = cell.getAttribute("name");
                cell.textContent = data[columnTable];
            })
            const clone = tpl.cloneNode(true);
            fragment.appendChild(clone);
        }
        container.appendChild(fragment);
        addAlert(data['msg']);
    } catch (error) {
        console.log("error " + error);
    }
}

//TODO: PONERLE A TODOS LOS SELECTS DE TODAS LAS DISTINTAS SECIONES  LA CLASE getSelectOption y un data-default="Todos", si ves que lo necesita,también el data-file correspondiente al php que trae los datos, sino existe ese archivo hay que crearlo,y en la sentencia sql del php se tiene que pedir como primer columna el id de la tabla y como segunda el nombre de la  opcion. EJEMPLO en resourceSearch.html
//Rellena las opciones de todos los selects de una sección 
export async function fillSelects() {
    try {
        const selects = document.querySelectorAll(".getSelectOption");
        selects.forEach(select => {
            const file = select.dataset.file;
            let defaultOption = (select.dataset.default === undefined) ? " " : select.dataset.default;
            let options = "";
            options += '<option data-id="default" value="default">' + defaultOption + '</option>';
            databaseOperation("get", file).then((data) => {
                data.forEach(option => {
                    options += '<option data-id="' + option[0] + '" value="' + option[0] + '">' + option[1] + '</option>';
                })
                select.innerHTML = options;
                select.options[0].selected = true;
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
        const dataForm = new FormData();
        dataForm.append("id", searchId);
        formularies.forEach(form => {
            const file = form.dataset.file;
            form.dataset.id = searchId;
            if (typeof file === "undefined") {
                throw ("No hay archivo para buscar la data");
            }
            databaseOperation("get", file, dataForm).then((data) => {
                const inputs = form.querySelectorAll("input");
                const selects = form.querySelectorAll("select");
                inputs.forEach(input => {
                    const columnTable = input.getAttribute("name");
                    input.value = data['db'][0][columnTable];
                })
                selects.forEach(select => {
                    const columnTable = select.getAttribute("name");
                    const selectedOption = data['db'][0][columnTable];
                    select.options[selectedOption].selected = true;
                })
            })
        })
    } catch (error) {
        console.log("error " + error);
    }
}

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