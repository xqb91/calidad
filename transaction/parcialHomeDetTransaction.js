

var tablaEjecutivos;
var irqljob = $("#irqljob").val();
var ejecutivoBck = null;
var statusBck = null;

$(document).ready(function(){

	//validando localstorage de bloqueo
	if(localStorage.getItem('bloqueoParcial') == null) {
		localStorage.setItem('bloqueoParcial', 0); 
	}

	if(localStorage.getItem('bloqueoParcial') == 1) {
		 $(window).on('beforeunload', function(){
                  return 'Seguro de salir sin bloquear las evaluaciones?';
           });
	}else{
		$(window).off('beforeunload');
	}


	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identificando');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('Un momento, por favor...');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
					$("#slcArea").attr('disabled', 'disabled');
					$("#slcPeriodo").attr('disabled', 'disabled');
					$("#tblInfoEvaluacion").hide();
					$("#btnDownloadAudioEvalClicked").hide();
					$("#btnDownloadPDFEvalClicked").hide();
					$("#btnGenerarEva").attr('ejecutivo', irqljob);

					$.ajax({
						    type: 'post',
						    url: 'core/HomeReceiveAreaFromIndex.php',
						    beforeSend: function() {
						        //inicializando modal que valida sesión de raulí
						        $("#modalHomeConfig").attr('class', 'modal-dialog');
						        $("#modalHome").modal('show');
								$("#modalHomeTitle").text('Espere un momento');
								$("#modalHomeBtnCerrar").hide();
								$("#modalHomeCerrarVentana").hide();
								$("#modalHomeBtnAccion").hide();
								$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
						    },
						    statusCode: {
						            404: function(responseObject, textStatus, errorThrown) {
						            	$("#modalHome").modal('show');
						                $("#modalHomeTitle").text('Problema al cargar el periodo');
						                $("#modalHomeContenido").attr('align', 'left');
						                $("#modalHomeCerrarVentana").show();
						                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
						                $("#modalHomeBtnCerrar").show();
						                $("#modalHomeBtnCerrar").text('Cerrar');
						                $("#modalHomeBtnAccion").hide();
						            },
						            200: function(responseObject, textStatus, errorThrown) {
						                var resultados = JSON.parse(responseObject);
						               	$("#slcArea").append('<option value="'+resultados.codigo_area+'">'+resultados.nombre_area+'</option>');
						               	
						               	///************************** obtener el periodo que ejecutivo seleccionó para trabajar ****************************************
										$.ajax({
										    type: 'post',
										    url: 'core/HomeReceivePeriodoFromIndex.php',
										    beforeSend: function() {
										        //inicializando modal que valida sesión de raulí
										        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
										    },
										    statusCode: {
										            404: function(responseObject, textStatus, errorThrown) {
										            	$("#modalHome").modal('show');
										                $("#modalHomeTitle").text('Problema al cargar el periodo');
										                $("#modalHomeContenido").attr('align', 'left');
										                $("#modalHomeCerrarVentana").show();
										                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
										                $("#modalHomeBtnCerrar").show();
										                $("#modalHomeBtnCerrar").text('Cerrar');
										                $("#modalHomeBtnAccion").hide();
										            },
										            200: function(responseObject, textStatus, errorThrown) {
										                var resultados = JSON.parse(responseObject);
										               
										                 $.each(resultados.periodos, function (index, value) {
										                    //dataArray.push([value["yourID"].toString(), value["yourValue"] ]);
										                    $("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
										                    $("#tblEjecutivoPeriodo").html(value);
										                 	
										                }); 

														/// CARGAR RESTO DE AREAS ******************************************************************************************
														$.ajax({
														    type: 'post',
														    url: 'core/ListAreas.php',
														    beforeSend: function() {
														        //inicializando modal que valida sesión de raulí
														        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recuperando áreas del sistema...');
														    },
														    statusCode: {
														            404: function(responseObject, textStatus, errorThrown) {
														            	$("#modalHome").modal('show');
														                $("#modalHomeTitle").text('Problema al cargar las áreas');
														                $("#modalHomeContenido").attr('align', 'left');
														                $("#modalHomeCerrarVentana").show();
														                $("#modalHomeContenido").html('No se encontró respuesta del servidor para las áreas disponibles para trabajar<br /><strong>HTTP 404</strong>');
														                $("#modalHomeBtnCerrar").show();
														                $("#modalHomeBtnCerrar").text('Cerrar');
														                $("#modalHomeBtnAccion").hide();
														            },
														            200: function(responseObject, textStatus, errorThrown) {
														                var resultados = JSON.parse(responseObject);
														                 $.each(resultados, function (index, value) {
														                    if($("#slcArea :selected").text() != value.nombre_area) {
														                    	$("#slcArea").append('<option value="'+value.codigo_area+'">'+value.nombre_area+'</option>');
														                    }
														                });


														                // cargar resto de periodos disponibles ************************************************************
													                	$.ajax({
																			    type: 'post',
																			    url: 'core/ListPeriodosParaEvaluar.php',
																			    beforeSend: function() {
																			        //inicializando modal que valida sesión de raulí
																			        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo periodos válidos para trabajar...');
																			    },
																			    statusCode: {
																			            404: function(responseObject, textStatus, errorThrown) {
																			            	$("#modalHome").modal('show');
																			                $("#modalHomeTitle").text('Problema al cargar el periodo');
																			                $("#modalHomeContenido").attr('align', 'left');
																			                $("#modalHomeCerrarVentana").show();
																			                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
																			                $("#modalHomeBtnCerrar").show();
																			                $("#modalHomeBtnCerrar").text('Cerrar');
																			                $("#modalHomeBtnAccion").hide();
																			            },
																			            200: function(responseObject, textStatus, errorThrown) {
																			                var resultados = JSON.parse(responseObject);
																			               
																			                 $.each(resultados.periodos, function (index, value) {
																			                    if($("#slcPeriodo :selected").text() != value) {
																			                    	$("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
																			                    }
																			                }); 
																							$("#slcPeriodo").removeAttr('disabled');

																			               // CARGAR EJECUTIVOS SEGUN AREA *******************************************************************
																			                var area 	= $('#slcArea :selected').val();
																			             	//trayendo información en paralelo del ejecutivo
																				             	$.ajax({
																				             		type: 'post',
																				             		url: 'core/resumenEjecutivo.php',
																				             		data: 'ejecutivo='+irqljob,
																				             		beforeSend: function() {
																				             			$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo información del ejecutivo...');
																				             		},
																				             		statusCode: {
																				             			500: function(responseObject, textStatus, errorThrown) {
																											$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Ejecutivo no existe');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																				             			},
																				             			301: function(responseObject, textStatus, errorThrown) {
																											$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Error crítico');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																				             			},
																				             			200: function(responseObject, textStatus, errorThrown) {
																				             				var resultado = JSON.parse(responseObject);
																				             				ejecutivoBck = resultado;
																				             				$("#tblEjecutivoNombre").html('<i class="fas fa-user-tie"></i> <b style="text-transform:capitalize;">'+resultado[0].ejecutivo.nombre_ejecutivo+'</b><br /><span class="badge badge-secondary" style="font-size: 12px;"><b>'+resultado[0].area.nombre_area+'</b> <em>'+resultado[0].ciclo.nombre_ciclo+' '+resultado[0].jornada.nombre_ciclo+'</em></span>');

																				             			}
																				             		}
																				             	});

																								$.ajax({
																				             		type: 'post',
																				             		url: 'core/ResumenEvaluacionParcialEjecutivo.php',
																				             		data: 'ejecutivo='+irqljob,
																				             		beforeSend: function() {
																				             			$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo información del ejecutivo...');
																				             		},
																				             		statusCode: {
																				             			500: function(responseObject, textStatus, errorThrown) {
																											$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Ejecutivo no existe');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																				             			},
																				             			301: function(responseObject, textStatus, errorThrown) {
																											$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Error crítico');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																				             			},
																				             			200: function(responseObject, textStatus, errorThrown) {
																				             				var resultado = JSON.parse(responseObject);

																				             				statusBck = resultado;

																				             				if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
																				             					$("#btnGenerarEva").prop('disabled', true);
																				             					$("#btnUnlockEvas").removeProp('disabled');
																				             					$("#btnGenerarEva").html('<i class="fas fa-lock"></i> <strong>Bloqueado porque existe Evaluación Final</strong>');
																				             				}else if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 1){
																				             					$("#btnGenerarEva").removeAttr('disabled');
																												$("#btnGenerarEva").html('<i class="fas fa-plus-square"></i> Generar Evaluación');
																												$("#btnUnlockEvas").removeAttr('disabled');
																												$("#btnUnlockEvas").attr('class', 'btn-danger btn-sm');
																												$("#btnUnlockEvas").attr('title', 'Bloquear y actualizar');
																												$("#btnUnlockEvas").html('<i class="fas fa-lock"></i> <strong>Bloquear</strong>');
																				             				}

																				             				//habilitacion de bonton de desbloqueo
																				             				if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
																				             					$("#btnUnlockEvas").removeAttr('disabled');
																				             				}

																				             				if(resultado.parciales == null) {
																				             					$("#tblEjecutivoCantidad").html('0');
																				             				}else{
																				             					$("#tblEjecutivoCantidad").html(resultado.parciales.length);
																				             				}
																				             				
																				             				if(resultado.efinal == null) {
																				             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary id="btnFastPDFFinal" disabled="disabled"><i class="fas fa-flag"></i> -.-- PDF</button> <button type="button" class="btn btn-warning" id="btnCrearFinal"><i class="fas fa-asterisk"></i></button></div>');
																				             				}else{
																				             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary" id="btnFastPDFFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-flag"></i> <strong>'+parseFloat(resultado.efinal.nota).toFixed(2)+'</strong> PDF</button> <button type="button" class="btn btn-warning" id="btnEditarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger" id="btnEliminarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="far fa-trash-alt"></i></button></div>');
																				             				}

																				             				if(resultado.quincenal == null) {
																				             					$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-calendar-check"></i> <strong>-.--</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
																				             				}else{
																				             					if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
																				             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'" disabled="disabled"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
																				             					}else{
																				             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-trash-alt"></i></button></div>');
																				             					}
																				             				}

																				             				if(resultado.parciales == null)  {
																				             					var fila = '';
																				             					fila = fila + '<tr>';
				                            																	fila = fila + '<td colspan="5">No se han ingresado evaluaciones para este ejecutivo</td>';
				                          																		fila = fila + '</tr>';
				                          																		$("#tablaEvaluacionesGeneradas").append(fila);
																				             				}else{
																					             				$.each(resultado.parciales, function(i,v) {

																					             					var fila = '';
																					             					//validando si requiere corrección
																					             					if(v.estado == 2) { 
																					             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-danger">';  
																					             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-danger"><i class="fas fa-exclamation-circle"></i> Requiere Revisión</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
																					             					}else if(v.estado == 4) {
																					             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-success">'; 
																					             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-success"><i class="fas fa-check"></i> Revisada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
																					             					}else if(v.estado == 7) {
																					             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-warning">'; 
																					             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-warning"><i class="far fa-tired"></i> Apelada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
																					             					}else{ 
																					             						fila = fila +'<tr evaluacion="'+v.evaluacion+'">'; 
																					             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación</strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
																					             					}
																					             					
																						                          
																													fila = fila +'<td width="200px"><div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-danger btn-sm"><strong>PDF</strong></button><button type="button" class="btn btn-success" evaluacion="'+v.evaluacion+'" role="excel"><strong>Excel</strong></button></div></td>';
																						                           	if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';
																						                            }else if(v.estado == 9) {
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" disabled="disabled" class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';																		                            	
																						                            }else{
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>';
																						                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';																		                            	
																						                            }
																						                            fila = fila +'<td style="width:10%; text-align: center;"><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
																						                          	fila = fila +'</tr>';
																						                          	$("#tablaEvaluacionesGeneradas").append(fila);
																					             				});


																												//elementos clickeados en la tabla para mostrar los datos en el card del lado derecho
																												$('#tablaEvaluacionesGeneradas tr').click(function() {
																													var evalclicked = $(this).attr('evaluacion');
																													$.ajax({
																									             		type: 'post',
																									             		url: 'core/infoEvaluacionParcial.php',
																									             		data: 'evaluacion='+evalclicked,
																									             		beforeSend: function() {
																									             			$("#tblInfoEvaluacion").hide();
																									             			$("#lblInfoEvaluacion").show();
																									             			$("#btnDownloadAudioEvalClicked").hide();
																															$("#btnDownloadPDFEvalClicked").hide();
																									             			$("#lblInfoEvaluacion").html('<img src="facade/img/loading.gif" /><br />Cargando Información de la evaluación parcial...');
																									             		},
																									             		statusCode: {
																									             			301: function(responseObject, textStatus, errorThrown) {
																																$("#modalHome").modal('show');
																												                $("#modalHomeTitle").text('Ejecutivo no existe');
																												                $("#modalHomeContenido").attr('align', 'left');
																												                $("#modalHomeCerrarVentana").show();
																												                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
																												                $("#modalHomeBtnCerrar").show();
																												                $("#modalHomeBtnCerrar").text('Cerrar');
																												                $("#modalHomeBtnAccion").hide();
																									             			},
																									             			200: function(responseObject, textStatus, errorThrown) {
																									             				var resultado = JSON.parse(responseObject);
																									             				if(resultado[0] == null) {
																									             					$("#lblInfoEvaluacion").show();
																									             					$("#lblInfoEvaluacion").html('La evaluación esta generada pero sus items no han sido evaluados');
																									             					$("#tblInfoEvaluacion").hide();
																									             					$("#btnDownloadAudioEvalClicked").hide();
																																	$("#btnDownloadPDFEvalClicked").hide();
																									             				}else{
																									             					$("#lblInfoEvaluacion").hide();
																									             					$("#tblInfoEvaluacionT1").html(resultado[0].nombre_categoria);
																									             					$("#tblInfoEvaluacionT2").html(resultado[1].nombre_categoria);
																									             					$("#tblInfoEvaluacionT3").html(resultado[2].nombre_categoria);

																									             					$("#tblInfoEvaluacionV1").html(resultado[0].nota_categoria);
																									             					$("#tblInfoEvaluacionV2").html(resultado[1].nota_categoria);
																									             					$("#tblInfoEvaluacionV3").html(resultado[2].nota_categoria);
																									             					$("#tblInfoEvaluacionVNF").html(resultado[0].nota_parcial);

																																	$("#btnDownloadAudioEvalClicked").show();
																																	$("#linkBtnDownloadAudioEvalClicked").attr('href', 'files/audio/'+resultado[0].audio);
																																	
																																	$("#btnDownloadPDFEvalClicked").show();
																																	$("#btnDownloadPDFEvalClicked").attr('evaluacion', evalclicked);

																									             					$("#tblInfoEvaluacion").show();
																									             				}
																									             			}
																									             		}
																									             	});
																												});

																												
																												// DESBLOQUEO MANUAL-------------------------------------------------------------------------
																												$("#btnUnlockEvas").click(function() {
																													if($("#btnUnlockEvas").text() == " Bloquear") {
																														$(window).off('beforeunload');
																														//actualizar aqui

																														$("#btnGenerarEva").attr('disabled', 'disabled');
																														$("#btnGenerarEva").html('<i class="fas fa-lock"></i> <strong>Bloqueado porque existe Evaluación Final</strong>');

																														$("#btnRegenerarQuincenal").attr('disabled', 'disabled');
																														$("#btnEliminarQuincenal").attr('disabled', 'disabled');

																														$.each($("#tablaEvaluacionesGeneradas button.btn.btn-danger.btn-sm"), function(a,b) {
																															$(this).attr('disabled', 'disabled');
																															$(this).html('<i class="fas fa-lock"></i>');
																														});

																														$.each($("#tablaEvaluacionesGeneradas button.btn.btn-warning.btn-sm"), function(a,b) {
																															$(this).attr('disabled', 'disabled');
																															$(this).html('<i class="fas fa-lock"></i>');
																														});

																														$("#btnUnlockEvas").attr('class', 'btn-secondary btn-sm');
																														$("#btnUnlockEvas").attr('title', 'Bloquear y actualizar');
																														$("#btnUnlockEvas").html('<i class="fas fa-lock-open"></i>');

																														if(localStorage.getItem('bloqueoParcial') == null) {
																															localStorage.setItem('bloqueoParcial', 0); 
																														}else{
																															localStorage.setItem('bloqueoParcial', 0);
																														}
																													}else{
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-lg');
																																		$("#modalHomeTitle").html('<i class="fas fa-key"></i> Desbloqueo de Evaluaciones');
																																		$("#modalHomeContenido").html('<h5><i class="fas fa-exclamation-triangle"></i> Importante</h5><p class="text-danger">Este proceso desbloquea de forma manual las evaluaciones que se encuentran generadas dentro del sistema, <strong>lo que se traduce en que las notas de las evaluaciones quincenales y finales podrían no actualizarse al modificar una o mas evaluaciones parciales si usted no vuelve a bloquearlas manualmente</strong>. <strong><u>Es su resposabilidad</u></strong> validar que los cambios se guarden de forma correcta dentro del sistema validando las evaluaciones quincenal y final.</p>Este desbloqueo será registrado para respaldo en posibles futuras auditorías:<br />Ejecutivo a desbloquear: <strong>'+ejecutivoBck[0].ejecutivo.rut_ejecutivo+' '+ejecutivoBck[0].ejecutivo.nombre_ejecutivo+'</strong><br />Periodo: <strong>'+$("#slcPeriodo").val()+'</strong>');
																														            	$("#modalHomeBtnCerrar").show();
																																		$("#modalHomeBtnCerrar").text('Cancelar Desbloqueo');
																																		$("#modalHomeCerrarVentana").hide();
																																		$("#modalHomeBtnAccion").show();
																																		$("#modalHomeBtnAccion").text('Entiendo, Desbloquear');
																																		$("#modalHome").modal('show');
																																}
																															}
																														});
																													}
																												});

																												// ------------------------------------------------------------------------------------------


																												// ---- ZONA QUINCENAL ---------------------------------------------------------------------------------------------
																												// 
																												// 22.07.2020 funcion que rescata el PDF de la barra de estado del ejecutivo
																												$("#btnPDFQuincenal").click(function() {
																													var quincenalPDF = $("#btnPDFQuincenal").attr("evaluacion");
																													//generar PDF
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Visualización de Evaluación Quincenal #'+quincenalPDF);
																																		$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+quincenalPDF+'&tipo=quincenal" width="100%" height="600px" />');
																														            	$("#modalHomeBtnCerrar").show();
																																		$("#modalHomeBtnCerrar").text('Cerrar');
																																		$("#modalHomeCerrarVentana").hide();
																																		$("#modalHomeBtnAccion").show();
																																		$("#modalHomeBtnAccion").attr('evaluacion', quincenalPDF);
																																		$("#modalHomeBtnAccion").text('Descargar PDF Quincenal');
																																		$("#modalHome").modal('show');
																																}
																															}
																														});
																												});

																												$("#btnRegenerarQuincenal").click(function() {
																													$.ajax({
																														type: 'get', 
																														url: 'core/SessionManager.php',
																														error: function(XMLHttpRequest, textStatus, errorThrown) {
																															if (XMLHttpRequest.readyState == 0) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Verifique su conexión a internet');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																$("#modalHomeBtnCerrar").show();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																															}
																														},
																														beforeSend: function() {
																															$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identificando');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('Un momento, por favor...');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																														},
																														statusCode : {
																															401: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															403: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															500: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Acceso Restringido');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															503: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Error Crítico');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															200: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeBtnAccion").removeAttr('disabled');
																																$("#modalHomeConfig").attr('class', 'modal-dialog modal-lg');
																															    $("#modalHome").modal('show');
																																$("#modalHomeTitle").html('<i class="far fa-edit"></i> Regenerar Evaluación Quincenal');
																																$("#modalHomeContenido").load('regenerarQuincenal.php?ejecutivo='+irqljob+'&area='+$("#slcArea :selected").val());
																														    	$("#modalHomeBtnCerrar").show();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeBtnAccion").show();
																																$("#modalHomeBtnAccion").attr('disabled', true);
																																$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																																$("#modalHomeBtnAccion").attr('ejecutivo', irqljob);
																																$('#modalHome').click( function() {
																																	if(parseInt(localStorage.getItem('bandeQuincenal')) == 1) {
																																		$("#modalHomeBtnAccion").attr('disabled', false);
																																	}else{
																																		$("#modalHomeBtnAccion").attr('disabled', true);
																																	}
																																});
																															}
																														}
																													});
																												});

																												$("#btnEliminarQuincenal").click(function() {
																													var evaluacion = $("#btnEliminarQuincenal").attr('evaluacion');
																													var respuesta = confirm('Esta a punto de eliminar la evaluación quincenal #'+evaluacion+' de este ejecutivo para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
																													if(respuesta) {
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {						
																																	$.ajax({
																																		url: 'core/EliminarEvaluacionQuincenal.php',
																																		type: 'POST',
																																		data: 'evaluacion='+evaluacion+'',
																																		beforeSend: function() {
																																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																																		    $("#modalHome").modal('show');
																																			$("#modalHomeTitle").html('<i class="fas fa-trash"></i> Eliminación de Evaluación Quincenal #<strong>'+evaluacion+'</strong>');
																																			$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud');
																																	    	$("#modalHomeBtnCerrar").hide();
																																			$("#modalHomeBtnCerrar").text('Cerrar');
																																			$("#modalHomeCerrarVentana").hide();
																																			$("#modalHomeBtnAccion").hide();
																																			$("#modalHomeBtnAccion").attr('disabled', true);
																																			$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																																		},
																																		statusCode: {
																																			500: function(responseObject, textStatus, errorThrown) {
																																				$("#modalHomeContenido").html('La evaluación no fue encontrada, posiblemente ya fue eliminada por otro evaluador [EMPTY PARAMETER] HTTP 500');
																																		    	$("#modalHomeBtnCerrar").show();
																																				$("#modalHomeBtnCerrar").text('Cerrar');
																																				$("#modalHomeCerrarVentana").hide();
																																				$("#modalHomeBtnAccion").hide();
																																			},
																																			501: function(responseObject, textStatus, errorThrown) {
																																				$("#modalHomeContenido").html('Ha ocurrido un error al procesar su solicitud [EMPTY PARAMETER] HTTP 501');
																																		    	$("#modalHomeBtnCerrar").show();
																																				$("#modalHomeBtnCerrar").text('Cerrar');
																																				$("#modalHomeCerrarVentana").hide();
																																				$("#modalHomeBtnAccion").hide();
																																			},
																																			200: function(responseObject, textStatus, errorThrown) {
																																				alert('Evaluación quincenal #'+evaluacion+' eliminada con éxito');
																																				window.location.reload();
																																			}

																																		}
																																	});
																																}
																															}
																														});
																													}

																												})
																												// FIN DE ZONA QUINCENAL -----------------------------------------------------------------------------------------


																												// -------- ZONA FINALES -----------------------------------------------------------------------------------------
																												$("#btnFastPDFFinal").click(function() {
																													var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
																													$.ajax({
																														type: 'get', 
																														url: 'core/SessionManager.php',
																														error: function(XMLHttpRequest, textStatus, errorThrown) {
																															if (XMLHttpRequest.readyState == 0) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Verifique su conexión a internet');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																$("#modalHomeBtnCerrar").show();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																															}
																														},
																														beforeSend: function() {
																															$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identificando');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('Un momento, por favor...');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																														},
																														statusCode : {
																															401: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															403: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															500: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Acceso Restringido');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															503: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Error Crítico');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															200: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																    $("#modalHome").modal('show');
																																	$("#modalHomeTitle").html('<i class="far fa-edit"></i>Evaluación Final</strong>');
																																	$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+nroEvaFinal+'&tipo=final" width="100%" height="600px" />');
																															    	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHomeBtnAccion").text('Descargar Evaluación Final');
																																	$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																															}
																														}
																													});
																												});

																												$("#btnCrearFinal").click(function() {
																													$.ajax({
																														type: 'get', 
																														url: 'core/SessionManager.php',
																														error: function(XMLHttpRequest, textStatus, errorThrown) {
																															if (XMLHttpRequest.readyState == 0) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Verifique su conexión a internet');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																$("#modalHomeBtnCerrar").show();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																															}
																														},
																														beforeSend: function() {
																															$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identificando');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('Un momento, por favor...');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																														},
																														statusCode : {
																															401: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															403: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															500: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Acceso Restringido');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															503: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Error Crítico');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															200: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																    $("#modalHome").modal('show');
																																	$("#modalHomeTitle").html('<i class="far fa-edit"></i> Crear Evaluación Final</strong>');
																																	$("#modalHomeContenido").load('finalCreator.php?ejecutivo='+irqljob);
																															    	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHomeBtnAccion").text('Guardar Evaluación Final');
																																	localStorage.setItem('bloqueoParcial', 1); 
																															}
																														}
																													});
																												})

																												$("#btnEditarFinal").click(function() {
																													var nroEvaFinal = $("#btnEditarFinal").attr("evaluacion");
																													$.ajax({
																														type: 'get', 
																														url: 'core/SessionManager.php',
																														error: function(XMLHttpRequest, textStatus, errorThrown) {
																															if (XMLHttpRequest.readyState == 0) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Verifique su conexión a internet');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																$("#modalHomeBtnCerrar").show();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																															}
																														},
																														beforeSend: function() {
																															$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identificando');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('Un momento, por favor...');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").hide();
																																$("#modalHome").modal('show');
																														},
																														statusCode : {
																															401: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															403: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Identifiquese nuevamente');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															500: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Acceso Restringido');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															503: function(responseObject, textStatus, errorThrown) {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																$("#modalHomeTitle").text('Error Crítico');
																																$("#modalHomeContenido").attr('align', 'left');
																																$("#modalHomeCerrarVentana").show();
																																$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																$("#modalHomeBtnCerrar").hide();
																																$("#modalHomeBtnCerrar").text('Cerrar');
																																$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																$("#modalHomeBtnAccion").show();
																																$("#modalHome").modal('show');
																															},
																															200: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																    $("#modalHome").modal('show');
																																	$("#modalHomeTitle").html('<i class="far fa-edit"></i> Editar Evaluación Final');
																																	$("#modalHomeContenido").load('finalEditor.php?evaluacion='+nroEvaFinal);
																															    	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHomeBtnAccion").text('Finalizar Edición');
																																	$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																															}
																														}
																													});
																												})

																												$("#btnEliminarFinal").click(function() {
																													var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
																													var respuesta = confirm('Esta a punto de eliminar la evaluación final #'+nroEvaFinal+' para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
																													if(respuesta) {
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {		
																																			$.ajax({
																																				url: 'core/EliminarEvaluacionFinal.php',
																																				type: 'POST',
																																				data: 'evaluacion='+nroEvaFinal,
																																				beforeSend: function() {
																																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																																			        $("#modalHome").modal('show');
																																					$("#modalHomeTitle").text('Espere un momento');
																																					$("#modalHomeBtnCerrar").hide();
																																					$("#modalHomeCerrarVentana").hide();
																																					$("#modalHomeBtnAccion").hide();
																																					$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
																																				},
																																				statusCode: {
																																					301: function(responseObject, textStatus, errorThrown) {
																																						$("#modalHomeTitle").text('Error');
																																						$("#modalHomeBtnCerrar").show();
																																						$("#modalHomeCerrarVentana").show();
																																						$("#modalHomeContenido").html('No se ha podido ejecutar su solicitud porque el sistema no recibió los parámetros necesarios para poder llevarla a cabo. HTTP 301');
																																					},
																																					302: function(responseObject, textStatus, errorThrown) {
																																						$("#modalHomeTitle").text('Error');
																																						$("#modalHomeBtnCerrar").show();
																																						$("#modalHomeCerrarVentana").show();
																																						$("#modalHomeContenido").html('La evaluación posiblemente ya fué eliminada por otro evaluador o bien no existe en el sistema. HTTP 302');
																																					},
																																					201: function(responseObject, textStatus, errorThrown) {
																																						$("#modalHomeTitle").text('Error');
																																						$("#modalHomeBtnCerrar").show();
																																						$("#modalHomeCerrarVentana").show();
																																						$("#modalHomeContenido").html('Ocurrió un error al intentar eliminar la evaluación final. HTTP 201');
																																					},
																																					200: function(responseObject, textStatus, errorThrown) {
																																						$("#modalHomeTitle").text('Error');
																																						$("#modalHomeBtnCerrar").show();
																																						$("#modalHomeCerrarVentana").show();
																																						$("#modalHomeContenido").html(responseObject);

																																						$.ajax({
																																						    type: 'post',
																																						    url: 'core/ListEjecutivosPorAreaFinal.php',
																																						    data: 'area='+$("#slcArea").val(),
																																						    beforeSend: function() {
																																						        //inicializando modal que valida sesión de raulí
																																						    },
																																						    statusCode: {
																																						            404: function(responseObject, textStatus, errorThrown) {
																																						            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																						            	$("#modalHome").modal('show');
																																						                $("#modalHomeTitle").text('Problema al cargar el periodo');
																																						                $("#modalHomeContenido").attr('align', 'left');
																																						                $("#modalHomeCerrarVentana").show();
																																						                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
																																						                $("#modalHomeBtnCerrar").show();
																																						                $("#modalHomeBtnCerrar").text('Cerrar');
																																						                $("#modalHomeBtnAccion").hide();
																																						            },
																																						            500: function(responseObject, textStatus, errorThrown) {
																																						            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																						            	$("#modalHome").modal('show');
																																						                $("#modalHomeTitle").text('Ocurrió un error');
																																						                $("#modalHomeContenido").attr('align', 'left');
																																						                $("#modalHomeCerrarVentana").show();
																																						                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT EMPTY</strong>');
																																						                $("#modalHomeBtnCerrar").show();
																																						                $("#modalHomeBtnCerrar").text('Cerrar');
																																						                $("#modalHomeBtnAccion").hide();
																																						            },
																																						            401: function(responseObject, textStatus, errorThrown) {
																																						            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																						            	$("#modalHome").modal('show');
																																						                $("#modalHomeTitle").text('Ocurrió un error');
																																						                $("#modalHomeContenido").attr('align', 'left');
																																						                $("#modalHomeCerrarVentana").show();
																																						                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT NOT NUMBER</strong>');
																																						                $("#modalHomeBtnCerrar").show();
																																						                $("#modalHomeBtnCerrar").text('Cerrar');
																																						                $("#modalHomeBtnAccion").hide();
																																						            },
																																						            301: function(responseObject, textStatus, errorThrown) {
																																						            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																						            	$("#modalHome").modal('show');
																																						                $("#modalHomeTitle").text('Ocurrió un error');
																																						                $("#modalHomeContenido").attr('align', 'left');
																																						                $("#modalHomeCerrarVentana").show();
																																						                $("#modalHomeContenido").html('El área que ha seleccionado no tiene ejecutivos registrados. Por favor contacte a su jefatura para más información<br /><strong>PHP CORE ARRAY CONTROLLER EMPTY</strong>');
																																						                $("#modalHomeBtnCerrar").show();
																																						                $("#modalHomeBtnCerrar").text('Cerrar');
																																						                $("#modalHomeBtnAccion").hide();
																																						            },
																																						            200: function(responseObject, textStatus, errorThrown) {
																																						                var resultados = JSON.parse(responseObject);
																																										if($.trim(responseObject) == "NULL") {
																																				                            alert('No hay valores');
																																				                        }else{
																																				                            var resultado = $.parseJSON(responseObject);
																																				                            alert('Evaluación Final Eliminada');
																																				                            window.location.reload();
																																				                        }
																																						            }           
																																						        }
																																					 	});
																																					}
																																				}
																																			});
																																}
																															}
																														});
																													}
																												});

																												// -----FIN  ZONA FINALES -----------------------------------------------------------------------------------------


																												//Editar Evaluación/eliminar evaluacion / PDF
																												$('#tablaEvaluacionesGeneradas tr').on('click', 'button', function(a) { 
																													var eval = $(this).attr('evaluacion');
																													if($(this).attr('role') == 'editar') {
																														//ejecutar edición
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																		$("#modalHomeBtnAccion").removeAttr('disabled');
																																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																																		$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
																														            	$("#modalHomeBtnCerrar").show();
																																		$("#modalHomeBtnCerrar").text('Cancelar');
																																		$("#modalHomeCerrarVentana").hide();
																																		$("#modalHomeBtnAccion").show();
																																		$("#modalHomeBtnAccion").text('Finalizar Edición Parcial');
																																		$("#modalHome").modal('show');
																																}
																															}
																														});
																													}else if($(this).attr('role') == 'eliminar'){
																														//ejecutar eliminación
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																																				$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																																				$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'?<br /><strong>Esta acción no podrá deshacerse una vez se confirme.</strong>');
																																            	$("#modalHomeBtnCerrar").show();
																																				$("#modalHomeBtnCerrar").text('Cancelar');
																																				$("#modalHomeCerrarVentana").hide();
																																				$("#modalHomeBtnAccion").show();
																																				$("#modalHomeBtnAccion").attr('evaluacion', eval);
																																				$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																																				$("#modalHome").modal('show');
																																}
																															}
																														});
																													}else if($(this).attr('role') == 'pdf'){
																														//generar PDF
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																																$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identificando');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('Un momento, por favor...');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																		$("#modalHomeBtnAccion").removeAttr('disabled');
																																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																																		$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+eval+'&tipo=parcial" width="100%" height="600px" />');
																														            	$("#modalHomeBtnCerrar").show();
																																		$("#modalHomeBtnCerrar").text('Cerrar');
																																		$("#modalHomeCerrarVentana").hide();
																																		$("#modalHomeBtnAccion").show();
																																		$("#modalHomeBtnAccion").attr('evaluacion', eval);
																																		$("#modalHomeBtnAccion").text('Descargar Documento PDF');
																																		$("#modalHome").modal('show');
																																}
																															}
																														});
																													}else if($(this).attr('role') == 'excel'){
																														//generar PDF
																														$.ajax({
																															type: 'get', 
																															url: 'core/SessionManager.php',
																															error: function(XMLHttpRequest, textStatus, errorThrown) {
																																if (XMLHttpRequest.readyState == 0) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																																	$("#modalHomeBtnCerrar").show();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").hide();
																																	$("#modalHome").modal('show');
																																}
																															},
																															beforeSend: function() {
																															},
																															statusCode : {
																																401: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																403: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																500: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Acceso Restringido');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																503: function(responseObject, textStatus, errorThrown) {
																																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																																	$("#modalHomeTitle").text('Error Crítico');
																																	$("#modalHomeContenido").attr('align', 'left');
																																	$("#modalHomeCerrarVentana").show();
																																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																																	$("#modalHomeBtnCerrar").hide();
																																	$("#modalHomeBtnCerrar").text('Cerrar');
																																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																																	$("#modalHomeBtnAccion").show();
																																	$("#modalHome").modal('show');
																																},
																																200: function(responseObject, textStatus, errorThrown) {
																																	var evaluacion 		= eval;
																												                	var tipo 			= 1;
																												                	$("#frmXLSTipo").val(tipo);
																												                	$("#frmXLSEvaluacion").val(evaluacion);
																												                	$("#frmXls").submit();
																																}
																															}
																														});
																													}
																												});

																					             			}
																				             			}
																				             		}
																				             	});


																			             	$("#modalHomeBtnCerrar").click();
																			            }           
																			        }
																		 });
														            }           
														        }
													    });
														//AQUI FINALIZARÁ EL ANIDADO

										            }           
										        }
										});
						            }           
						        }
					 });

					//información de evaluador logueado
					$.ajax({
				        type: 'post',
				        url: 'core/InfoSesionEvaluador.php',
				        beforeSend: function() {
							$("#modalHome").modal('show');
				            //inicializando modal que valida sesión de raulí
				            $("#lblSaludoUsuario").html('<img src="facade/img/loading2.gif" alt="cargando" />');
				            $("#lblMensajeUsuario").html('Estamos cargando tu información personal.');

				        },
				        statusCode: {
				                500: function(responseObject, textStatus, errorThrown) {
					                $("#modalHomeTitle").text('´Problema al cargar el periodo');
					                $("#modalHomeContenido").attr('align', 'left');
					                $("#modalHomeCerrarVentana").show();
					                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
					                $("#modalHomeBtnCerrar").show();
					                $("#modalHomeBtnCerrar").text('Cerrar');
					                $("#modalHomeBtnAccion").hide();
				                },
				                200: function(responseObject, textStatus, errorThrown) {
				                    var resultados = JSON.parse(responseObject);
				                    $("#lblEvaluadorLogin").html('Hola <strong>'+resultados.nombre_evaluador+'!</strong>');
				                    //$("#lblMensajeUsuario").html('Por favor, elige el periodo y área para comenzar a trabajar.');
								}
						}
					});
			}
		}
	});
});

////CIERRE TEMPRANO
$("#cierreTemprano").click(function() {
	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identificando');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('Un momento, por favor...');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
				    $("#modalHome").modal('show');
					$("#modalHomeTitle").html('<i class="fas fa-key"></i> Cierre Temprano');
					$("#modalHomeContenido").load('cierreTemprano.php?ejecutivo='+irqljob);
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeBtnAccion").hide();
					$("#modalHomeBtnAccion").text('Guardar Evaluación Final');
			}
		}
	});
});

///// CAMBIO DE PERIODO ******************************************************************************************************
$("#slcPeriodo").change(function() {
	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identificando');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('Un momento, por favor...');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
					var area 	= $('#slcArea :selected').val();
					var periodo = $('#slcPeriodo :selected').val();

				    $("#modalHomeConfig").attr('class', 'modal-dialog');
				    $("#modalHome").modal('show');
					$("#modalHomeTitle").html('Por Favor Espere');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('');
					$("#modalHomeCerrarVentana").hide();
					$("#modalHomeBtnAccion").hide();
					$("#modalHomeBtnAccion").text('');
					$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo su solicitud...');


					$.ajax({
				        type: 'post',
				        url: 'core/cambiarPeriodoyArea.php',
				        data: 'slcArea='+area+'&slcPeriodo='+periodo,
				        beforeSend: function() {
				            //inicializando modal que valida sesión de raulí
				            $("#modalHome").modal('show');
				            $("#modalHomeTitle").text('Por Favor Espere');
				            $("#lblSaludoUsuario").html('<img src="facade/img/loading2.gif" alt="cargando" />');
				            $("#lblMensajeUsuario").html('Procesando su solicitud...');

				        },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
						    if (XMLHttpRequest.readyState == 0) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Verifique su conexión a internet');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").hide();
						    }
						},
				        statusCode: {
				            401: function(responseObject, textStatus, errorThrown) {
				                $("#modalIndexTitle").text('Información de Evaluador');
				                $("#modalIndexContenido").attr('align', 'left');
				                $("#modalIndexCerrarVentana").show();
								$("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE CAMBIARPERIODOYAREA INPUT AREA EMPTY</strong>');
				                $("#modalIndexBtnCerrar").hide();
				                $("#modalIndexBtnCerrar").text('Cerrar');
				                $("#modalIndexBtnAccion").hide();
				            },
				            403: function(responseObject, textStatus, errorThrown) {
				                $("#modalIndexTitle").text('Información de Evaluador');
				                $("#modalIndexContenido").attr('align', 'left');
				                $("#modalIndexCerrarVentana").show();
								$("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE CAMBIARPERIODOYAREA INPUT AREA EMPTY</strong>');
				                $("#modalIndexBtnCerrar").hide();
				                $("#modalIndexBtnCerrar").text('Cerrar');
				                $("#modalIndexBtnAccion").hide();
				            },
				            200: function(responseObject, textStatus, errorThrown) {
				                //INICIO DE RELLENO DE DATOS DE NUEVA ÁREA SELECCIONADA
				                //eliminando valores existentes

								$.ajax({
								    type: 'post',
								    url: 'core/HomeReceivePeriodoFromIndex.php',
								    beforeSend: function() {
								        //inicializando modal que valida sesión de raulí
								        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
								    },
								    error: function(XMLHttpRequest, textStatus, errorThrown) {
									    if (XMLHttpRequest.readyState == 0) {
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").text('Verifique su conexión a internet');
											$("#modalHomeContenido").attr('align', 'left');
											$("#modalHomeCerrarVentana").show();
											$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
											$("#modalHomeBtnCerrar").show();
											$("#modalHomeBtnCerrar").text('Cerrar');
											$("#modalHomeBtnAccion").hide();
									    }
									},
								    statusCode: {
							            404: function(responseObject, textStatus, errorThrown) {
							            	$("#modalHome").modal('show');
							                $("#modalHomeTitle").text('´Problema al cargar el periodo');
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cerrar');
							                $("#modalHomeBtnAccion").hide();
							            },
							            200: function(responseObject, textStatus, errorThrown) {
							                var resultados = JSON.parse(responseObject);
							                
							                //eliminando valores existentes
							                $.each($("#slcPeriodo option"),function(i,v){
												value = v.value;
												$("#slcPeriodo option[value="+value+"]").remove();
											});

							                 $.each(resultados.periodos, function (index, value) {
							                    $("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
							                });


											$.ajax({
											    type: 'post',
											    url: 'core/ListPeriodosParaEvaluar.php',
											    beforeSend: function() {
											        //inicializando modal que valida sesión de raulí
											        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo periodos válidos para trabajar...');
											    },
											    error: function(XMLHttpRequest, textStatus, errorThrown) {
												    if (XMLHttpRequest.readyState == 0) {
														$("#modalHomeConfig").attr('class', 'modal-dialog');
														$("#modalHomeTitle").text('Verifique su conexión a internet');
														$("#modalHomeContenido").attr('align', 'left');
														$("#modalHomeCerrarVentana").show();
														$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
														$("#modalHomeBtnCerrar").show();
														$("#modalHomeBtnCerrar").text('Cerrar');
														$("#modalHomeBtnAccion").hide();
												    }
												},
											    statusCode: {
											        404: function(responseObject, textStatus, errorThrown) {
											        	$("#modalHome").modal('show');
											            $("#modalHomeTitle").text('´Problema al cargar el periodo');
											            $("#modalHomeContenido").attr('align', 'left');
											            $("#modalHomeCerrarVentana").show();
											            $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
											            $("#modalHomeBtnCerrar").show();
											            $("#modalHomeBtnCerrar").text('Cerrar');
											            $("#modalHomeBtnAccion").hide();
											        },
											        200: function(responseObject, textStatus, errorThrown) {
											            var resultados = JSON.parse(responseObject);
											           
											             $.each(resultados.periodos, function (index, value) {
											                if($("#slcPeriodo :selected").text() != value) {
											                	$("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
											                }
											            });

											            $("#tblEjecutivoPeriodo").html($("#slcPeriodo :selected").text());

														$("#tablaEvaluacionesGeneradas tr").remove();
														$.ajax({
															type: 'post',
															url: 'core/ResumenEvaluacionParcialEjecutivo.php',
															data: 'ejecutivo='+irqljob,
															beforeSend: function() {
																$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo información del ejecutivo...');
															},
															statusCode: {
																500: function(responseObject, textStatus, errorThrown) {
																$("#modalHome").modal('show');
														        $("#modalHomeTitle").text('Ejecutivo no existe');
														        $("#modalHomeContenido").attr('align', 'left');
														        $("#modalHomeCerrarVentana").show();
														        $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
														        $("#modalHomeBtnCerrar").show();
														        $("#modalHomeBtnCerrar").text('Cerrar');
														        $("#modalHomeBtnAccion").hide();
																},
																301: function(responseObject, textStatus, errorThrown) {
																$("#modalHome").modal('show');
														        $("#modalHomeTitle").text('Error crítico');
														        $("#modalHomeContenido").attr('align', 'left');
														        $("#modalHomeCerrarVentana").show();
														        $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
														        $("#modalHomeBtnCerrar").show();
														        $("#modalHomeBtnCerrar").text('Cerrar');
														        $("#modalHomeBtnAccion").hide();
																},
																200: function(responseObject, textStatus, errorThrown) {
																	var resultado = JSON.parse(responseObject);

																	if(resultado.parciales == null) {
																		$("#tblEjecutivoCantidad").html('Ninguna Evaluación Parcial');
																	}else{
																		$("#tblEjecutivoCantidad").html(resultado.parciales.length);
																	}
																	
																	if(resultado.efinal == null) {
										             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary id="btnFastPDFFinal" disabled="disabled"><i class="fas fa-flag"></i> -.-- PDF</button> <button type="button" class="btn btn-warning" id="btnCrearFinal"><i class="fas fa-asterisk"></i></button></div>');
										             				}else{
										             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary" id="btnFastPDFFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-flag"></i> <strong>'+parseFloat(resultado.efinal.nota).toFixed(2)+'</strong> PDF</button> <button type="button" class="btn btn-warning" id="btnEditarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger" id="btnEliminarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="far fa-trash-alt"></i></button></div>');
										             				}

																	if(resultado.quincenal == null) {
										             					$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-calendar-check"></i> <strong>-.--</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
										             				}else{
										             					if(resultado.bloqueado_final == 1  && localStorage.getItem('bloqueoParcial') == 0) {
										             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'" disabled="disabled"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
										             					}else{
										             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-trash-alt"></i></button></div>');
										             					}
										             				}

																	if(resultado.parciales == null)  {
																		var fila = '';
																		fila = fila + '<tr>';
																	fila = fila + '<td colspan="6">No se han ingresado evaluaciones para este ejecutivo</td>';
																		fila = fila + '</tr>';
																		$("#tablaEvaluacionesGeneradas").append(fila);
																	}else{
																		$.each(resultado.parciales, function(i,v) {
																			var fila = '';
											             					//validando si requiere corrección
											             					if(v.estado == 2) { 
											             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-danger">';  
											             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-danger"><i class="fas fa-exclamation-circle"></i> Requiere Revisión</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
											             					}else if(v.estado == 4) {
											             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-success">'; 
											             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-success"><i class="fas fa-check"></i> Revisada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
											             					}else if(v.estado == 7) {
											             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-warning">'; 
											             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-warning"><i class="far fa-tired"></i> Apelada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
											             					}else{ 
											             						fila = fila +'<tr evaluacion="'+v.evaluacion+'">'; 
											             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación</strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
											             					}
											             					
												                          
												                            fila = fila +'<td width="200px"><div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-danger btn-sm"><strong>PDF</strong></button><button type="button" class="btn btn-success" evaluacion="'+v.evaluacion+'" role="excel"><strong>Excel</strong></button></div></td>';
												                           	if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';
												                            }else if(v.estado == 9) {
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" disabled="disabled" class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';																		                            	
												                            }else{
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>';
												                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';																		                            	
												                            }
												                            fila = fila +'<td style="width:10%; text-align: center;"><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
												                          	fila = fila +'</tr>';
												                          	$("#tablaEvaluacionesGeneradas").append(fila);
																		});
																	}



																	// ---- ZONA QUINCENAL ---------------------------------------------------------------------------------------------
																	// 
																	// 22.07.2020 funcion que rescata el PDF de la barra de estado del ejecutivo
																	$("#btnPDFQuincenal").click(function() {
																		var quincenalPDF = $("#btnPDFQuincenal").attr("evaluacion");
																		//generar PDF
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identificando');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('Un momento, por favor...');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																							$("#modalHomeTitle").html('<i class="far fa-edit"></i> Visualización de Evaluación Quincenal #'+quincenalPDF);
																							$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+quincenalPDF+'&tipo=quincenal" width="100%" height="600px" />');
																			            	$("#modalHomeBtnCerrar").show();
																							$("#modalHomeBtnCerrar").text('Cerrar');
																							$("#modalHomeCerrarVentana").hide();
																							$("#modalHomeBtnAccion").show();
																							$("#modalHomeBtnAccion").attr('evaluacion', quincenalPDF);
																							$("#modalHomeBtnAccion").text('Descargar PDF Quincenal');
																							$("#modalHome").modal('show');
																					}
																				}
																			});
																	});

																	$("#btnRegenerarQuincenal").click(function() {
																		$.ajax({
																			type: 'get', 
																			url: 'core/SessionManager.php',
																			error: function(XMLHttpRequest, textStatus, errorThrown) {
																				if (XMLHttpRequest.readyState == 0) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Verifique su conexión a internet');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																					$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																				}
																			},
																			beforeSend: function() {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identificando');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('Un momento, por favor...');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																			},
																			statusCode : {
																				401: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				403: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				500: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Acceso Restringido');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				503: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Error Crítico');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				200: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeBtnAccion").removeAttr('disabled');
																					$("#modalHomeConfig").attr('class', 'modal-dialog modal-lg');
																				    $("#modalHome").modal('show');
																					$("#modalHomeTitle").html('<i class="far fa-edit"></i> Regenerar Evaluación Quincenal');
																					$("#modalHomeContenido").load('regenerarQuincenal.php?ejecutivo='+irqljob+'&area='+$("#slcArea :selected").val());
																			    	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeBtnAccion").show();
																					$("#modalHomeBtnAccion").attr('disabled', true);
																					$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																					$("#modalHomeBtnAccion").attr('ejecutivo', irqljob);
																					$('#modalHome').click( function() {
																						if(parseInt(localStorage.getItem('bandeQuincenal')) == 1) {
																							$("#modalHomeBtnAccion").attr('disabled', false);
																						}else{
																							$("#modalHomeBtnAccion").attr('disabled', true);
																						}
																					});
																				}
																			}
																		});
																	});

																	$("#btnEliminarQuincenal").click(function() {
																		var evaluacion = $("#btnEliminarQuincenal").attr('evaluacion');
																		var respuesta = confirm('Esta a punto de eliminar la evaluación quincenal #'+evaluacion+' de este ejecutivo para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
																		if(respuesta) {
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identificando');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('Un momento, por favor...');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {						
																						$.ajax({
																							url: 'core/EliminarEvaluacionQuincenal.php',
																							type: 'POST',
																							data: 'evaluacion='+evaluacion+'',
																							beforeSend: function() {
																								$("#modalHomeConfig").attr('class', 'modal-dialog');
																							    $("#modalHome").modal('show');
																								$("#modalHomeTitle").html('<i class="fas fa-trash"></i> Eliminación de Evaluación Quincenal #<strong>'+evaluacion+'</strong>');
																								$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud');
																						    	$("#modalHomeBtnCerrar").hide();
																								$("#modalHomeBtnCerrar").text('Cerrar');
																								$("#modalHomeCerrarVentana").hide();
																								$("#modalHomeBtnAccion").hide();
																								$("#modalHomeBtnAccion").attr('disabled', true);
																								$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																							},
																							statusCode: {
																								500: function(responseObject, textStatus, errorThrown) {
																									$("#modalHomeContenido").html('La evaluación no fue encontrada, posiblemente ya fue eliminada por otro evaluador [EMPTY PARAMETER] HTTP 500');
																							    	$("#modalHomeBtnCerrar").show();
																									$("#modalHomeBtnCerrar").text('Cerrar');
																									$("#modalHomeCerrarVentana").hide();
																									$("#modalHomeBtnAccion").hide();
																								},
																								501: function(responseObject, textStatus, errorThrown) {
																									$("#modalHomeContenido").html('Ha ocurrido un error al procesar su solicitud [EMPTY PARAMETER] HTTP 501');
																							    	$("#modalHomeBtnCerrar").show();
																									$("#modalHomeBtnCerrar").text('Cerrar');
																									$("#modalHomeCerrarVentana").hide();
																									$("#modalHomeBtnAccion").hide();
																								},
																								200: function(responseObject, textStatus, errorThrown) {
																									alert('Evaluación quincenal #'+evaluacion+' eliminada con éxito');
																									window.location.reload();
																								}

																							}
																						});
																					}
																				}
																			});
																		}

																	})
																	// FIN DE ZONA QUINCENAL -----------------------------------------------------------------------------------------


																	// -------- ZONA FINALES -----------------------------------------------------------------------------------------
																	$("#btnFastPDFFinal").click(function() {
																		var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
																		$.ajax({
																			type: 'get', 
																			url: 'core/SessionManager.php',
																			error: function(XMLHttpRequest, textStatus, errorThrown) {
																				if (XMLHttpRequest.readyState == 0) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Verifique su conexión a internet');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																					$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																				}
																			},
																			beforeSend: function() {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identificando');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('Un momento, por favor...');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																			},
																			statusCode : {
																				401: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				403: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				500: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Acceso Restringido');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				503: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Error Crítico');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				200: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																					    $("#modalHome").modal('show');
																						$("#modalHomeTitle").html('<i class="far fa-edit"></i>Evaluación Final</strong>');
																						$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+nroEvaFinal+'&tipo=final" width="100%" height="600px" />');
																				    	$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeBtnAccion").show();
																						$("#modalHomeBtnAccion").text('Descargar Evaluación Final');
																						$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																				}
																			}
																		});
																	});

																	$("#btnCrearFinal").click(function() {
																		$.ajax({
																			type: 'get', 
																			url: 'core/SessionManager.php',
																			error: function(XMLHttpRequest, textStatus, errorThrown) {
																				if (XMLHttpRequest.readyState == 0) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Verifique su conexión a internet');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																					$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																				}
																			},
																			beforeSend: function() {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identificando');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('Un momento, por favor...');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																			},
																			statusCode : {
																				401: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				403: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				500: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Acceso Restringido');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				503: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Error Crítico');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				200: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																					    $("#modalHome").modal('show');
																						$("#modalHomeTitle").html('<i class="far fa-edit"></i> Crear Evaluación Final</strong>');
																						$("#modalHomeContenido").load('finalCreator.php?ejecutivo='+irqljob);
																				    	$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHomeBtnAccion").text('Guardar Evaluación Final');
																						localStorage.setItem('bloqueoParcial', 1); 
																				}
																			}
																		});
																	})

																	$("#btnEditarFinal").click(function() {
																		var nroEvaFinal = $("#btnEditarFinal").attr("evaluacion");
																		$.ajax({
																			type: 'get', 
																			url: 'core/SessionManager.php',
																			error: function(XMLHttpRequest, textStatus, errorThrown) {
																				if (XMLHttpRequest.readyState == 0) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Verifique su conexión a internet');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																					$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																				}
																			},
																			beforeSend: function() {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identificando');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('Un momento, por favor...');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").hide();
																					$("#modalHome").modal('show');
																			},
																			statusCode : {
																				401: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				403: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Identifiquese nuevamente');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				500: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Acceso Restringido');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				503: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").text('Error Crítico');
																					$("#modalHomeContenido").attr('align', 'left');
																					$("#modalHomeCerrarVentana").show();
																					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																					$("#modalHomeBtnCerrar").hide();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeBtnAccion").text('Iniciar Sesión');
																					$("#modalHomeBtnAccion").show();
																					$("#modalHome").modal('show');
																				},
																				200: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																					    $("#modalHome").modal('show');
																						$("#modalHomeTitle").html('<i class="far fa-edit"></i> Editar Evaluación Final');
																						$("#modalHomeContenido").load('finalEditor.php?evaluacion='+nroEvaFinal);
																				    	$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeBtnAccion").show();
																						$("#modalHomeBtnAccion").text('Finalizar Edición');
																						$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																				}
																			}
																		});
																	})

																	$("#btnEliminarFinal").click(function() {
																		var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
																		var respuesta = confirm('Esta a punto de eliminar la evaluación final #'+nroEvaFinal+' para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
																		if(respuesta) {
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identificando');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('Un momento, por favor...');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {		
																								$.ajax({
																									url: 'core/EliminarEvaluacionFinal.php',
																									type: 'POST',
																									data: 'evaluacion='+nroEvaFinal,
																									beforeSend: function() {
																										$("#modalHomeConfig").attr('class', 'modal-dialog');
																								        $("#modalHome").modal('show');
																										$("#modalHomeTitle").text('Espere un momento');
																										$("#modalHomeBtnCerrar").hide();
																										$("#modalHomeCerrarVentana").hide();
																										$("#modalHomeBtnAccion").hide();
																										$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
																									},
																									statusCode: {
																										301: function(responseObject, textStatus, errorThrown) {
																											$("#modalHomeTitle").text('Error');
																											$("#modalHomeBtnCerrar").show();
																											$("#modalHomeCerrarVentana").show();
																											$("#modalHomeContenido").html('No se ha podido ejecutar su solicitud porque el sistema no recibió los parámetros necesarios para poder llevarla a cabo. HTTP 301');
																										},
																										302: function(responseObject, textStatus, errorThrown) {
																											$("#modalHomeTitle").text('Error');
																											$("#modalHomeBtnCerrar").show();
																											$("#modalHomeCerrarVentana").show();
																											$("#modalHomeContenido").html('La evaluación posiblemente ya fué eliminada por otro evaluador o bien no existe en el sistema. HTTP 302');
																										},
																										201: function(responseObject, textStatus, errorThrown) {
																											$("#modalHomeTitle").text('Error');
																											$("#modalHomeBtnCerrar").show();
																											$("#modalHomeCerrarVentana").show();
																											$("#modalHomeContenido").html('Ocurrió un error al intentar eliminar la evaluación final. HTTP 201');
																										},
																										200: function(responseObject, textStatus, errorThrown) {
																											$("#modalHomeTitle").text('Error');
																											$("#modalHomeBtnCerrar").show();
																											$("#modalHomeCerrarVentana").show();
																											$("#modalHomeContenido").html(responseObject);

																											$.ajax({
																											    type: 'post',
																											    url: 'core/ListEjecutivosPorAreaFinal.php',
																											    data: 'area='+$("#slcArea").val(),
																											    beforeSend: function() {
																											        //inicializando modal que valida sesión de raulí
																											    },
																											    statusCode: {
																											            404: function(responseObject, textStatus, errorThrown) {
																											            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																											            	$("#modalHome").modal('show');
																											                $("#modalHomeTitle").text('Problema al cargar el periodo');
																											                $("#modalHomeContenido").attr('align', 'left');
																											                $("#modalHomeCerrarVentana").show();
																											                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
																											                $("#modalHomeBtnCerrar").show();
																											                $("#modalHomeBtnCerrar").text('Cerrar');
																											                $("#modalHomeBtnAccion").hide();
																											            },
																											            500: function(responseObject, textStatus, errorThrown) {
																											            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																											            	$("#modalHome").modal('show');
																											                $("#modalHomeTitle").text('Ocurrió un error');
																											                $("#modalHomeContenido").attr('align', 'left');
																											                $("#modalHomeCerrarVentana").show();
																											                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT EMPTY</strong>');
																											                $("#modalHomeBtnCerrar").show();
																											                $("#modalHomeBtnCerrar").text('Cerrar');
																											                $("#modalHomeBtnAccion").hide();
																											            },
																											            401: function(responseObject, textStatus, errorThrown) {
																											            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																											            	$("#modalHome").modal('show');
																											                $("#modalHomeTitle").text('Ocurrió un error');
																											                $("#modalHomeContenido").attr('align', 'left');
																											                $("#modalHomeCerrarVentana").show();
																											                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT NOT NUMBER</strong>');
																											                $("#modalHomeBtnCerrar").show();
																											                $("#modalHomeBtnCerrar").text('Cerrar');
																											                $("#modalHomeBtnAccion").hide();
																											            },
																											            301: function(responseObject, textStatus, errorThrown) {
																											            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																											            	$("#modalHome").modal('show');
																											                $("#modalHomeTitle").text('Ocurrió un error');
																											                $("#modalHomeContenido").attr('align', 'left');
																											                $("#modalHomeCerrarVentana").show();
																											                $("#modalHomeContenido").html('El área que ha seleccionado no tiene ejecutivos registrados. Por favor contacte a su jefatura para más información<br /><strong>PHP CORE ARRAY CONTROLLER EMPTY</strong>');
																											                $("#modalHomeBtnCerrar").show();
																											                $("#modalHomeBtnCerrar").text('Cerrar');
																											                $("#modalHomeBtnAccion").hide();
																											            },
																											            200: function(responseObject, textStatus, errorThrown) {
																											                var resultados = JSON.parse(responseObject);
																															if($.trim(responseObject) == "NULL") {
																									                            alert('No hay valores');
																									                        }else{
																									                            var resultado = $.parseJSON(responseObject);
																									                            alert('Evaluación Final Eliminada');
																									                            window.location.reload();
																									                        }
																											            }           
																											        }
																										 	});
																										}
																									}
																								});
																					}
																				}
																			});
																		}
																	});

																	// -----FIN  ZONA FINALES -----------------------------------------------------------------------------------------


																	//elementos clickeados en la tabla para mostrar los datos en el card del lado derecho
																	$('#tablaEvaluacionesGeneradas tr').click(function() {
																		var evalclicked = $(this).attr('evaluacion');
																		$.ajax({
														             		type: 'post',
														             		url: 'core/infoEvaluacionParcial.php',
														             		data: 'evaluacion='+evalclicked,
														             		beforeSend: function() {
														             			$("#tblInfoEvaluacion").hide();
														             			$("#lblInfoEvaluacion").show();
														             			$("#btnDownloadAudioEvalClicked").hide();
																				$("#btnDownloadPDFEvalClicked").hide();
														             			$("#lblInfoEvaluacion").html('<img src="facade/img/loading.gif" /><br />Cargando Información de la evaluación parcial...');
														             		},
														             		statusCode: {
														             			301: function(responseObject, textStatus, errorThrown) {
																					$("#modalHome").modal('show');
																	                $("#modalHomeTitle").text('Ejecutivo no existe');
																	                $("#modalHomeContenido").attr('align', 'left');
																	                $("#modalHomeCerrarVentana").show();
																	                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
																	                $("#modalHomeBtnCerrar").show();
																	                $("#modalHomeBtnCerrar").text('Cerrar');
																	                $("#modalHomeBtnAccion").hide();
														             			},
														             			200: function(responseObject, textStatus, errorThrown) {
														             				var resultado = JSON.parse(responseObject);
														             				if(resultado[0] == null) {
														             					$("#lblInfoEvaluacion").show();
														             					$("#lblInfoEvaluacion").html('La evaluación esta generada pero sus items no han sido evaluados');
														             					$("#tblInfoEvaluacion").hide();
														             					$("#btnDownloadAudioEvalClicked").hide();
																						$("#btnDownloadPDFEvalClicked").hide();
														             				}else{
														             					$("#lblInfoEvaluacion").hide();
														             					$("#tblInfoEvaluacionT1").html(resultado[0].nombre_categoria);
														             					$("#tblInfoEvaluacionT2").html(resultado[1].nombre_categoria);
														             					$("#tblInfoEvaluacionT3").html(resultado[2].nombre_categoria);

														             					$("#tblInfoEvaluacionV1").html(resultado[0].nota_categoria);
														             					$("#tblInfoEvaluacionV2").html(resultado[1].nota_categoria);
														             					$("#tblInfoEvaluacionV3").html(resultado[2].nota_categoria);
														             					$("#tblInfoEvaluacionVNF").html(resultado[0].nota_parcial);

																						$("#btnDownloadAudioEvalClicked").show();
																						$("#linkBtnDownloadAudioEvalClicked").attr('href', 'files/audio/'+resultado[0].audio);
																						
																						$("#btnDownloadPDFEvalClicked").show();

														             					$("#tblInfoEvaluacion").show();
														             				}
														             			}
														             		}
														             	});
																	});


																	//Editar Evaluación/eliminar evaluacion / PDF
																	$('#tablaEvaluacionesGeneradas tr').on('click', 'button', function(a) { 
																		var eval = $(this).attr('evaluacion');
																		if($(this).attr('role') == 'editar') {
																			//ejecutar edición
																			$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																			$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																			$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
															            	$("#modalHomeBtnCerrar").show();
																			$("#modalHomeBtnCerrar").text('Cancelar');
																			$("#modalHomeCerrarVentana").hide();
																			$("#modalHomeBtnAccion").show();
																			$("#modalHomeBtnAccion").text('Finalizar Edición Parcial');
																			$("#modalHome").modal('show');
																		}else if($(this).attr('role') == 'eliminar'){
																			//ejecutar eliminación
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identificando');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('Un momento, por favor...');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {
																									$("#modalHomeConfig").attr('class', 'modal-dialog');
																									$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																									$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'?<br /><strong>Esta acción no podrá deshacerse una vez se confirme.</strong>');
																					            	$("#modalHomeBtnCerrar").show();
																									$("#modalHomeBtnCerrar").text('Cancelar');
																									$("#modalHomeCerrarVentana").hide();
																									$("#modalHomeBtnAccion").show();
																									$("#modalHomeBtnAccion").attr('evaluacion', eval);
																									$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																									$("#modalHome").modal('show');
																					}
																				}
																			});
																		}else if($(this).attr('role') == 'pdf'){
																			//generar PDF
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identificando');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('Un momento, por favor...');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeBtnAccion").removeAttr('disabled');
																							$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																							$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																							$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+eval+'&tipo=parcial" width="100%" height="600px" />');
																			            	$("#modalHomeBtnCerrar").show();
																							$("#modalHomeBtnCerrar").text('Cerrar');
																							$("#modalHomeCerrarVentana").hide();
																							$("#modalHomeBtnAccion").show();
																							$("#modalHomeBtnAccion").attr('evaluacion', eval);
																							$("#modalHomeBtnAccion").text('Descargar Documento PDF');
																							$("#modalHome").modal('show');
																					}
																				}
																			});
																		}else if($(this).attr('role') == 'excel'){
																			//generar PDF
																			$.ajax({
																				type: 'get', 
																				url: 'core/SessionManager.php',
																				error: function(XMLHttpRequest, textStatus, errorThrown) {
																					if (XMLHttpRequest.readyState == 0) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Verifique su conexión a internet');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																						$("#modalHomeBtnCerrar").show();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHome").modal('show');
																					}
																				},
																				beforeSend: function() {
																				},
																				statusCode : {
																					401: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					403: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Identifiquese nuevamente');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					500: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Acceso Restringido');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					503: function(responseObject, textStatus, errorThrown) {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																						$("#modalHomeTitle").text('Error Crítico');
																						$("#modalHomeContenido").attr('align', 'left');
																						$("#modalHomeCerrarVentana").show();
																						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeBtnCerrar").text('Cerrar');
																						$("#modalHomeBtnAccion").text('Iniciar Sesión');
																						$("#modalHomeBtnAccion").show();
																						$("#modalHome").modal('show');
																					},
																					200: function(responseObject, textStatus, errorThrown) {
																						var evaluacion 		= eval;
																	                	var tipo 			= 1;
																	                	$("#frmXLSTipo").val(tipo);
																	                	$("#frmXLSEvaluacion").val(evaluacion);
																	                	$("#frmXls").submit();
																					}
																				}
																			});
																		}
																	});


																}
															}
														});

							                			$("#modalHomeBtnCerrar").click();

											        }
											    }
											}); 
							            }
							        }
							    });
							}
						}
					});
			}
		}
	});
});


$("#btnDownloadPDFEvalClicked").click(function() {
	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identificando');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('Un momento, por favor...');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
				window.location.href = "core/pdfGenerate.php?evaluacion="+$("#btnDownloadPDFEvalClicked").attr('evaluacion')+"&tipo=parcial&accion=descargar";
			}
		}
	});
});

/// CLICK generar nueva evaluacion
$("#btnGenerarEva").click(function() {
	var ejecutivo = $(this).attr('ejecutivo');
	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identificando');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('Un momento, por favor...');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
				    $("#modalHome").modal('show');
					$("#modalHomeTitle").html('<i class="far fa-edit"></i> Nueva evaluación parcial');

					$.ajax({
				        type: 'post',
				        url: 'core/CreateEvaluacionParcialCantidad.php',
				        data: 'periodo='+$("#slcPeriodo :selected").text()+'&ejecutivo='+ejecutivo,
				        beforeSend: function() {
				            //inicializando modal que valida sesión de raulí
				        },
						error: function(XMLHttpRequest, textStatus, errorThrown) {
						    if (XMLHttpRequest.readyState == 0) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Verifique su conexión a internet');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").hide();
						    }
						},
				        statusCode: {
				            401: function(responseObject, textStatus, errorThrown) {
				                $("#modalIndexTitle").text('Información de Evaluador');
				                $("#modalIndexContenido").attr('align', 'left');
				                $("#modalIndexCerrarVentana").show();
								$("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE CAMBIARPERIODOYAREA INPUT AREA EMPTY</strong>');
				                $("#modalIndexBtnCerrar").hide();
				                $("#modalIndexBtnCerrar").text('Cerrar');
				                $("#modalIndexBtnAccion").hide();
				            },
				            301: function(responseObject, textStatus, errorThrown) {
				                $("#modalHomeContenido").load('creator.php?periodo='+$("#slcPeriodo :selected").text()+'&ejecutivo='+ejecutivo);
				            	$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cancelar');
								$("#modalHomeCerrarVentana").hide();
								$("#modalHomeBtnAccion").show();
								$("#modalHomeBtnAccion").text('Guardar Evaluación Parcial');	
				            },
				            200: function(responseObject, textStatus, errorThrown) {
				            	$("#modalHomeContenido").load('todoListoParcial.php?periodo='+$("#slcPeriodo :selected").text()+'&ejecutivo='+ejecutivo);
				            	$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeBtnAccion").hide();
								$("#modalHomeBtnAccion").text('Guardar Evaluación Parcial');	
				            }
				        }
				    });
		}
	}
});
});


/// CLICK generar nueva evaluacion
$("#btnExcelMasivo").click(function() {
	var ejecutivo = $(this).attr('ejecutivo');
	$.ajax({
		type: 'get', 
		url: 'core/SessionManager.php',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.readyState == 0) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Verifique su conexión a internet');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
			}
		},
		beforeSend: function() {
			$("#modalHomeConfig").attr('class', 'modal-dialog');
			$("#modalHomeTitle").text('Identificando');
			$("#modalHomeContenido").attr('align', 'left');
			$("#modalHomeCerrarVentana").show();
			$("#modalHomeContenido").html('Un momento, por favor...');
			$("#modalHomeBtnCerrar").hide();
			$("#modalHomeBtnCerrar").text('Cerrar');
			$("#modalHomeBtnAccion").text('Iniciar Sesión');
			$("#modalHomeBtnAccion").hide();
			$("#modalHome").modal('show');
		},
		statusCode : {
			401: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			403: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Identifiquese nuevamente');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			500: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Acceso Restringido');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			503: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Error Crítico');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
				$("#modalHomeBtnCerrar").hide();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").show();
				$("#modalHome").modal('show');
			},
			200: function(responseObject, textStatus, errorThrown) {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
				$("#modalHomeTitle").text('Solicitando contenido a Central Report');
				$("#modalHomeContenido").attr('align', 'left');
				$("#modalHomeCerrarVentana").show();
				$("#modalHomeContenido").html('<i class="fas fa-server"></i> Tricot CentralReport esta procesando tu solicitud...');
				$("#modalHomeBtnCerrar").show();
				$("#modalHomeBtnCerrar").text('Cerrar');
				$("#modalHomeBtnAccion").text('Iniciar Sesión');
				$("#modalHomeBtnAccion").hide();
				$("#modalHome").modal('show');
				window.location.href="../centralreport/core/exportXLSConsolidado.php?ejecutivo="+irqljob+"&periodo="+$("#slcPeriodo :selected").val();
			}
		}
	});
});



$("#modalHomeBtnAccion").click(function() {
	if($("#modalHomeBtnAccion").text() == "Guardar Evaluación Parcial") {
		if(!$("#infoAudioCargado").is(":visible")) {
			alert('Debe seleccionar un audio para poder guardar la evaluación parcial');
			$("#fileAudio").click();
		}else{ 	
			$.ajax({
				type: 'get', 
				url: 'core/SessionManager.php',
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.readyState == 0) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Verifique su conexión a internet');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
						$("#modalHomeBtnCerrar").show();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").hide();
						$("#modalHome").modal('show');
					}
				},
				beforeSend: function() {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identificando');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('Un momento, por favor...');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").hide();
						$("#modalHome").modal('show');
				},
				statusCode : {
					401: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identifiquese nuevamente');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					403: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identifiquese nuevamente');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					500: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Acceso Restringido');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					503: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Error Crítico');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					200: function(responseObject, textStatus, errorThrown) {
							$.ajax({
							    type: 'post',
							    url: 'core/CreateEvaluacionParcialObservacion.php',
							    data: {'comentarios' : quill.root.innerHTML, 'evaluacion' : $("#modalHomeBtnAccion").attr('evaluacion')},
							    beforeSend: function() {
							        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud...');
							    },
							    error: function(XMLHttpRequest, textStatus, errorThrown) {
								    if (XMLHttpRequest.readyState == 0) {
										$("#modalHomeConfig").attr('class', 'modal-dialog');
										$("#modalHomeTitle").text('Verifique su conexión a internet');
										$("#modalHomeContenido").attr('align', 'left');
										$("#modalHomeCerrarVentana").show();
										$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
										$("#modalHomeBtnCerrar").show();
										$("#modalHomeBtnCerrar").text('Cerrar');
										$("#modalHomeBtnAccion").hide();
								    }
								},
							    statusCode: {
							        404: function(responseObject, textStatus, errorThrown) {
							            alert('No se encontró respuesta del servidor para los periodos a trabajar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 404');
							        },
							        500: function(responseObject, textStatus, errorThrown) {
							            alert('El servidor no encontró el número de evaluación que debe actualizar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 500');
							        },
							        501: function(responseObject, textStatus, errorThrown) {
							            alert('El servidor no encontró los comentarios que debe actualizar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 501');
							        },
									503: function(responseObject, textStatus, errorThrown) {
							            alert('La evaluación no retornó ningun resultado o bien el controller retornó un objeto nulo. CORE CREATEEVALUACIONPARCIALOBSERVARCION 503');
							        },
									301: function(responseObject, textStatus, errorThrown) {
							            alert('Los cambios no pudieron ser guardados, por favor intentelo más tarde. CORE CREATEEVALUACIONPARCIALOBSERVARCION 301');
							        },
							        200: function(responseObject, textStatus, errorThrown) {
							        	$("#modalHomeConfig").attr('class', 'modal-dialog');
							            $("#modalHomeContenido").html('La evaluación parcial ha sido guardada!');
							            $("#modalHomeBtnCerrar").show();
							            $("#modalHomeBtnCerrar").text('Cerrar');
							            $("#modalHomeBtnAccion").hide();
							            $("#tablaEvaluacionesGeneradas tr").remove();
							            $("#modalHomeBtnCerrar").click();
										$.ajax({
											type: 'post',
											url: 'core/ResumenEvaluacionParcialEjecutivo.php',
											data: 'ejecutivo='+irqljob,
											beforeSend: function() {
												$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo información del ejecutivo...');
											},
											statusCode: {
												500: function(responseObject, textStatus, errorThrown) {
												$("#modalHome").modal('show');
										        $("#modalHomeTitle").text('Ejecutivo no existe');
										        $("#modalHomeContenido").attr('align', 'left');
										        $("#modalHomeCerrarVentana").show();
										        $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
										        $("#modalHomeBtnCerrar").show();
										        $("#modalHomeBtnCerrar").text('Cerrar');
										        $("#modalHomeBtnAccion").hide();
												},
												301: function(responseObject, textStatus, errorThrown) {
												$("#modalHome").modal('show');
										        $("#modalHomeTitle").text('Error crítico');
										        $("#modalHomeContenido").attr('align', 'left');
										        $("#modalHomeCerrarVentana").show();
										        $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
										        $("#modalHomeBtnCerrar").show();
										        $("#modalHomeBtnCerrar").text('Cerrar');
										        $("#modalHomeBtnAccion").hide();
												},
												200: function(responseObject, textStatus, errorThrown) {
													var resultado = JSON.parse(responseObject);

													if(resultado.parciales == null) {
														$("#tblEjecutivoCantidad").html('Ninguna Evaluación Parcial');
													}else{
														$("#tblEjecutivoCantidad").html(resultado.parciales.length);
													}
													
													if(resultado.efinal == null) {
						             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary id="btnFastPDFFinal" disabled="disabled"><i class="fas fa-flag"></i> -.-- PDF</button> <button type="button" class="btn btn-warning" id="btnCrearFinal"><i class="fas fa-asterisk"></i></button></div>');
						             				}else{
						             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary" id="btnFastPDFFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-flag"></i> <strong>'+parseFloat(resultado.efinal.nota).toFixed(2)+'</strong> PDF</button> <button type="button" class="btn btn-warning" id="btnEditarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger" id="btnEliminarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="far fa-trash-alt"></i></button></div>');
						             				}

													if(resultado.quincenal == null) {
						             					$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-calendar-check"></i> <strong>-.--</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
						             				}else{
						             					if(resultado.bloqueado_final == 1  && localStorage.getItem('bloqueoParcial') == 0) {
						             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'" disabled="disabled"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
						             					}else{
						             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-trash-alt"></i></button></div>');
						             					}
						             				}

													if(resultado.parciales == null)  {
														var fila = '';
														fila = fila + '<tr>';
													fila = fila + '<td colspan="6">No se han ingresado evaluaciones para este ejecutivo</td>';
														fila = fila + '</tr>';
														$("#tablaEvaluacionesGeneradas").append(fila);
													}else{
														$.each(resultado.parciales, function(i,v) {
															var fila = '';
							             					//validando si requiere corrección
							             					if(v.estado == 2) { 
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-danger">';  
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-danger"><i class="fas fa-exclamation-circle"></i> Requiere Revisión</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else if(v.estado == 4) {
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-success">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-success"><i class="fas fa-check"></i> Revisada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else if(v.estado == 7) {
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-warning">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-warning"><i class="far fa-tired"></i> Apelada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else{ 
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación</strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}
							             					
								                          
								                            fila = fila +'<td width="200px"><div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-danger btn-sm"><strong>PDF</strong></button><button type="button" class="btn btn-success" evaluacion="'+v.evaluacion+'" role="excel"><strong>Excel</strong></button></div></td>';
								                           	if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            }else if(v.estado == 9) {
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" disabled="disabled" class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';																		                            	
								                            }else{
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';																		                            	
								                            }
								                            fila = fila +'<td style="width:10%; text-align: center;"><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
								                          	fila = fila +'</tr>';
								                          	$("#tablaEvaluacionesGeneradas").append(fila);

														});
													}




													// ---- ZONA QUINCENAL ---------------------------------------------------------------------------------------------
													// 
													// 22.07.2020 funcion que rescata el PDF de la barra de estado del ejecutivo
													$("#btnPDFQuincenal").click(function() {
														var quincenalPDF = $("#btnPDFQuincenal").attr("evaluacion");
														//generar PDF
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identificando');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('Un momento, por favor...');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {
																			$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																			$("#modalHomeTitle").html('<i class="far fa-edit"></i> Visualización de Evaluación Quincenal #'+quincenalPDF);
																			$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+quincenalPDF+'&tipo=quincenal" width="100%" height="600px" />');
															            	$("#modalHomeBtnCerrar").show();
																			$("#modalHomeBtnCerrar").text('Cerrar');
																			$("#modalHomeCerrarVentana").hide();
																			$("#modalHomeBtnAccion").show();
																			$("#modalHomeBtnAccion").attr('evaluacion', quincenalPDF);
																			$("#modalHomeBtnAccion").text('Descargar PDF Quincenal');
																			$("#modalHome").modal('show');
																	}
																}
															});
													});

													$("#btnRegenerarQuincenal").click(function() {
														$.ajax({
															type: 'get', 
															url: 'core/SessionManager.php',
															error: function(XMLHttpRequest, textStatus, errorThrown) {
																if (XMLHttpRequest.readyState == 0) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
																}
															},
															beforeSend: function() {
																$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identificando');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('Un momento, por favor...');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
															},
															statusCode : {
																401: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																403: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																500: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Acceso Restringido');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																503: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Error Crítico');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																200: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeBtnAccion").removeAttr('disabled');
																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-lg');
																    $("#modalHome").modal('show');
																	$("#modalHomeTitle").html('<i class="far fa-edit"></i> Regenerar Evaluación Quincenal');
																	$("#modalHomeContenido").load('regenerarQuincenal.php?ejecutivo='+irqljob+'&area='+$("#slcArea :selected").val());
															    	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeBtnAccion").show();
																	$("#modalHomeBtnAccion").attr('disabled', true);
																	$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																	$("#modalHomeBtnAccion").attr('ejecutivo', irqljob);
																	$('#modalHome').click( function() {
																		if(parseInt(localStorage.getItem('bandeQuincenal')) == 1) {
																			$("#modalHomeBtnAccion").attr('disabled', false);
																		}else{
																			$("#modalHomeBtnAccion").attr('disabled', true);
																		}
																	});
																}
															}
														});
													});

													$("#btnEliminarQuincenal").click(function() {
														var evaluacion = $("#btnEliminarQuincenal").attr('evaluacion');
														var respuesta = confirm('Esta a punto de eliminar la evaluación quincenal #'+evaluacion+' de este ejecutivo para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
														if(respuesta) {
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identificando');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('Un momento, por favor...');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {						
																		$.ajax({
																			url: 'core/EliminarEvaluacionQuincenal.php',
																			type: 'POST',
																			data: 'evaluacion='+evaluacion+'',
																			beforeSend: function() {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																			    $("#modalHome").modal('show');
																				$("#modalHomeTitle").html('<i class="fas fa-trash"></i> Eliminación de Evaluación Quincenal #<strong>'+evaluacion+'</strong>');
																				$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud');
																		    	$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeCerrarVentana").hide();
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHomeBtnAccion").attr('disabled', true);
																				$("#modalHomeBtnAccion").text('Regenerar Quincenal');
																			},
																			statusCode: {
																				500: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeContenido").html('La evaluación no fue encontrada, posiblemente ya fue eliminada por otro evaluador [EMPTY PARAMETER] HTTP 500');
																			    	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeCerrarVentana").hide();
																					$("#modalHomeBtnAccion").hide();
																				},
																				501: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeContenido").html('Ha ocurrido un error al procesar su solicitud [EMPTY PARAMETER] HTTP 501');
																			    	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeCerrarVentana").hide();
																					$("#modalHomeBtnAccion").hide();
																				},
																				200: function(responseObject, textStatus, errorThrown) {
																					alert('Evaluación quincenal #'+evaluacion+' eliminada con éxito');
																					window.location.reload();
																				}

																			}
																		});
																	}
																}
															});
														}

													})
													// FIN DE ZONA QUINCENAL -----------------------------------------------------------------------------------------


													// -------- ZONA FINALES -----------------------------------------------------------------------------------------
													$("#btnFastPDFFinal").click(function() {
														var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
														$.ajax({
															type: 'get', 
															url: 'core/SessionManager.php',
															error: function(XMLHttpRequest, textStatus, errorThrown) {
																if (XMLHttpRequest.readyState == 0) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
																}
															},
															beforeSend: function() {
																$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identificando');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('Un momento, por favor...');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
															},
															statusCode : {
																401: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																403: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																500: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Acceso Restringido');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																503: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Error Crítico');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																200: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																	    $("#modalHome").modal('show');
																		$("#modalHomeTitle").html('<i class="far fa-edit"></i>Evaluación Final</strong>');
																		$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+nroEvaFinal+'&tipo=final" width="100%" height="600px" />');
																    	$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeBtnAccion").show();
																		$("#modalHomeBtnAccion").text('Descargar Evaluación Final');
																		$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																}
															}
														});
													});

													$("#btnCrearFinal").click(function() {
														$.ajax({
															type: 'get', 
															url: 'core/SessionManager.php',
															error: function(XMLHttpRequest, textStatus, errorThrown) {
																if (XMLHttpRequest.readyState == 0) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
																}
															},
															beforeSend: function() {
																$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identificando');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('Un momento, por favor...');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
															},
															statusCode : {
																401: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																403: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																500: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Acceso Restringido');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																503: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Error Crítico');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																200: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																	    $("#modalHome").modal('show');
																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Crear Evaluación Final</strong>');
																		$("#modalHomeContenido").load('finalCreator.php?ejecutivo='+irqljob);
																    	$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHomeBtnAccion").text('Guardar Evaluación Final');
																		localStorage.setItem('bloqueoParcial', 1); 
																}
															}
														});
													})

													$("#btnEditarFinal").click(function() {
														var nroEvaFinal = $("#btnEditarFinal").attr("evaluacion");
														$.ajax({
															type: 'get', 
															url: 'core/SessionManager.php',
															error: function(XMLHttpRequest, textStatus, errorThrown) {
																if (XMLHttpRequest.readyState == 0) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Verifique su conexión a internet');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
																}
															},
															beforeSend: function() {
																$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identificando');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('Un momento, por favor...');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").hide();
																	$("#modalHome").modal('show');
															},
															statusCode : {
																401: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																403: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Identifiquese nuevamente');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																500: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Acceso Restringido');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																503: function(responseObject, textStatus, errorThrown) {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").text('Error Crítico');
																	$("#modalHomeContenido").attr('align', 'left');
																	$("#modalHomeCerrarVentana").show();
																	$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																	$("#modalHomeBtnCerrar").hide();
																	$("#modalHomeBtnCerrar").text('Cerrar');
																	$("#modalHomeBtnAccion").text('Iniciar Sesión');
																	$("#modalHomeBtnAccion").show();
																	$("#modalHome").modal('show');
																},
																200: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																	    $("#modalHome").modal('show');
																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Editar Evaluación Final');
																		$("#modalHomeContenido").load('finalEditor.php?evaluacion='+nroEvaFinal);
																    	$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeBtnAccion").show();
																		$("#modalHomeBtnAccion").text('Finalizar Edición');
																		$("#modalHomeBtnAccion").attr('evaluacion', nroEvaFinal);
																}
															}
														});
													})

													$("#btnEliminarFinal").click(function() {
														var nroEvaFinal = $("#btnFastPDFFinal").attr("evaluacion");
														var respuesta = confirm('Esta a punto de eliminar la evaluación final #'+nroEvaFinal+' para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
														if(respuesta) {
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identificando');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('Un momento, por favor...');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {		
																				$.ajax({
																					url: 'core/EliminarEvaluacionFinal.php',
																					type: 'POST',
																					data: 'evaluacion='+nroEvaFinal,
																					beforeSend: function() {
																						$("#modalHomeConfig").attr('class', 'modal-dialog');
																				        $("#modalHome").modal('show');
																						$("#modalHomeTitle").text('Espere un momento');
																						$("#modalHomeBtnCerrar").hide();
																						$("#modalHomeCerrarVentana").hide();
																						$("#modalHomeBtnAccion").hide();
																						$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recibiendo información...');
																					},
																					statusCode: {
																						301: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeTitle").text('Error');
																							$("#modalHomeBtnCerrar").show();
																							$("#modalHomeCerrarVentana").show();
																							$("#modalHomeContenido").html('No se ha podido ejecutar su solicitud porque el sistema no recibió los parámetros necesarios para poder llevarla a cabo. HTTP 301');
																						},
																						302: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeTitle").text('Error');
																							$("#modalHomeBtnCerrar").show();
																							$("#modalHomeCerrarVentana").show();
																							$("#modalHomeContenido").html('La evaluación posiblemente ya fué eliminada por otro evaluador o bien no existe en el sistema. HTTP 302');
																						},
																						201: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeTitle").text('Error');
																							$("#modalHomeBtnCerrar").show();
																							$("#modalHomeCerrarVentana").show();
																							$("#modalHomeContenido").html('Ocurrió un error al intentar eliminar la evaluación final. HTTP 201');
																						},
																						200: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeTitle").text('Error');
																							$("#modalHomeBtnCerrar").show();
																							$("#modalHomeCerrarVentana").show();
																							$("#modalHomeContenido").html(responseObject);

																							$.ajax({
																							    type: 'post',
																							    url: 'core/ListEjecutivosPorAreaFinal.php',
																							    data: 'area='+$("#slcArea").val(),
																							    beforeSend: function() {
																							        //inicializando modal que valida sesión de raulí
																							    },
																							    statusCode: {
																							            404: function(responseObject, textStatus, errorThrown) {
																							            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																							            	$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Problema al cargar el periodo');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																							            },
																							            500: function(responseObject, textStatus, errorThrown) {
																							            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																							            	$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Ocurrió un error');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT EMPTY</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																							            },
																							            401: function(responseObject, textStatus, errorThrown) {
																							            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																							            	$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Ocurrió un error');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT NOT NUMBER</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																							            },
																							            301: function(responseObject, textStatus, errorThrown) {
																							            	$("#modalHomeConfig").attr('class', 'modal-dialog');
																							            	$("#modalHome").modal('show');
																							                $("#modalHomeTitle").text('Ocurrió un error');
																							                $("#modalHomeContenido").attr('align', 'left');
																							                $("#modalHomeCerrarVentana").show();
																							                $("#modalHomeContenido").html('El área que ha seleccionado no tiene ejecutivos registrados. Por favor contacte a su jefatura para más información<br /><strong>PHP CORE ARRAY CONTROLLER EMPTY</strong>');
																							                $("#modalHomeBtnCerrar").show();
																							                $("#modalHomeBtnCerrar").text('Cerrar');
																							                $("#modalHomeBtnAccion").hide();
																							            },
																							            200: function(responseObject, textStatus, errorThrown) {
																							                var resultados = JSON.parse(responseObject);
																											if($.trim(responseObject) == "NULL") {
																					                            alert('No hay valores');
																					                        }else{
																					                            var resultado = $.parseJSON(responseObject);
																					                            alert('Evaluación Final Eliminada');
																					                            window.location.reload();
																					                        }
																							            }           
																							        }
																						 	});
																						}
																					}
																				});
																	}
																}
															});
														}
													});

													// -----FIN  ZONA FINALES -----------------------------------------------------------------------------------------



													//elementos clickeados en la tabla para mostrar los datos en el card del lado derecho
													$('#tablaEvaluacionesGeneradas tr').click(function() {
														var evalclicked = $(this).attr('evaluacion');
														$.ajax({
										             		type: 'post',
										             		url: 'core/infoEvaluacionParcial.php',
										             		data: 'evaluacion='+evalclicked,
										             		beforeSend: function() {
										             			$("#tblInfoEvaluacion").hide();
										             			$("#lblInfoEvaluacion").show();
										             			$("#btnDownloadAudioEvalClicked").hide();
																$("#btnDownloadPDFEvalClicked").hide();
										             			$("#lblInfoEvaluacion").html('<img src="facade/img/loading.gif" /><br />Cargando Información de la evaluación parcial...');
										             		},
										             		statusCode: {
										             			301: function(responseObject, textStatus, errorThrown) {
																	$("#modalHome").modal('show');
													                $("#modalHomeTitle").text('Ejecutivo no existe');
													                $("#modalHomeContenido").attr('align', 'left');
													                $("#modalHomeCerrarVentana").show();
													                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
													                $("#modalHomeBtnCerrar").show();
													                $("#modalHomeBtnCerrar").text('Cerrar');
													                $("#modalHomeBtnAccion").hide();
										             			},
										             			200: function(responseObject, textStatus, errorThrown) {
										             				var resultado = JSON.parse(responseObject);
										             				if(resultado[0] == null) {
										             					$("#lblInfoEvaluacion").show();
										             					$("#lblInfoEvaluacion").html('La evaluación esta generada pero sus items no han sido evaluados');
										             					$("#tblInfoEvaluacion").hide();
										             					$("#btnDownloadAudioEvalClicked").hide();
																		$("#btnDownloadPDFEvalClicked").hide();
										             				}else{
										             					$("#lblInfoEvaluacion").hide();
										             					$("#tblInfoEvaluacionT1").html(resultado[0].nombre_categoria);
										             					$("#tblInfoEvaluacionT2").html(resultado[1].nombre_categoria);
										             					$("#tblInfoEvaluacionT3").html(resultado[2].nombre_categoria);

										             					$("#tblInfoEvaluacionV1").html(resultado[0].nota_categoria);
										             					$("#tblInfoEvaluacionV2").html(resultado[1].nota_categoria);
										             					$("#tblInfoEvaluacionV3").html(resultado[2].nota_categoria);
										             					$("#tblInfoEvaluacionVNF").html(resultado[0].nota_parcial);

																		$("#btnDownloadAudioEvalClicked").show();
																		$("#linkBtnDownloadAudioEvalClicked").attr('href', 'files/audio/'+resultado[0].audio);
																		
																		$("#btnDownloadPDFEvalClicked").show();

										             					$("#tblInfoEvaluacion").show();
										             				}
										             			}
										             		}
										             	});
													});


													//Editar Evaluación/eliminar evaluacion / PDF
													$('#tablaEvaluacionesGeneradas tr').on('click', 'button', function(a) { 
														var eval = $(this).attr('evaluacion');
														if($(this).attr('role') == 'editar') {
															//ejecutar edición
															$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
															$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
															$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
											            	$("#modalHomeBtnCerrar").show();
															$("#modalHomeBtnCerrar").text('Cancelar');
															$("#modalHomeCerrarVentana").hide();
															$("#modalHomeBtnAccion").show();
															$("#modalHomeBtnAccion").text('Finalizar Edición Parcial');
															$("#modalHome").modal('show');
														}else if($(this).attr('role') == 'eliminar'){
															//ejecutar eliminación
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identificando');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('Un momento, por favor...');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeConfig").attr('class', 'modal-dialog');
																					$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																					$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'?<br /><strong>Esta acción no podrá deshacerse una vez se confirme.</strong>');
																	            	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cancelar');
																					$("#modalHomeCerrarVentana").hide();
																					$("#modalHomeBtnAccion").show();
																					$("#modalHomeBtnAccion").attr('evaluacion', eval);
																					$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																					$("#modalHome").modal('show');
																	}
																}
															});
														}else if($(this).attr('role') == 'pdf'){
															//generar PDF
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identificando');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('Un momento, por favor...');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {
																			$("#modalHomeBtnAccion").removeAttr('disabled');
																			$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																			$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																			$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+eval+'&tipo=parcial" width="100%" height="600px" />');
															            	$("#modalHomeBtnCerrar").show();
																			$("#modalHomeBtnCerrar").text('Cerrar');
																			$("#modalHomeCerrarVentana").hide();
																			$("#modalHomeBtnAccion").show();
																			$("#modalHomeBtnAccion").attr('evaluacion', eval);
																			$("#modalHomeBtnAccion").text('Descargar Documento PDF');
																			$("#modalHome").modal('show');
																	}
																}
															});
														}else if($(this).attr('role') == 'excel'){
															//generar PDF
															$.ajax({
																type: 'get', 
																url: 'core/SessionManager.php',
																error: function(XMLHttpRequest, textStatus, errorThrown) {
																	if (XMLHttpRequest.readyState == 0) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Verifique su conexión a internet');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																		$("#modalHomeBtnCerrar").show();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").hide();
																		$("#modalHome").modal('show');
																	}
																},
																beforeSend: function() {
																},
																statusCode : {
																	401: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	403: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Identifiquese nuevamente');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	500: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Acceso Restringido');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	503: function(responseObject, textStatus, errorThrown) {
																		$("#modalHomeConfig").attr('class', 'modal-dialog');
																		$("#modalHomeTitle").text('Error Crítico');
																		$("#modalHomeContenido").attr('align', 'left');
																		$("#modalHomeCerrarVentana").show();
																		$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																		$("#modalHomeBtnCerrar").hide();
																		$("#modalHomeBtnCerrar").text('Cerrar');
																		$("#modalHomeBtnAccion").text('Iniciar Sesión');
																		$("#modalHomeBtnAccion").show();
																		$("#modalHome").modal('show');
																	},
																	200: function(responseObject, textStatus, errorThrown) {
																		var evaluacion 		= eval;
													                	var tipo 			= 1;
													                	$("#frmXLSTipo").val(tipo);
													                	$("#frmXLSEvaluacion").val(evaluacion);
													                	$("#frmXls").submit();
																	}
																}
															});
														}
													});
												}
											}
										});
							       	}
							    }
							});
					}
				}
			});
		}
	}else if($("#modalHomeBtnAccion").text() == "Eliminar Evaluación") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
							$.ajax({
							    type: 'post',
							    url: 'core/EliminarEvaluacionParcial.php',
							    data: 'evaluacion='+$("#modalHomeBtnAccion").attr('evaluacion'),
							    beforeSend: function() {
							        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando la eliminación...');
							    },
							    error: function(XMLHttpRequest, textStatus, errorThrown) {
								    if (XMLHttpRequest.readyState == 0) {
										$("#modalHomeConfig").attr('class', 'modal-dialog');
										$("#modalHomeTitle").text('Verifique su conexión a internet');
										$("#modalHomeContenido").attr('align', 'left');
										$("#modalHomeCerrarVentana").show();
										$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
										$("#modalHomeBtnCerrar").show();
										$("#modalHomeBtnCerrar").text('Cerrar');
										$("#modalHomeBtnAccion").hide();
								    }
								},
							    statusCode: {
							        404: function(responseObject, textStatus, errorThrown) {
							            $("#modalHomeContenido").html('No se pudo procesar su solicitud porque no se encontró el servicio que la procesa (HTTP 404)...');
							        },
							        500: function(responseObject, textStatus, errorThrown) {
							            $("#modalHomeContenido").html('La evaluación no existe, posiblemente ya fue eliminada por otro ejecutivo...');
							        },
							        501: function(responseObject, textStatus, errorThrown) {
							            $("#modalHomeContenido").html('<strong>Crítico</strong>: No se recibió el número de evaluación a eliminar...');
							        },
							        206: function(responseObject, textStatus, errorThrown) {
							        	$("#modalHomeTitle").html('<i class="fas fa-exclamation-triangle"></i> Evaluación Bloqueada');
							        	$("#modalHomeContenido").html('Esta evaluación esta siendo utilizada por la <strong>evaluación quincenal '+responseObject+'</strong>. Por favor elimine la evaluación quincenal antes de proceder a eliminar esta evaluación parcial o bien, regenere la evaluación quincenal quitando la evaluación parcial '+$("#modalHomeBtnAccion").attr('evaluacion')+' del las evaluaciones que componen la quincenal.');
							        	$("#modalHomeBtnCerrar").show();
										$("#modalHomeBtnCerrar").text('Cerrar');
										$("#modalHomeBtnAccion").hide();
							        },
							        200: function(responseObject, textStatus, errorThrown) {
							        	$("#modalHomeConfig").attr('class', 'modal-dialog');
							            $("#modalHomeContenido").html(responseObject);
							            $("#modalHomeBtnCerrar").show();
							            $("#modalHomeBtnCerrar").text('Cerrar');
							            $("#modalHomeBtnAccion").hide();
							            $("#tablaEvaluacionesGeneradas tr").remove();
										$.ajax({
											type: 'post',
											url: 'core/ResumenEvaluacionParcialEjecutivo.php',
											data: 'ejecutivo='+irqljob,
											statusCode: {
												500: function(responseObject, textStatus, errorThrown) {
												$("#modalHome").modal('show');
										        $("#modalHomeTitle").text('Ejecutivo no existe');
										        $("#modalHomeContenido").attr('align', 'left');
										        $("#modalHomeCerrarVentana").show();
										        $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
										        $("#modalHomeBtnCerrar").show();
										        $("#modalHomeBtnCerrar").text('Cerrar');
										        $("#modalHomeBtnAccion").hide();
												},
												301: function(responseObject, textStatus, errorThrown) {
												$("#modalHome").modal('show');
										        $("#modalHomeTitle").text('Error crítico');
										        $("#modalHomeContenido").attr('align', 'left');
										        $("#modalHomeCerrarVentana").show();
										        $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
										        $("#modalHomeBtnCerrar").show();
										        $("#modalHomeBtnCerrar").text('Cerrar');
										        $("#modalHomeBtnAccion").hide();
												},
												200: function(responseObject, textStatus, errorThrown) {
													var resultado = JSON.parse(responseObject);

													if(resultado.parciales == null) {
														$("#tblEjecutivoCantidad").html('Ninguna Evaluación Parcial');
													}else{
														$("#tblEjecutivoCantidad").html(resultado.parciales.length);
													}
													
													if(resultado.efinal == null) {
						             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary id="btnFastPDFFinal" disabled="disabled"><i class="fas fa-flag"></i> -.-- PDF</button> <button type="button" class="btn btn-warning" id="btnCrearFinal"><i class="fas fa-asterisk"></i></button></div>');
						             				}else{
						             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary" id="btnFastPDFFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-flag"></i> <strong>'+parseFloat(resultado.efinal.nota).toFixed(2)+'</strong> PDF</button> <button type="button" class="btn btn-warning" id="btnEditarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger" id="btnEliminarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="far fa-trash-alt"></i></button></div>');
						             				}

													if(resultado.quincenal == null) {
						             					$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-calendar-check"></i> <strong>-.--</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
						             				}else{
						             					if(resultado.bloqueado_final == 1  && localStorage.getItem('bloqueoParcial') == 0) {
						             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'" disabled="disabled"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
						             					}else{
						             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-trash-alt"></i></button></div>');
						             					}
						             				}

													if(resultado.parciales == null)  {
														var fila = '';
														fila = fila + '<tr>';
													fila = fila + '<td colspan="6">No se han ingresado evaluaciones para este ejecutivo</td>';
														fila = fila + '</tr>';
														$("#tablaEvaluacionesGeneradas").append(fila);
													}else{
														$.each(resultado.parciales, function(i,v) {
															var fila = '';
							             					//validando si requiere corrección
							             					if(v.estado == 2) { 
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-danger">';  
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-danger"><i class="fas fa-exclamation-circle"></i> Requiere Revisión</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else if(v.estado == 4) {
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-success">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-success"><i class="fas fa-check"></i> Revisada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else if(v.estado == 7) {
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-warning">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-warning"><i class="far fa-tired"></i> Apelada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}else{ 
							             						fila = fila +'<tr evaluacion="'+v.evaluacion+'">'; 
							             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación</strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
							             					}
							             					
								                          
								                            fila = fila +'<td width="200px"><div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-danger btn-sm"><strong>PDF</strong></button><button type="button" class="btn btn-success" evaluacion="'+v.evaluacion+'" role="excel"><strong>Excel</strong></button></div></td>';
								                           	if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            }else if(v.estado == 9) {
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" disabled="disabled" class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';																		                            	
								                            }else{
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>';
								                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';																		                            	
								                            }
								                            fila = fila +'<td style="width:10%; text-align: center;"><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
								                          	fila = fila +'</tr>';
								                          	$("#tablaEvaluacionesGeneradas").append(fila);

														});
													}

													//elementos clickeados en la tabla para mostrar los datos en el card del lado derecho
													$('#tablaEvaluacionesGeneradas tr').click(function() {
														var evalclicked = $(this).attr('evaluacion');
														$.ajax({
										             		type: 'post',
										             		url: 'core/infoEvaluacionParcial.php',
										             		data: 'evaluacion='+evalclicked,
										             		beforeSend: function() {
										             			$("#tblInfoEvaluacion").hide();
										             			$("#lblInfoEvaluacion").show();
										             			$("#btnDownloadAudioEvalClicked").hide();
																$("#btnDownloadPDFEvalClicked").hide();
										             			$("#lblInfoEvaluacion").html('<img src="facade/img/loading.gif" /><br />Cargando Información de la evaluación parcial...');
										             		},
										             		statusCode: {
										             			301: function(responseObject, textStatus, errorThrown) {
																	$("#modalHome").modal('show');
													                $("#modalHomeTitle").text('Ejecutivo no existe');
													                $("#modalHomeContenido").attr('align', 'left');
													                $("#modalHomeCerrarVentana").show();
													                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
													                $("#modalHomeBtnCerrar").show();
													                $("#modalHomeBtnCerrar").text('Cerrar');
													                $("#modalHomeBtnAccion").hide();
										             			},
										             			200: function(responseObject, textStatus, errorThrown) {
										             				var resultado = JSON.parse(responseObject);
										             				if(resultado[0] == null) {
										             					$("#lblInfoEvaluacion").show();
										             					$("#lblInfoEvaluacion").html('La evaluación esta generada pero sus items no han sido evaluados');
										             					$("#tblInfoEvaluacion").hide();
										             					$("#btnDownloadAudioEvalClicked").hide();
																		$("#btnDownloadPDFEvalClicked").hide();
										             				}else{
										             					$("#lblInfoEvaluacion").hide();
										             					$("#tblInfoEvaluacionT1").html(resultado[0].nombre_categoria);
										             					$("#tblInfoEvaluacionT2").html(resultado[1].nombre_categoria);
										             					$("#tblInfoEvaluacionT3").html(resultado[2].nombre_categoria);

										             					$("#tblInfoEvaluacionV1").html(resultado[0].nota_categoria);
										             					$("#tblInfoEvaluacionV2").html(resultado[1].nota_categoria);
										             					$("#tblInfoEvaluacionV3").html(resultado[2].nota_categoria);
										             					$("#tblInfoEvaluacionVNF").html(resultado[0].nota_parcial);

																		$("#btnDownloadAudioEvalClicked").show();
																		$("#linkBtnDownloadAudioEvalClicked").attr('href', 'files/audio/'+resultado[0].audio);
																		
																		$("#btnDownloadPDFEvalClicked").show();

										             					$("#tblInfoEvaluacion").show();
										             				}
										             			}
										             		}
										             	});
													});


													//Editar Evaluación/eliminar evaluacion / PDF
													//Editar Evaluación/eliminar evaluacion / PDF
															$('#tablaEvaluacionesGeneradas tr').on('click', 'button', function(a) { 
																var eval = $(this).attr('evaluacion');
																if($(this).attr('role') == 'editar') {
																	//ejecutar edición
																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																	$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																	$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
													            	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cancelar');
																	$("#modalHomeCerrarVentana").hide();
																	$("#modalHomeBtnAccion").show();
																	$("#modalHomeBtnAccion").text('Finalizar Edición Parcial');
																	$("#modalHome").modal('show');
																}else if($(this).attr('role') == 'eliminar'){
																	//ejecutar eliminación
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identificando');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('Un momento, por favor...');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeConfig").attr('class', 'modal-dialog');
																							$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																							$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'?<br /><strong>Esta acción no podrá deshacerse una vez se confirme.</strong>');
																			            	$("#modalHomeBtnCerrar").show();
																							$("#modalHomeBtnCerrar").text('Cancelar');
																							$("#modalHomeCerrarVentana").hide();
																							$("#modalHomeBtnAccion").show();
																							$("#modalHomeBtnAccion").attr('evaluacion', eval);
																							$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																							$("#modalHome").modal('show');
																			}
																		}
																	});
																}else if($(this).attr('role') == 'pdf'){
																	//generar PDF
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identificando');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('Un momento, por favor...');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeBtnAccion").removeAttr('disabled');
																					$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																					$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																					$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+eval+'&tipo=parcial" width="100%" height="600px" />');
																	            	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeCerrarVentana").hide();
																					$("#modalHomeBtnAccion").show();
																					$("#modalHomeBtnAccion").attr('evaluacion', eval);
																					$("#modalHomeBtnAccion").text('Descargar Documento PDF');
																					$("#modalHome").modal('show');
																			}
																		}
																	});
																}else if($(this).attr('role') == 'excel'){
																	//generar PDF
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																				var evaluacion 		= eval;
															                	var tipo 			= 1;
															                	$("#frmXLSTipo").val(tipo);
															                	$("#frmXLSEvaluacion").val(evaluacion);
															                	$("#frmXls").submit();
																			}
																		}
																	});
																}
															});



												}
											}
										});
							       	}
							    }
							});
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() == "Finalizar Edición Parcial") {
		if(!$("#infoAudioCargado").is(":visible")) {
			alert('Debe seleccionar un audio para poder guardar la evaluación parcial');
			$("#fileAudio").click();
		}else{ 
			$.ajax({
				type: 'get', 
				url: 'core/SessionManager.php',
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.readyState == 0) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Verifique su conexión a internet');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
						$("#modalHomeBtnCerrar").show();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").hide();
						$("#modalHome").modal('show');
					}
				},
				beforeSend: function() {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identificando');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('Un momento, por favor...');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").hide();
						$("#modalHome").modal('show');
				},
				statusCode : {
					401: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identifiquese nuevamente');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					403: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Identifiquese nuevamente');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					500: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Acceso Restringido');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					503: function(responseObject, textStatus, errorThrown) {
						$("#modalHomeConfig").attr('class', 'modal-dialog');
						$("#modalHomeTitle").text('Error Crítico');
						$("#modalHomeContenido").attr('align', 'left');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
						$("#modalHomeBtnCerrar").hide();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeBtnAccion").text('Iniciar Sesión');
						$("#modalHomeBtnAccion").show();
						$("#modalHome").modal('show');
					},
					200: function(responseObject, textStatus, errorThrown) {
									$.ajax({
									    type: 'post',
									    url: 'core/CreateEvaluacionParcialObservacion.php',
									    data: {'comentarios' : quill.root.innerHTML, 'evaluacion' : $("#modalHomeBtnAccion").attr('evaluacion')},
									    beforeSend: function() {
									        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud...');
									    },
									    error: function(XMLHttpRequest, textStatus, errorThrown) {
										    if (XMLHttpRequest.readyState == 0) {
												$("#modalHomeConfig").attr('class', 'modal-dialog');
												$("#modalHomeTitle").text('Verifique su conexión a internet');
												$("#modalHomeContenido").attr('align', 'left');
												$("#modalHomeCerrarVentana").show();
												$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
												$("#modalHomeBtnCerrar").show();
												$("#modalHomeBtnCerrar").text('Cerrar');
												$("#modalHomeBtnAccion").hide();
										    }
										},
									    statusCode: {
									        404: function(responseObject, textStatus, errorThrown) {
									            alert('No se encontró respuesta del servidor para los periodos a trabajar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 404');
									        },
									        500: function(responseObject, textStatus, errorThrown) {
									            alert('El servidor no encontró el número de evaluación que debe actualizar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 500');
									        },
									        501: function(responseObject, textStatus, errorThrown) {
									            alert('El servidor no encontró los comentarios que debe actualizar. CORE CREATEEVALUACIONPARCIALOBSERVARCION 501');
									        },
											503: function(responseObject, textStatus, errorThrown) {
									            alert('La evaluación no retornó ningun resultado o bien el controller retornó un objeto nulo. CORE CREATEEVALUACIONPARCIALOBSERVARCION 503');
									        },
											301: function(responseObject, textStatus, errorThrown) {
									            alert('Los cambios no pudieron ser guardados, por favor intentelo más tarde. CORE CREATEEVALUACIONPARCIALOBSERVARCION 301');
									        },
									        200: function(responseObject, textStatus, errorThrown) {

									        	$("#modalHomeConfig").attr('class', 'modal-dialog');
									            $("#modalHomeContenido").html('La evaluación parcial ha sido actualizada!');
									            $("#modalHomeBtnCerrar").show();
									            $("#modalHomeBtnCerrar").text('Cerrar');
									            $("#modalHomeBtnAccion").hide();
									            $("#tablaEvaluacionesGeneradas tr").remove();
												$.ajax({
													type: 'post',
													url: 'core/ResumenEvaluacionParcialEjecutivo.php',
													data: 'ejecutivo='+irqljob,
													beforeSend: function() {
														//$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Obteniendo información del ejecutivo...');
													},
													statusCode: {
														500: function(responseObject, textStatus, errorThrown) {
														$("#modalHome").modal('show');
												        $("#modalHomeTitle").text('Ejecutivo no existe');
												        $("#modalHomeContenido").attr('align', 'left');
												        $("#modalHomeCerrarVentana").show();
												        $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
												        $("#modalHomeBtnCerrar").show();
												        $("#modalHomeBtnCerrar").text('Cerrar');
												        $("#modalHomeBtnAccion").hide();
														},
														301: function(responseObject, textStatus, errorThrown) {
														$("#modalHome").modal('show');
												        $("#modalHomeTitle").text('Error crítico');
												        $("#modalHomeContenido").attr('align', 'left');
												        $("#modalHomeCerrarVentana").show();
												        $("#modalHomeContenido").html('El parámetro para ejecutar su consulta no fue recibido provocando este error crítico. <br /><strong>HTTP 301</strong>');
												        $("#modalHomeBtnCerrar").show();
												        $("#modalHomeBtnCerrar").text('Cerrar');
												        $("#modalHomeBtnAccion").hide();
														},
														200: function(responseObject, textStatus, errorThrown) {
															var resultado = JSON.parse(responseObject);

															if(resultado.parciales == null) {
																$("#tblEjecutivoCantidad").html('Ninguna Evaluación Parcial');
															}else{
																$("#tblEjecutivoCantidad").html(resultado.parciales.length);
															}
															
															if(resultado.efinal == null) {
								             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary id="btnFastPDFFinal" disabled="disabled"><i class="fas fa-flag"></i> -.-- PDF</button> <button type="button" class="btn btn-warning" id="btnCrearFinal"><i class="fas fa-asterisk"></i></button></div>');
								             				}else{
								             					$("#tblEjecutivoFinal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" class="btn btn-primary" id="btnFastPDFFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-flag"></i> <strong>'+parseFloat(resultado.efinal.nota).toFixed(2)+'</strong> PDF</button> <button type="button" class="btn btn-warning" id="btnEditarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="fas fa-pen"></i></button><button type="button" class="btn btn-danger" id="btnEliminarFinal" evaluacion="'+resultado.efinal.evaluaucion+'"><i class="far fa-trash-alt"></i></button></div>');
								             				}

															if(resultado.quincenal == null) {
								             					$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-calendar-check"></i> <strong>-.--</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="0" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
								             				}else{
								             					if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
								             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'" disabled="disabled"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'" disabled="disabled"><i class="far fa-trash-alt"></i></button></div>');
								             					}else{
								             						$("#tblEjecutivoQuincenal").html('<div class="btn-group btn-group-sm" role="group" aria-label="Quincenal"><button type="button" class="btn btn-primary btn-sm" id="btnPDFQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-calendar-check"></i> <strong>'+parseFloat(resultado.quincenal.nota).toFixed(2)+'</strong> PDF</button><button type="button" class="btn btn-warning btn-sm" id="btnRegenerarQuincenal" ejecutivo="'+irqljob+'"><i class="fas fa-sync-alt"></i></button><button type="button" class="btn btn-danger btn-sm" id="btnEliminarQuincenal" evaluacion="'+resultado.quincenal.evaluacion+'"><i class="far fa-trash-alt"></i></button></div>');
								             					}
								             				}

															if(resultado.parciales == null)  {
																var fila = '';
																fila = fila + '<tr>';
															fila = fila + '<td colspan="6">No se han ingresado evaluaciones para este ejecutivo</td>';
																fila = fila + '</tr>';
																$("#tablaEvaluacionesGeneradas").append(fila);
															}else{
																$.each(resultado.parciales, function(i,v) {
																	var fila = '';
									             					//validando si requiere corrección
									             					if(v.estado == 2) { 
									             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-danger">';  
									             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-danger"><i class="fas fa-exclamation-circle"></i> Requiere Revisión</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
									             					}else if(v.estado == 4) {
									             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-success">'; 
									             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-success"><i class="fas fa-check"></i> Revisada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
									             					}else if(v.estado == 7) {
									             						fila = fila +'<tr evaluacion="'+v.evaluacion+'" class="table-warning">'; 
									             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación <span class="badge badge-warning"><i class="far fa-tired"></i> Apelada</span></strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
									             					}else{ 
									             						fila = fila +'<tr evaluacion="'+v.evaluacion+'">'; 
									             						fila = fila +'<td scope="row col-9" style="width:80%;"><strong>'+v.orden+'° Evaluación</strong><br /><div style="font-size:11px;"><i class="fas fa-edit"></i> <strong>'+v.evaluacion+'</strong> | <i class="far fa-calendar-alt"></i> <strong>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</strong></div></th>';
									             					}
									             					
										                          
										                            fila = fila +'<td width="200px"><div class="btn-group btn-group-sm" role="group" aria-label="Basic example"><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-danger btn-sm"><strong>PDF</strong></button><button type="button" class="btn btn-success" evaluacion="'+v.evaluacion+'" role="excel"><strong>Excel</strong></button></div></td>';
										                           	if(resultado.bloqueado_final == 1 && localStorage.getItem('bloqueoParcial') == 0) {
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';
										                            }else if(v.estado == 9) {
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i></button></td>';
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" disabled="disabled" class="btn btn-warning btn-sm"><i class="fas fa-lock"></i></button></td>';																		                            	
										                            }else{
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>';
										                            	fila = fila +'<td width="50px"><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm"><i class="fas fa-pen"></i></button></td>';																		                            	
										                            }
										                            fila = fila +'<td style="width:10%; text-align: center;"><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
										                          	fila = fila +'</tr>';
										                          	$("#tablaEvaluacionesGeneradas").append(fila);

																});
															}

															//elementos clickeados en la tabla para mostrar los datos en el card del lado derecho
															$('#tablaEvaluacionesGeneradas tr').click(function() {
																var evalclicked = $(this).attr('evaluacion');
																$.ajax({
												             		type: 'post',
												             		url: 'core/infoEvaluacionParcial.php',
												             		data: 'evaluacion='+evalclicked,
												             		beforeSend: function() {
												             			$("#tblInfoEvaluacion").hide();
												             			$("#lblInfoEvaluacion").show();
												             			$("#btnDownloadAudioEvalClicked").hide();
																		$("#btnDownloadPDFEvalClicked").hide();
												             			$("#lblInfoEvaluacion").html('<img src="facade/img/loading.gif" /><br />Cargando Información de la evaluación parcial...');
												             		},
												             		statusCode: {
												             			301: function(responseObject, textStatus, errorThrown) {
																			$("#modalHome").modal('show');
															                $("#modalHomeTitle").text('Ejecutivo no existe');
															                $("#modalHomeContenido").attr('align', 'left');
															                $("#modalHomeCerrarVentana").show();
															                $("#modalHomeContenido").html('El ejecutivo por el cual usted ha consultado (<b>'+irqljob+'</b>) no existe en la base de datos. <br /><strong>HTTP 500</strong>');
															                $("#modalHomeBtnCerrar").show();
															                $("#modalHomeBtnCerrar").text('Cerrar');
															                $("#modalHomeBtnAccion").hide();
												             			},
												             			200: function(responseObject, textStatus, errorThrown) {
												             				var resultado = JSON.parse(responseObject);
												             				if(resultado[0] == null) {
												             					$("#lblInfoEvaluacion").show();
												             					$("#lblInfoEvaluacion").html('La evaluación esta generada pero sus items no han sido evaluados');
												             					$("#tblInfoEvaluacion").hide();
												             					$("#btnDownloadAudioEvalClicked").hide();
																				$("#btnDownloadPDFEvalClicked").hide();
												             				}else{
												             					$("#lblInfoEvaluacion").hide();
												             					$("#tblInfoEvaluacionT1").html(resultado[0].nombre_categoria);
												             					$("#tblInfoEvaluacionT2").html(resultado[1].nombre_categoria);
												             					$("#tblInfoEvaluacionT3").html(resultado[2].nombre_categoria);

												             					$("#tblInfoEvaluacionV1").html(resultado[0].nota_categoria);
												             					$("#tblInfoEvaluacionV2").html(resultado[1].nota_categoria);
												             					$("#tblInfoEvaluacionV3").html(resultado[2].nota_categoria);
												             					$("#tblInfoEvaluacionVNF").html(resultado[0].nota_parcial);

																				$("#btnDownloadAudioEvalClicked").show();
																				$("#linkBtnDownloadAudioEvalClicked").attr('href', 'files/audio/'+resultado[0].audio);
																				
																				$("#btnDownloadPDFEvalClicked").show();

												             					$("#tblInfoEvaluacion").show();
												             				}
												             			}
												             		}
												             	});
															});


															//Editar Evaluación/eliminar evaluacion / PDF
															$('#tablaEvaluacionesGeneradas tr').on('click', 'button', function(a) { 
																var eval = $(this).attr('evaluacion');
																if($(this).attr('role') == 'editar') {
																	//ejecutar edición
																	$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																	$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																	$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
													            	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cancelar');
																	$("#modalHomeCerrarVentana").hide();
																	$("#modalHomeBtnAccion").show();
																	$("#modalHomeBtnAccion").text('Finalizar Edición Parcial');
																	$("#modalHome").modal('show');
																}else if($(this).attr('role') == 'eliminar'){
																	//ejecutar eliminación
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identificando');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('Un momento, por favor...');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																							$("#modalHomeConfig").attr('class', 'modal-dialog');
																							$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																							$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'?<br /><strong>Esta acción no podrá deshacerse una vez se confirme.</strong>');
																			            	$("#modalHomeBtnCerrar").show();
																							$("#modalHomeBtnCerrar").text('Cancelar');
																							$("#modalHomeCerrarVentana").hide();
																							$("#modalHomeBtnAccion").show();
																							$("#modalHomeBtnAccion").attr('evaluacion', eval);
																							$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																							$("#modalHome").modal('show');
																			}
																		}
																	});
																}else if($(this).attr('role') == 'pdf'){
																	//generar PDF
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identificando');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('Un momento, por favor...');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																					$("#modalHomeBtnAccion").removeAttr('disabled');
																					$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																					$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																					$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+eval+'&tipo=parcial" width="100%" height="600px" />');
																	            	$("#modalHomeBtnCerrar").show();
																					$("#modalHomeBtnCerrar").text('Cerrar');
																					$("#modalHomeCerrarVentana").hide();
																					$("#modalHomeBtnAccion").show();
																					$("#modalHomeBtnAccion").attr('evaluacion', eval);
																					$("#modalHomeBtnAccion").text('Descargar Documento PDF');
																					$("#modalHome").modal('show');
																			}
																		}
																	});
																}else if($(this).attr('role') == 'excel'){
																	//generar PDF
																	$.ajax({
																		type: 'get', 
																		url: 'core/SessionManager.php',
																		error: function(XMLHttpRequest, textStatus, errorThrown) {
																			if (XMLHttpRequest.readyState == 0) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Verifique su conexión a internet');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
																				$("#modalHomeBtnCerrar").show();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").hide();
																				$("#modalHome").modal('show');
																			}
																		},
																		beforeSend: function() {
																		},
																		statusCode : {
																			401: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			403: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Identifiquese nuevamente');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			500: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Acceso Restringido');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			503: function(responseObject, textStatus, errorThrown) {
																				$("#modalHomeConfig").attr('class', 'modal-dialog');
																				$("#modalHomeTitle").text('Error Crítico');
																				$("#modalHomeContenido").attr('align', 'left');
																				$("#modalHomeCerrarVentana").show();
																				$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
																				$("#modalHomeBtnCerrar").hide();
																				$("#modalHomeBtnCerrar").text('Cerrar');
																				$("#modalHomeBtnAccion").text('Iniciar Sesión');
																				$("#modalHomeBtnAccion").show();
																				$("#modalHome").modal('show');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																				var evaluacion 		= eval;
															                	var tipo 			= 1;
															                	$("#frmXLSTipo").val(tipo);
															                	$("#frmXLSEvaluacion").val(evaluacion);
															                	$("#frmXls").submit();
																			}
																		}
																	});
																}
															});

														}
													}
												});
									       	}
									    }
									});
					}
				}
			});
		}
	}else if($("#modalHomeBtnAccion").text() == "Descargar Documento PDF") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
						window.location.href="core/pdfGenerate.php?evaluacion="+$("#modalHomeBtnAccion").attr('evaluacion')+"&tipo=parcial&accion=descargar";
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() == "Guardar Evaluación Final") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
						$.ajax({
							url: 'core/CreateEvaluacionFinalObservacion.php',
							type: 'POST',
							data: {'comentario' : quill.root.innerHTML, 'evaluacion' : $("#modalHomeBtnAccion").attr('evaluacion')},
							beforeSend: function() {
							},
							statusCode: {
								302: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeTitle").text('Error al guardar la observación');
									$("#modalHomeContenido").html('No se recibió uno de los parámetros para poder guardar la observación. La evaluación final esta guardada pero editela para ingresar nuevamente su observación.<br /><strong>HTTP 302</strong>');
									$("#modalHomeBtnAccion").hide();
								},
								301: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeTitle").text('Error al guardar la observación');
									$("#modalHomeContenido").html('No se recibió uno de los parámetros para poder guardar la observación. La evaluación final esta guardada pero editela para ingresar nuevamente su observación.<br /><strong>HTTP 301</strong>');
									$("#modalHomeBtnAccion").hide();
								},
								204: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeTitle").text('Error al guardar la observación');
									$("#modalHomeContenido").html('Ocurrió un error al guardar la observación... Por favor intentelo más tarde.<br /><strong>HTTP 204</strong>');
									$("#modalHomeBtnAccion").hide();
								},
								200: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html('<strong>Evaluación guardada con éxito</strong>');
									$("#modalHomeBtnAccion").hide();
									localStorage.setItem('bloqueoParcial', 1); 
									 alert('Evaluación final creada');
				                     window.location.reload();
								}
							}
						});
				}
			}
		});
	}else if ($("#modalHomeBtnAccion").text() == "Iniciar Sesión") {
		window.location.href="index.php";
	}else if($("#modalHomeBtnAccion").text() == "Descargar PDF Quincenal") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
						window.location.href="core/pdfGenerate.php?evaluacion="+$("#modalHomeBtnAccion").attr('evaluacion')+"&tipo=quincenal&accion=descargar";
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() == "Regenerar Quincenal") {
		var array = [];
		$('input[type=checkbox]:checked').each(function() {
			array.push($(this).val());
		});
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {

						$.ajax({
							type: 'post',
							url: 'core/QuincenalManualGen.php',
							data: 'evas='+JSON.stringify(array)+'&ejecutivo='+$("#modalHomeBtnAccion").attr('ejecutivo')+'&area='+$("#slcArea").val(),
							beforeSend: function() {
								$("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Procesando su solicitud...');	
								$("#modalHomeBtnAccion").hide();
							},
							statusCode: {
								201: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								202: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								404: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								205: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								206: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								500: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								203: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html(responseObject);
								},
								200: function(responseObject, textStatus, errorThrown) {
									$("#modalHomeContenido").html('Evaluación quincenal regenerada con éxito');
									alert('Evaluación quincenal regenerada con éxito :'+responseObject);
									window.location.reload();
								}
							}
						});
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() ==  "Descargar Evaluación Final") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
					window.location.href="core/pdfGenerate.php?evaluacion="+$("#modalHomeBtnAccion").attr('evaluacion')+"&tipo=final&accion=descargar";
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() == "Finalizar Edición") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
					$.ajax({
						url: 'core/CreateEvaluacionFinalObservacion.php',
						type: 'POST',
						data: {'comentario' : quill.root.innerHTML, 'evaluacion' : $("#modalHomeBtnAccion").attr('evaluacion')},
						beforeSend: function() {

						},
						statusCode: {
							302: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeTitle").text('Error al guardar la observación');
								$("#modalHomeContenido").html('No se recibió uno de los parámetros para poder guardar la observación. La evaluación final esta guardada pero editela para ingresar nuevamente su observación.<br /><strong>HTTP 302</strong>');
								$("#modalHomeBtnAccion").hide();
							},
							301: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeTitle").text('Error al guardar la observación');
								$("#modalHomeContenido").html('No se recibió uno de los parámetros para poder guardar la observación. La evaluación final esta guardada pero editela para ingresar nuevamente su observación.<br /><strong>HTTP 301</strong>');
								$("#modalHomeBtnAccion").hide();
							},
							204: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeTitle").text('Error al guardar la observación');
								$("#modalHomeContenido").html('Ocurrió un error al guardar la observación... Por favor intentelo más tarde.<br /><strong>HTTP 204</strong>');
								$("#modalHomeBtnAccion").hide();
							},
							200: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeContenido").html('<strong>Evaluación guardada con éxito</strong>');
								$("#modalHomeBtnAccion").hide();
								$("#modalHomeBtnCerrar").show();
						        $("#modalHomeBtnCerrar").text('Cerrar');
							}
						}
					});
				}
			}
		});
	}else if($("#modalHomeBtnAccion").text() == "Entiendo, Desbloquear") {
		$.ajax({
			type: 'get', 
			url: 'core/SessionManager.php',
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.readyState == 0) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Verifique su conexión a internet');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalHomeBtnCerrar").show();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
				}
			},
			beforeSend: function() {
				$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identificando');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('Un momento, por favor...');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").hide();
					$("#modalHome").modal('show');
			},
			statusCode : {
				401: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Ha permanecido demasiado tiempo inactivo</strong> Por favor inicie sesión nuevamente');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				403: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Identifiquese nuevamente');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>No se ha encontrado la variable de usuario y tiempo de actividad del sistema</strong> (CORE SESSIONMANAGER HTTP 403)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				500: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Acceso Restringido');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>Usted no cuenta con los privilegios para acceder al sistema</strong> (CORE SESSIONMANAGER HTTP 500)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				503: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeConfig").attr('class', 'modal-dialog');
					$("#modalHomeTitle").text('Error Crítico');
					$("#modalHomeContenido").attr('align', 'left');
					$("#modalHomeCerrarVentana").show();
					$("#modalHomeContenido").html('<strong>El sistema de evaluaciones huesped no ha sido encontrado definida la sesión del sistema hospedador. Inicie sesión nuevamente, si el problema persiste por favor comuníquese con el desarollador.</strong> (Información técnica: RAULI NO ENTREGA VARIABLE DE SESION A SISTEMA HTTP 503 CORE SESSION MANAGER)');
					$("#modalHomeBtnCerrar").hide();
					$("#modalHomeBtnCerrar").text('Cerrar');
					$("#modalHomeBtnAccion").text('Iniciar Sesión');
					$("#modalHomeBtnAccion").show();
					$("#modalHome").modal('show');
				},
				200: function(responseObject, textStatus, errorThrown) {
					$("#modalHomeTitle").text('Procesando...');
					$("#modalHomeContenido").html('<img src="facade/img/loading2.gif"> Desbloqueando...');
					$.ajax({
						url: 'core/desbloqueoParcialesInit.php',
						data: {'ejecutivo': irqljob},
						type: 'POST',
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							if (XMLHttpRequest.readyState == 0) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Verifique su conexión a internet');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto los últimos cambios de su evaluación no pudieron ser guardadas. <strong>Pero calma... que no panda el cúnico!</strong>, Las calificaciones, audio y adjuntos que has seleccionado para esta evaluación han sido guardados de forma automática y lo mas probable es que solo hayas perdido la observación de la interacción telefónica. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").hide();
								$("#modalHome").modal('show');
							}
						},
						statusCode : {
							201: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Petición rechazada');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('<strong>No se ha recibido el rut del ejecutivo que intenta desbloquear</strong> Se cancela la petición');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").text('Iniciar Sesión');
								$("#modalHomeBtnAccion").hide();
								$("#modalHome").modal('show');
							},
							203: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Identifiquese nuevamente');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('<strong>El sistema no recibió de forma íntegra su credencial de indentificación</strong> La petición fue rechazada (CORE DESBLOQPARCIALES HTTP 203)');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").text('Iniciar Sesión');
								$("#modalHomeBtnAccion").show();
								$("#modalHome").modal('show');
							},
							204: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('No se pudo registrar la petición');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('<strong>Falló el registro de la petición por parte del evaluador en el sistema de LOGs</strong> (CORE DESBLOQPARCIALES HTTP 204)');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").text('Iniciar Sesión');
								$("#modalHomeBtnAccion").hide();
								$("#modalHome").modal('show');
							},
							400: function(responseObject, textStatus, errorThrown) {
								$("#modalHomeConfig").attr('class', 'modal-dialog');
								$("#modalHomeTitle").text('Error Crítico');
								$("#modalHomeContenido").attr('align', 'left');
								$("#modalHomeCerrarVentana").show();
								$("#modalHomeContenido").html('<strong>El sistema de evaluaciones controló un error crítico.</strong> (Información técnica: TRY CATCH EVENT EXCEPTION CONTROLLED HTTP 400 CORE DESBLOQPARCIALES)');
								$("#modalHomeBtnCerrar").show();
								$("#modalHomeBtnCerrar").text('Cerrar');
								$("#modalHomeBtnAccion").text('Iniciar Sesión');
								$("#modalHomeBtnAccion").hide();
								$("#modalHome").modal('show');
							},
							200: function(responseObject, textStatus, errorThrown) {
								$("#btnGenerarEva").removeAttr('disabled');
								$("#btnGenerarEva").html('<i class="fas fa-plus-square"></i> Generar Evaluación');

								$("#btnRegenerarQuincenal").removeAttr('disabled');
								$("#btnEliminarQuincenal").removeAttr('disabled');

								$.each($("#tablaEvaluacionesGeneradas button.btn.btn-danger.btn-sm"), function(a,b) {
									$(this).removeAttr('disabled');
									$(this).html('<i class="far fa-trash-alt"></i>');
								});

								$.each($("#tablaEvaluacionesGeneradas button.btn.btn-warning.btn-sm"), function(a,b) {
									$(this).removeAttr('disabled');
									$(this).html('<i class="fas fa-pen"></i>');
								});

								$("#btnUnlockEvas").attr('class', 'btn-danger btn-sm');
								$("#btnUnlockEvas").attr('title', 'Bloquear y actualizar');
								$("#btnUnlockEvas").html('<i class="fas fa-lock"></i> <strong>Bloquear</strong>');

								if(localStorage.getItem('bloqueoParcial') == null) {
									localStorage.setItem('bloqueoParcial', 1); 
								}else{
									localStorage.setItem('bloqueoParcial', 1);
								}

								setTimeout(function(){ $("#modalHomeCerrarVentana").click(); }, 2000);
							}
						}
					});
				}
			}
		});
	}
})


