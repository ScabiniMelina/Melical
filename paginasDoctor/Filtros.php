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
        <div class="row-12 pb-3 align-baseline ">
            <button type="button" class="btn btn-dark rounded-pill py-0 mb-1">
                COVID
                <i class='bx bx-x-circle align-baseline ps-1'></i>
            </button>
            <button type="button" class="btn btn-dark rounded-pill py-0 mb-1">
                Fiebre
                <i class='bx bx-x-circle align-baseline ps-1'></i>
            </button>
            <button type="button" class="btn btn-dark rounded-pill py-0 mb-1">
                Respirador
                <i class='bx bx-x-circle align-baseline ps-1'></i>
            </button>
        </div>
        <div class="row">

            <div class=" col-5 col-md-12  ">

                <ul class="nav nav-pills nav-tabs mb-3 nav-fill flex-column flex-md-row col-md-auto" id="pills-tab"
                    role="tablist">
                    <li class="nav-item flex-sm-fill text-sm-center" role="presentation">
                        <button class="nav-link active btn-sm" id="pills-fecha-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-fecha" type="button" role="tab" aria-controls="pills-fecha"
                            aria-selected="false">Fecha</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link  btn-sm" id="pills-enfermedad-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-enfermedad" type="button" role="tab" aria-controls="pills-enfermedad"
                            aria-selected="true">Enfermedad</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-complicacion-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-complicacion" type="button" role="tab" aria-controls="complicacion"
                            aria-selected="false">Complicación</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-tratamiento-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-tratamiento" type="button" role="tab"
                            aria-controls="pills-tratamiento" aria-selected="false">Tratamiento</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-antecedente-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-antecedente" type="button" role="tab"
                            aria-controls="pills-antecedente" aria-selected="false">Antecedente</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-sintoma-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-sintoma" type="button" role="tab" aria-controls="pills-sintoma"
                            aria-selected="false">Sintoma</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-farmaco-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-farmaco" type="button" role="tab" aria-controls="pills-farmaco"
                            aria-selected="false">Farmaco</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Identidad</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link btn-sm" id="pills-sectorHabitacion-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-sectorHabitacion" type="button" role="tab"
                            aria-controls="pills-sectorHabitacion" aria-selected="false">Área</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content col-7 col-md-12" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-fecha" role="tabpanel"aria-labelledby="pills-fecha-tab">
                    <div class="row">
                        <div class="col-12 col-lg-6 pb-3">
                            <label for="inputFechaInicioBusqueda" class="form-label form-label-sm">Inicio busqueda</label>
                            <input type="date" class="form-control form-control-sm" id="inputFechaInicioBusqueda" value="2021-06-07">
                        </div>
                        <div class="col-12 col-lg-6 ">
                            <label for="inputFechaFinBusqueda" class="form-label form-label-sm">Fin de busqueda</label>
                            <input type="date" class="form-control form-control-sm" id="inputFechaFinBusqueda" value="<?php echo date("Y-m-d");?>">
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-enfermedad" role="tabpanel" aria-labelledby="pills-enfermedad-tab">
                    ..b.</div>
                <div class="tab-pane fade" id="pills-complicacion" role="tabpanel"
                    aria-labelledby="pills-complicacion-tab">c...</div>
                <div class="tab-pane fade" id="pills-tratamiento" role="tabpanel"
                    aria-labelledby="pills-tratamiento-tab">d...</div>
                <div class="tab-pane fade" id="pills-antecedente" role="tabpanel"
                    aria-labelledby="pills-antecedente-tab">.m..</div>
                <div class="tab-pane fade" id="pills-sintoma" role="tabpanel" aria-labelledby="pills-sintoma-tab">

                    <div class="row pb-3">
                        <div class="col pe-0 ">

                            <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                placeholder="Type to search...">
                            <datalist class="" id="datalistOptions" style="background-color: blueviolet;">
                                <option value="San Francisco" style="background-color: cyan;">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="Chicago">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                            </datalist>
                        </div>
                        <div class="col-auto">

                            <button class="btn btn-primary btn-sm" type="button"><i class='bx bx-minus'></i></button>
                        </div>
                    </div>



                    <div class="row pb-3">
                        <div class="col pe-0 ">

                            <input class="form-control form-control-sm" list="datalistOptions" id="exampleDataList"
                                placeholder="Type to search...">
                            <datalist class="" id="datalistOptions" style="background-color: blueviolet;">
                                <option value="San Francisco" style="background-color: cyan;">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="Chicago">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                                <option value="San Francisco">
                                <option value="New York">
                                <option value="Seattle">
                                <option value="Los Angeles">
                            </datalist>
                        </div>
                        <div class="col-auto">

                            <button class="btn btn-primary btn-sm" type="button"><i class='bx bx-plus'></i></button>
                        </div>
                    </div>

                </div>
                <div class="tab-pane fade" id="pills-farmaco" role="tabpanel" aria-labelledby="pills-farmaco-tab">f...
                </div>
                <div class="tab-pane fade" id="pills-datoPersonal" role="tabpanel"
                    aria-labelledby="pills-datoPersonal-tab">

                </div>
                <div class="tab-pane fade" id="pills-sectorHabitacion" role="tabpanel"
                    aria-labelledby="pills-sectorHabitacion-tab">h...</div>
            </div>

        </div>
        <div class="position-relative">
            <button class="btn btn-primary  me-3  position-fixed bottom-0 end-0" type="button" id="agregarPaciente"><i class='bx bx-search' ></i></button>
        </div>   
    </div>
   
</body>

</html>