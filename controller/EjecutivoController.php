<?php
	class EjecutivoController {

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
				$consulta = 'SELECT * FROM ejecutivo';
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 0) {
						return null;
					}else{
						$array = null;
						$i 	   = 0;
						while($registro = $this->databaseTransaction->resultados()) {
							$array[$i] = new Ejecutivo($registro);
							$i++;
						}
						return $array;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - Listar: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorRut($rut) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE rut_ejecutivo = '".$rut."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorRut: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorRut: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorEstado($estado) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE codigo_estado = '".$estado."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorEstado: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorEstado: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCorreo($correo) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE correo = '".$correo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorCorreo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorCorreo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorCiclo($ciclo) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE codigo_ciclo = '".$ciclo."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorCiclo: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorCiclo: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorArea($area) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE codigo_area = '".$area."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorArea: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorArea: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function listarPorJornada($jornada) {
			try {
				$consulta = "SELECT * FROM ejecutivo WHERE codigo_jornada = '".$jornada."'";
				//ejecutando la consulta
				if($this->databaseTransaction != null) {
					$resultado = $this->databaseTransaction->ejecutar($consulta);
					if($this->databaseTransaction->cantidadResultados() == 1) {
						return new Ejecutivo($this->databaseTransaction->resultados());
					}else{
						if(ambiente == 'DEV') { echo "EjecutivoController - listarPorJornada: La consulta SQL devolvió mas de un resultado por eso se devuelve NULL"; }
						return null;
					}
				}else{
					if(ambiente == 'DEV') { echo "EjecutivoController - listarPorJornada: El objeto DatabaseTransaction se encuentra nulo"; }
					return false;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

	}
?>