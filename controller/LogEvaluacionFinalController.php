<?php
	//include("../config/Globales.php");
	include(dirModel."LogEvaluacionFinal.php");
	class LogEvaluacionFinalController {

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
		public function listar() {
			try {
				$consulta = 'SELECT * FROM log_evaluacion_final ORDER BY fecha ASC';
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
							$array[$i] = new LogEvaluacionFinal($registro);
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "LogEvaluacionParcialController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCodigo($codigo) {
			try {
				$consulta = "SELECT * FROM log_evaluacion_final WHERE id = '".$codigo."'";
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
							$array[$i] = new LogEvaluacionFinal($registro);
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "LogEvaluacionParcialController - listarPorCodigo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}
		
		public function ingresar($evaluacionQuincenal, $conectado, $accion) {
			try {
				//objeto
				$obj = $evaluacionQuincenal;
				if($obj != null) {

					//construyendo string
					$consulta = "INSERT INTO log_evaluacion_final (fecha, usuario, numero_final, fecha_creacion, periodo, rut_ejecutivo, rut_evaluador, codigo_area, observaciones, nota_final, estado, accion) ";
					$consulta = $consulta." VALUES ( "; 
					$consulta = $consulta." '".date('Y-m-d H:i:s')."', "; 
					$consulta = $consulta." '".$conectado."', "; 
					$consulta = $consulta." ".$obj->getnumero_final().", "; 
					$consulta = $consulta." '".$obj->getfecha_creacion()."', "; 
					$consulta = $consulta." '".$obj->getperiodo()."', "; 
					$consulta = $consulta." ".$obj->getejecutivo_rut_ejecutivo().", "; 
					$consulta = $consulta." ".$obj->getevaluador_rut_evaluador().", "; 
					$consulta = $consulta." ".$obj->getejecutivo_codigo_area().", "; 
					$consulta = $consulta." '".$obj->getobservaciones()."', "; 
					$consulta = $consulta." ".$obj->getnotafinal().", "; 
					$consulta = $consulta." ".$obj->getEstado().", "; 
					$consulta = $consulta." '".$accion."' "; 
					$consulta = $consulta." )";


					//ejecutando la consulta
					if($this->databaseTransaction != null) {
						$resultado = $this->databaseTransaction->ejecutar($consulta);
						if($resultado == true) {
							$this->databaseTransaction->confirmar();
							$this->databaseTransaction->cerrar();
							return 1;
						}else{
							$this->databaseTransaction->deshacer();
							$this->databaseTransaction->cerrar();
							return 0;
						}
					}else{
						if(ambiente == 'DEV') { echo "LogEvaluacionParcialController - ingresar: El objeto DatabaseTransaction se encuentra nulo"; }
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "LogEvaluacionParcialController - ingresar: El objeto Adjunto (Model) se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}



	}
?>