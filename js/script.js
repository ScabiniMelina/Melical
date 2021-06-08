
document.addEventListener("DOMContentLoaded", () => {
  activarFuncionesMenu();

  //sidebar
  document.getElementById("cronograma").addEventListener("click",()=>{
    mostrarSeccion("cronograma.html","Cronograma");
  })
  
  document.getElementById("pedidoEstudios").addEventListener("click",()=>{
    mostrarSeccion("pedidoEstudios.html","Pedido de estudios");
  })
  
  document.getElementById("lugaresDisponibles").addEventListener("click",()=>{
    mostrarSeccion("lugaresDisponibles.html","Lugares disponibles");
  })
  
  document.getElementById("recursosDisponibles").addEventListener("click",()=>{
    mostrarSeccion("recursosDisponibles.html","Recusos disponibles");
  })
  
  document.getElementById("busquedaPacientes").addEventListener("click",()=>{
    (async()=>{
      await mostrarSeccion("busquedaPacientes.html","Buscar pacientes");
      dataForm = await new FormData();
      await dataForm.append("sql","SELECT * FROM persona");
      const data = await ObtenerJson("../php/obtenerBd.php", dataForm);
      await rellenarTablaPacientes(data);
      await cargarBotonesBusquedaPacientes();
    })()
  })
  
  document.getElementById("ajustes").addEventListener("click",()=>{
    mostrarSeccion("ajustes.html","Ajustes");
  })

  document.getElementById("configuracion").addEventListener("click",()=>{
    mostrarSeccion("ajustes.html","Configuración");
  })

  document.getElementById("perfil").addEventListener("click",()=>{
    mostrarSeccion("perfil.html","Perfil");
  })

  document.getElementById("cerrarSesion").addEventListener("click",()=>{
    fetch("cerrarSesion.php")
    .then(response => response.text())
    .then(data =>  console.log = html);
  })
  
})

async function cargarBotonesBusquedaPacientes(){
  console.log("cargarBusqueda")
  //Botones de Busquéda pacientes
  document.getElementById("btnFiltrar").addEventListener("click",()=>{
    (async()=>{
      await mostrarSeccion("filtros.php","Filtrar");
    })() 
  })

  document.getElementById("btnBuscar").addEventListener("click",()=>{
    (async()=>{
      await mostrarSeccion("busquedaPacientes.html","Buscar pacientes");
      dataForm = await new FormData();
      await dataForm.append("sql",`SELECT * FROM persona WHERE ID_DNI_PACIENTE = ${document.getElementById("inputBuscar")}`);
      const data = await ObtenerJson("../php/obtenerBd.php", dataForm);
      await console.log(data);
      await rellenarTablaPacientes(data);
      await cargarBotonesBusquedaPacientes();
    })()
  })
  
  document.getElementById("btnBuscarPorHuella").addEventListener("click",()=>{
    mostrarSeccion("buscarPorHuella.html","Buscar por huella");
  })
  
  document.getElementById("btnBuscarPorRostro").addEventListener("click",()=>{
    mostrarSeccion("buscarPorRostro.html","Buscar por rostro");
  })

  document.getElementById("agregarPaciente").addEventListener("click",()=>{
    mostrarSeccion("paciente.html","Agregar paciente");
  })
  
  
  //Abrir toda la info del paciente seleccionado
  document.getElementById("tablaPacientes").addEventListener("click",(e)=>{
    (async()=>{
      dataForm = await new FormData();
      await dataForm.append("sql",`SELECT persona.ID_DNI_PERSONA, persona.nombre, persona.apellido, persona.fecha_nacimiento, persona.telefono, persona.email, persona.domicilio, persona.sexo, paciente.grupo_sanguineo, paciente.codigo_obra_social, paciente.numero_obra_social  FROM persona INNER JOIN paciente ON persona.ID_DNI_PERSONA = ${e.target.parentNode.dataset.id}`);
      const data = await ObtenerJson("../php/obtenerBd.php", dataForm);
      await mostrarSeccion("paciente.html","Paciente");
      await rellenarFormDatosPaciente(data);
    })()
    
  })
  
  
}


async function activarFuncionesMenu(){
  const sidebar = document.querySelector(".sidebar");
  document.getElementById("btn").addEventListener("click", ()=>{
    sidebar.classList.toggle("active");
    if(btn.classList.contains("bx-menu")){
      btn.classList.replace("bx-menu" , "bx-menu-alt-right");
    }else{
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  })
  
  document.querySelector(".bx-search").addEventListener("click",()=>{
    sidebar.classList.toggle("active");
  })
}

async function mostrarSeccion(archivo,titulo){
  const contenedorPagina = document.getElementById("contenedorPagina");
  const tituloSeccion = document.getElementById("tituloSeccion");
  respuesta = await fetch(archivo)
  html = await respuesta.text();
  contenedorPagina.innerHTML = await html;
  tituloSeccion.innerHTML = await titulo;
}

const ObtenerJson = async(archivo,data)=>{
  const respuesta = await fetch(archivo,
  {
    method: "POST",
    body: data
  });
  const archivoJson = await respuesta.json();
  return archivoJson;
}  

const rellenarTablaPacientes = async (data)=>{
  const tablaPacientes = document.getElementById("tablaPacientes");
  const templateFila = document.getElementById("templateFila").content;
  const fragmento = document.createDocumentFragment();
  data.forEach(paciente => {
      templateFila.querySelector(".fila").dataset.id = paciente.ID_DNI_PERSONA
      templateFila.querySelector(".dni").textContent = paciente.ID_DNI_PERSONA
      templateFila.querySelector(".nombre").textContent = paciente.nombre
      templateFila.querySelector(".apellido").textContent = paciente.apellido
      templateFila.querySelector(".fechaNacimiento").textContent = paciente.fecha_nacimiento
      templateFila.querySelector(".sexo").textContent = paciente.sexo
      const clon = templateFila.cloneNode(true)
      fragmento.appendChild(clon)
    })
    tablaPacientes.appendChild(fragmento)
}

const rellenarFormDatosPaciente = async (data)=>{
  console.log(data)  
}
  
