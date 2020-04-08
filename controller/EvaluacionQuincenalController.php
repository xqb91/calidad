<?php
	class EvaluacionQuincenalController {

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
				$consulta = 'SELECT * FROM evaluacion_quincenal';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new EvaluacionQuincenal($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorNumero($numero) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE numero_quincenal = '".$numero."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorNumero: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorNumero: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEjecutivo($ejecutivo) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_ejecutivo = '".$ejecutivo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEjecutivoPeriodo($ejecutivo, $periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_ejecutivo = '".$ejecutivo."' and periodo = '".$periodo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivoPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivoPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEjecutivoPeriodoFecha($ejecutivo, $periodo, $fecha) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_ejecutivo = '".$ejecutivo."' and periodo = '".$periodo."' and fecha_creacion = '".$fecha."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivoPeriodoFecha: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEjecutivoPeriodoFecha: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEvaluador($evaluador) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_evaluador = '".$evaluador."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluador: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluador: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEvaluadorPeriodo($evaluador, $periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_evaluador = '".$evaluador."' and periodo = '".$periodo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluadorPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluadorPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEvaluadorPeriodoFecha($evaluador, $periodo, $fecha) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE rut_evaluador = '".$evaluador."' and periodo = '".$periodo."' and fecha_creacion = '".$fecha."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluadorPeriodoFecha: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorEvaluadorPeriodoFecha: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorArea($area) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE ejecutivo_codigo_area = '".$area."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorArea: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorArea: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorAreaPeriodo($area, $periodo) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE ejecutivo_codigo_area = '".$area."' and periodo = '".$periodo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorAreaPeriodo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorAreaPeriodo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorAreaPeriodoFecha($area, $periodo, $fecha) {
			try {
				$consulta = "SELECT * FROM evaluacion_quincenal WHERE ejecutivo_codigo_area = '".$area."' and periodo = '".$periodo."' and fecha_creacion = '".$fecha."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new EvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorAreaPeriodoFecha: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EvaluacionQuincenalController - listarPorAreaPeriodoFecha: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}
	}
?>