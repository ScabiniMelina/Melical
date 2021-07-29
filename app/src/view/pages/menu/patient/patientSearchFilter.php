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
        <div class="row-12 pb-3 align-baseline" id="contenedorFiltros">
        </div>
        <div class="row">
            <!-- <div class="col-5 col-md-12">  -->
                <ul class="nav nav-pills nav-tabs mb-3 card-header-pills card m-0 p-0 d-flex w-100 flex-wrap  flex-row nav-justified" id="pills-tab-seccion" role="tablist">   
                    <li class="nav-item text-sm-center" role="presentation">
                        <button class="nav-link active btn-sm" id="pills-fecha-tab" data-bs-toggle="pill" data-bs-target="#pills-fecha" type="button" role="tab" aria-controls="pills-fecha" aria-selected="false">Fecha</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-enfermedad-tab" data-bs-toggle="pill" data-bs-target="#pills-enfermedad" data-table="tipo_enfermedad" data-columna_id="ID_TIPO_ENFERMEDAD" data-columna_lista="enfermedad" data-datalist="datalistEnfermedad" type="button" role="tab" aria-controls="pills-enfermedad" aria-selected="true">Enfermedad</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-complicacion-tab" data-table="PERSONAL_INFORMATION" data-columna_id="ID_DNI" data-columna_lista="name" data-datalist="datalistComplicacion" data-bs-toggle="pill" data-bs-target="#pills-complicacion" type="button" role="tab" aria-controls="complicacion" aria-selected="false">Complicación</button>
                    </li>
                
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-tratamiento-tab" data-table="tipo_tratamiento" data-columna_id="ID_TIPO_TRATAMIENTO" data-columna_lista="tratamiento" data-datalist="datalistTratamiento" data-bs-toggle="pill" data-bs-target="#pills-tratamiento" type="button" role="tab" aria-controls="pills-tratamiento" aria-selected="false">Tratamiento</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-tratamiento-tab" data-table="tipo_tratamiento" data-columna_id="ID_TIPO_TRATAMIENTO" data-columna_lista="tratamiento" data-datalist="datalistTratamiento" data-bs-toggle="pill" data-bs-target="#pills-tratamiento" type="button" role="tab" aria-controls="pills-tratamiento" aria-selected="false">Estudios</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-antecedente-tab" data-bs-toggle="pill" data-table="subtipo_antecedente" data-columna_id="ID_SUBTIPO_ANTECEDENTE" data-columna_lista="subtipo_antecedente" data-datalist="datalistAntecedente" data-bs-target="#pills-antecedente" type="button" role="tab" aria-controls="pills-antecedente" aria-selected="false">Antecedente</button>
                    </li>

                
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-sintoma-tab" data-bs-toggle="pill" data-table="tipo_sintoma" data-columna_id="ID_TIPO_SINTOMA" data-columna_lista="sintoma" data-datalist="datalistSintoma" data-bs-target="#pills-sintoma" type="button" role="tab" aria-controls="pills-sintoma" aria-selected="false">Sintoma</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-farmaco-tab" data-bs-toggle="pill" data-table="tipo_farmaco" data-columna_id="ID_TIPO_FARMACO" data-columna_lista="farmaco" data-datalist="datalistFarmaco" data-bs-target="#pills-farmaco" type="button" role="tab" aria-controls="pills-farmaco" aria-selected="false">Farmaco</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-datoPersonal-tab" data-bs-toggle="pill" data-bs-target="#pills-datoPersonal" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Identidad</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link nav-link-datalist btn-sm" id="pills-sectorHabitacion-tab" data-bs-toggle="pill" data-bs-target="#pills-sectorHabitacion" type="button" role="tab" aria-controls="pills-sectorHabitacion" aria-selected="false">Área</button>
                    </li>
                </ul>
            <!-- </div> -->
            <div class="tab-content card " id="pills-tabContent">
                <div class="card-body">

                    <div class="tab-pane fade show active" id="pills-fecha" role="tabpanel" aria-labelledby="pills-fecha-tab">
                        <div class="row">
                            <div class="col-12 col-lg-6 pb-3">
                                <label class="form-label form-label-sm">Inicio de internación</label>
                                <input type="datetime-local" class="form-control form-control-sm">
                            </div>
                            <div class="col-12 col-lg-6 pb-3 ">
                                <label class="form-label form-label-sm">Fin de internación</label>
                                <input type="datetime-local" class="form-control form-control-sm" value="<?php echo date("Y-m-d"); ?>">
                            </div>
                        </div>
                    </div>
    
                    <div class="tab-pane fade" id="pills-enfermedad" role="tabpanel" aria-labelledby="pills-enfermedad-tab">
                        
                    </div>
    
                    <div class="tab-pane fade" id="pills-complicacion" role="tabpanel" aria-labelledby="pills-complicacion-tab">
                      
    
                    </div>
                    <div class="tab-pane fade" id="pills-tratamiento" role="tabpanel" aria-labelledby="pills-tratamiento-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="pills-antecedente" role="tabpanel" aria-labelledby="pills-antecedente-tab">
                       
                    </div>
    
                    <div class="tab-pane fade" id="pills-sintoma" role="tabpanel" aria-labelledby="pills-sintoma-tab">
                        
                    </div>
    
                    <div class="tab-pane fade" id="pills-farmaco" role="tabpanel" aria-labelledby="pills-farmaco-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="pills-datoPersonal" role="tabpanel" aria-labelledby="pills-datoPersonal-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="pills-sectorHabitacion" role="tabpanel" aria-labelledby="pills-sectorHabitacion-tab">
                       
                    </div>
                </div>
    
            </div>
            <div class="position-relative">
                <button class="btn btn-primary btn-sm me-3 position-fixed bottom-0 end-0" type="button" id="obtenerBusquedaFiltrado"><i class='bx bx-search'></i></button>
            </div>
         </div>
    </div>

    <template id="containerDatalist">
        <div class="row pb-3 fila">
            <div class="col pe-0 ">
                <input class="form-control form-control-sm inputDatalist" list="" placeholder="Buscar..">
                <datalist>
                    
                </datalist>
            </div>
            <div class="col-auto">
                <button class="btn btn-primary btn-sm btn-datalist" type="button"><i class='bx bx-plus'></i></button>
            </div>
        </div>
    </template>
    
    <template id="opcionFiltro">
        <button type="button" class="btn btn-dark rounded-pill py-0 mb-1">
            <span></span>
            <i class='bx bx-x-circle align-baseline ps-1'></i>
        </button>
    </template>
    
</body>

</html>