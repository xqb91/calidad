<?php
	class ItemEvaluacionController {

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
				$consulta = 'SELECT * FROM item_evaluacion ORDER BY codigo_categiria, orden ASC';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new ItemEvaluacion($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "ItemEvaluacionController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCodigo($codigo) {
			try {
				$consulta = "SELECT * FROM item_evaluacion WHERE codigo_item = '".$codigo."' ORDER BY codigo_categiria, orden ASC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new ItemEvaluacion($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCodigo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCodigo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCategoria($categoria) {
			try {
				$consulta = "SELECT * FROM item_evaluacion WHERE codigo_categoria = '".$categoria."' ORDER BY codigo_categiria, orden ASC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new ItemEvaluacion($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCategoria: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCategoria: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCategoriaCodigoItem($categoria, $codigo) {
			try {
				$consulta = "SELECT * FROM item_evaluacion WHERE codigo_categoria = '".$categoria."' AND codigo_item = '".$codigo."' ORDER BY codigo_categiria, orden ASC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new ItemEvaluacion($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCategoriaCodigoItem: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "ItemEvaluacionController - listarPorCategoriaCodigoItem: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>