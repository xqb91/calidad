

var tablaEjecutivos;
var irqljob = $("#irqljob").val();


$(document).ready(function(){
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

																				             				$("#tblEjecutivoNombre").html('<b>'+resultado[0].ejecutivo.nombre_ejecutivo+'</b>');
																				             				$("#tblEjecutivoArea").html('<b>'+resultado[0].area.nombre_area+'</b> <em>'+resultado[0].ciclo.nombre_ciclo+' '+resultado[0].jornada.nombre_ciclo+'</em>');
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

																				             				if(resultado.bloqueado_final == 1) {
																				             					$("#btnGenerarEva").prop('disabled', true);
																				             					$("#btnGenerarEva").html('<i class="fas fa-lock"></i> <strong>Bloqueado porque existe Evaluación Final</strong>');
																				             				}

																				             				if(resultado.parciales == null) {
																				             					$("#tblEjecutivoCantidad").html('Ninguna Evaluación Parcial');
																				             				}else{
																				             					$("#tblEjecutivoCantidad").html(resultado.parciales.length);
																				             				}
																				             				
																				             				if(resultado.efinal == null) {
																				             					$("#tblEjecutivoFinal").html('No Generada');
																				             				}else{
																				             					$("#tblEjecutivoFinal").html(parseFloat(resultado.efinal.nota).toFixed(2));
																				             				}

																				             				if(resultado.quincenal == null) {
																				             					$("#tblEjecutivoQuincenal").html('No Generada');
																				             				}else{
																				             					$("#tblEjecutivoQuincenal").html(parseFloat(resultado.quincenal.nota).toFixed(2));
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
																					             					fila = fila +'<tr evaluacion="'+v.evaluacion+'">';
																						                            fila = fila +'<td>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</td>';
																						                            fila = fila +'<td scope="row col-9" style="width: 40%;">Evaluación #'+v.evaluacion+'</th>';
																						                            fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
																						                           	if(resultado.bloqueado_final == 1) {
																						                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-lock"></i></button></td>';
																						                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm">Editar <i class="fas fa-lock"></i></button></td>';
																						                            }else{
																						                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm">Eliminar <i class="far fa-trash-alt"></i></button></td>';
																						                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm">Editar <i class="far fa-edit"></i></button></td>';																		                            	
																						                            }
																						                            fila = fila +'<td><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
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
																																		$("#modalHomeConfig").attr('class', 'modal-dialog modal-xl');
																																		$("#modalHomeTitle").html('<i class="far fa-edit"></i> Edición de Evaluación Parcial #'+eval);
																																		$("#modalHomeContenido").load('editor.php?evaluacion='+eval);
																														            	$("#modalHomeBtnCerrar").show();
																																		$("#modalHomeBtnCerrar").text('Cancelar');
																																		$("#modalHomeCerrarVentana").hide();
																																		$("#modalHomeBtnAccion").show();
																																		$("#modalHomeBtnAccion").text('Finalizar Edición');
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
																													}else{
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
																		$("#tblEjecutivoFinal").html('No Generada');
																	}else{
																		$("#tblEjecutivoFinal").html(parseFloat(resultado.efinal.nota).toFixed(2));
																	}

																	if(resultado.quincenal == null) {
																		$("#tblEjecutivoQuincenal").html('No Generada');
																	}else{
																		$("#tblEjecutivoQuincenal").html(parseFloat(resultado.quincenal.nota).toFixed(2));
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
																			fila = fila +'<tr evaluacion="'+v.evaluacion+'">';
														                fila = fila +'<td>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</td>';
														                fila = fila +'<td scope="row col-9" style="width: 40%;">Evaluación #'+v.evaluacion+'</th>';
														                fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
											                            fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
											                           	if(resultado.bloqueado_final == 1) {
											                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-lock"></i></button></td>';
											                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm">Editar <i class="fas fa-lock"></i></button></td>';
											                            }else{
											                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm">Eliminar <i class="far fa-trash-alt"></i></button></td>';
											                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm">Editar <i class="far fa-edit"></i></button></td>';																		                            	
											                            }
											                            fila = fila +'<td><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
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
																			$("#modalHomeBtnAccion").text('Finalizar Edición');
																			$("#modalHome").modal('show');
																		}else if($(this).attr('role') == 'eliminar'){
																			//ejecutar eliminación
																			$("#modalHomeConfig").attr('class', 'modal-dialog');
																			$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																			$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'? <strong>Esta acción no podrá deshacerse una vez se apruebe.</strong>');
															            	$("#modalHomeBtnCerrar").show();
																			$("#modalHomeBtnCerrar").text('Cancelar');
																			$("#modalHomeCerrarVentana").hide();
																			$("#modalHomeBtnAccion").show();
																			$("#modalHomeBtnAccion").attr('evaluacion', eval);
																			$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																			$("#modalHome").modal('show');
																		}else{
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
														$("#tblEjecutivoFinal").html('No Generada');
													}else{
														$("#tblEjecutivoFinal").html(parseFloat(resultado.efinal.nota).toFixed(2));
													}

													if(resultado.quincenal == null) {
														$("#tblEjecutivoQuincenal").html('No Generada');
													}else{
														$("#tblEjecutivoQuincenal").html(parseFloat(resultado.quincenal.nota).toFixed(2));
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
															fila = fila +'<tr evaluacion="'+v.evaluacion+'">';
										                fila = fila +'<td>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</td>';
										                fila = fila +'<td scope="row col-9" style="width: 40%;">Evaluación #'+v.evaluacion+'</th>';
										                fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
							                           	if(resultado.bloqueado_final == 1) {
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-lock"></i></button></td>';
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm">Editar <i class="fas fa-lock"></i></button></td>';
							                            }else{
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm">Eliminar <i class="far fa-trash-alt"></i></button></td>';
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm">Editar <i class="far fa-edit"></i></button></td>';																		                            	
							                            }						                fila = fila +'<td><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
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
															$("#modalHomeBtnAccion").text('Finalizar Edición');
															$("#modalHome").modal('show');
														}else if($(this).attr('role') == 'eliminar'){
															//ejecutar eliminación
															$("#modalHomeConfig").attr('class', 'modal-dialog');
															$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
															$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'? <strong>Esta acción no podrá deshacerse una vez se apruebe.</strong>');
											            	$("#modalHomeBtnCerrar").show();
															$("#modalHomeBtnCerrar").text('Cancelar');
															$("#modalHomeCerrarVentana").hide();
															$("#modalHomeBtnAccion").show();
															$("#modalHomeBtnAccion").attr('evaluacion', eval);
															$("#modalHomeBtnAccion").text('Eliminar Evaluación');
															$("#modalHome").modal('show');
														}else{
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
														$("#tblEjecutivoFinal").html('No Generada');
													}else{
														$("#tblEjecutivoFinal").html(parseFloat(resultado.efinal.nota).toFixed(2));
													}

													if(resultado.quincenal == null) {
														$("#tblEjecutivoQuincenal").html('No Generada');
													}else{
														$("#tblEjecutivoQuincenal").html(parseFloat(resultado.quincenal.nota).toFixed(2));
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
															fila = fila +'<tr evaluacion="'+v.evaluacion+'">';
										                fila = fila +'<td>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</td>';
										                fila = fila +'<td scope="row col-9" style="width: 40%;">Evaluación #'+v.evaluacion+'</th>';
										                fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
							                           	if(resultado.bloqueado_final == 1) {
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-lock"></i></button></td>';
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm">Editar <i class="fas fa-lock"></i></button></td>';
							                            }else{
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm">Eliminar <i class="far fa-trash-alt"></i></button></td>';
							                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm">Editar <i class="far fa-edit"></i></button></td>';																		                            	
							                            }					                
							                            fila = fila +'<td><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
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
															$("#modalHomeBtnAccion").text('Finalizar Edición');
															$("#modalHome").modal('show');
														}else if($(this).attr('role') == 'eliminar'){
															//ejecutar eliminación
															$("#modalHomeConfig").attr('class', 'modal-dialog');
															$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
															$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'? <strong>Esta acción no podrá deshacerse una vez se apruebe.</strong>');
											            	$("#modalHomeBtnCerrar").show();
															$("#modalHomeBtnCerrar").text('Cancelar');
															$("#modalHomeCerrarVentana").hide();
															$("#modalHomeBtnAccion").show();
															$("#modalHomeBtnAccion").attr('evaluacion', eval);
															$("#modalHomeBtnAccion").text('Eliminar Evaluación');
															$("#modalHome").modal('show');
														}else{
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
	}else if($("#modalHomeBtnAccion").text() == "Finalizar Edición") {
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
																$("#tblEjecutivoFinal").html('No Generada');
															}else{
																$("#tblEjecutivoFinal").html(parseFloat(resultado.efinal.nota).toFixed(2));
															}

															if(resultado.quincenal == null) {
																$("#tblEjecutivoQuincenal").html('No Generada');
															}else{
																$("#tblEjecutivoQuincenal").html(parseFloat(resultado.quincenal.nota).toFixed(2));
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
																	fila = fila +'<tr evaluacion="'+v.evaluacion+'">';
												                fila = fila +'<td>'+v.fecha_evaluacion.substr(8,2)+'-'+v.fecha_evaluacion.substr(5,2)+'-'+v.fecha_evaluacion.substr(2,2)+'</td>';
												                fila = fila +'<td scope="row col-9" style="width: 40%;">Evaluación #'+v.evaluacion+'</th>';
												                fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="pdf" class="btn btn-info btn-sm">Descargar Pdf <i class="far fa-file-pdf"></i></button></td>';
									                           	if(resultado.bloqueado_final == 1) {
									                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" disabled="disabled" class="btn btn-danger btn-sm">Eliminar <i class="fas fa-lock"></i></button></td>';
									                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar"  disabled="disabled"  class="btn btn-warning btn-sm">Editar <i class="fas fa-lock"></i></button></td>';
									                            }else{
									                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="eliminar" class="btn btn-danger btn-sm">Eliminar <i class="far fa-trash-alt"></i></button></td>';
									                            	fila = fila +'<td><button type="button" evaluacion="'+v.evaluacion+'" role="editar" class="btn btn-warning btn-sm">Editar <i class="far fa-edit"></i></button></td>';																		                            	
									                            }						                
									                            fila = fila +'<td><i class="fas fa-book"></i> <strong>'+v.nota+'</strong></td>';
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
																	$("#modalHomeBtnAccion").text('Finalizar Edición');
																	$("#modalHome").modal('show');
																}else if($(this).attr('role') == 'eliminar'){
																	//ejecutar eliminación
																	$("#modalHomeConfig").attr('class', 'modal-dialog');
																	$("#modalHomeTitle").html('<i class="far fa-trash-alt"></i> Atención');
																	$("#modalHomeContenido").html('¿Esta usted seguro de eliminar la evaluación número '+eval+'? <strong>Esta acción no podrá deshacerse una vez se apruebe.</strong>');
													            	$("#modalHomeBtnCerrar").show();
																	$("#modalHomeBtnCerrar").text('Cancelar');
																	$("#modalHomeCerrarVentana").hide();
																	$("#modalHomeBtnAccion").show();
																	$("#modalHomeBtnAccion").attr('evaluacion', eval);
																	$("#modalHomeBtnAccion").text('Eliminar Evaluación');
																	$("#modalHome").modal('show');
																}else{
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
							data: {'comentarios' : quill.root.innerHTML, 'evaluacion' : $("#modalHomeBtnAccion").attr('evaluacion')},
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
								}
							}
						});
				}
			}
		});
	}else if ($("#modalHomeBtnAccion").text() == "Iniciar Sesión") {
		window.location.href="index.php";
	}
})



