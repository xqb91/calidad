<?php
	class ItemEvaluacion implements Serializable {
		//columnas de la tabla
	     private $codigo_item ; 
	     private $codigo_categoria;
	     private $nombre_item;
	     private $orden ;

		//Constructor
		//Obtiene un arreglo que es generado de forma automática por MySQL
		//mediante un mysql_result, debe entregarse un arreglo de tipo asociativo
		private function __construct($arreglo) {
			$this->codigo_item		= $arreglo['codigo_item'];
			$this->codigo_categoria	= $arreglo['codigo_categoria'];
			$this->nombre_item		= $arreglo['nombre_item'];
			$this->orden			= $arreglo['orden'];
		}

		//accesadores
		public function getcodigo_item() {
			try {
				return $this->codigo_item;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getcodigo_categoria() {
			try {
				return $this->codigo_categoria;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getnombre_item() {
			try {
				return $this->nombre_item;
			}catch(Exception $e) {
				return null;
			}
		}
		
		public function getorden() {
			try {
				return $this->orden;
			}catch(Exception $e) {
				return null;
			}
		}

		//mutadores
		public function setcodigo_item($codigo_item) {
			try {
				$this->codigo_item = $codigo_item;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setcodigo_categoria($codigo_categoria) {
			try {
				$this->codigo_categoria = $codigo_categoria;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}		

		public function setnombre_item($nombre_item) {
			try {
				$this->nombre_item = $nombre_item;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setorden($orden) {
			try {
				$this->orden = $orden;
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