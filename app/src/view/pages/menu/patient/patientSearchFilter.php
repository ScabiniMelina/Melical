<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Melical</title>
</head>

<body>
    <div class="container pagina pt-3 ">
        <div class="row-12 pb-3 align-baseline" id="badgeContainer">

        </div>
        <ul class="nav nav-pills nav-tabs mb-3 card-header-pills card m-0 p-0 d-flex w-100 flex-wrap  flex-row nav-justified" id="pills-tab-seccion" role="tablist">
            <li class="nav-item text-sm-center" role="presentation">
                <button class="nav-link active btn-sm" id="pills-fecha-tab" data-bs-toggle="pill" data-bs-target="#pills-fecha" type="button" role="tab" aria-controls="pills-fecha" aria-selected="false">Fecha</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link addDatalistGroupingFromFilterMenu btn-sm" id="pills-enfermedad-tab" data-bs-toggle="pill" data-bs-target="#pills-enfermedad" type="button" role="tab" aria-controls="pills-enfermedad" aria-selected="true">Enfermedad</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link addDatalistGroupingFromFilterMenu btn-sm" id="pills-complicacion-tab" data-bs-toggle="pill" data-bs-target="#pills-complicacion" type="button" role="tab" aria-controls="complicacion" aria-selected="false">Complicación</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" data-bs-toggle="pill" data-bs-target="#pills-tratamiento" type="button" role="tab" aria-controls="pills-tratamiento" aria-selected="false">Tratamiento</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" data-bs-toggle="pill" data-bs-target="#pills-estudio" type="button" role="tab" aria-controls="pills-estudio" aria-selected="false">Estudios</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" id="pills-antecedente-tab" data-bs-toggle="pill" data-bs-target="#pills-antecedente" type="button" role="tab" aria-controls="pills-antecedente" aria-selected="false">Antecedente</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" id="pills-sintoma-tab" data-bs-toggle="pill" data-bs-target="#pills-sintoma" type="button" role="tab" aria-controls="pills-sintoma" aria-selected="false">Sintoma</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" id="pills-farmaco-tab" data-bs-toggle="pill" data-bs-target="#pills-farmaco" type="button" role="tab" aria-controls="pills-farmaco" aria-selected="false">Farmaco</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm" id="pills-datoPersonal-tab" data-bs-toggle="pill" data-bs-target="#pills-datoPersonal" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Identidad</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link nav-link-datalist btn-sm addDatalistGroupingFromFilterMenu" id="pills-sectorHabitacion-tab" data-bs-toggle="pill" data-bs-target="#pills-sectorHabitacion" type="button" role="tab" aria-controls="pills-sectorHabitacion" aria-selected="false">Área</button>
            </li>
        </ul>
        <form class="searchPatientsByFilter tab-content card p-2" id="containerFilterElements">

            <div class="tab-pane fade show active" id="pills-fecha" role="tabpanel" aria-labelledby="pills-fecha-tab">
                <div class="row">
                    <div class="col-12 col-lg-6 pb-3">
                        <label class="form-label form-label-sm">Inicio de internación</label>
                        <input type="datetime-local" class="form-control form-control-sm filterInput" data-id="0" name="startOfHospitalization">
                    </div>
                    <!-- TODO: MELI COMPROBAR EN EL PHP QUE ESTA FECHA SEA MAYOR A LA DE INICO Y TIRAR UNA ALERTA -->
                    <div class="col-12 col-lg-6 pb-3 ">
                        <label class="form-label form-label-sm">Fin de internación</label>
                        <input type="datetime-local" class="form-control form-control-sm filterInput" data-id="1" name="endOfHospitalization">
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="pills-enfermedad" role="tabpanel" aria-labelledby="pills-enfermedad-tab" data-condition="enfermedad" data-file="MedicalCareTypeDetailList" data-name="enfermedad[]">

            </div>

            <div class="tab-pane fade" id="pills-complicacion" role="tabpanel" aria-labelledby="pills-complicacion-tab" data-condition="complicacion" data-file="MedicalCareTypeDetailList" data-name="conplicacion[]">


            </div>
            <div class="tab-pane fade" id="pills-tratamiento" role="tabpanel" aria-labelledby="pills-tratamiento-tab" data-condition="tratamiento" data-file="MedicalCareTypeDetailList" data-name="tratamiento[]">

            </div>
            <div class="tab-pane fade" id="pills-estudio" role="tabpanel" aria-labelledby="pills-estudio-tab" data-condition="estudio" data-file="MedicalCareTypeDetailList" data-name="estudio[]">

            </div>
            <div class="tab-pane fade" id="pills-antecedente" role="tabpanel" aria-labelledby="pills-antecedente-tab" data-condition="antecedente" data-file="MedicalCareTypeDetailList" data-name="antecedente[]">

            </div>

            <div class="tab-pane fade" id="pills-sintoma" role="tabpanel" aria-labelledby="pills-sintoma-tab" data-condition="sintoma" data-file="MedicalCareTypeDetailList" data-name="sintoma[]">

            </div>

            <div class="tab-pane fade" id="pills-farmaco" role="tabpanel" aria-labelledby="pills-farmaco-tab" data-condition="farmaco" data-file="MedicalCareTypeDetailList" data-name="farmaco[]">

            </div>
            <div class="tab-pane fade" id="pills-datoPersonal" role="tabpanel" aria-labelledby="pills-datoPersonal-tab">
                <div class="col-12 mb-3">
                    <label class="form-label">Sexo</label>
                    <select name="gender" class="form-select form-select-sm filterInput" data-id="2">
                        <option value="default"></option>
                        <option value="0">Femenino</option>
                        <option value="1">Masculino</option>
                        <option value="2">Otro</option>
                    </select>
                </div>
                <div class="col-12">
                    <label class="form-label">Edad</label>
                    <div class="input-group mb-3">

                        <input type="text" class="form-control form-control-sm filterInput"  name="minimumAge"placeholder="Mayor a" data-id="3">

                        <input type="text" class="form-control form-control-sm filterInput" name="maximumAge" placeholder="Menor a" data-id="4">
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-sectorHabitacion" role="tabpanel" aria-labelledby="pills-sectorHabitacion-tab" data-file="HospitalSectorsList" data-name="habitacion[]">

            </div>
            <div class="position-relative">
                <button class="btn btn-primary btn-sm me-3 position-fixed bottom-0 end-0" type="submit" data-file="PatientByFilter">
                    <i class='bx bx-search'></i>
                </button>
            </div>
        </form>
    </div>

    <template id="datalistTemplate">
        <div class="row pb-3 datalistGrouping" data-id="5">
            <div class="col pe-0 ">
                <!-- <input class="form-control form-control-sm inputDatalist" list="" placeholder="Buscar.."> -->
                <select class="form-select form-select-sm getSelectOption" data-file="" data-condition="">

                </select>
            </div>
            <div class="col-auto">
                <button class="btn btn-primary btn-sm btn-datalist" type="button"><i class='bx bx-plus'></i>
                </button>
                <button class="btn btn-primary btn-sm btn-datalist" type="button"><i class='bx bx-minus'></i>
                </button>
            </div>
        </div>
    </template>

    <template id="badgeTemplate">
        <button type="button" class="btn btn-dark rounded-pill py-0 mb-1 px-2 badgeElement">
            <span></span>
            <i class='bx bx-x-circle align-baseline ps-1'></i>
        </button>
    </template>

</body>

</html>