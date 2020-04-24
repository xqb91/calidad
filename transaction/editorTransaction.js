$(document).ready(function() {
	//limpiando localstorage
	localStorage.clear();

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


	$("#btnEliminarAdjunto").click(function(e) { alert($("#btnEliminarAdjunto").attr('url')); });

	//items seleccionados
	$("input:radio").click(function () {
	    alert('lalalalala');
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
					                    $("#lblEvaluadorEditor").html('Hola <strong>'+resultados.nombre_evaluador+'!</strong>');
								    	$("#lblPeriodoEjecutivo").html('<i class="fas fa-calendar-check"></i>&nbsp;<Strong>Periodo</strong>: '+periodoLbl+'');
								    	$("#lblArea").html('<i class="fas fa-users"></i>&nbsp;<strong>Área</strong>:&nbsp;'+areaLbl.nombre_area+'');

								    	//rellenando el listado de items para evaluacion parcial de acuerdo al area que se encuentra seleccionada.
										$.ajax({
									        type: 'post',
									        url: 'core/ListItemsPorArea.php',
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
								                    items = JSON.parse(responseObject);
								                    var last = "";
								                    var act  = "";
								                    var ct 	 = -1;
								                    var colores = ['#E4E1F1', '#E2CBE0', '#CFB0CF','#BC96C0', '#A77EB0', '#9166A1'];
								                    for (var i =0; i<items.length-1; i++) {
								                    	//categorias[i]
								                    		act = items[i].nombre_categoria;
								                    		if(last != act) { last = items[i].nombre_categoria; ct++; }
								                    		var mostrar = "";
															mostrar = mostrar + '<tr>';
									                        mostrar = mostrar + '<th scope="row" style="font-size: 10px; color: #000;" bgcolor="'+colores[ct]+'">'+items[i].nombre_categoria+'</th>';
									                        mostrar = mostrar + '<td style="font-size: 12px; color: #000;" bgcolor="'+colores[ct]+'">'+items[i].nombre_item+'</td>';
									                        mostrar = mostrar + '<td bgcolor="'+colores[ct]+'"><div class="form-check"><input class="form-check-input" type="radio" name="itemid'+items[i].codigo_item+'" id="itemid'+items[i].codigo_item+'" categoria="'+items[i].codigo_categoria+'" peso="'+items[i].peso_categoria+'" codigo_item="'+items[i].codigo_item+'" value="-1" checked><label class="form-check-label" for="exampleRadios1"></label></div></td>';
									                        mostrar = mostrar + '<td bgcolor="'+colores[ct]+'"><div class="form-check"><input class="form-check-input" type="radio" name="itemid'+items[i].codigo_item+'" id="itemid'+items[i].codigo_item+'" categoria="'+items[i].codigo_categoria+'" peso="'+items[i].peso_categoria+'" codigo_item="'+items[i].codigo_item+'" value="0"><label class="form-check-label" for="exampleRadios1"></label></div></td>';
									                        mostrar = mostrar + '<td bgcolor="'+colores[ct]+'"><div class="form-check"><input class="form-check-input" type="radio" name="itemid'+items[i].codigo_item+'" id="itemid'+items[i].codigo_item+'" categoria="'+items[i].codigo_categoria+'" peso="'+items[i].peso_categoria+'" codigo_item="'+items[i].codigo_item+'" value="5"><label class="form-check-label" for="exampleRadios1"></label></div></td>';
									                        mostrar = mostrar + '<td bgcolor="'+colores[ct]+'"><div class="form-check"><input class="form-check-input" type="radio" name="itemid'+items[i].codigo_item+'" id="itemid'+items[i].codigo_item+'" categoria="'+items[i].codigo_categoria+'" peso="'+items[i].peso_categoria+'" codigo_item="'+items[i].codigo_item+'" value="10"><label class="form-check-label" for="exampleRadios1"></label></div></td>';
									                      	mostrar = mostrar + '</tr>';
									                      	$("#tablaEvaluaciones").append(mostrar);
								                    };
								                    
								                    //precalculando valores al hacer clic en radio button
								                    $("input:radio").click(function () {
								                    	//definiendo variables locales para el calculo
													    localStorage.setItem($("#tablaNotasNotaCategoria1").prop('codigo'), 0);
													    localStorage.setItem($("#tablaNotasNotaCategoria2").prop('codigo'), 0);
													    localStorage.setItem($("#tablaNotasNotaCategoria3").prop('codigo'), 0);

													    //definiendo contador de evaluaciones por categoria
													    cat1 = 0;
													    cat2 = 0;
													    cat3 = 0;

													    //revisando TODOS los radiobutton de la página
													    $.each($("input:radio"), function (a) {
													    	//validando los elementos que se encuentren seleccionados
													    	if($(this).is(':checked')) {
													    		//si el valor del elemento seleccionado es -1 corresponde a no aplica y no se contabiliza
													    		if(parseInt($(this).val()) == -1) {
													    			if($("#tablaNotasNotaCategoria1").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + 0 ); }
													    			if($("#tablaNotasNotaCategoria2").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + 0 ); }
													    			if($("#tablaNotasNotaCategoria3").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + 0 ); }
													    			//de lo contrario, es un valor de nota 0, 5 o 10 y se cuenta para el promedio
													    		}else{
													    			if($("#tablaNotasNotaCategoria1").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + parseFloat($(this).val()) );  cat1++; }
													    			if($("#tablaNotasNotaCategoria2").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + parseFloat($(this).val()) );  cat2++; }
													    			if($("#tablaNotasNotaCategoria3").prop('codigo') == $(this).attr('categoria')) { localStorage.setItem($(this).attr('categoria'), parseFloat(localStorage.getItem($(this).attr('categoria'))) + parseFloat($(this).val()) );  cat3++; }
													    		}
													    	}
													    });
														
														//Calculando promedios totales por categoria
														if(cat1 == 0) { $("#tablaNotasNotaCategoria1").html( parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria1").prop('codigo'))).toFixed(2) );  }else{ $("#tablaNotasNotaCategoria1").html( (parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria1").prop('codigo')))/cat1).toFixed(2) ); }
														if(cat2 == 0) { $("#tablaNotasNotaCategoria2").html( parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria2").prop('codigo'))).toFixed(2) );  }else{ $("#tablaNotasNotaCategoria2").html( (parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria2").prop('codigo')))/cat2).toFixed(2) );  }
														if(cat3 == 0) { $("#tablaNotasNotaCategoria3").html( parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria3").prop('codigo'))).toFixed(2) );  }else{ $("#tablaNotasNotaCategoria3").html( (parseFloat(localStorage.getItem($("#tablaNotasNotaCategoria3").prop('codigo')))/cat3).toFixed(2) ); }

														//calculando nota real aplicando el peso de cada categoría
														var notacat1 = parseFloat($("#tablaNotasNotaCategoria1").html())*parseInt($("#tablaNotasNotaCategoria1").prop('peso'))/100;
														var notacat2 = parseFloat($("#tablaNotasNotaCategoria2").html())*parseInt($("#tablaNotasNotaCategoria2").prop('peso'))/100;
														var notacat3 = parseFloat($("#tablaNotasNotaCategoria3").html())*parseInt($("#tablaNotasNotaCategoria3").prop('peso'))/100;
														$("#tablaNotasNotaFinal").html((notacat1+notacat2+notacat3).toFixed(2));

													});
													
													//rellenando cabecera de titulos de las categorias que se evaluarán
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

											                	var colores = ['#E4E1F1', '#E2CBE0', '#CFB0CF','#BC96C0', '#A77EB0', '#9166A1'];

											                    categorias = JSON.parse(responseObject);
											                    $("#tablaNotasTituloCategoria1").html(categorias[0].nombre_categoria);
											                    $("#tablaNotasTituloCategoria1").prop('codigo', categorias[0].codigo_categoria);
											                    $("#tablaNotasNotaCategoria1").prop('codigo', categorias[0].codigo_categoria);
											                    $("#tablaNotasNotaCategoria1").prop('peso', categorias[0].peso_categoria);
											                    //$("#tablaNotasNotaCategoria1").attr('bgcolor', colores[0]);
											                    localStorage.setItem(categorias[0].codigo_categoria, 0);

											                    $("#tablaNotasTituloCategoria2").html(categorias[1].nombre_categoria);
											                    $("#tablaNotasTituloCategoria2").prop('codigo', categorias[1].codigo_categoria);
											                    $("#tablaNotasNotaCategoria2").prop('codigo', categorias[1].codigo_categoria);
											                    $("#tablaNotasNotaCategoria2").prop('peso', categorias[1].peso_categoria);
											                    //$("#tablaNotasNotaCategoria2").attr('bgcolor', colores[1]);
											                    localStorage.setItem(categorias[1].codigo_categoria, 0);

											                    $("#tablaNotasTituloCategoria3").html(categorias[2].nombre_categoria);
											                    $("#tablaNotasTituloCategoria3").prop('codigo', categorias[2].codigo_categoria);
											                    $("#tablaNotasNotaCategoria3").prop('codigo', categorias[2].codigo_categoria);
											                    $("#tablaNotasNotaCategoria3").prop('peso', categorias[2].peso_categoria);
											                    //$("#tablaNotasNotaCategoria3").attr('bgcolor', colores[2]);
											                    localStorage.setItem(categorias[2].codigo_categoria, 0);
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


//items seleccionados
$("input:radio").click(function () {
    alert($("#edad1").attr('checked', true));
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
	            setTimeout(function(){ $("#barraCargaAdjuntos").hide(); $("#tablaArchivosAdjuntados").show(); $("#fileadjuntos").removeAttr('disabled'); }, 2000);
	            respuesta = JSON.parse(responseObject);
	            if(respuesta.nombre_fichero.length <= 20) { 
	            	var nombre_mostrar = respuesta.nombre_fichero; 
	            }else{ 
	            	var nombre_mostrar = respuesta.nombre_fichero.substring(0,19)+"..."; 
	            }
	            var fila = "";
	            fila = fila + "<tr>";
	            fila = fila + '<th scope="row"><a href="'+respuesta.url+'" target="_blank">'+nombre_mostrar+'</a></th>';
	            fila = fila + '<td>'+respuesta.peso+'</td>';
	            fila = fila + '<td><button type="button" url="'+respuesta.nombre_unico+'" class="btn btn-sm btn-danger" onclick="javascript:borrarAdjunto(';
	            fila = fila + "'"+respuesta.nombre_unico+"', '"+respuesta.nombre_fichero+"', '"+nombre_mostrar+"'";
	            fila = fila + ');"><i class="fas fa-trash-alt"></i> Eliminar</button></td>';
	            fila = fila + '</tr>';

	            $('#tablaArchivosAdjuntados').append(fila);

	        }
	    }
     });

});

function borrarAdjunto(nombre, mostrar, textoHtml) {
	var respuesta = confirm('¿Esta usted seguro de querer eliminar el archivo '+mostrar+' de los archivos adjuntos de esta evaluación? Presione ACEPTAR para eliminarlo, de lo contrario, presione CANCELAR');
	if(respuesta) {
		$.ajax({
			type: 'post',
			url: 'core/AdjuntosDelete.php',
			data: 'file='+nombre,
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
			        $("#modalEditorTitle").text('Problema al procesar su solicitud');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('No se encontró respuesta del servidor para procesar su solicitud<br /><strong>HTTP 404</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
				500: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('Ha ocurrido un error');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('No se especificó el nombre del fichero o estaba corrupto.<br /><strong>CORE ADJUNTODELETE 500</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    301: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('Archivo ya fue eliminado');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('El archivo que intenta eliminar, ya ha sido eliminado desde el servidor. Por favor intentelo más tarde.<br /><strong>CORE ADJUNTODELETE FILE DOESNT EXISTS</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    401: function(responseObject, textStatus, errorThrown) {
			        $("#modalEditor").modal('show');
			        $("#modalEditorTitle").text('No se pudo borrar el archivo');
			        $("#modalEditorContenido").attr('align', 'left');
			        $("#modalEditorCerrarVentana").show();
			        $("#modalEditorContenido").html('El sistema de calidad encontró el fichero pero no pudo eliminarlo, probablemente no tiene los permisos necesarios para ejecutar la acción.<br /><strong>CORE ADJUNTODELETE 403 CHMOD ERROR</strong>');
			        $("#modalEditorBtnCerrar").show();
			        $("#modalEditorBtnCerrar").text('Cerrar');
			        $("#modalEditorBtnAccion").hide();
			    },
			    200: function(responseObject, textStatus, errorThrown) {
			    	$("#tablaArchivosAdjuntados tr:contains('"+textoHtml+"')").remove();
			    	$("#modalEditorContenido").html('Archivo adjunto '+mostrar+' ha sido eliminado exitosamente');
			    	setTimeout(function(){ $("#modalEditorBtnCerrar").click(); }, 2000);
			    }
			}
		});
	}
}
