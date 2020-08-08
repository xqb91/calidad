<?php
	//Controlador OK: 09.04.2020
	include(dirModel."Area.php");
	class CustomController {

		private $databaseTransaction;

		//constructor del controlador de Area
		public function __construct() {
			$this->databaseTransaction = new DatabaseTransaction();
		}

		//devuelve el objeto inicializado por el controlador de DatabaseTransaction (Conexion contra la base de datos)
		public function getDatabaseTransaction() {
			return $this->databaseTransaction;
		}

		//Devuelve verrdadero o falso dependiendo si pudo sobreescribir el objeto de DatabaseTransaction
		public function setDatabaseTransaction($databaseTransaction) {
			try {
				$this->databaseTransaction = $databaseTransaction;
				return true;
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		//funcion retorna un arreglo de todos los registros que encuentre en la tabla
		public function evaluacionesARevisarPor($rut_evaluador) {
			try {
				$consulta = "SELECT  ";
				$consulta = $consulta."1 as tipo,  ";
				$consulta = $consulta."a.numero_evaluacion evaluacion,  ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_evaluacion, '%d-%m-%y') as fecha,  ";
				$consulta = $consulta."a.rut_ejecutivo creadapor,  ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname,  ";
				$consulta = $consulta."a.rut_ejecutivo,  ";
				$consulta = $consulta."e.nombre_ejecutivo,  ";
				$consulta = $consulta."b.observacion,  ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante  ";
				$consulta = $consulta."FROM   ";
				$consulta = $consulta."evaluacion_parcial a   ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_evaluacion = b.numero_evaluacion   ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador  ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo  ";
				$consulta = $consulta."WHERE   ";
				$consulta = $consulta."a.estado = 2  ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador."  ";

				$consulta = $consulta."UNION ALL ";
				$consulta = $consulta." ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."2 as tipo, ";
				$consulta = $consulta."a.numero_quincenal evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_quincenal a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_quincenal = b.numero_evaluacion  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 2 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				$consulta = $consulta."UNION ALL  ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."3 as tipo, ";
				$consulta = $consulta."a.numero_final evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_final a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_final = b.numero_evaluacion  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 2 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				//echo $consulta;
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						$this->databaseTransaction->cerrar();
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = $registro;
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "Controller Area - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function evaluacionDetalleRevision($rut_evaluador, $evaluacion) {
			try {
				$consulta = "SELECT  ";
				$consulta = $consulta."1 as tipo,  ";
				$consulta = $consulta."a.numero_evaluacion evaluacion,  ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_evaluacion, '%d-%m-%y') as fecha,  ";
				$consulta = $consulta."a.rut_ejecutivo creadapor,  ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname,  ";
				$consulta = $consulta."a.rut_ejecutivo,  ";
				$consulta = $consulta."e.nombre_ejecutivo,  ";
				$consulta = $consulta."b.observacion,  ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante,  ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM   ";
				$consulta = $consulta."evaluacion_parcial a   ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_evaluacion = b.numero_evaluacion AND a.estado = b.estado  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador  ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo  ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE   ";
				$consulta = $consulta."a.estado = 2  ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador."  ";
				$consulta = $consulta."AND a.numero_evaluacion = ".$evaluacion."  ";

				$consulta = $consulta."UNION ALL ";
				$consulta = $consulta." ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."2 as tipo, ";
				$consulta = $consulta."a.numero_quincenal evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_quincenal a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_quincenal = b.numero_evaluacion AND a.estado = b.estado ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 2 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				$consulta = $consulta."UNION ALL  ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."3 as tipo, ";
				$consulta = $consulta."a.numero_final evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_final a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_final = b.numero_evaluacion  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 2 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";

				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						$this->databaseTransaction->cerrar();
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = $registro;
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "Controller Area - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function evaluacionesApeladaPor($rut_evaluador) {
			try {
				$consulta = "SELECT  ";
				$consulta = $consulta."1 as tipo,  ";
				$consulta = $consulta."a.numero_evaluacion evaluacion,  ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_evaluacion, '%d-%m-%y') as fecha,  ";
				$consulta = $consulta."a.rut_ejecutivo creadapor,  ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname,  ";
				$consulta = $consulta."a.rut_ejecutivo,  ";
				$consulta = $consulta."e.nombre_ejecutivo,  ";
				$consulta = $consulta."b.observacion,  ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante,  ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM   ";
				$consulta = $consulta."evaluacion_parcial a   ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_evaluacion = b.numero_evaluacion AND a.estado = b.estado  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador  ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo  ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE   ";
				$consulta = $consulta."a.estado = 7  ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador."  ";

				$consulta = $consulta."UNION ALL ";
				$consulta = $consulta." ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."2 as tipo, ";
				$consulta = $consulta."a.numero_quincenal evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_quincenal a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_quincenal = b.numero_evaluacion AND a.estado = b.estado ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 7 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				$consulta = $consulta."UNION ALL  ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."3 as tipo, ";
				$consulta = $consulta."a.numero_final evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_final a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_final = b.numero_evaluacion AND a.estado = b.estado ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 7 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				//echo $consulta;
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						$this->databaseTransaction->cerrar();
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = $registro;
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "Controller Area - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function evaluacionDetalleApelacion($rut_evaluador, $evaluacion) {
			try {
				$consulta = "SELECT  ";
				$consulta = $consulta."1 as tipo,  ";
				$consulta = $consulta."a.numero_evaluacion as evaluacion,  ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_evaluacion, '%d-%m-%y') as fecha,  ";
				$consulta = $consulta."a.rut_ejecutivo creadapor,  ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname,  ";
				$consulta = $consulta."a.rut_ejecutivo,  ";
				$consulta = $consulta."e.nombre_ejecutivo,  ";
				$consulta = $consulta."b.observacion,  ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante,  ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM   ";
				$consulta = $consulta."evaluacion_parcial a   ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_evaluacion = b.numero_evaluacion AND a.estado = b.estado   ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador  ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo  ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE   ";
				$consulta = $consulta."a.estado = 7  ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador."  ";
				$consulta = $consulta."AND a.numero_evaluacion = ".$evaluacion."  ";

				$consulta = $consulta."UNION ALL ";
				$consulta = $consulta." ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."2 as tipo, ";
				$consulta = $consulta."a.numero_quincenal evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_quincenal a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_quincenal = b.numero_evaluacion AND a.estado = b.estado  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 7 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				$consulta = $consulta."UNION ALL  ";
				$consulta = $consulta."SELECT  ";
				$consulta = $consulta."3 as tipo, ";
				$consulta = $consulta."a.numero_final evaluacion, ";
				$consulta = $consulta."a.periodo,  ";
				$consulta = $consulta."date_format(a.fecha_creacion, '%d-%m-%y') as fecha, ";
				$consulta = $consulta."a.rut_ejecutivo creadapor, ";
				$consulta = $consulta."c.nombre_evaluador as creadaporname, ";
				$consulta = $consulta."a.rut_ejecutivo, ";
				$consulta = $consulta."e.nombre_ejecutivo, ";
				$consulta = $consulta."b.observacion, ";
				$consulta = $consulta."(SELECT z.nombre_evaluador FROM evaluador z WHERE z.rut_evaluador = b.usuario ) as nombre_solicitante, ";
				$consulta = $consulta."f.codigo_area,  ";
				$consulta = $consulta."f.nombre_area  ";
				$consulta = $consulta."FROM  ";
				$consulta = $consulta."evaluacion_final a  ";
				$consulta = $consulta."INNER JOIN rev_evaluacion_status b ON a.numero_final = b.numero_evaluacion AND a.estado = b.estado  ";
				$consulta = $consulta."INNER JOIN evaluador c ON a.rut_evaluador = c.rut_evaluador ";
				$consulta = $consulta."INNER JOIN ejecutivo e ON a.rut_ejecutivo = e.rut_ejecutivo ";
				$consulta = $consulta."INNER JOIN 	area f ON a.codigo_area = f.codigo_area  ";
				$consulta = $consulta."WHERE  ";
				$consulta = $consulta."a.estado = 7 ";
				$consulta = $consulta."AND a.rut_evaluador = ".$rut_evaluador." ";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						$this->databaseTransaction->cerrar();
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = $registro;
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "Controller Area - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>