<?php
	//Controlador OK: 09.04.2020
	include(dirModel."Categoria.php");
	class CategoriaController {

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
				$consulta = 'SELECT * FROM Categoria ORDER BY codigo_categoria, orden ASC';
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
							$array[$i] = new Categoria($registro);
							$i++;
						}
						$this->databaseTransaction->cerrar();
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
				$consulta = "SELECT * FROM Categoria WHERE codigo_categoria = ".$codigo." ORDER BY codigo_categoria, orden ASC";
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
							$array = new Categoria($registro);
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
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
					if($this->databaseTransaction->cantidadResultados() == 0) {
						$this->databaseTransaction->cerrar();
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Categoria($registro);
							$i++;
						}
						$this->databaseTransaction->cerrar();
						return $array;
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

		public function ingresar($param) {
			try {
				//objeto
				$obj = $param;
				if($obj != null) {
					//construyendo string
					$consulta = "INSERT INTO Categoria ";
					$consulta = $consulta."(numero_evaluacion, fecha, nombre_audio, periodo) VALUES ";
					$consulta = $consulta."(".$obj->getnumero_evaluacion().", '".date('Y-m-d H:i:s')."', '".$obj->getnombre_audio()."', '".$obj->getperiodo()."' );";
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
						if(ambiente == 'DEV') { echo "AudioController - ingresar: El objeto DatabaseTransaction se encuentra nulo"; }
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "AudioController - ingresar: El objeto Adjunto (Model) se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function actualizar($param) {
			try {
				//objeto
				$obj = $param;
				if($obj != null) {
					//construyendo string
					$consulta = "UPDATE Audio ";
					$consulta = $consulta."SET nombre_audio = '".$obj->getnombre_audio()."', periodo = ".$obj->getperiodo()." ";
					$consulta = $consulta."WHERE numero_evaluacion = ".$obj->getnumero_evaluacion().";";
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
						if(ambiente == 'DEV') { echo "AudioController - actualizar: El objeto DatabaseTransaction se encuentra nulo"; }
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "AudioController - actualizar: El objeto Adjunto (Model) se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function eliminar($param) {
			try {
				//objeto
				$obj = $param;
				if($obj != null) {
					//construyendo string
					$consulta = "DELETE FROM Audio ";
					$consulta = $consulta."WHERE numero_evaluacion = ".$obj->getnumero_evaluacion().";";
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
						if(ambiente == 'DEV') { echo "AudioController - eliminar: El objeto DatabaseTransaction se encuentra nulo"; }
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "AudioController - eliminar: El objeto Adjunto (Model) se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}


	}
?>