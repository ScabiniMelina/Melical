async function activateFilterFunctions() {
  //Recorro todos los elementos del nav que tienen la clase .nav-link-datalist, son todos los que tienen que rellenar un select 
  document.querySelectorAll('.nav-link-datalist').forEach(navElement => {
    //contenedor de el item del nav
    //Contenedor de las filasDatalist
    const container = document.querySelector(navElement.dataset.bsTarget);
    //por cada elemnto del nav voy a obtener las opciones del datalist 
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





async function fillAntecedentsAcordion() {
    fetch("../php/getAntecedentsList.php")
      .then(response => response.json())
      .then(data => {
          console.log(data)
          const container = document.getElementById("antecedentsAccordion");
          const templateAccordionItem = document.getElementById("accordionItem").content;
          const fragmentAccordionItem = document.createDocumentFragment();
          data.forEach(antecedentType => {
            templateAccordionItem.querySelector(".accordion-item").setAttribute("key", antecedentType.);
            templateAccordionItem.querySelector("h2").id = templateAccordionItem.querySelector("h2").id + antecedentType.;
            templateAccordionItem.querySelector("button").textContent = antecedentType.;
            templateAccordionItem.querySelector("button").dataset.bs_target = "#panelsStayOpen-collapse" + antecedentType.;
            templateAccordionItem.querySelector("button").setAttribute("aria-controls", "#panelsStayOpen-collapse" + antecedentType.; templateAccordionItem.querySelector("accordion-collapse").id = "panelsStayOpen-collapse" + antecedentType.; templateAccordionItem.querySelector("accordion-collapse").setAttribute("aria-labelledby", "panelsStayOpen-heading" + antecedentType.;

              dataAntecedentsubtypeList = {
                "idAntecedentType": ''
              }; fetch("../php/getAntecedentSubtypeList.php", {
                method: "POST",
                body: JSON.stringify(dataAntecedentsubtypeList)
              })
              .then(response => response.json())
              .then((items) => {
                const templateAntecedentItem = document.getElementById("antecedentItem").content;
                const fragmentAntecedentItem = document.createDocumentFragment();
                items.forEach(antecedentTypeItem => {
                  templateAntecedentItem.querySelector('p').textContent = antecedentTypeItem.
                  templateAntecedentItem.querySelector('.row').setAttribute("key", antecedentTypeItem.)
                })
                const clonAntecedentItem = templateAntecedentItem.cloneNode(true);

                dataCommentList = {
                  "idAntecedentType": ''
                };
                fetch("../php/getAntecedentSubtypeList.php", {
                    method: "POST",
                    body: JSON.stringify(dataCommentList)
                  })
                  .then(response => response.json())
                  .then((items) => {
                    const templateComment = document.getElementById("comment").content;
                    const fragmentComment = document.createDocumentFragment();
                    items.forEach(comment => {
                      templateComment.querySelector('h6').textContent = comment.;
                      templateComment.querySelector('small').textContent = comment.;
                      templateComment.querySelector('p').textContent = comment.;
                    })
                    const cloneComment = templateComment.cloneNode(true);

                    fragmentComment.appendChild(cloneComment)
                    templateAntecedentItem.querySelector('.list-group').appendChild(fragmentComment);
                  })
                fragmentAntecedentItem.appendChild(clonAntecedentItem);
                templateAccordionItem.querySelector(".accordion-body").appendChild(fragmentoAntecedentItem);
              })

            })

            const clon = templateAccordionItem.cloneNode(true);
            fragmentAccordionItem.appendChild(clon);
            tablaPacientes.appendChild(fragmentAccordionItem);
          })
        }

        const tpl = document.querySelector("#tpl-equipos-row")
        const clon = tpl.content.cloneNode(true)

        document.getElementById('btn-saveCommet').addEventListener("click", () => {
          let commentForm = document.getElementById('commentForm');
          let formData = new FormData(commentForm);
          fetch("../php/getAntecedentsList.php", {
              method: "POST",
              body: formData
            })
            .then(response => response.json())
            .then(data => console.log())
        })