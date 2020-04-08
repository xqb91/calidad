<?php
	class EvaluacionParcialController {

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
				$consulta = 'SELECT * FROM evaluacion_parcial ORDER BY numero_evaluacion DESC';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new EvaluacionParcial($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorNumero($numero) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE numero_evaluacion = '".$numero_evaluacion."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorNumero: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorNumero: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorPeriodo($periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE periodo = '".$periodo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorPeriodoArea($periodo, $area) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE periodo = '".$periodo."' and codigo_area = '".$area."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorPeriodoArea: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorPeriodoArea: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEjecutivo($ejecutivo) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE rut_ejecutivo = '".$ejecutivo."' ORDER BY numero_evaluacion DESC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEjecutivo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEjecutivo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEjecutivoPeriodo($ejecutivo, $periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE rut_ejecutivo = '".$ejecutivo."' AND periodo = '".$periodo."' ORDER BY numero_evaluacion DESC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEjecutivoPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEjecutivoPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEvaluadorPeriodo($evaluador, $periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE rut_evaluador = '".$ejecutivo."' AND periodo = '".$periodo."' ORDER BY numero_evaluacion DESC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEvaluadorPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEvaluadorPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEvaluadorPeriodoArea($evaluador, $periodo, $area) {
			try {
				$consulta = "SELECT * FROM evaluacion_parcial WHERE rut_evaluador = '".$ejecutivo."' AND periodo = '".$periodo."' AND codigo_area = '".$area."' ORDER BY numero_evaluacion DESC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionParcial($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEvaluadorPeriodoArea: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionParcialController - listarPorEvaluadorPeriodoArea: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>