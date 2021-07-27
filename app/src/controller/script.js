async function loadPatientSearchButtons() {

  document.getElementById("btnFiltrar").addEventListener("click", () => {
    showSection("filtros.php", "Filtrar")
      .then(() => activateFilterFunctions())
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
        setDefaultButtonAction(document.getElementById("patientGeneralInformationButton"))
        setDefaultButtonAction(document.getElementById("patientReligionBloodButton"))
        fillSelects()
          .then(() => {
            saveOrUpdateInformation(document.getElementById("patientGeneralInformationButton"), document.getElementById("patientGeneralInformationFormulary"), "patientIdDni")
            saveOrUpdateInformation(document.getElementById("patientReligionBloodButton"), document.getElementById("patientReligionBloodFormulary"), "patientIdDni")
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
          getInformation('getPatientInformation', formData)
            .then(data => fillPatientDataForm(data))
            .then(() => {
              saveOrUpdateInformation(document.getElementById("patientGeneralInformationButton"), document.getElementById("patientGeneralInformationFormulary"), "patientIdDni")
              saveOrUpdateInformation(document.getElementById("patientReligionBloodButton"), document.getElementById("patientReligionBloodFormulary"), "patientIdDni")
            })
        })
    })
  })
}




//asigne ls  



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
    idRow = parseInt(container.querySelectorAll(".fila")[rowsNumber - 1].dataset.id) + 1;
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
    container.querySelectorAll('.fila[data-id="' + idRow + '"] option').forEach(option => {
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
      if (badge && validSelection == false) {
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





async function showModalSaveChanges(modified) {
  console.log(modified);
  window.addEventListener("beforeunload", (e) => {
    showModal(e);
  })

  // function modalEvents(e) {
  //   e.preventDefault();
  //   document.querySelector('#btn-exit').addEventListener("click", () => {
  //     e.returnValue = true;
  //   })

  //   document.querySelector('#btn-cancel').addEventListener("click", () => {
  //     e.returnValue = false;
  //   })
  // }

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



async function setDefaultButtonAction(btn) {
  btn.innerHTML = 'Guardar';
  btn.dataset.file = btn.dataset.file.replace("update", "set");
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

async function addAlert(type, msg) {
  container = document.getElementById('alertContainer')
  alertTypes = {
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
  console.log(tpl.querySelector('.alert').dataset.id);
  let alertId = parseInt(tpl.querySelector('.alert').dataset.id) + 1;
  tpl.querySelector('.alert').classList.add(alertTypes[type]['color'])
  tpl.querySelector('.alert').dataset.id = alertId;
  tpl.querySelector('i').classList.add(alertTypes[type]['icon'])
  tpl.querySelector('span').textContent = msg
  const clone = tpl.cloneNode(true)
  container.appendChild(clone);
  setTimeout(() => {
    let alert = container.querySelector('.alert[data-id="' + alertId + '"] ');
    if (alert) {
      container.removeChild(alert);
    }
  }, 2500)
}