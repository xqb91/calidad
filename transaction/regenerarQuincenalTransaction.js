
$(document).ready(function() {
	var irqljob;
	var irqlarea;
	localStorage.setItem('bandeQuincenal', 0);

	if($("#irqljob").val() == '') {
		$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />No se ha recibido el parámetro para atender su solicitud. Por favor intentelo más tarde');
	}else{
		if($("#irqlarea").val() == '') {
			$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />No se ha recibido el parámetro para atender su solicitud. Por favor intentelo más tarde');	
		}else{
			irqljob = $("#irqljob").val();
			$.ajax({
				type: 'post',
				url: 'core/ResumenEvaluacionParcialEjecutivo.php',
				data: 'ejecutivo='+irqljob,
				beforeSend: function() {

				},
				statusCode: {
					500: function(responseObject, textStatus, errorThrown) {
						$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />No se ha recibido el parámetro para atender su solicitud. Por favor intentelo más tarde');
					},
					200: function(responseObject, textStatus, errorThrown) {
						var evaluaciones = JSON.parse(responseObject);
						$.ajax({
							type: 'POST',
							url: 'core/QuantityEvaluacionesNecesarias.php',
							data: 'area='+$("#irqlarea").val(),
							deforeSend: function() {

							},
							statusCode: {
								302: function(responseObject, textStatus, errorThrown) {
									$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />No se encontró la cantidad de evaluaciones mínimas para esta área <BR /><strong>HTTP CORE 302</strong>');
								},
								301: function(responseObject, textStatus, errorThrown) {
									$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />No se ha recibido el parámetro para atender su solicitud. Por favor intentelo más tarde <BR /><strong>HTTP CORE 301</strong>');
								},
								200: function(responseObject, textStatus, errorThrown) {
									var cantidad = JSON.parse(responseObject);

									if(evaluaciones.parciales == null) {
										$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />Este ejecutivo no tiene ninguna evaluación parcial, por lo tanto no se puede generar una evaluación quincenal de forma manual.<br />Si esto te parece extraño, valida que te encuentres trabajando en el periodo correcto.');
									}else if(evaluaciones.parciales.length < cantidad.cantidad_quincenales){
										$("#txtPantallaUsuario").html('<strong>Imposible procesar su solicitud</strong><br />Este ejecutivo no tiene solo <strong>'+evaluaciones.parciales.length+' evaluación(es) parcial(es)</strong> y se necesitan mínimo <strong>'+cantidad.cantidad_quincenales+' evaluaciones</strong>, por lo tanto no se puede generar una evaluación quincenal de forma manual.<br />Si esto te parece extraño, valida que te encuentres trabajando en el periodo correcto.');
									}else{
										//tablaListadoEvaluaciones
										$.each(evaluaciones.parciales, function(i, v) {
											var fila = "";
											fila = fila+'<tr>';
					                        fila = fila+'<th scope="row"><div class="form-check"><input class="form-check-input" type="checkbox" value="'+v.evaluacion+'" id="evaluacion"></div></th>';
					                        fila = fila+'<td><strong>Evaluación #'+v.evaluacion+'</strong></td>';
					                        fila = fila+'<td>'+v.fecha_evaluacion+'</td>';
					                        fila = fila+'<td>'+v.nota+'</td>';
					                      	fila = fila+'</tr>';
					                      	$("#tablaListadoEvaluaciones").append(fila);
										});

										$('input:checkbox').click(function() {
											var count = 0;
											$.each($('input:checkbox'), function(i,v) {
												if($(this).is(':checked')) {
													count++;
												}
											});

											if(count == cantidad.cantidad_quincenales) {
												$.each($('input:checkbox'), function(i, v) {
													if(!$(this).is(':checked')) {
														$(this).attr('disabled', true);
													}
												});
												localStorage.setItem('bandeQuincenal', 1);
											}else{
												$.each($('input:checkbox'), function(i, v) {
													$(this).attr('disabled', false);
													localStorage.setItem('bandeQuincenal', 0);
												});
											}
										})
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