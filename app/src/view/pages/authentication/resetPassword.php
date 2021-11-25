<!DOCTYPE html>
<html>

<head>
	<title></title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!--ICONO DE LA APP -->
	<link rel="shortcut icon" sizes="48x48" type="image/png" href="../../assets/img/maskable_icon_x48.png">
	<link rel="shortcut icon" sizes="128x128" type="image/png" href="../../assets/img/maskable_icon_x128.png">
	<link rel="shortcut icon" sizes="512x512" type="image/png" href="../../assets/img/maskable_icon_x512.png">

	<?php include('../../modules/header.php'); ?>

	<!-- ICON -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
	<div class="container-fluid p-0 vh-100 justify-content-center overflow-auto">
		<div id="alertContainer" class="m-2">
		</div>
		<div class="row h-100 align-content-between">
			<div id="wave-container" class="col-12 css-0 eepbx3x0">
				<svg class="m-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#063f5a" fill-opacity="1" d="M0,160L40,138.7C80,117,160,75,240,58.7C320,43,400,53,480,96C560,139,640,213,720,245.3C800,277,880,267,960,250.7C1040,235,1120,213,1200,218.7C1280,224,1360,256,1400,272L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
					</path>
				</svg>
			</div>

			<div class="col-12">
				<div class="container h-auto">
					<h1 class="display-5 fuente-color-primary lead">Cambia tu contraseña</h1>
					<form class="row g-3 pb-3 pt-4 needs-validation" novalidate>
						<div class="col-12 col-sm-6">
							<label class="form-label">Nueva contraseña</label>
							<div class="d-flex h-auto passwordContainer col-12">
								<input id="passwordInput" type="password" class="form-control d-block passwordInput" name="password" autocomplete="on" required>
								<button id="show_password" class="btn btn-primary" type="button"> <span class="fa fa-eye-slash icon"></span></button>
							</div>
						</div>
						<div class="col-12 col-sm-6">
							<label class="form-label">Confirmación de la nueva contraseña</label>
							<div class="d-flex h-auto passwordContainer col-12">
								<input id="passwordInput" type="password" class="form-control d-block passwordInput" name="password" autocomplete="on" required>
								<button id="show_password" class="btn btn-primary" type="button"> <span class="fa fa-eye-slash icon"></span></button>
							</div>
						</div>
						<div class="col-12 justify-self-center text-sm-start">
							<button class="btn btn-primary mt-3 text-align-center text-nowrap text-sm-center postInformation authentificationForm" type="submit" data-file="ChangePassword" data-redirect="./login.php" id="" role=" button">Continuar</button>
						</div>
					</form>
				</div>
			</div>

			<div id="wave-container" class=" col-12 css-0 eepbx3x0 m-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#063f5a" fill-opacity="1" d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,
          138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,
          320,384,320,288,320C192,320,96,320,48,320L0,320Z">
					</path>
				</svg>
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
	<?php include('../../modules/footer.php'); ?>
</body>

</html>