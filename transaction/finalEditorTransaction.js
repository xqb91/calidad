var quill;
$(document).ready(function() {
	var evaluacion = $("#irqljob").val();

	//inicializando objetos
	$("#barraCargaAudio").hide();
	$("#infoAudioCargado").hide();
	$("#barraCargaAdjuntos").hide();
	$("#tablaArchivosAdjuntados").hide();

	//definicion de archivos permitidos
	$("#fileAudio").prop('accept', 'audio/*');
	$("#fileadjuntos").prop('accept', 'text/css|application/msword|image/*|audio/*|application/zip|application/x-7z-compressed|application/x-rar-compressed|application/rtf|application/vnd.ms-powerpoint|application/pdf|application/vnd.ms-excel');

	//[NEW] Rich Editor
	quill = new Quill('#editor', {
	    theme: 'snow'
	});

	//cargando información proveniente desde el Home
	var ejecutivo = $("#irql").val();
	var categorias;

	//cargando información básica
	$.ajax({
	    type: 'post',
	    url: 'core/HomeReceiveAreaFromIndex.php',
	    beforeSend: function() {

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
	            $("#modalEditor").modal('show');
	            $("#modalEditorTitle").text('Problema al cargar el periodo');
	            $("#modalEditorContenido").attr('align', 'left');
	            $("#modalEditorCerrarVentana").show();
	            $("#modalEditorContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
	            $("#modalEditorBtnCerrar").show();
	            $("#modalEditorBtnCerrar").text('Cerrar');
	            $("#modalEditorBtnAccion").hide();
	        },
	        200: function(responseObject, textStatus, errorThrown) {
	            var resultados = JSON.parse(responseObject);
	            var areaLbl = resultados;
	            
	            ///************************** obtener el periodo que ejecutivo seleccionó para trabajar ****************************************
				$.ajax({
					type: 'post',
					url: 'core/HomeReceivePeriodoFromIndex.php',
					beforeSend: function() {

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
					        $("#modalEditor").modal('show');
					        $("#modalEditorTitle").text('Problema al cargar el periodo');
					        $("#modalEditorContenido").attr('align', 'left');
					        $("#modalEditorCerrarVentana").show();
					        $("#modalEditorContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
					        $("#modalEditorBtnCerrar").show();
					        $("#modalEditorBtnCerrar").text('Cerrar');
					        $("#modalEditorBtnAccion").hide();
					    },
					    200: function(responseObject, textStatus, errorThrown) {
					        var resultados = JSON.parse(responseObject);
					        var periodoLbl; 
					        $.each(resultados.periodos, function (index, value) {
					        	periodoLbl = value; 
					    	});

					        //obteniendo la información del evaluador que se encuentra realizando la evaluación
							$.ajax({
						        type: 'post',
						        url: 'core/InfoSesionEvaluador.php',
						        beforeSend: function() {

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
					                    var evaluadordata = resultados;

								    	//generando la evaluación final y obteniendo los valores básicos para rellenarla
								    	$.ajax({
								    		url: 'core/EditEvaluacionFinal.php',
								    		type: 'POST',
								    		data: "evaluacion="+evaluacion,
								    		beforeSend : function() {

								    		},
								    		statusCode: {
								    			500: function(responseObject, textStatus, errorThrown) {
								                	$("#modalHomeTitle").text('Error Crítico');
								                	$("#modalHomeContenido").html('El sistema no encontró parámetros que esperaba<br /><strong>HTTP 500</strong>');
								    			},
								    			501: function(responseObject, textStatus, errorThrown) {
								                	$("#modalHomeTitle").text('Error Crítico');
								                	$("#modalHomeContenido").html('El sistema no encontró parámetros que esperaba<br /><strong>HTTP 501</strong>');
								    			},
								    			502: function(responseObject, textStatus, errorThrown) {
								                	$("#modalHomeTitle").text('Error');
								                	$("#modalHomeContenido").html('El ejecutivo no posee cantidad suficiente de evaluaciones parciales para generar la evaluación final<br /><strong>HTTP 502</strong>');
								    			},
								    			503: function(responseObject, textStatus, errorThrown) {
								                	$("#modalHomeTitle").text('Error');
								                	$("#modalHomeContenido").html('El administrador de la plataforma no ha definido la cantidad máxima de evaluaciones parciales para generar la evaluación final.<br /><strong>HTTP 503</strong>');
								    			},
								    			401: function(responseObject, textStatus, errorThrown) {
								                	$("#modalHomeTitle").text('Ya evaluado');
								                	$("#modalHomeContenido").html('El ejecutivo ya posee una evaluación final para este periodo<br /><strong>HTTP 401</strong>');
								    			},
								    			403: function(responseObject, textStatus, errorThrown) {
													$("#modalHomeTitle").text('Ya evaluado');
								                	$("#modalHomeContenido").html('El ejecutivo ya posee una evaluación final para este periodo<br /><strong>HTTP 502</strong>');
								    			},
								    			406: function(responseObject, textStatus, errorThrown) {
													$("#modalHomeTitle").text('Problema al crear la evaluación final');
								                	$("#modalHomeContenido").html('No se guardó el detalle de las evaluaciones parciales. Se eliminará automáticamente la evaluación final fallidad generada.<br /><strong>HTTP 406</strong>');								    				
								    			},
								    			200: function(responseObject, textStatus, errorThrown) {
								    				var respuesta = JSON.parse(responseObject);
								                    $("#lblEvaluadorEditor").html('Evaluador: <strong>'+resultados.nombre_evaluador+'</strong>');
											    	$("#lblPeriodoEjecutivo").html('<i class="fas fa-calendar-check"></i>&nbsp;<Strong>Periodo</strong>: '+periodoLbl+'');
											    	$("#lblArea").html('<i class="fas fa-users"></i>&nbsp;<strong>Área</strong>:&nbsp;'+areaLbl.nombre_area+'');
								    				$("#lblEvaluacionFinal").html('<i class="fas fa-flag"></i><strong> Final #</strong> '+respuesta.evaluacion);

								    				//INFO EJECUIVO
								    				$("#lblNombreEjecutivo").html('<strong>'+respuesta.ejecutivo.nombre+'</strong>');
								    				$("#lblAreaEjecutivo").html('<strong>'+respuesta.ejecutivo.area+'</strong> <em>'+respuesta.ejecutivo.ciclo+' '+respuesta.ejecutivo.jornada+'</em>');

								    				//---- CATEGORIAS
								    				$("#lblCateg1").html(respuesta.parciales[0].categoria);
								    				$("#lblNotaCateg1").html(respuesta.parciales[0].nota);
								    				$("#lblCateg2").html(respuesta.parciales[1].categoria);
								    				$("#lblNotaCateg2").html(respuesta.parciales[1].nota);
								    				$("#lblCateg3").html(respuesta.parciales[2].categoria);
								    				$("#lblNotaCateg3").html(respuesta.parciales[2].nota);

								    				// NOTAS FINAL 
								    				$("#lblNotaFinal").html(respuesta.nota_final);

								    				var delta = quill.clipboard.convert(respuesta.observacion);
													quill.setContents(delta);

								    				$("#modalHomeBtnAccion").html('Finalizar Edición');
								    				$("#modalHomeBtnAccion").attr('evaluacion', respuesta.evaluacion);
								    				$("#modalHomeBtnAccion").show();
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
