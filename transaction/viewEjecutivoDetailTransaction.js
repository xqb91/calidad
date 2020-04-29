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
	            	console.log(respuesta);

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
	            		$("#notaQuincenal").html('<strong>'+respuesta.quincenal.nota+'</strong>');
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
	            		var fecha = respuesta.efinal.fecha_creacion.split('-');
	            		$("#fechaFinal").html('Generada el '+fecha[2]+'/'+fecha[1]+'/'+fecha[0]);
	            		$("#notFinal").html('<strong>'+respuesta.efinal.nota+'</strong>');
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
		            	$("#titleEvalPar").html('<strong>Evaluaciones Parciales</strong>');
		            	$.each(respuesta.parciales, function(i,v){
							var fila = '';
							fila = fila+'<tr>';
	                        fila = fila+'<th scope="row">'+v.evaluacion+'</th>';
	                        fila = fila+'<td>'+v.periodo+'</td>';
	                        fila = fila+'<td>'+v.fecha_evaluacion+'</td>';
		                    fila = fila+'<td>'+v.nota+'</td>';
	                      	fila = fila+'</tr>';
	                      	$("#tablaParciales tbody").append(fila);
						});
		            }
	            }
	        }
		});
	}
});