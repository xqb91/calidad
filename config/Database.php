<?php
	class Database {
		//atributos de la clase
		private $conexion;

		//constructor de la clase de conexion
		function __construct() {
		 	try {
		 		$this->conexion = mysqli_connect(servidorMysql, usuarioMysql, passwordMysql, databaseMysql);
				return true;
			}catch(Exception $e) {
				if(ambiente == 'DEV') { echo $e->getMessage(); }
				return false;
			}
		}

		public function getConexion() {
			return $this->conexion;
		}

	}
?>