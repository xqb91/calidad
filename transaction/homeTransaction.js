$(document).ready(function(){
	$.ajax({
	    type: 'post',
	    url: 'core/ListAreas.php',
	    beforeSend: function() {
	        //inicializando modal que valida sesión de raulí

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
	                    //dataArray.push([value["yourID"].toString(), value["yourValue"] ]);
	                    $("#slcArea").append('<option value="'+value.codigo_area+'">'+value.nombre_area+'</option>');
	                });

                	$.ajax({
						    type: 'post',
						    url: 'core/ListPeriodosParaEvaluar.php',
						    beforeSend: function() {
						        //inicializando modal que valida sesión de raulí

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
						                    //dataArray.push([value["yourID"].toString(), value["yourValue"] ]);
						                    $("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
						                 	
						                }); 
						            }           
						        }
					 });
	            }           
	        }
    });

});

$("#slcArea").change(function(){
	var area 	= $('#slcArea :selected').val();

	$.ajax({
		    type: 'post',
		    url: 'core/ListEjecutivosPorArea.php',
		    data: 'area='+area,
		    beforeSend: function() {
		        //inicializando modal que valida sesión de raulí

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
		            500: function(responseObject, textStatus, errorThrown) {
		            	$("#modalHome").modal('show');
		                $("#modalHomeTitle").text('´Ocurrió un error');
		                $("#modalHomeContenido").attr('align', 'left');
		                $("#modalHomeCerrarVentana").show();
		                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT EMPTY</strong>');
		                $("#modalHomeBtnCerrar").show();
		                $("#modalHomeBtnCerrar").text('Cerrar');
		                $("#modalHomeBtnAccion").hide();
		            },
		            401: function(responseObject, textStatus, errorThrown) {
		            	$("#modalHome").modal('show');
		                $("#modalHomeTitle").text('´Ocurrió un error');
		                $("#modalHomeContenido").attr('align', 'left');
		                $("#modalHomeCerrarVentana").show();
		                $("#modalHomeContenido").html('No se recibió la suficiente información para completar el listado de evaluadores<br /><strong>PHP CORE VARIABLE INPUT NOT NUMBER</strong>');
		                $("#modalHomeBtnCerrar").show();
		                $("#modalHomeBtnCerrar").text('Cerrar');
		                $("#modalHomeBtnAccion").hide();
		            },
		            301: function(responseObject, textStatus, errorThrown) {
		            	$("#modalHome").modal('show');
		                $("#modalHomeTitle").text('´Ocurrió un error');
		                $("#modalHomeContenido").attr('align', 'left');
		                $("#modalHomeCerrarVentana").show();
		                $("#modalHomeContenido").html('El área que ha seleccionado no tiene ejecutivos registrados. Por favor contacte a su jefatura para más información<br /><strong>PHP CORE ARRAY CONTROLLER EMPTY</strong>');
		                $("#modalHomeBtnCerrar").show();
		                $("#modalHomeBtnCerrar").text('Cerrar');
		                $("#modalHomeBtnAccion").hide();
		            },
		            200: function(responseObject, textStatus, errorThrown) {
		                var resultados = JSON.parse(responseObject);
		                /* $.each(resultados.periodos, function (index, value) {
		                    //dataArray.push([value["yourID"].toString(), value["yourValue"] ]);
		                    $("#slcPeriodo").append('<option value="'+value+'">'+value+'</option>');
		                 	
		                }); */
		            }           
		        }
	 });
});