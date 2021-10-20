<?php
session_start();
if (!isset($_SESSION['cuil'])) {
  header("location: ./view/pages/authentication/login.php");
  die();
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Bienvenid@s a Melical, una aplicación que te será util para hacer historias clínicas, realizar estadísticas en base a estas y hacer un control de los recursos disponibles.">
  <!-- Color de la barra de redirección -->
  <meta name="theme-color" content="#063f5a">
  <!-- Le dice a los dispositivos móviles que se adapta para este tipo de pantallas -->
  <meta name="MobileOptimized" content="width">
  <meta name="HandheldFriendly" content="true">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <?php include('./view/modules/header.php'); ?>

  <!--ICONO DE LA APP -->
  <link rel="shortcut icon" sizes="48x48" type="image/png" href="./view/assets/img/">
  <link rel="shortcut icon" sizes="128x128" type="image/png" href="./view/assets/img">
  <link rel="shortcut icon" sizes="512x512" type="image/png" href="./view/assets/img/maskable_icon_x512.png">

  <!-- IMAGEN DEL ICONO DE LA APP PARA IOS -->
  <link rel="apple-touch-icon" sizes="48x48" href="./view/assets/img/">
  <link rel="apple-touch-icon" sizes="128x128" href="./view/assets/img/maskable_icon_x128.png">
  <link rel="apple-touch-icon" sizes="512x512" href="./view/assets/img/maskable_icon_x512.png">
  <link rel="apple-touch-startup-image" sizes="48x48" href="./view/assets/img/">
  <link rel="apple-touch-startup-image" sizes="128x128" href="./view/assets/img/maskable_icon_x128.png">
  <link rel="apple-touch-startup-image" sizes="512x512" href="./view/assets/img/maskable_icon_x512.png">

  <link rel="manifest" href="manifest.json">


  <title>Melical</title>

</head>

<body>
  <!-- Modal
  <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header py-3">
          <h5 class="modal-title">¿Quieres salir de la página? </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-1">
          <p class="modal-text m-0">Es posible que los cambios no se guarden.</p>
        </div>
        <div class="modal-footer py-1">
          <button type="button" class="btn btn-sm btn-dark" id="btn-exit">Salir</button>
          <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" id="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </div> -->

  <div class="sidebar py-md-3">

    <div class="logo_content ms-2 d-none d-md-block">
      <div class="logo ">
        <h1 class="logo_name fs-4" id="logo">Melical</h1>
      </div>
      <i class='bx bx-menu align-item-center' id="btn"></i>
    </div>

    <ul class="nav_list">
      <li class="d-none d-md-block">
        <i class='bx bx-search'></i>
        <input type="text" placeholder="Buscar..." id="buscar">
        <span class="tooltip">Buscar</span>
      </li>
      <li>
        <a href="#/cronograma" class="link_nav" data-callback="loadScheduleSection" data-file="schedule/schedule.html" data-title="Cronograma">
          <i class='bx bx-calendar bx-flip-horizontal'></i>
          <span class="links_name">Cronograma</span>
        </a>
        <span class="tooltip">Cronograma</span>
      </li>
      <li>
        <a href="#/pedidoEstudios" class="link_nav" data-callback="loadStudySection" data-file="study/studySearch.html" data-title="Estudios pedidos">
          <i class='bx bx-test-tube'></i>
          <span class="links_name">Estudios pedidos</span>
        </a>
        <span class="tooltip">Estudios pedidos</span>
      </li>
      <li>
        <a href="#/lugaresDisponibles" class="link_nav" data-callBack="loadRoomsSection" data-file="room/roomSearch.html" data-title="Lugares disponibles">
          <i class='bx bx-clinic'></i>
          <span class="links_name ">Lugares disponibles</span>
        </a>
        <span class="tooltip">Lugares disponibles</span>
      </li>
      <li>
        <a href="#/recursosDisponibles" class="link_nav" data-callBack="loadResourcesSection" data-file="resources\resourcesSearch.html" data-title="Recursos disponibles">
          <i class='bx bx-band-aid'></i>
          <span class="links_name">Recursos disponibles</span>
        </a>
        <span class="tooltip">Recursos disponibles</span>
      </li>
      <li>
        <a href="#/busquedaPacientes" class="link_nav" data-callback="loadPatientsSection" data-file="patient/patientSearch.html" data-title="Busqueda de pacientes">
          <i class='bx bx-user-pin'></i>
          <span class="links_name ">Búsqueda de pacientes</span>
        </a>
        <span class="tooltip ">Búsqueda de pacientes</span>
      </li>

      <li class="d-none d-md-block">
        <a href="#/ajustes" class="link_nav" data-callback="loadSettingsSection" data-file="setting/settings.html" data-title="Ajustes">
          <i class='bx bx-cog'></i>
          <span class="links_name">Ajustes</span>
        </a>
        <span class="tooltip">Ajustes</span>
      </li>
    </ul>
  </div>

  <div class="content">
    <div class="row sidebar_secondary position-fixed justify-content-between align-items-center m-0 px-0 py-2 px-lg-1">
      <div class="col-auto">
        <h2 id="sectionTitle" class="fs-5 tituloSeccion">Inicio</h2>
      </div>
      <div class="col-auto d-flex align-items-center ">
        <div class="notification ">
          <i class='bx bxs-bell fs-4'></i>
        </div>
        <div class="btn-group">
          <img src="https://media.biobiochile.cl/wp-content/uploads/2019/09/e.jpg" class="profile_img dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu dropdown-menu-end p-0">
            <li class="changeSectionButton" data-callback="loadProfileSection" data-file="setting/profile.html" data-title="Perfil">
              <button class="dropdown-item" type="button">Ver perfil</button>
            </li>
            <li class="link_nav" data-callback="loadSettingsSection" data-file="setting/settings.html" data-title="Ajustes">
              <button class="dropdown-item d-block d-md-none" type="button">Ajustes</button>
            </li>
            <li>
              <a href="./model/logout.php" class="text-decoration-none">
                <button class="dropdown-item" type="button">Cerrar sesión</button></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pageContent">

      <div id="pageContainer">

      </div>

      <div id="alertContainer" class="m-2">

      </div>
    </div>
  </div>

  <template id="alertTemplate">
    <div class="alert fade alert-dismissible fade show align-content-sm-between position-absolute w-100 mb-2" data-id="0" role="alert">
      <div class="d-flex">
        <i class=' fs-3 pe-2 bx '></i>
        <span> You should check in on some of those fields below.</span>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </template>

  <?php include('./view/modules/footer.php'); ?>
  <script src="./sw.js"></script>

</body>

</html>