document.addEventListener("DOMContentLoaded", () => {
  activateMenuFunctions();

  //sidebar
  document.getElementById("cronograma").addEventListener("click", () => {
    showSection("cronograma.html", "Cronograma");
  })

  document.getElementById("pedidoEstudios").addEventListener("click", () => {
    showSection("pedidoEstudios.html", "Pedido de estudios");
  })

  document.getElementById("lugaresDisponibles").addEventListener("click", () => {
    showSection("lugaresDisponibles.html", "Lugares disponibles");
  })

  document.getElementById("recursosDisponibles").addEventListener("click", () => {
    showSection("recursosDisponibles.html", "Recusos disponibles");
  })

  document.getElementById("busquedaPacientes").addEventListener("click", () => {
    showSection("busquedaPacientes.html", "Buscar pacientes")
      .then(() => {
        fetch("../php/obtenerPacientes.php")
          .then(respuesta => respuesta.json())
          .then(data => fillPatientTable(data))
          .then(() => loadPatientSearchButtons())
      })
  })

  document.getElementById("ajustes").addEventListener("click", () => {
    showSection("ajustes.html", "Ajustes");
  })

  document.getElementById("configuracion").addEventListener("click", () => {
    showSection("ajustes.html", "Configuración");
  })

  document.getElementById("perfil").addEventListener("click", () => {
    showSection("perfil.html", "Perfil");
  })

  document.getElementById("cerrarSesion").addEventListener("click", () => {
    fetch("logout.php");
  })

})

async function loadPatientSearchButtons() {

  document.getElementById("btnFiltrar").addEventListener("click", () => {
    showSection("filtros.php", "Filtrar")
    .then(()=>activateFilterFunctions())
  })

  document.getElementById("btnBuscar").addEventListener("click", () => {
    formData = new FormData();
    formData.append('ID_DNI', document.getElementById("inputBuscar").value);
    getInformation("obtenerPaciente", formData)
    .then(data => fillPatientTable(data));
  })

  document.getElementById("btnBuscarPorHuella").addEventListener("click", () => {
    showSection("buscarPorHuella.html", "Buscar por huella");
  })

  document.getElementById("btnBuscarPorRostro").addEventListener("click", () => {
    showSection("buscarPorRostro.html", "Buscar por rostro");
  })

  document.getElementById("agregarPaciente").addEventListener("click", () => {
    showSection("paciente.html", "Agregar paciente")
      .then(() => {
        setDefaultButtonAction( document.getElementById("patientGeneralInformationButton"))
        setDefaultButtonAction( document.getElementById("patientReligionBloodButton"))
        fillSelects()
        .then(() => {
          saveOrUpdateInformation(document.getElementById("patientGeneralInformationButton"),  document.getElementById("patientGeneralInformationFormulary"),"patientIdDni")
          saveOrUpdateInformation( document.getElementById("patientReligionBloodButton"),  document.getElementById("patientReligionBloodFormulary") ,"patientIdDni")
        })
      })
  })

  //Abrir toda la info del paciente seleccionado en la tabla
  document.querySelectorAll("#tablaPacientes tr").forEach(tr => {
    tr.addEventListener("click", (e) => {
      console.log(e.currentTarget)
      formData = new FormData();
      formData.append('ID_DNI', e.currentTarget.dataset.id);
      showSection("paciente.html", "Paciente")
      .then(() => fillSelects())
      .then(() => {
        getInformation('getPatientInformation',formData)
        .then(data => fillPatientDataForm(data))
        .then(() => {
          saveOrUpdateInformation(document.getElementById("patientGeneralInformationButton"),  document.getElementById("patientGeneralInformationFormulary"),"patientIdDni")
          saveOrUpdateInformation( document.getElementById("patientReligionBloodButton"),  document.getElementById("patientReligionBloodFormulary") ,"patientIdDni")
        })
      })
    })
  })
}

async function activateMenuFunctions() {
  const sidebar = document.querySelector(".sidebar");
  document.getElementById("btn").addEventListener("click", () => {
    sidebar.classList.toggle("active");
    if (btn.classList.contains("bx-menu")) {
      btn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  })

  document.querySelector(".bx-search").addEventListener("click", () => {
    sidebar.classList.toggle("active");
  })
}

async function showSection(file, title) {
  const sectionTitle = document.getElementById("tituloSeccion");
  const container = document.getElementById("contenedorPagina");
  document.getElementById('alertContainer').innerHTML = "";
  response = await fetch(file)
  html = await response.text();
  container.innerHTML = await html;
  sectionTitle.innerHTML = await title;
  await formularyChanges();

  addAlert("error", "titulo");
}

//asigne ls  
async function fillPatientTable(data) {
  console.log(data)
  const container = document.getElementById("tablaPacientes");
  container.innerHTML = "";
  const tpl = document.getElementById("tableRowTemplate").content;
  const fragment = document.createDocumentFragment();
  data.forEach(patient => {
    tpl.querySelector(".tableRow").dataset.id = patient.ID_DNI;
    tpl.querySelector(".dni").textContent = patient.dni;
    tpl.querySelector(".name").textContent = patient.name;
    tpl.querySelector(".surname").textContent = patient.surname;
    tpl.querySelector(".dateBirth").textContent = patient.date_birth;
    const clone = tpl.cloneNode(true);
    fragment.appendChild(clone);
  })
  container.appendChild(fragment);
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

async function activateFilterFunctions() {
  document.querySelectorAll('.nav-link-datalist').forEach(navElement => {
    const container = document.querySelector(navElement.dataset.bsTarget); //Contenedor de las filasDatalist
    obtenerOpcionesDatalist(navElement.dataset.table, navElement.dataset.columna_id, navElement.dataset.columna_lista)
    .then(opciones => createRowDatalist(navElement, container, opciones))
  })

  document.getElementById("obtenerBusquedaFiltrado").addEventListener("click", () => {
    data = new FormData();
    // data.append('ID_DNI', document.getElementById("inputBuscar").value);
    showSection("busquedaPacientes.html", "Buscar pacientes")
      .then(() => {
        console.log("obtener filtrado de pacientes")
        fetch("../php/obtenerPaciente.php", {
            method: "POST",
            body: data
          })
          .then(respuesta => respuesta.json())
          .then(data => fillPatientTable(data))
      })
  })
  // eliminarFiltroBadge();
}

function createRowDatalist(navElement, container, data) {
  const tpl = document.getElementById("containerDatalist").content;
  const rowsNumber = container.querySelectorAll(".fila").length;
  const fragment = document.createDocumentFragment();
  const badgeContainer = document.getElementById("contenedorFiltros");
  let idRow = 0;
  if (rowsNumber != 0) {
    idRow = parseInt(container.querySelectorAll(".fila")[rowsNumber- 1].dataset.id) + 1;
  }
  tpl.querySelector(".row").dataset.id = idRow;
  // poner opciones en el datalist
  tpl.querySelector("input").setAttribute("list", navElement.dataset.datalist + idRow);
  tpl.querySelector("datalist").innerHTML = data;
  tpl.querySelector("datalist").id = navElement.dataset.datalist + idRow;
  tpl.querySelector("datalist").className = navElement.dataset.datalist + idRow;
  fragment.appendChild(tpl.cloneNode(true))

  fragment.querySelector('.inputDatalist').addEventListener("change", (e) => {
    validSelection = false;
    container.querySelectorAll('.fila[data-id="' + idRow + '"] option').forEach( option => { 
      let badge = badgeContainer.querySelector('button[data-id="' + navElement.dataset.datalist + idRow + '"]');
      if (e.target.value == option.value) {
        if (badge) {
          badgeContainer.querySelector("span").textContent = e.target.value;
        } else {
          const badgeFragment = document.createDocumentFragment();
          const badgeTpl = document.getElementById("opcionFiltro").content.cloneNode(true);
          badgeTpl.querySelector("span").textContent = e.target.value;
          badgeTpl.querySelector("button").dataset.id = navElement.dataset.datalist + idRow;
          badgeFragment.appendChild(badgeTpl);
          badgeContainer.appendChild(badgeFragment);
        }
        validSelection = true;
      }
      if ( badge && validSelection == false) {
        badgeContainer.removeChild(badge)
        console.log("invalida")
      }
      console.log("cambio input")
    })
  })

  fragment.querySelector("button").addEventListener("click", (e) => {
    const icon = e.currentTarget.querySelector("i");
    const badge = badgeContainer.querySelector('button[data-id="' + navElement.dataset.datalist + idRow + '"]');
    if (icon.classList.contains("bx-minus")) {
      console.log(e.currentTarget)
      container.removeChild(container.querySelector('.fila[data-id="' + idRow + '"]'))
      console.log(badgeContainer);
      badgeContainer.removeChild(badge)
    }

    if (icon.classList.contains("bx-plus")) {
      console.log("mas")
      icon.classList.replace("bx-plus", "bx-minus")
      createRowDatalist(navElement, container, data)
    }
  })
  container.appendChild(fragment)
}

async function getListOptions(file) {
  let options = "";
  const response = await fetch("../php/" + file + ".php", {
    method: "POST",
  })
  const json = await response.json();
  await json.forEach((option) => {
    options += '<option data-id="' + option[0] + '" value="' + option[0] + '">' + option[1] + '</option>'
  })
  return options;
}

async function setInformation(btn, data) {

  let file = btn.dataset.file;
  const response = await fetch("../php/" + file + ".php", {
    method: "POST",
    body: data
  })
  const text = await response.text();
  console.log(text);

}

async function getInformation(file, data){
  const response = await fetch("../php/" + file + ".php", {
    method: "POST",
    body: data
  })
  return await response.json();
}

async function showModalSaveChanges(modified) {
  console.log(modified);
  window.addEventListener("beforeunload", (e) => {
    showModal(e);
  })

  function modalEvents(e) {
    e.preventDefault();
    document.querySelector('#btn-exit').addEventListener("click", () => {
      e.returnValue = true;
    })

    document.querySelector('#btn-cancel').addEventListener("click", () => {
      e.returnValue = false;
    })
  }

  async function showModal(e) {
    if (modified) {
      var modal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
      })
      console.log(modal)
      await modal.show()
      await modalEvents(e)
    }
  }

  // var confirmationMessage = "\o/";
  // (e || window.event).returnValue = confirmationMessage;
  // return confirmationMessage;   

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

async function fillSelects() {
  let selects = document.querySelectorAll(".getSelectOption")
  selects.forEach(select => {
    console.log(select.dataset)
    getListOptions(select.dataset.file)
      .then(options => {
        console.log(options)
        select.innerHTML = options
      })
  })
}


async function setDefaultButtonAction(btn){
  btn.innerHTML = 'Guardar';
  btn.dataset.file =  btn.dataset.file.replace("update", "set");
}

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

// async function fillAntecedentsAcordion() {
//   fetch("../php/getAntecedentsList.php")
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//     const container = document.getElementById("antecedentsAccordion");
//     const templateAccordionItem = document.getElementById("accordionItem").content;
//     const fragmentAccordionItem = document.createDocumentFragment();
//     data.forEach(antecedentType => {
//       templateAccordionItem.querySelector(".accordion-item").setAttribute("key", antecedentType.);
//       templateAccordionItem.querySelector("h2").id = templateAccordionItem.querySelector("h2").id + antecedentType.;
//       templateAccordionItem.querySelector("button").textContent = antecedentType.;
//       templateAccordionItem.querySelector("button").dataset.bs_target = "#panelsStayOpen-collapse" + antecedentType.;
//       templateAccordionItem.querySelector("button").setAttribute("aria-controls", "#panelsStayOpen-collapse" + antecedentType.;
//       templateAccordionItem.querySelector("accordion-collapse").id = "panelsStayOpen-collapse" + antecedentType.;
//       templateAccordionItem.querySelector("accordion-collapse").setAttribute("aria-labelledby", "panelsStayOpen-heading" + antecedentType.;
      
//       dataAntecedentsubtypeList = {"idAntecedentType": ''};
//       fetch("../php/getAntecedentSubtypeList.php", {
//         method: "POST",
//         body: JSON.stringify(dataAntecedentsubtypeList)
//       })
//       .then(response => response.json())
//       .then((items) => {
//         const templateAntecedentItem = document.getElementById("antecedentItem").content;
//         const fragmentAntecedentItem  = document.createDocumentFragment();
//         items.forEach(antecedentTypeItem => {
//           templateAntecedentItem.querySelector('p').textContent = antecedentTypeItem.
//           templateAntecedentItem.querySelector('.row').setAttribute("key", antecedentTypeItem.) 
//         })
//         const clonAntecedentItem = templateAntecedentItem.cloneNode(true);
          
//         dataCommentList = {"idAntecedentType": ''};
//         fetch("../php/getAntecedentSubtypeList.php", {
//           method: "POST",
//           body: JSON.stringify(dataCommentList)
//         })
//         .then(response => response.json())
//         .then((items) => {
//           const templateComment = document.getElementById("comment").content;
//           const fragmentComment  = document.createDocumentFragment();
//           items.forEach(comment=>{
//             templateComment.querySelector('h6').textContent =  comment.;
//             templateComment.querySelector('small').textContent =  comment.;
//             templateComment.querySelector('p').textContent =  comment.;
//           })
//           const cloneComment = templateComment.cloneNode(true);

//           fragmentComment.appendChild(cloneComment)
//           templateAntecedentItem.querySelector('.list-group').appendChild(fragmentComment);
//         })
//         fragmentAntecedentItem.appendChild(clonAntecedentItem); 
//         templateAccordionItem.querySelector(".accordion-body").appendChild(fragmentoAntecedentItem);
//       })

//     }) 
      
//       const clon = templateAccordionItem.cloneNode(true);
//       fragmentAccordionItem.appendChild(clon); 
//       tablaPacientes.appendChild(fragmentAccordionItem);
//     })
//   }

  // const tpl = document.querySelector("#tpl-equipos-row")
  // const clon = tpl.content.cloneNode(true)

  // document.getElementById('btn-saveCommet').addEventListener("click",()=>{
  //   let commentForm = document.getElementById('commentForm');
  //   let formData = new FormData(commentForm);
  //   fetch("../php/getAntecedentsList.php",{
  //     method: "POST",
  //     body: formData
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log())
  // })

async function addAlert(type, msg){
  container = document.getElementById('alertContainer')
  alertTypes ={'success':{'icon':'bxs-check-circle','color':'alert-success'}, 'info' : {'icon':'bxs-info-circle','color':'alert-primary'}, 'error' :{'icon':'bxs-error','color':'alert-danger'}};
  const tpl = document.getElementById("alertTemplate").content;
  console.log(tpl.querySelector('.alert').dataset.id);
  let alertId = parseInt(tpl.querySelector('.alert').dataset.id) + 1;
  tpl.querySelector('.alert').classList.add(alertTypes[type]['color'])
  tpl.querySelector('.alert').dataset.id = alertId ;
  tpl.querySelector('i').classList.add(alertTypes[type]['icon'])
  tpl.querySelector('span').textContent = msg
  const clone = tpl.cloneNode(true)
  container.appendChild(clone);
  setTimeout(()=>{
    let  alert = container.querySelector('.alert[data-id="' + alertId + '"] ');
    if(alert){
      container.removeChild(alert);
    }
  },3000)
}
  