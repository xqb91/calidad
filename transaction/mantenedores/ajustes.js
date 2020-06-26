var evaluador;
$("#tablaCategorias").hide();
$("#tablaItems").hide();


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
			                    evaluador = resultados.nombre_evaluador;
							}
					}
				});

				//rellenando el listado de áreas donde correspona
				$.ajax({
			        type: 'post',
			        url: 'core/ListAreas.php',
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
			                    var respuesta = JSON.parse(responseObject);

			                    /// -------------------------------- AREAS -------------------------------------------
								$("#tablaAreas tbody").empty();
			                    $.each(respuesta, function(index, valor) {
			                    	var insertarTabla = "";
		                    		insertarTabla = insertarTabla+'<tr>';
			                        insertarTabla = insertarTabla+'<th scope="row" width="80%">'+valor.nombre_area+'</th>';
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-primary btn-sm" title="Editar" codigo="'+valor.codigo_area+'" name="'+valor.nombre_area+'" id="btnArea"><i class="fas fa-edit"></i></button></td>';
			                        if(valor.estado == 1) {
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Bloquear" codigo="'+valor.codigo_area+'"  name="'+valor.nombre_area+'" id="btnArea"><i class="fas fa-lock"></i></button></td>';
			                        }else{
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Desbloquear" codigo="'+valor.codigo_area+'"  name="'+valor.nombre_area+'" id="btnArea"><i class="fas fa-lock-open"></i></button></td>';
			                        }
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-danger btn-sm" id="btnArea" title="Eliminar"  name="'+valor.nombre_area+'" id="btnArea" codigo="'+valor.codigo_area+'"><i class="fas fa-trash-alt"></i></button></td>';
			                      	insertarTabla = insertarTabla+'</tr>';
			                      	$("#tablaAreas tbody").append(insertarTabla);
			                      	$("#slcAreaCategoria").append(new Option(valor.nombre_area, valor.codigo_area));
			                      	$("#slcAreaItem").append(new Option(valor.nombre_area, valor.codigo_area));
			                    });

								var id = $("#slcAreaCategoria option:selected").val();
								$.ajax({
								    type: 'post',
								    url: 'core/ListCategoríasPorArea.php',
								    data: 'id='+id,
								    beforeSend: function() {
								    },
								    statusCode: {
							            500: function(responseObject, textStatus, errorThrown) {
							            	$("#modalHomeConfig").attr('class', 'modal-dialog');
							            	$("#modalHome").modal('show');
							                $("#modalHomeTitle").text('Error');
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('No se recibió toda la información para procesar su solicitud<br /><strong>HTTP 500</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cerrar');
							                $("#modalHomeBtnAccion").hide();
								            },
								        200: function(responseObject, textStatus, errorThrown) {
								        	var categs = JSON.parse(responseObject);

								        	$("#tablaCategorias tbody").empty();
								        	$.each(categs, function(index, data) {
								        		console.log(data);
								        		var insertCategorias = '<tr codigo="'+data.codigo_categoria+'">';
								        		insertCategorias = insertCategorias+'<td><input name="categoria" type="radio" value="'+data.codigo_categoria+'" id="categoria"> '+data.nombre_categoria+'</td><td>'+data.peso_categoria+'</td><td align="center"><i class="fas fa-arrows-alt"></i> Mover</td><td align="center"><button type="button" class="btn btn-primary btn-sm" id="btnEditarCategoria" codigo="'+data.codigo_categoria+'" name="'+data.nombre_categoria+'" peso="'+data.peso_categoria+'"><i class="fas fa-edit"></i></button></td>';
								        		insertCategorias = insertCategorias+'</tr>';
								        		$("#tablaCategorias tbody").append(insertCategorias);
								        	});
								        	$("#tablaCategorias").show();

								        	//reordenamiento & guardado
								        	$( function() {
										    	$( "#tablaCategorias tbody" ).sortable({
											      	update: function (event, ui) { 
											      		console.clear();
											      		var array = new Array();
												      	$.each($("#tablaCategorias").find('tr'), function() {
												      		console.log($(this).attr('codigo'));
												      		array.push($(this).attr('codigo'));
												      	});
												      	$.ajax({
														    type: 'post',
														    url: 'core/UpdateOrdenCategorias.php',
														    data: 'area='+id+'&orden='+JSON.stringify(array),
														    beforeSend: function() {
														    },
														    statusCode: {
													            500: function(responseObject, textStatus, errorThrown) {
													            	$("#modalHomeConfig").attr('class', 'modal-dialog');
													            	$("#modalHome").modal('show');
													                $("#modalHomeTitle").text('Error');
													                $("#modalHomeContenido").attr('align', 'left');
													                $("#modalHomeCerrarVentana").show();
													                $("#modalHomeContenido").html('No se recibió toda la información para procesar su solicitud<br /><strong>HTTP 500</strong>');
													                $("#modalHomeBtnCerrar").show();
													                $("#modalHomeBtnCerrar").text('Cerrar');
													                $("#modalHomeBtnAccion").hide();
														            },
														        200: function(responseObject, textStatus, errorThrown) {
														        	console.log(responseObject);
														        }
														    }
														});
											     	} 
										    	}).disableSelection();
										  	});

								        	//click en edición
								        	$("button#btnEditarCategoria.btn.btn-primary.btn-sm").click(function() {
								        		$("#modalHomeConfig").attr('class', 'modal-dialog');
												$("#modalHomeTitle").html('<i class="fas fa-lock"></i> Editar categoría '+$(this).attr('name'));
								                $("#modalHomeContenido").attr('align', 'left');
								                $("#modalHomeCerrarVentana").show();

					                			$("#modalHomeContenido").html('<strong>Nombre Categoría</strong>:<br /><input type="text"  class="form-control" id="txtEditNameCategoria" value="'+$(this).attr('name')+'" /><br /><strong>Peso de la Categoría</strong>:<br /><div class="input-group mb-3"><input type="text" class="form-control" aria-label="" value="'+$(this).attr('peso')+'"><div class="input-group-append"><span class="input-group-text">%</span></div></div>');
								                $("#modalHomeBtnCerrar").show();
								                $("#modalHomeBtnCerrar").text('Cancelar');
								                $("#modalHomeBtnAccion").html('<i class="fas fa-save"></i> Guardar Cambios Categoría');
								                $("#modalHomeBtnAccion").attr('codigo', $(this).attr('codigo'));
								                $("#modalHomeBtnAccion").show();
								                $("#modalHome").modal('show');

								        	});


								        	//-----------------------------------------------------------------------------
								        	// I T E M S 
								        	// ----------------------------------------------------------------------------
								        	var categ;
								        	$("input#categoria").click(function() {
												categ = $(this).val();
												$.ajax({
													url: 'core/ListItemsPorCategorias.php',
													type: 'POST',
													data: {'categoria': categ},
													statusCode: {
														200: function(responseObject, textStatus, errorThrown) {
															var respuesta = JSON.parse(responseObject);
															$("#tablaItems").show();
															$("#tablaItems tbody").empty();
															console.log(respuesta);
															$("#descItems").html('Se muestran los items de la categoría seleccionada');
															$.each(respuesta, function(index, valor) {
																var fila = '<tr codigo="'+valor.codigo_item+'"><td>'+valor.nombre_item+'</td><td><i class="fas fa-arrows-alt"></i> Mover</td><td><button type="button" class="btn btn-primary btn-sm" id="btnEditarCategoria" codigo="'+valor.codigo_item+'" name="'+valor.nombre_item+'""><i class="fas fa-edit"></i></button></td></tr>';
																$("#tablaItems tbody").append(fila);
															});
														}
													}
												});
												
											});


											//reordenamiento & guardado
								        	$( function() {
										    	$( "#tablaItems tbody" ).sortable({
											      	update: function (event, ui) { 
											      		console.clear();
											      		var array = new Array();
												      	$.each($("#tablaItems").find('tr'), function() {
												      		console.log($(this).attr('codigo'));
												      		array.push($(this).attr('codigo'));
												      	});
												      	$.ajax({
														    type: 'post',
														    url: 'core/UpdateOrdenItemsCategorias.php',
														    data: 'categoria='+categ+'&orden='+JSON.stringify(array),
														    beforeSend: function() {
														    },
														    statusCode: {
													            500: function(responseObject, textStatus, errorThrown) {
													            	$("#modalHomeConfig").attr('class', 'modal-dialog');
													            	$("#modalHome").modal('show');
													                $("#modalHomeTitle").text('Error');
													                $("#modalHomeContenido").attr('align', 'left');
													                $("#modalHomeCerrarVentana").show();
													                $("#modalHomeContenido").html('No se recibió toda la información para procesar su solicitud<br /><strong>HTTP 500</strong>');
													                $("#modalHomeBtnCerrar").show();
													                $("#modalHomeBtnCerrar").text('Cerrar');
													                $("#modalHomeBtnAccion").hide();
														            },
														        200: function(responseObject, textStatus, errorThrown) {
														        	console.log(responseObject);
														        }
														    }
														});
											     	} 
										    	}).disableSelection();
										  	});

								        }
								    }
								});

								$("button#btnArea").click(function() {
									var accion 	= $(this).prop('title');
									var id 		= $(this).attr('codigo');
									var name 	= $(this).prop('name');

									switch(accion) {
										case 'Editar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Editar área de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('Por favor, introduzca el nuevo nombre para el área de '+name+' a continuación:<br /><input type="text"  class="form-control" id="txtEditNameArea" codigo="'+id+'" value="'+name+'" />');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").text('Guardar Nombre Área');
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Bloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock"></i> Bloquear área de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', estas a punto de bloquear el área de <strong>'+name+'</strong>, al hacer esto no eliminas ninguna evaluación, sin embargo tu y tus compañeros no podrán evaluar a sus ejecutivos hasta que desbloquees nuevamente esta área.<br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock"></i> Bloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Desbloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock-open"></i> Desbloquear área de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', al desbloquear <strong>'+name+'</strong> tu y tus compañeros podrán evaluar a sus ejecutivos y visualizar toda la información de ellos.<br /><strong>¿Estas segur@ de desbloquear?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock-open"></i> Desbloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Eliminar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-trash-alt"></i> Eliminar área de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('<strong>¡Estas a punto de eliminar esta área '+evaluador+'!</strong>. Para tu seguridad, la eliminación del área se realiza si esta no tiene ni ejecutivos, ni evaluaciones asociadas.<br /><ul><li>Si requieres una eliminación forzosa de esta área por favor solicitala al área de Tricot M.I.S mediante un correo a mquezada@tricot.cl.</li><li>Si solo necesitas que tus compañeros de trabajo no visualicen el área la puedes bloquear, de esta manera los datos se mantendrán intactos</li></ul><br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-trash-alt"></i> Eliminar');
							                $("#modalHomeBtnAccion").attr('codigo', id);
											$("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										default:
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").text('Error');
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cerrar');
							                $("#modalHomeBtnAccion").hide();
							                $("#modalHome").modal('show');
									}
								});

								$("#btnAddNewArea").click(function() {
									$("#modalHomeConfig").attr('class', 'modal-dialog');
									$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Añadir nueva área');
					                $("#modalHomeContenido").attr('align', 'left');
					                $("#modalHomeCerrarVentana").show();
					                $("#modalHomeContenido").html('Por favor, introduzca el nombre para el área que desea agregar:<br /><input type="text"  class="form-control" id="txtEditNameArea" value="" />');
					                $("#modalHomeBtnCerrar").show();
					                $("#modalHomeBtnCerrar").text('Cancelar');
					                $("#modalHomeBtnAccion").text('Crear Área');
					                $("#modalHomeBtnAccion").show();
					                $("#modalHome").modal('show');
								});

			                    // -------------------------------- FIN AREAS ------------------------------------------
							}
					}
				});

				$.ajax({
			        type: 'post',
			        url: 'core/ListCiclos.php',
			        beforeSend: function() {
			        },
			        statusCode: {
			                500: function(responseObject, textStatus, errorThrown) {
				                $("#modalHomeConfig").attr('class', 'modal-dialog');
				                $("#modalHomeTitle").text('´Problema al cargar el periodo');
				                $("#modalHomeContenido").attr('align', 'left');
				                $("#modalHomeCerrarVentana").show();
				                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
				                $("#modalHomeBtnCerrar").show();
				                $("#modalHomeBtnCerrar").text('Cerrar');
				                $("#modalHomeBtnAccion").hide();
			                },
			                200: function(responseObject, textStatus, errorThrown) {
			                    var ciclos = JSON.parse(responseObject);

			                    /// -------------------------------- AREAS -------------------------------------------
			                    $("#tablaCiclos tbody").empty();
			                    $.each(ciclos, function(index, valor) {
			                    	var insertarTabla = "";
		                    		insertarTabla = insertarTabla+'<tr>';
			                        insertarTabla = insertarTabla+'<th scope="row" width="80%">'+valor.nombre_ciclo+'</th>';
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-primary btn-sm" title="Editar" codigo="'+valor.codigo_ciclo+'" name="'+valor.nombre_ciclo+'" sigla="'+valor.sigla_ciclo+'" id="btnCiclo"><i class="fas fa-edit"></i></button></td>';
			                        if(valor.estado == 1) {
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Bloquear" codigo="'+valor.codigo_ciclo+'"  name="'+valor.nombre_ciclo+'" sigla="'+valor.sigla_ciclo+'" id="btnCiclo"><i class="fas fa-lock"></i></button></td>';
			                        }else{
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Desbloquear" codigo="'+valor.codigo_ciclo+'"  name="'+valor.nombre_ciclo+'" sigla="'+valor.sigla_ciclo+'" id="btnCiclo"><i class="fas fa-lock-open"></i></button></td>';
			                        }
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-danger btn-sm" title="Eliminar"  name="'+valor.nombre_ciclo+'" sigla="'+valor.sigla_ciclo+'" id="btnCiclo" codigo="'+valor.codigo_ciclo+'"><i class="fas fa-trash-alt"></i></button></td>';
			                      	insertarTabla = insertarTabla+'</tr>';
			                      	$("#tablaCiclos tbody").append(insertarTabla);
			                    });

			                    
								$("button#btnCiclo").click(function() {
									var accion 	= $(this).prop('title');
									var id 		= $(this).attr('codigo');
									var name 	= $(this).prop('name');

									switch(accion) {
										case 'Editar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Editar ciclo de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('Por favor, introduzca el nuevo nombre para el ciclo de '+name+' a continuación:<br /><input type="text"  class="form-control" id="txtEditNameArea" codigo="'+id+'" value="'+name+'" />');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").text('Guardar Nombre Ciclo');
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Bloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock"></i> Bloquear ciclo de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', estas a punto de bloquear el ciclo de <strong>'+name+'</strong>, al hacer esto no eliminas ninguna evaluación, sin embargo tu y tus compañeros no podrán evaluar a sus ejecutivos hasta que desbloquees nuevamente esta área.<br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock"></i> Bloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Desbloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock-open"></i> Desbloquear ciclo de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', al desbloquear el ciclo <strong>'+name+'</strong> tu y tus compañeros podrán evaluar a sus ejecutivos y visualizar toda la información de ellos.<br /><strong>¿Estas segur@ de desbloquear?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock-open"></i> Desbloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Eliminar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-trash-alt"></i> Eliminar ciclo de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('<strong>¡Estas a punto de eliminar este ciclo '+evaluador+'!</strong>. Para tu seguridad, la eliminación del ciclo se realiza si esta no tiene ni ejecutivos, ni evaluaciones asociadas.<br /><ul><li>Si requieres una eliminación forzosa de este ciclo por favor solicitala al área de Tricot M.I.S mediante un correo a mquezada@tricot.cl.</li><li>Si solo necesitas que tus compañeros de trabajo no visualicen el ciclo lo puedes bloquear, de esta manera los datos se mantendrán intactos</li></ul><br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-trash-alt"></i> Eliminar');
							                $("#modalHomeBtnAccion").attr('codigo', id);
											$("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										default:
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").text('Error');
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cerrar');
							                $("#modalHomeBtnAccion").hide();
							                $("#modalHome").modal('show');
									}
								});

								$("#btnAddNewCiclo").click(function() {
									$("#modalHomeConfig").attr('class', 'modal-dialog');
									$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Añadir nuevo ciclo');
					                $("#modalHomeContenido").attr('align', 'left');
					                $("#modalHomeCerrarVentana").show();
					                $("#modalHomeContenido").html('Por favor, introduzca el nombre para el área que desea agregar para agrupar a los ejecutivos:<br /><input type="text"  class="form-control" id="txtEditNameCiclo" value="" />');
					                $("#modalHomeBtnCerrar").show();
					                $("#modalHomeBtnCerrar").text('Cancelar');
					                $("#modalHomeBtnAccion").text('Crear Ciclo');
					                $("#modalHomeBtnAccion").show();
					                $("#modalHome").modal('show');
								});

			                    // -------------------------------- FIN AREAS ------------------------------------------
							}
					}
				});

				$.ajax({
			        type: 'post',
			        url: 'core/ListJornadas.php',
			        beforeSend: function() {

			        },
			        statusCode: {
			                500: function(responseObject, textStatus, errorThrown) {
				                $("#modalHomeConfig").attr('class', 'modal-dialog');
				                $("#modalHomeTitle").text('´Problema al cargar el periodo');
				                $("#modalHomeContenido").attr('align', 'left');
				                $("#modalHomeCerrarVentana").show();
				                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
				                $("#modalHomeBtnCerrar").show();
				                $("#modalHomeBtnCerrar").text('Cerrar');
				                $("#modalHomeBtnAccion").hide();
			                },
			                200: function(responseObject, textStatus, errorThrown) {
			                    var jornadas = JSON.parse(responseObject);

			                    /// -------------------------------- AREAS -------------------------------------------
			                    $("#tablaJornadas tbody").empty();
			                    $.each(jornadas, function(index, valor) {
			                    	var insertarTabla = "";
		                    		insertarTabla = insertarTabla+'<tr>';
			                        insertarTabla = insertarTabla+'<th scope="row" width="80%">'+valor.nombre_jornada+'</th>';
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-primary btn-sm" title="Editar" codigo="'+valor.codigo_jornada+'" name="'+valor.nombre_jornada+'" id="btnJornada"><i class="fas fa-edit"></i></button></td>';
			                        if(valor.estado == 1) {
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Bloquear" codigo="'+valor.codigo_jornada+'"  name="'+valor.nombre_jornada+'" id="btnJornada"><i class="fas fa-lock"></i></button></td>';
			                        }else{
			                        	insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-warning btn-sm" title="Desbloquear" codigo="'+valor.codigo_jornada+'"  name="'+valor.nombre_jornada+'" id="btnJornada"><i class="fas fa-lock-open"></i></button></td>';
			                        }
			                        insertarTabla = insertarTabla+'<td><button type="button" class="btn btn-danger btn-sm" title="Eliminar" name="'+valor.nombre_jornada+'" id="btnJornada" codigo="'+valor.codigo_jornada+'"><i class="fas fa-trash-alt"></i></button></td>';
			                      	insertarTabla = insertarTabla+'</tr>';
			                      	$("#tablaJornadas tbody").append(insertarTabla);
			                    });

			                    
								$("button#btnJornada").click(function() {
									var accion 	= $(this).prop('title');
									var id 		= $(this).attr('codigo');
									var name 	= $(this).prop('name');

									switch(accion) {
										case 'Editar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Editar jornada de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('Por favor, introduzca el nuevo nombre para la jornada de '+name+' a continuación:<br /><input type="text"  class="form-control" id="txtEditNameArea" codigo="'+id+'" value="'+name+'" />');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").text('Guardar Nombre Jornada');
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Bloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock"></i> Bloquear jornada de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', estas a punto de bloquear la jornada de <strong>'+name+'</strong>, al hacer esto no eliminas ninguna evaluación, sin embargo tu y tus compañeros no podrán evaluar a sus ejecutivos hasta que desbloquees nuevamente esta jornada.<br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock"></i> Bloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Desbloquear':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-lock-open"></i> Desbloquear jornada de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html(evaluador+', al desbloquear la jornada <strong>'+name+'</strong> tu y tus compañeros podrán evaluar a sus ejecutivos y visualizar toda la información de ellos.<br /><strong>¿Estas segur@ de desbloquear?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-lock-open"></i> Desbloquear');
							                $("#modalHomeBtnAccion").attr('codigo', id);
							                $("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										case 'Eliminar':
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").html('<i class="fas fa-trash-alt"></i> Eliminar jornada de '+name);
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('<strong>¡Estas a punto de eliminar esta jornada '+evaluador+'!</strong>. Para tu seguridad, la eliminación de la jornada se realiza si esta no tiene ni ejecutivos, ni evaluaciones asociadas.<br /><ul><li>Si requieres una eliminación forzosa de esta jornada por favor solicitala al área de Tricot M.I.S mediante un correo a mquezada@tricot.cl.</li><li>Si solo necesitas que tus compañeros de trabajo no visualicen la jornada lo puedes bloquear, de esta manera los datos se mantendrán intactos</li></ul><br /><strong>¿Estas segur@ de continuar?</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cancelar');
							                $("#modalHomeBtnAccion").html('<i class="fas fa-trash-alt"></i> Eliminar');
							                $("#modalHomeBtnAccion").attr('codigo', id);
											$("#modalHomeBtnAccion").show();
							                $("#modalHome").modal('show');
										break;

										default:
											$("#modalHomeConfig").attr('class', 'modal-dialog');
											$("#modalHomeTitle").text('Error');
							                $("#modalHomeContenido").attr('align', 'left');
							                $("#modalHomeCerrarVentana").show();
							                $("#modalHomeContenido").html('No se encontró respuesta del servidor para los periodos a trabajar<br /><strong>HTTP 404</strong>');
							                $("#modalHomeBtnCerrar").show();
							                $("#modalHomeBtnCerrar").text('Cerrar');
							                $("#modalHomeBtnAccion").hide();
							                $("#modalHome").modal('show');
									}
								});

								$("#btnAddNewJornada").click(function() {
									$("#modalHomeConfig").attr('class', 'modal-dialog');
									$("#modalHomeTitle").html('<i class="fas fa-edit"></i> Añadir nueva jornada');
					                $("#modalHomeContenido").attr('align', 'left');
					                $("#modalHomeCerrarVentana").show();
					                $("#modalHomeContenido").html('Por favor, introduzca el nombre para la jornada que desea agregar para agrupar a los ejecutivos:<br /><input type="text"  class="form-control" id="txtEditNameCiclo" value="" />');
					                $("#modalHomeBtnCerrar").show();
					                $("#modalHomeBtnCerrar").text('Cancelar');
					                $("#modalHomeBtnAccion").text('Crear Jornada');
					                $("#modalHomeBtnAccion").show();
					                $("#modalHome").modal('show');
								});

			                    // -------------------------------- FIN AREAS ------------------------------------------
							}
					}
				});
	
				//--------------------------------------------------------------------


			}
		}
	});
});

$("#slcAreaCategoria").change(function(e) {
	var id = $("#slcAreaCategoria option:selected").val();
	$.ajax({
	    type: 'post',
	    url: 'core/ListCategoríasPorArea.php',
	    data: 'id='+id,
	    beforeSend: function() {
	    },
	    statusCode: {
            500: function(responseObject, textStatus, errorThrown) {
            	$("#modalHomeConfig").attr('class', 'modal-dialog');
            	$("#modalHome").modal('show');
                $("#modalHomeTitle").text('Error');
                $("#modalHomeContenido").attr('align', 'left');
                $("#modalHomeCerrarVentana").show();
                $("#modalHomeContenido").html('No se recibió toda la información para procesar su solicitud<br /><strong>HTTP 500</strong>');
                $("#modalHomeBtnCerrar").show();
                $("#modalHomeBtnCerrar").text('Cerrar');
                $("#modalHomeBtnAccion").hide();
	            },
	        200: function(responseObject, textStatus, errorThrown) {
	        	alert('ok');
	        }
	    }
	});
});

