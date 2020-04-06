<?php
	class Area implements Serializable {
		//columnas de la tabla
		private $codigo_area;
		private $nombre_area;
		private $estado;
		private $fecha_creacion;

		//Constructor
		//Obtiene un arreglo que es generado de forma automática por MySQL
		//mediante un mysql_result, debe entregarse un arreglo de tipo asociativo
		private function __construct($arreglo) {
			$this->codigo_area		= $arreglo['codigo_area'];
			$this->nombre_area		= $arreglo['nombre_area'];
			$this->estado			= $arreglo['estado'];
			$this->fecha_creacion	= $arreglo['fecha_creacion'];
		}

		//accesadores
		public function getcodigo_area() {
			try {
				return $this->codigo_area;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getnombre_area() {
			try {
				return $this->nombre_area;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getestado() {
			try {
				return $this->estado;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getfecha_creacion() {
			try {
				return $this->fecha_creacion;
			}catch(Exception $e) {
				return null;
			}
		}

		//mutadores
		public function setcodigo_area($codigo_area) {
			try {
				$this->codigo_area = $codigo_area;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnombre_area($nombre_area) {
			try {
				$this->nombre_area = $nombre_area;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setestado($estado) {
			try {
				$this->estado = $estado;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setfecha_creacion($fecha_creacion) {
			try {
				$this->fecha_creacion = $fecha_creacion;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		//metodos de la clase
		//lista todos los valores de la clase
		public function serializar() {
	        return get_object_vars($this);
		}

		//serializa los objetos de la clase
		public function serialize() {
        	return json_encode($this->serializar(), JSON_FORCE_OBJECT);
	    }

	    //desserializa un string
	    public function unserialize($serializado) {
	        $this->serializado = unserialize($serializado);
	    }	

	}
?>