$(document).ready(function() {
	var ejecutivo = $("#irql").val();

	if(ejecutivo == '') {
		alert('error');
	}else{
		$.ajax({
		    type: 'post',
		    url: 'core/ResumenEvaluacionParcialEjecutivo.php',
		    data: 'ejecutivo='+ejecutivo,
		    beforeSend: function() {
		        console.log('Cargando...');
		    },
		    statusCode: {
	            404: function(responseObject, textStatus, errorThrown) {
	            	console.log('404');
	            },
	            200: function(responseObject, textStatus, errorThrown) {
	            	var respuesta = JSON.parse(responseObject);

	            	//datos de evaluacion quincenal
	            	if(respuesta.quincenal == null) {
	            		$("#titleQuincenal").html('Evaluacion Quincenal');
	            		$("#fechaQuincenal").html('aún no generada');
	            		$("#notaQuincenal").html('<strong>-.--</strong>');
	            		$("#linkQuincenal").hide();
	            	}else{
	            		$("#titleQuincenal").html('Evaluacion Quincenal '+respuesta.quincenal.periodo);
	            		var fecha = respuesta.quincenal.fecha_creacion.split('-');
	            		$("#fechaQuincenal").html('Generada el '+fecha[2]+'/'+fecha[1]+'/'+fecha[0]);
	            		$("#notaQuincenal").html('<strong>'+parseFloat(respuesta.quincenal.nota).toFixed(2)+'</strong>');
	            		$("#linkQuincenal").prop('href', 'core/pdfGenerate.php?evaluacion='+respuesta.quincenal.evaluacion+'&tipo=quincenal&accion=descargar');
	            		$("#linkQuincenal").show();
	            	}


	            	//datos evaluacion final
	            	if(respuesta.efinal == null) {
	            		$("#titleFinal").html('Evaluacion Final');
	            		$("#fechaFinal").html('aún no generada.');
	            		$("#notFinal").html('<strong>-.--</strong>');
	            		$("#linkFinal").hide();
	            	}else{
	            		$("#titleFinal").html('Evaluacion Final '+respuesta.efinal.periodo);
	            		console.log(respuesta.efinal);
	            		var fecha = respuesta.efinal.fecha_creacion.split('-');
	            		$("#fechaFinal").html('Generada el '+fecha[2]+'/'+fecha[1]+'/'+fecha[0]);
	            		$("#notFinal").html('<strong>'+parseFloat(respuesta.efinal.nota).toFixed(2)+'</strong>');
	            		$("#linkFinal").prop('href', 'core/pdfGenerate.php?evaluacion='+respuesta.efinal.evaluaucion+'&tipo=final&accion=descargar');
	            		$("#linkFinal").show();
	            	}

	            	//parciales
	            	if(respuesta.parciales == null) {
	            		$("#titleEvalPar").html('<strong>Evaluaciones Parciales</strong>');
						var fila = '';
						fila = fila+'<tr>';
                        fila = fila+'<th scope="row" colspan="4">Este ejecutivo no tiene evaluaciones parciales disponibles</th>';
                      	fila = fila+'</tr>';
                      	$("#tablaParciales tbody").append(fila);
	            	}else{
		            	$.each(respuesta.parciales, function(i,v){
							var fila = '';
							fila = fila+'<tr>';
	                        fila = fila+'<th scope="row">'+v.evaluacion+'</th>';
	                        fila = fila+'<td>'+v.periodo+'</td>';
	                        fila = fila+'<td>'+v.fecha_evaluacion+'</td>';
		                    fila = fila+'<td>'+v.nota+'</td>';
		                     fila = fila+'<td><a href="core/pdfGenerate.php?evaluacion='+v.evaluacion+'&tipo=parcial&accion=descargar">descarga</a>r</td>';
	                      	fila = fila+'</tr>';
	                      	$("#tablaParciales tbody").append(fila);
	                      	$("#linkEditarParciales").prop('href', 'parcialHomeDet.php?ejecutivo='+ejecutivo);
						});
		            }
	            }
	        }
		});
	}
});