<?php
	class DetalleEvaluacionParcial implements Serializable {
		//columnas de la tabla
		private $id ;
		private $numero_evaluacion; 
		private $codigo_item ; 
		private $nota; 


		//Constructor
		//Obtiene un arreglo que es generado de forma automática por MySQL
		//mediante un mysql_result, debe entregarse un arreglo de tipo asociativo
		private function __construct($arreglo) {
			$this->id					= $arreglo['id'];
			$this->numero_evaluacion	= $arreglo['numero_evaluacion'];
			$this->codigo_item			= $arreglo['codigo_item'];
			$this->nota					= $arreglo['nota'];
		}

		//accesadores
		public function getid() {
			try {
				return $this->id;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getnumero_evaluacion() {
			try {
				return $this->numero_evaluacion;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getcodigo_item() {
			try {
				return $this->codigo_item;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getnota() {
			try {
				return $this->nota;
			}catch(Exception $e) {
				return null;
			}
		}

		//mutadores
		public function setid($id) {
			try {
				$this->id = $id;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}	

		public function setnumero_evaluacion($numero_evaluacion) {
			try {
				$this->numero_evaluacion = $numero_evaluacion;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}								

		public function setcodigo_item($codigo_item) {
			try {
				$this->codigo_item = $codigo_item;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}	

		public function setnota($nota) {
			try {
				$this->nota = $nota;
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