$(document).ready(function() {
	//inicializando objetos
	$("#barraCargaAudio").hide();
	$("#infoAudioCargado").hide();
	$("#barraCargaAdjuntos").hide();
	$("#tablaArchivosAdjuntados").hide();

	//definicion de archivos permitidos
	$("#fileAudio").prop('accept', 'audio/*');
	$("#fileadjuntos").prop('accept', 'text/css|application/msword|image/*|audio/*|application/zip|application/x-7z-compressed|application/x-rar-compressed|application/rtf|application/vnd.ms-powerpoint|application/pdf|application/vnd.ms-excel');

	//declaración de editor de texto
	ClassicEditor.create( document.querySelector( '#editor' ), {
			//toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
	})
	.then( editor => {
		window.editor = editor;
	})
	.catch( err => {
		console.error( err.stack );
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
					                    $("#lblEvaluadorEditor").html('Hola <strong>'+resultados.nombre_evaluador+'!</strong>');
								    	$("#lblPeriodoEjecutivo").html('<i class="fas fa-calendar-check"></i>&nbsp;<Strong>Periodo</strong>: '+periodoLbl+'');
								    	$("#lblArea").html('<i class="fas fa-users"></i>&nbsp;<strong>Área</strong>:&nbsp;'+areaLbl.nombre_area+'');

										$.ajax({
									        type: 'post',
									        url: 'core/ListCategoríasPorArea.php',
									        data: "id="+areaLbl.codigo_area,
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
								                    categorias = JSON.parse(responseObject);

								                    //revisar relleno de items y categorias
								                    /*for(i=0; i<categorias.length; i++) {
								                    	console.log(categorias[i]);

														/// ITERANDO PARA OBTENER CADA VALOR DE LA EVALUACION
														$.ajax({
													        type: 'post',
													        url: 'core/ListItemsPorCategoria.php',
													        data: "id="+categorias[i].codigo_categoria,
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
												                    
												                    for(j=0; j<resultados.length; j++) {
												                    	console.log(resultados[j]);
												                    }

															    	//$('#tablaprueba tbody').append(htmlTags);
																}
															}						        	
												    	});
														//FIN ITERACIONES DE EVALUACIONES
								                    }*/

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


//carga de audio de adjuntos
$("#fileAudio").change(function() {
	//mostrando nombre de fichero a usuario
	var fileName = $(this).val().split('\\').pop(); 
   	$(this).next('.custom-file-label').addClass("selected").html(fileName); 

   	//obteniendo el fichero en el formulario
	var file_data = $('#fileAudio').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('fileAudio', file_data);
                 
    //procediento al envío
    $("#fileAudio").prop('disabled', 'disabled');

    $.ajax({
        url: 'core/AudioUpload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        beforeSend: function() {
        	$("#barraCargaAudio").prop('class', 'progress-bar');
        	$("#barraCargaAudio").show();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    if (XMLHttpRequest.readyState == 0) {
		    	$("#modalEditorConfig").prop('class', 'modal-dialog');
				$("#modalEditorConfig").attr('class', 'modal-dialog');
				$("#modalEditorTitle").text('Verifique su conexión a internet');
				$("#modalEditorContenido").attr('align', 'left');
				$("#modalEditorCerrarVentana").show();
				$("#modalEditorContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalEditorBtnCerrar").show();
				$("#modalEditorBtnCerrar").text('Cerrar');
				$("#modalEditorBtnAccion").hide();
		    }
		},
	    statusCode: {
	        500: function(responseObject, textStatus, errorThrown) {
	        	$("#modalEditorConfig").prop('class', 'modal-dialog');
	            $("#modalEditorTitle").text('No se ha recibido el fichero');
	            $("#modalEditorContenido").attr('align', 'left');
	            $("#modalEditorCerrarVentana").show();
	            $("#modalEditorContenido").html('Debe seleccionar un fichero antes de poder solicitar su carga<br /><strong>CORE AUDIOUPLOAD ERROR 500</strong>');
	            $("#modalEditorBtnCerrar").show();
	            $("#modalEditorBtnCerrar").text('Cerrar');
	            $("#modalEditorBtnAccion").hide();
	            $("#valBarraCargaAudio").prop('style', 'width: 10%');
	            $("#valBarraCargaAudio").prop('aria-valuenow', 10);
	            $("#valBarraCargaAudio").html('10%');
	            $("#valBarraCargaAudio").prop('class', 'progress-bar bg-danger');
	            setTimeout(function(){ $("#barraCargaAudio").hide(); $("#fileAudio").removeAttr('disabled'); $("#modalEditor").modal('show'); }, 2000);
	        },
	        301: function(responseObject, textStatus, errorThrown) {
	            $("#modalEditorConfig").prop('class', 'modal-dialog');
	            $("#modalEditorTitle").text('Error al cargar el audio');
	            $("#modalEditorContenido").attr('align', 'left');
	            $("#modalEditorCerrarVentana").show();
	            $("#modalEditorContenido").html('Ocurrió un error al cargar el fichero de audio con el que generará esta evaluación al servidor<br /><strong>CORE AUDIOUPLOAD ERROR 301</strong>');
	            $("#modalEditorBtnCerrar").show();
	            $("#modalEditorBtnCerrar").text('Cerrar');
	            $("#modalEditorBtnAccion").hide();
	            $("#valBarraCargaAudio").prop('class', 'progress-bar bg-danger');
	            $("#valBarraCargaAudio").prop('style', 'width: 30%');
	            $("#valBarraCargaAudio").prop('aria-valuenow', 30);
	            $("#valBarraCargaAudio").html('30%');
	            setTimeout(function(){ $("#barraCargaAudio").hide(); $("#fileAudio").removeAttr('disabled'); $("#modalEditor").modal('show'); }, 2000);
	        },
	        200: function(responseObject, textStatus, errorThrown) {
	        	$("#valBarraCargaAudio").prop('style', 'width: 100%');
	            $("#valBarraCargaAudio").prop('aria-valuenow', 100);
	            $("#valBarraCargaAudio").html('100%');
	            $("#valBarraCargaAudio").prop('class', 'progress-bar bg-success');
	            setTimeout(function(){ $("#barraCargaAudio").hide(); $("#barraCargaAudio").hide(); $("#infoAudioCargado").show(); $("#frmCargaAudio").hide(); }, 2000);
	            respuesta = JSON.parse(responseObject);
	            $("#infoFileAudio").html('Audio: <strong>'+respuesta.nombre_fichero+'</strong><br />Peso: <strong>'+respuesta.peso+'</strong>');
	            $("#btnDownloadAudio").prop('href', respuesta.url);
	            $("#btnDeleteAudio").prop('url', respuesta.nombre_fichero);

	        }
	    }
     });

});

$("#btnDeleteAudio").click(function() {
	var respuesta = confirm('Esta usted seguro de eliminar el audio '+$("#btnDeleteAudio").prop('url')+'? Presione ACEPTAR para eliminar el archivo, de lo contrario presione CANNCELAR.');
	if(respuesta) {
		$.ajax({
			type: 'post',
			url: 'core/AudioDelete.php',
			data: 'file='+$("#btnDeleteAudio").prop('url'),
			beforeSend: function() {
				$("#modalEditor").modal('show');
				$("#modalEditorConfig").prop('class', 'modal-dialog');
				$("#modalEditorTitle").text('Eliminando');
				$("#modalEditorContenido").attr('align', 'left');
				$("#modalEditorCerrarVentana").show();
				$("#modalEditorContenido").html('<img src="facade/img/loading2.gif" /> Estamos eliminando el audio...');
				$("#modalEditorBtnCerrar").show();
				$("#modalEditorBtnCerrar").text('Cerrar');
				$("#modalEditorBtnAccion").hide();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			    if (XMLHttpRequest.readyState == 0) {
					$("#modalEditorConfig").attr('class', 'modal-dialog');
					$("#modalEditorTitle").text('Verifique su conexión a internet');
					$("#modalEditorContenido").attr('align', 'left');
					$("#modalEditorCerrarVentana").show();
					$("#modalEditorContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
					$("#modalEditorBtnCerrar").show();
					$("#modalEditorBtnCerrar").text('Cerrar');
					$("#modalEditorBtnAccion").hide();
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
				500: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('Ha ocurrido un error');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('No se especificó el nombre del fichero o estaba corrupto.<br /><strong>CORE AUDIODELETE 500</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    301: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('Archivo ya fue eliminado');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('El archivo que intenta eliminar, ya ha sido eliminado desde el servidor. Por favor intentelo más tarde.<br /><strong>CORE AUDIODELETE FILE DOESNT EXISTS</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    401: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('No se pudo borrar el archivo');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('El sistema de calidad encontró el fichero pero no pudo eliminarlo, probablemente no tiene los permisos necesarios para ejecutar la acción.<br /><strong>CORE AUDIODELETE 403 CHMOD ERROR</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    200: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditorConfig").prop('class', 'modal-dialog');
					$("#modalEditorTitle").text('Eliminando');
					$("#modalEditorContenido").attr('align', 'left');
					$("#modalEditorCerrarVentana").show();
					$("#modalEditorContenido").html('Audio eliminado con éxito');
					$("#modalEditorBtnCerrar").hide();
					$("#modalEditorBtnCerrar").text('Cerrar');
					$("#modalEditorBtnAccion").hide();
			        $("#barraCargaAudio").hide();  
			        $("#infoAudioCargado").hide(); 
			        $("#frmCargaAudio").show();
			        $("#fileAudio").next('.custom-file-label').addClass("selected").html('Seleccione Audio'); 
			        $("#fileaudio").val(null);
			        $("#fileAudio").removeAttr('disabled');
			        setTimeout(function(){ $("#modalEditorBtnCerrar").click(); }, 2000);
			    }
			}
		});
	}
});


//carga de audio de adjuntos
$("#fileadjuntos").change(function() {
	//mostrando nombre de fichero a usuario
	var fileName = $(this).val().split('\\').pop(); 
   	$(this).next('.custom-file-label').addClass("selected").html(fileName); 

   	//obteniendo el fichero en el formulario
	var file_data = $('#fileadjuntos').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('fileadjuntos', file_data);
                 
    //procediento al envío
    $("#fileadjuntos").prop('disabled', 'disabled');

    $.ajax({
        url: 'core/AdjuntosUpload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        beforeSend: function() {
        	$("#barraCargaAdjuntos").prop('class', 'progress-bar');
        	$("#barraCargaAdjuntos").show();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    if (XMLHttpRequest.readyState == 0) {
		    	$("#modalEditorConfig").prop('class', 'modal-dialog');
				$("#modalEditorConfig").attr('class', 'modal-dialog');
				$("#modalEditorTitle").text('Verifique su conexión a internet');
				$("#modalEditorContenido").attr('align', 'left');
				$("#modalEditorCerrarVentana").show();
				$("#modalEditorContenido").html('No se pudo establecer una conexión con el servidor del sistema de calidad y por lo tanto su solicitud no pudo ser procesada. <br /><strong>Por favor, verifique que la conexión de su ordenador se encuentre en orden, si usted se conecta vía Wi-Fi intente acercase al router para aumentar la señal o valique estar conectado a su red. Si ya ha intentado todo lo anterior, solicite ayuda llamando a la mesa de ayuda de tricot al anexo 616 o desde celulares al 2 2350 3616</strong>');
				$("#modalEditorBtnCerrar").show();
				$("#modalEditorBtnCerrar").text('Cerrar');
				$("#modalEditorBtnAccion").hide();
		    }
		},
	    statusCode: {
	        500: function(responseObject, textStatus, errorThrown) {
	        	$("#modalEditorConfig").prop('class', 'modal-dialog');
	            $("#modalEditorTitle").text('No se ha recibido el fichero');
	            $("#modalEditorContenido").attr('align', 'left');
	            $("#modalEditorCerrarVentana").show();
	            $("#modalEditorContenido").html('Debe seleccionar un fichero antes de poder solicitar su carga<br /><strong>CORE ADJUNTOUPLOAD ERROR 500</strong>');
	            $("#modalEditorBtnCerrar").show();
	            $("#modalEditorBtnCerrar").text('Cerrar');
	            $("#modalEditorBtnAccion").hide();
	            $("#valBarraCargaAdjuntos").prop('style', 'width: 10%');
	            $("#valBarraCargaAdjuntos").prop('aria-valuenow', 10);
	            $("#valBarraCargaAdjuntos").html('10%');
	            $("#valBarraCargaAdjuntos").prop('class', 'progress-bar bg-danger');
	            setTimeout(function(){ $("#barraCargaAudio").hide(); $("#fileAudio").removeAttr('disabled'); $("#modalEditor").modal('show'); }, 2000);
	        },
	        301: function(responseObject, textStatus, errorThrown) {
	            $("#modalEditorConfig").prop('class', 'modal-dialog');
	            $("#modalEditorTitle").text('Error al cargar el adjuntos');
	            $("#modalEditorContenido").attr('align', 'left');
	            $("#modalEditorCerrarVentana").show();
	            $("#modalEditorContenido").html('Ocurrió un error al cargar el fichero de adjuntos con el que generará esta evaluación al servidor<br /><strong>CORE ADJUNTOUPLOAD ERROR 301</strong>');
	            $("#modalEditorBtnCerrar").show();
	            $("#modalEditorBtnCerrar").text('Cerrar');
	            $("#modalEditorBtnAccion").hide();
	            $("#valBarraCargaAdjuntos").prop('class', 'progress-bar bg-danger');
	            $("#valBarraCargaAdjuntos").prop('style', 'width: 30%');
	            $("#valBarraCargaAdjuntos").prop('aria-valuenow', 30);
	            $("#valBarraCargaAdjuntos").html('30%');
	            setTimeout(function(){ $("#barraCargaAudio").hide(); $("#fileAudio").removeAttr('disabled'); $("#modalEditor").modal('show'); }, 2000);
	        },
	        200: function(responseObject, textStatus, errorThrown) {
	        	$("#valBarraCargaAdjuntos").prop('style', 'width: 100%');
	            $("#valBarraCargaAdjuntos").prop('aria-valuenow', 100);
	            $("#valBarraCargaAdjuntos").html('100%');
	            $("#valBarraCargaAdjuntos").prop('class', 'progress-bar bg-success');
	            setTimeout(function(){ $("#barraCargaAdjuntos").hide(); $("#tablaArchivosAdjuntados").show(); $("#fileadjuntos").hide(); }, 2000);
	            respuesta = JSON.parse(responseObject);
	            alert(responseObject);
	            //$("#infoFileAudio").html('Audio: <strong>'+respuesta.nombre_fichero+'</strong><br />Peso: <strong>'+respuesta.peso+'</strong>');
	            //$("#btnDownloadAudio").prop('href', respuesta.url);
	            //$("#btnDeleteAudio").prop('url', respuesta.nombre_fichero);

	        }
	    }
     });

});