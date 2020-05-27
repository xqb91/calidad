$(document).ready(function() {
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
				//recopilación de data en paralelo
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

				//rellenando el listado de áreas donde correspona
				$.ajax({
			        type: 'post',
			        url: 'core/ListAreas.php',
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
			                    var respuesta = JSON.parse(responseObject);
			                    console.log(respuesta);
			                    $.each(respuesta, function(index, valor) {
			                    	var insertarTabla = "";
		                    		insertarTabla = insertarTabla+'<tr>';
			                        insertarTabla = insertarTabla+'<th scope="row" width="80%">'+valor.nombre_area+'</th>';
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button></td>';
			                        if(valor.estado == 1) {
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Bloquear '+valor.nombre_area+'"><i class="fas fa-lock"></i></button></td>';
			                        }else{
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Desbloquear '+valor.nombre_area+'"><i class="fas fa-lock-open"></i></button></td>';
			                        }
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>';
			                      	insertarTabla = insertarTabla+'</tr>';
			                      	$("#tablaAreas tbody").append(insertarTabla);
			                    });
							}
					}
				});



			}
		}
	});
});