<?php
	class AdjuntosController {
		include(dirModel."Adjuntos.php");

		private $databaseTransaction;

		//constructor del controlador de Area
		public function __construct($databaseTransaction) {
			$this->databaseTransaction = $databaseTransaction;
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
				$consulta = 'SELECT * FROM Adjuntos';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Adjuntos($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "AdjuntosController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorNumeroEvaluacion($evaluacion) {
			try {
				$consulta = 'SELECT * FROM Adjuntos WHERE numero_evaluacion = $evaluacion';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Adjuntos($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "AdjuntosController - listarPorNumeroEvaluacion: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPeriodo($periodo) {
			try {
				$consulta = "SELECT * FROM Adjuntos WHERE periodo = '".$periodo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Adjuntos($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "AdjuntosController - listarPorNumeroEvaluacion: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function ingresarAdjunto($Adjunto) {
			try {
				//objeto
				$obj = $Adjunto;
				if($obj != null) {
					//construyendo string
					$consulta = "INSERT INTO Adjuntos ";
					$consulta = $consulta."(numero_evaluacion, fecha_carga, periodo, nombre_original, archivo_server) VALUES ";
					$consulta = $consulta."(".$obj->getnumero_evaluacion().", '".$obj->getfecha_carga()."', '".$obj->getperiodo()."', '".$obj->getnombre_original()."', '".$getarchivo_server()."');";
					//ejecutando la consulta
					if($this->databaseTransaction != null) {
						$resultado = $this->databaseTransaction->ejecutar($consulta);
						if($resultados == true) {
							return 1;
						}else{
							return 0;
						}
					}else{
						if(ambiente == 'DEV') { echo "AdjuntosController - listarPorNumeroEvaluacion: El objeto DatabaseTransaction se encuentra nulo"; }
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "AdjuntosController - listarPorNumeroEvaluacion: El objeto Adjunto (Model) se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}



	}
?>