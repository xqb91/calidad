<?php
	class CategoriaController {

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
				$consulta = 'SELECT * FROM Categoria ORDER BY codigo_categoria, orden ASC';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Categoria($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "CategoriaController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCodigo($codigo) {
			try {
				$consulta = "SELECT * FROM Categoria WHERE codigo_categoria = '".$codigo."' ORDER BY codigo_categoria, orden ASC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Categoria($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "CategoriaController - listarPorCodigo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "CategoriaController - listarPorCodigo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorArea($area) {
			try {
				$consulta = "SELECT * FROM Categoria WHERE codigo_area = '".$area."' ORDER BY codigo_categoria, orden ASC";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Categoria($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "CategoriaController - listarPorCodigo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "CategoriaController - listarPorCodigo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>