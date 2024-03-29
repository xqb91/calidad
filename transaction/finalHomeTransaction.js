

var tablaEjecutivos;

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
														                $("#slcArea").removeAttr('disabled');

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
																			               	$.ajax({
																							    type: 'post',
																							    url: 'core/ListEjecutivosPorAreaFinal.php',
																							    data: 'area='+area,
																							    beforeSend: function() {
																							        //inicializando modal que valida sesión de raulí
																							        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Buscando ejecutivos del área seleccionada...');
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
																					                            //cargando datos a la tabla
																					                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
																												    data: resultado,
																												    columns: [
																												    	{ data: 'nota_final'},
																												        { data: 'rut_ejecutivo' },
																												        { data: 'nombre_ejecutivo' },
																												        { data: null},
																												        { data: null},
																												        { data: null},
																												    ],
																												    //añadiendo botones de acción
																											        "columnDefs": [ 
																											        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
																											        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
																											        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
																											        ],
																													rowCallback : function(row, data, index) {
																														if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
																														 	$(row).find('td:eq(0)').addClass('table-success');
																														 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																														 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																														 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																														 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																														 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																														}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
																														 	$(row).find('td:eq(0)').addClass('table-warning');
																														 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																														 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																															$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																															$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																															$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																														}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
																														 	$(row).find('td:eq(0)').addClass('table-danger');
																														 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																														 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																															$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																															$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																															$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																														}else{
																														 	$(row).find('td:eq(0)').addClass('table-danger');
																														 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
																														 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
																														}
																													}
																														
																												});

																												$("#modalHomeBtnCerrar").click();
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

					$.ajax({
						type: 'get',
						url : 'core/EstadisticasPersonales.php',
						beforeSend: function() {
							$("#estadisticas").html('');
						},
						statusCode: {
							404: function(responseObject, textStatus, errorThrown) {
								alert('no encontrado');
							},
							200: function(responseObject, textStatus, errorThrown) {
								respuesta = JSON.parse(responseObject);
								var insertar = "";
								$.each(respuesta, function(index, e) {
									insertar = insertar+'<li class="list-group-item d-flex justify-content-between align-items-center">'+e.area+'<span class="badge badge-primary badge-pill">'+e.total+'</span></li>';
								});
								$("#estadisticas").html(insertar);
							}
						}
					});
			}
		}
	});
});


///// NUEVA PARCIAL RAPIDA ******************************************************************************************************
//leyendo las acciones según botón presionado de la tabla
$('#tablaEjecutivos tbody').on( 'click', 'button', function () {
	var data = tablaEjecutivos.row( $(this).parents('tr') ).data();

	//funcion que determina que botón se presionó y arrancar respuesta
	if($(this).attr('placetogo') == 'final') {
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
						$("#modalHomeTitle").html('<i class="far fa-edit"></i> Crear Evaluación Final para <strong>'+data.nombre_ejecutivo+'</strong>');
						$("#modalHomeContenido").load('finalCreator.php?ejecutivo='+data.rut_ejecutivo);
				    	$("#modalHomeBtnCerrar").show();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeBtnAccion").hide();
						$("#modalHomeBtnAccion").text('Guardar Evaluación Final');
				}
			}
		});
	}else if($(this).attr('placetogo') == 'editar') {
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
						$("#modalHomeTitle").html('<i class="far fa-edit"></i> Editar Evaluación Final de <strong>'+data.nombre_ejecutivo+'</strong>');
						$("#modalHomeContenido").load('finalEditor.php?evaluacion='+data.evaluacion);
				    	$("#modalHomeBtnCerrar").show();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeBtnAccion").show();
						$("#modalHomeBtnAccion").text('Finalizar Edición');
						$("#modalHomeBtnAccion").attr('evaluacion', data.evaluacion);
				}
			}
		});
	}else if($(this).attr('placetogo') == 'pdf') {
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
						$("#modalHomeTitle").html('<i class="far fa-edit"></i>Evaluación Final #'+data.evaluacion+' de <strong>'+data.nombre_ejecutivo+'</strong>');
						$("#modalHomeContenido").html('<iframe src="core/pdfGenerate.php?evaluacion='+data.evaluacion+'&tipo=final" width="100%" height="600px" />');
				    	$("#modalHomeBtnCerrar").show();
						$("#modalHomeBtnCerrar").text('Cerrar');
						$("#modalHomeCerrarVentana").show();
						$("#modalHomeBtnAccion").show();
						$("#modalHomeBtnAccion").text('Descargar Evaluación Final');
						$("#modalHomeBtnAccion").attr('evaluacion', data.evaluacion);
				}
			}
		});
	}else if($(this).attr('placetogo') == 'eliminar'){ 
		var respuesta = confirm('Esta a punto de eliminar la evaluación final #'+data.evaluacion+' de '+data.nombre_ejecutivo+' para el periodo '+$("#slcPeriodo :selected").val()+'. ¿Esta usted seguro de proceder?');
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
									data: 'evaluacion='+data.evaluacion,
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

									                            //cargando datos a la tabla
									                            tablaEjecutivos.clear().draw();
									                            tablaEjecutivos.destroy();
									                            tablaEjecutivos = null;
									                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
																    data: resultado,
																    columns: [
																    	{ data: 'nota_final'},
																        { data: 'rut_ejecutivo' },
																        { data: 'nombre_ejecutivo' },
																        { data: null},
																        { data: null},
																        { data: null},
																    ],
																    //añadiendo botones de acción
															        "columnDefs": [ 
															        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
															        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
															        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
															        ],
																	rowCallback : function(row, data, index) {
																		if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
																		 	$(row).find('td:eq(0)').addClass('table-success');
																		 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																		 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																		 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																		 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																		 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																		}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
																		 	$(row).find('td:eq(0)').addClass('table-warning');
																		 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																		 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																			$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																			$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																			$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																		}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
																		 	$(row).find('td:eq(0)').addClass('table-danger');
																		 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																		 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																			$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																			$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																			$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																		}else{
																		 	$(row).find('td:eq(0)').addClass('table-danger');
																		 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
																		 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
																		}
																	}

																		
																});

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
	}
} );


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
						                			
													$.ajax({
													    type: 'post',
													    url: 'core/ListEjecutivosPorAreaFinal.php',
													    data: 'area='+area,
													    beforeSend: function() {
													        //inicializando modal que valida sesión de raulí
													        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Buscando ejecutivos del área seleccionada...');
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

											                            //cargando datos a la tabla
											                            tablaEjecutivos.clear().draw();
											                            tablaEjecutivos.destroy();
											                            tablaEjecutivos = null;
											                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
																		    data: resultado,
																		    columns: [
																		    	{ data: 'nota_final'},
																		        { data: 'rut_ejecutivo' },
																		        { data: 'nombre_ejecutivo' },
																		        { data: null},
																		        { data: null},
																		        { data: null},
																		    ],
																		    //añadiendo botones de acción
																	        "columnDefs": [ 
																	        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
																	        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
																	        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
																	        ],
																			rowCallback : function(row, data, index) {
																				if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
																				 	$(row).find('td:eq(0)').addClass('table-success');
																				 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																				 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																				 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																				 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																				 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																				}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
																				 	$(row).find('td:eq(0)').addClass('table-warning');
																				 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																				 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																					$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																					$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																					$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																				}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
																				 	$(row).find('td:eq(0)').addClass('table-danger');
																				 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																				 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																					$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																					$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																					$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																				}else{
																				 	$(row).find('td:eq(0)').addClass('table-danger');
																				 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
																				 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
																				}
																			}

																				
																		});

											                        }

										                        	$.ajax({
																		type: 'get',
																		url : 'core/EstadisticasPersonales.php',
																		beforeSend: function() {
																			$("#estadisticas").html('');
																		},
																		statusCode: {
																			404: function(responseObject, textStatus, errorThrown) {
																				alert('no encontrado');
																			},
																			200: function(responseObject, textStatus, errorThrown) {
																				respuesta = JSON.parse(responseObject);
																				var insertar = "";
																				$.each(respuesta, function(index, e) {
																					insertar = insertar+'<li class="list-group-item d-flex justify-content-between align-items-center">'+e.area+'<span class="badge badge-primary badge-pill">'+e.total+'</span></li>';
																				});
																				$("#estadisticas").html(insertar);
																			}
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





///// CAMBIO DE AREA ******************************************************************************************************
$("#slcArea").change(function(){
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
			                $.each($("#slcArea option"),function(i,v){
								value = v.value;
								$("#slcArea option[value="+value+"]").remove();
							});
							$.ajax({
							    type: 'post',
							    url: 'core/HomeReceiveAreaFromIndex.php',
							    beforeSend: function() {
							        //inicializando modal que valida sesión de raulí
							        $("#modalHomeConfig").attr('class', 'modal-dialog');
							        $("#modalHome").modal('show');
									$("#modalHomeTitle").text('Por Favor Espere');
									$("#modalHomeBtnCerrar").hide();
									$("#modalHomeCerrarVentana").hide();
									$("#modalHomeBtnAccion").hide();
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
						               	$("#slcArea").append('<option value="'+resultados.codigo_area+'">'+resultados.nombre_area+'</option>');


					               	///************************** obtener el periodo que ejecutivo seleccionó para trabajar ****************************************
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


													/// CARGAR RESTO DE AREAS ******************************************************************************************
													$.ajax({
													    type: 'post',
													    url: 'core/ListAreas.php',
													    beforeSend: function() {
													        //inicializando modal que valida sesión de raulí
													        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Recuperando áreas del sistema...');
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
													                $("#modalHomeTitle").text('´Problema al cargar las áreas');
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
													                $("#slcArea").removeAttr('disabled');

													                // cargar resto de periodos disponibles ************************************************************
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
																				$("#slcPeriodo").removeAttr('disabled');

																			//---- INICIO DE CAMBIO DE EJECUTIVOS EN LISTADO
																				$.ajax({
																					    type: 'post',
																					    url: 'core/ListEjecutivosPorAreaFinal.php',
																					    data: 'area='+area,
																					    beforeSend: function() {
																					        //inicializando modal que valida sesión de raulí
																					        $("#modalHome").modal('show');
																					        $("#modalHomeTitle").text('Por Favor Espere');
																					        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Espere un momento...');
																					        $("#modalHomeBtnCerrar").hide();
																							$("#modalHomeBtnAccion").hide();
																							$("#modalHomeCerrarVentana").hide();
																					    },
																						error: function(XMLHttpRequest, textStatus, errorThrown) {
																						    if (XMLHttpRequest.readyState == 0) {
																								$("#modalHomeConfig").attr('class', 'modal-dialog');
																								$("#modalHome").modal('show');
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
																					            	tablaEjecutivos.clear().draw();
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
																			                            //cargando datos a la tabla
																			                            tablaEjecutivos.clear().draw();
																			                            tablaEjecutivos.destroy();
																			                            tablaEjecutivos = null;
																			                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
																										    data: resultado,
																										    columns: [
																										    	{ data: 'nota_final'},
																										        { data: 'rut_ejecutivo' },
																										        { data: 'nombre_ejecutivo' },
																										        { data: null},
																										        { data: null},
																										        { data: null},
																										    ],
																										    //añadiendo botones de acción
																									        "columnDefs": [ 
																									        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
																									        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
																									        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
																									        ],
																											rowCallback : function(row, data, index) {
																												if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
																												 	$(row).find('td:eq(0)').addClass('table-success');
																												 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																												 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																												 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																												 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																												 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																												}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
																												 	$(row).find('td:eq(0)').addClass('table-warning');
																												 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																												 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																													$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																													$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																													$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																												}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
																												 	$(row).find('td:eq(0)').addClass('table-danger');
																												 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
																												 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
																													$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
																													$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
																													$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
																												}else{
																												 	$(row).find('td:eq(0)').addClass('table-danger');
																												 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
																												 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
																												}
																											}


																												
																										});

																										$("#modalHomeBtnCerrar").click();
																			                        }
																					            }           
																					        }
																				 });
																				//---- INICIO DE CAMBIO DE EJECUTIVOS EN LISTADO
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
						}
					}
				});
			}
		}
	});
});


$("#modalHomeBtnAccion").click(function() {
	if($("#modalHomeBtnAccion").text() == "Guardar Evaluación Final") {
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
							$.ajax({
							    type: 'post',
							    url: 'core/ListEjecutivosPorAreaFinal.php',
							    data: 'area='+$("#slcArea").val(),
							    beforeSend: function() {
							        //inicializando modal que valida sesión de raulí
							        $("#modalHome").modal('show');
							        $("#modalHomeTitle").text('Por Favor Espere');
							        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Espere un momento...');
							        $("#modalHomeBtnCerrar").hide();
									$("#modalHomeBtnAccion").hide();
									$("#modalHomeCerrarVentana").hide();
							    },
								error: function(XMLHttpRequest, textStatus, errorThrown) {
								    if (XMLHttpRequest.readyState == 0) {
										$("#modalHomeConfig").attr('class', 'modal-dialog');
										$("#modalHome").modal('show');
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
						            	tablaEjecutivos.clear().draw();
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
				                            //cargando datos a la tabla
				                            tablaEjecutivos.clear().draw();
				                            tablaEjecutivos.destroy();
				                            tablaEjecutivos = null;
				                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
											    data: resultado,
											    columns: [
											    	{ data: 'nota_final'},
											        { data: 'rut_ejecutivo' },
											        { data: 'nombre_ejecutivo' },
											        { data: null},
											        { data: null},
											        { data: null},
											    ],
											    //añadiendo botones de acción
										        "columnDefs": [ 
										        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
										        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
										        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
										        ],
												rowCallback : function(row, data, index) {
													if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
													 	$(row).find('td:eq(0)').addClass('table-success');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
													 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
													 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
													 	$(row).find('td:eq(0)').addClass('table-warning');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
														$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
														$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
														$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
													 	$(row).find('td:eq(0)').addClass('table-danger');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
														$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
														$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
														$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else{
													 	$(row).find('td:eq(0)').addClass('table-danger');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
													}
												}	
											});

											$("#modalHomeBtnCerrar").click();
				                        }
						            }           
						        }
					 		});
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
							$.ajax({
							    type: 'post',
							    url: 'core/ListEjecutivosPorAreaFinal.php',
							    data: 'area='+$("#slcArea").val(),
							    beforeSend: function() {
							        //inicializando modal que valida sesión de raulí
							        $("#modalHome").modal('show');
							        $("#modalHomeTitle").text('Por Favor Espere');
							        $("#modalHomeContenido").html('<img src="facade/img/loading2.gif" /> Espere un momento...');
							        $("#modalHomeBtnCerrar").hide();
									$("#modalHomeBtnAccion").hide();
									$("#modalHomeCerrarVentana").hide();
							    },
								error: function(XMLHttpRequest, textStatus, errorThrown) {
								    if (XMLHttpRequest.readyState == 0) {
										$("#modalHomeConfig").attr('class', 'modal-dialog');
										$("#modalHome").modal('show');
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
						            	tablaEjecutivos.clear().draw();
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
				                            //cargando datos a la tabla
				                            tablaEjecutivos.clear().draw();
				                            tablaEjecutivos.destroy();
				                            tablaEjecutivos = null;
				                            tablaEjecutivos = $("#tablaEjecutivos").DataTable({
											    data: resultado,
											    columns: [
											    	{ data: 'nota_final'},
											        { data: 'rut_ejecutivo' },
											        { data: 'nombre_ejecutivo' },
											        { data: null},
											        { data: null},
											        { data: null},
											    ],
											    //añadiendo botones de acción
										        "columnDefs": [ 
										        	{ "targets": -1, "data": null, "defaultContent": '<button type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" placetogo="eliminar" title="Eliminar Evaluación Quincenal"><i class="fas fa-trash"></i> Eliminar</button>'},
										        	{ "targets": -2, "data": null, "defaultContent": '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="top" placetogo="pdf" title="Descargar PDF"><i class="fas fa-file-pdf"></i> Descargar PDF</button>'},
										        	{ "targets": -3, "data": null, "defaultContent": '<button type="button" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" placetogo="final" title="Generar Evaluación Final"><i class="fas fa-flag"></i> Evaluación Final</button>'}
										        ],
												rowCallback : function(row, data, index) {
													if(parseFloat(data.nota_final) <= 10 && parseFloat(data.nota_final) >= 9) {
													 	$(row).find('td:eq(0)').addClass('table-success');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
													 	$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
													 	$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else if(parseFloat(data.nota_final) >= 8 && parseFloat(data.nota_final) < 9) {
													 	$(row).find('td:eq(0)').addClass('table-warning');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
														$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
														$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
														$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else if(parseFloat(data.nota_final) > 0 && parseFloat(data.nota_final) < 8) {
													 	$(row).find('td:eq(0)').addClass('table-danger');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', false);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', false);
														$(row).find('button.btn.btn-warning.btn-sm').html('<i class="fas fa-pencil-alt"></i> Editar Evaluación');
														$(row).find('button.btn.btn-warning.btn-sm').prop('title', 'Editar Evaluación Final');
														$(row).find('button.btn.btn-warning.btn-sm').attr('placetogo', 'editar');
													}else{
													 	$(row).find('td:eq(0)').addClass('table-danger');
													 	$(row).find('button.btn.btn-dark.btn-sm').prop('disabled', true);
													 	$(row).find('button.btn.btn-danger.btn-sm').prop('disabled', true);
													}
												}	
											});

											$("#modalHomeBtnCerrar").click();
				                        }
						            }           
						        }
					 		});
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
	}else if ($("#modalHomeBtnAccion").text() == "Iniciar Sesión") {
		window.location.href="index.php";
	}
})