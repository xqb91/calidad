<?php
	class DatabaseTransaction {
		private $consulta;
		private $conexion;
		private $resultado;

		public function __construct() {
		}


		public function getConsulta() {
			return $this->consulta;
		}

		public function setConsulta($consulta) {
			try {
				$this->consulta = $consulta;
				return true;
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo 'Ha ocurrido un error al recibir la cadena de consulta: '.$e->getMessage(); }
				return false;
			}
		}

		public function getResultado() {
			try {
				return $this->resultado;
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo 'Ha ocurrido un error al recibir la cadena de consulta: '.$e->getMessage(); }
				return null;
			}
		}


		public function conectar($fuente = "") {
			$this->conexion = new Database();
		}

		public function iniciarTransaccion() {
			return $this->conexion->getConexion()->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
		}

		public function confirmar() {
			return $this->conexion->getConexion()->commit();
		}

		public function deshacer() {
			return $this->conexion->getConexion()->rollback();
		}

		public function cerrar() {
			return $this->conexion->getConexion()->close();
		}

		public function ejecutar($consulta, $fuente = "") {
			try {
				if($this->setConsulta($consulta)) {
					$this->conectar();
					if($this->conexion) {
						$this->resultado = $this->conexion->getConexion()->query($consulta);
						$this->confirmar();
						return true;
					}else{
						$this->deshacer();
						return false;
					}
				}else{
					if(ambiente == 'DEV') { echo "Falló el seteo de la cadena de la consulta."; }
					return false;
				}
			}catch(Exception $e) {
				$this->deshacer();
				if(ambiente == 'DEV') { echo "No se pudoo ejecutar la consulta: ".$e->getMessage(); }
				return false;
			}
		}

		public function cantidadResultados() {
			try {
				if($this->getResultado() != null) {
					return $this->getResultado()->num_rows;
				}else{
					return 0;
				}
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo "Fallo el conteo de registros afectados: ".$e->getMessage()."."; }
				return 0;
			}
		}

		public function resultados() {
			try {
				if($this->getResultado() != null) {
					return $this->getResultado()->fetch_array(MYSQLI_ASSOC);
				}else{
					return null;
				}
			}catch(Exception $e) {
				return null;
			}
		}

	}
?>