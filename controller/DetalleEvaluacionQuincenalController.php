<?php
	class DetalleEvaluadorQuincenalController {

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
				$consulta = 'SELECT * FROM detalle_evaluacion_quincenal';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new DetalleEvaluacionQuincenal($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "DetalleEvaluadorQuincenalController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorNumeroQUincenal($quincenal) {
			try {
				$consulta = "SELECT * FROM detalle_evaluacion_quincenal WHERE numero_quincenal = ".$quincenal."";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new DetalleEvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "DetalleEvaluadorQuincenalController - listarPorCodigo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "DetalleEvaluadorQuincenalController - listarPorCodigo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorNumeroParcial($parcial) {
			try {
				$consulta = "SELECT * FROM detalle_evaluacion_quincenal WHERE evaluacion_parcial = ".$parcial."";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new DetalleEvaluacionQuincenal($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "DetalleEvaluadorQuincenalController - listarPorNumeroParcial: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "DetalleEvaluadorQuincenalController - listarPorNumeroParcial: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>