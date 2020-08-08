
//$.playSound('facade/media/revision.mp3');
//lblRevisionesCounter
//
$(document).ready(function() {
	$.ajax({
		url: 'core/PushRevision.php',
		type: 'post',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    if (XMLHttpRequest.readyState == 0) {
		    	$.playSound('facade/media/error.mp3');
				$("#lblRevisionesCounter").html('<i class="fas fa-unlink"></i>');
				var cadena = "";
				cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
        		cadena = cadena +'<div class="mr-3">';
        		cadena = cadena +'<div class="icon-circle bg-danger">';
        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'<div>';
        		cadena = cadena +'<div class="small text-gray-500">Sin conexión a Internet</div>';
        		cadena = cadena +'<span class="font-weight-bold">Verifique su conexión a internet.</span>'
        		cadena = cadena +'</div>';
        		cadena = cadena +'</a>';
        		$("#lblCentroRevisiones").html(cadena);
		    }
		},
		beforeSend: function() {
			$("#lblRevisionesCounter").html('<img src="facade/img/loading2.gif" />');
		},
		statusCode : {
			404: function(responseObject, textStatus, errorThrown) {
				$.playSound('facade/media/error.mp3');
				$("#lblRevisionesCounter").html('<i class="fas fa-exclamation-triangle"></i>');
				var cadena = "";
				cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
        		cadena = cadena +'<div class="mr-3">';
        		cadena = cadena +'<div class="icon-circle bg-success">';
        		cadena = cadena +'<i class="fas fa-check text-white"></i>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'<div>';
        		cadena = cadena +'<div class="small text-gray-500">No se pudo atender su solicitud</div>';
        		cadena = cadena +'<span class="font-weight-bold">El CORE que procesa las solicitudes no ha sido encontrado y por lo tanto su solicitud no ha sido procesada.</span>'
        		cadena = cadena +'</div>';
        		cadena = cadena +'</a>';
        		$("#lblCentroRevisiones").html(cadena);
			},
			200: function(responseObject, textStatus, errorThrown) { 
				var respuesta = JSON.parse(responseObject);
				if(respuesta.cantidad > 0) {
	            	$.playSound('facade/media/revision.mp3');
	            	$("#lblRevisionesCounter").html(respuesta.cantidad);
	            	cambiarTituloRevisiones(respuesta.cantidad);
	            }

            	$.ajax({
					url: 'core/PushRevision.php',
					type: 'post',
					data: {"tipo": 1},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
					    if (XMLHttpRequest.readyState == 0) {
					    	$.playSound('facade/media/error.mp3');
							$("#lblRevisionesCounter").html('<i class="fas fa-unlink"></i>');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-danger">';
			        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">Sin conexión a Internet</div>';
			        		cadena = cadena +'<span class="font-weight-bold">Verifique su conexión a internet.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroRevisiones").html(cadena);
					    }
					},
					beforeSend: function() {
						
					},
					statusCode : {
						404: function(responseObject, textStatus, errorThrown) {
							$.playSound('facade/media/error.mp3');
							$("#lblRevisionesCounter").html('<i class="fas fa-exclamation-triangle"></i>');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-danger">';
			        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">No se pudo atender su solicitud</div>';
			        		cadena = cadena +'<span class="font-weight-bold">El CORE que procesa las solicitudes no ha sido encontrado y por lo tanto su solicitud no ha sido procesada.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroRevisiones").html(cadena);
						},
						401: function(responseObject, textStatus, errorThrown) {
							$("#lblRevisionesCounter").html('0');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-success">';
			        		cadena = cadena +'<i class="fas fa-check text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">Felicidades!</div>';
			        		cadena = cadena +'<span class="font-weight-bold">No tienes evaluaciones para revisar.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroRevisiones").html(cadena);
						},
						200: function(responseObject, textStatus, errorThrown) { 
							var respuesta = JSON.parse(responseObject);
			            	var cadena = "";
			            	$.each(respuesta, function(i,x) {
			            		cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#" evaluacion="'+x.evaluacion+'" tipo="'+x.tipo+'" process="1">';
			            		cadena = cadena +'<div class="mr-3">';
			            		cadena = cadena +'<div class="icon-circle bg-danger">';
			            		cadena = cadena +'<i class="fas fa-check-double text-white"></i>';
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'<div>';
			            		cadena = cadena +'<div class="small text-gray-500">Creada el '+x.fecha_creacion+' (Periodo: '+x.periodo+')</div>';
			            		if(x.tipo == 1) {
			            			cadena = cadena +'<span class="font-weight-bold">Parcial #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}else if(x.tipo == 2) {
			            			cadena = cadena +'<span class="font-weight-bold">Quincenal #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}if(x.tipo == 3) {
			            			cadena = cadena +'<span class="font-weight-bold">Final #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'</a>';
			            	});
			            	$("#lblCentroRevisiones").html(cadena);

			            	$("a.dropdown-item.d-flex.align-items-center").click(function() {
								var evaluacion 	= $(this).attr('evaluacion');
								var tipo 		= $(this).attr('tipo');
								var proceso 	= $(this).attr('process');
								if(proceso == 1) {
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
											    $("#modalHome").modal('show');
											    if(tipo == 1) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Revisión de Evaluación Parcial #'+evaluacion);
												}else if(tipo == 2) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Revisión de Evaluación Quincenal #'+evaluacion);
												}else if(tipo == 3) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Revisión de Evaluación Final #'+evaluacion);
												}
												$("#modalHomeContenido").load('notificacion.php?evaluacion='+evaluacion+'&tipo='+tipo+'&proceso='+proceso);
										    	$("#modalHomeBtnCerrar").show();
												$("#modalHomeBtnCerrar").text('Cerrar');
												$("#modalHomeCerrarVentana").show();
												$("#modalHomeBtnAccion").hide();
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
	


	$.ajax({
		url: 'core/PushApelacion.php',
		type: 'post',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    if (XMLHttpRequest.readyState == 0) {
		    	$.playSound('facade/media/error.mp3');
				$("#lblApelacionesCounter").html('<i class="fas fa-unlink"></i>');
				var cadena = "";
				cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
        		cadena = cadena +'<div class="mr-3">';
        		cadena = cadena +'<div class="icon-circle bg-danger">';
        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'<div>';
        		cadena = cadena +'<div class="small text-gray-500">Sin conexión a Internet</div>';
        		cadena = cadena +'<span class="font-weight-bold">Verifique su conexión a internet.</span>'
        		cadena = cadena +'</div>';
        		cadena = cadena +'</a>';
        		$("#lblCentroApelaciones").html(cadena);
		    }
		},
		beforeSend: function() {
			$("#lblApelacionesCounter").html('<img src="facade/img/loading2.gif" />');
		},
		statusCode : {
			404: function(responseObject, textStatus, errorThrown) {
				$.playSound('facade/media/error.mp3');
				$("#lblApelacionesCounter").html('<i class="fas fa-exclamation-triangle"></i>');
				var cadena = "";
				cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
        		cadena = cadena +'<div class="mr-3">';
        		cadena = cadena +'<div class="icon-circle bg-danger">';
        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'<div>';
        		cadena = cadena +'<div class="small text-gray-500">No se pudo atender su solicitud</div>';
        		cadena = cadena +'<span class="font-weight-bold">El CORE que procesa las solicitudes no ha sido encontrado y por lo tanto su solicitud no ha sido procesada.</span>'
        		cadena = cadena +'</div>';
        		cadena = cadena +'</a>';
        		$("#lblCentroApelaciones").html(cadena);
			},
			401: function(responseObject, textStatus, errorThrown) {
				$("#lblApelacionesCounter").html('0');
				var cadena = "";
				cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
        		cadena = cadena +'<div class="mr-3">';
        		cadena = cadena +'<div class="icon-circle bg-success">';
        		cadena = cadena +'<i class="fas fa-check text-white"></i>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'</div>';
        		cadena = cadena +'<div>';
        		cadena = cadena +'<div class="small text-gray-500">Felicidades!</div>';
        		cadena = cadena +'<span class="font-weight-bold">No tienes apelaciones pendientes.</span>'
        		cadena = cadena +'</div>';
        		cadena = cadena +'</a>';
        		$("#lblCentroApelaciones").html(cadena);
			},
			200: function(responseObject, textStatus, errorThrown) { 
				var respuesta = JSON.parse(responseObject);
				if(respuesta.cantidad > 0) {
	            	$.playSound('facade/media/apelacion.mp3');
	            	$("#lblApelacionesCounter").html(respuesta.cantidad);
	            	cambiarTituloApelacion(respuesta.cantidad);
	            }

	            	$.ajax({
					url: 'core/PushApelacion.php',
					type: 'post',
					data: {"tipo": 1},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
					    if (XMLHttpRequest.readyState == 0) {
					    	$.playSound('facade/media/error.mp3');
							$("#lblRevisionesCounter").html('<i class="fas fa-unlink"></i>');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-danger">';
			        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">Sin conexión a Internet</div>';
			        		cadena = cadena +'<span class="font-weight-bold">Verifique su conexión a internet.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroRevisiones").html(cadena);
					    }
					},
					beforeSend: function() {
						
					},
					statusCode : {
						404: function(responseObject, textStatus, errorThrown) {
							$.playSound('facade/media/error.mp3');
							$("#lblCentroApelaciones").html('<i class="fas fa-exclamation-triangle"></i>');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-danger">';
			        		cadena = cadena +'<i class="far fa-tired text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">No se pudo atender su solicitud</div>';
			        		cadena = cadena +'<span class="font-weight-bold">El CORE que procesa las solicitudes no ha sido encontrado y por lo tanto su solicitud no ha sido procesada.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroApelaciones").html(cadena);
						},
						401: function(responseObject, textStatus, errorThrown) {
							$("#lblApelacionesCounter").html('0');
							var cadena = "";
							cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#">';
			        		cadena = cadena +'<div class="mr-3">';
			        		cadena = cadena +'<div class="icon-circle bg-success">';
			        		cadena = cadena +'<i class="fas fa-check text-white"></i>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'<div>';
			        		cadena = cadena +'<div class="small text-gray-500">Felicidades!</div>';
			        		cadena = cadena +'<span class="font-weight-bold">No tienes apelaciones pendientes.</span>'
			        		cadena = cadena +'</div>';
			        		cadena = cadena +'</a>';
			        		$("#lblCentroApelaciones").html(cadena);
						},
						200: function(responseObject, textStatus, errorThrown) { 
							var respuesta = JSON.parse(responseObject);
			            	var cadena = "";
			            	$.each(respuesta, function(i,x) {
			            		cadena = cadena +'<a class="dropdown-item d-flex align-items-center" href="#" evaluacion="'+x.evaluacion+'" tipo="'+x.tipo+'" process="2">';
			            		cadena = cadena +'<div class="mr-3">';
			            		cadena = cadena +'<div class="icon-circle bg-danger">';
			            		cadena = cadena +'<i class="fas fa-check-double text-white"></i>';
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'<div>';
			            		cadena = cadena +'<div class="small text-gray-500">Creada el '+x.fecha_creacion+' (Periodo: '+x.periodo+')</div>';
			            		if(x.tipo == 1) {
			            			cadena = cadena +'<span class="font-weight-bold">Parcial #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}else if(x.tipo == 2) {
			            			cadena = cadena +'<span class="font-weight-bold">Quincenal #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}if(x.tipo == 3) {
			            			cadena = cadena +'<span class="font-weight-bold">Final #'+x.evaluacion+' de '+x.nombre_ejecutivo+'</span>';
			            		}
			            		cadena = cadena +'</div>';
			            		cadena = cadena +'</a>';
			            	});
			            	$("#lblCentroApelaciones").html(cadena);

			            	$("a.dropdown-item.d-flex.align-items-center").click(function() {
								var evaluacion 	= $(this).attr('evaluacion');
								var tipo 		= $(this).attr('tipo');
								var proceso 	= $(this).attr('process');
								if(proceso == 2) {
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
											    $("#modalHome").modal('show');
											    if(tipo == 1) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Apelación de Evaluación Parcial #'+evaluacion);
												}else if(tipo == 2) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Apelación de Evaluación Quincenal #'+evaluacion);
												}else if(tipo == 3) {
													$("#modalHomeTitle").html('<i class="fas fa-check-double"></i> Solicitud de Apelación de Evaluación Final #'+evaluacion);
												}
												$("#modalHomeContenido").load('notificacion.php?evaluacion='+evaluacion+'&tipo='+tipo+'&proceso='+proceso);
										    	$("#modalHomeBtnCerrar").show();
												$("#modalHomeBtnCerrar").text('Cerrar');
												$("#modalHomeCerrarVentana").show();
												$("#modalHomeBtnAccion").hide();
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
});

function cambiarTituloRevisiones(cantidad) {
	setTimeout(function(){ 
		document.title = 'Sistema de Evaluación de Calidad';
		$("#faviconico").attr("href","facade/favicon/favicon.ico");
		$("#faviconpng").attr("href","facade/favicon/favicon.png");
	    setTimeout(function(){
	      document.title = cantidad+' Revisiones Pendientes';
	      $("#faviconico").attr("href","facade/favicon/warning.ico");
	      $("#faviconpng").attr("href","facade/favicon/warning.png");
	      cambiarTituloRevisiones(cantidad);
	   	},2000);
	 },2000);
};


function cambiarTituloApelacion(cantidad) {
	setTimeout(function(){ 
		document.title = 'Sistema de Evaluación de Calidad';
		$("#faviconico").attr("href","facade/favicon/favicon.ico");
		$("#faviconpng").attr("href","facade/favicon/favicon.png");
	    setTimeout(function(){
	      document.title = cantidad+' Apelaciones Pendientes';
	      $("#faviconico").attr("href","facade/favicon/warning.ico");
	      $("#faviconpng").attr("href","facade/favicon/warning.png");
	      cambiarTituloRevisiones(cantidad);
	   	},2000);
	 },2000);
};
