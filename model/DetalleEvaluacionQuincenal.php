<?php
	class DetalleEvaluacionQuincenal implements Serializable {
		//columnas de la tabla
		private $numero_quincenal;
		private $evaluacion_parcial;

		//Constructor
		//Obtiene un arreglo que es generado de forma automática por MySQL
		//mediante un mysql_result, debe entregarse un arreglo de tipo asociativo
		private function __construct($arreglo) {
			$this->numero_quincenal	= $arreglo['numero_quincenal'];
			$this->evaluacion_parcial				= $arreglo['evaluacion_parcial'];

		}

		public function getnumero_quincenal() {
			try {
				return $this->numero_quincenal;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getevaluacion_parcial() {
			try {
				return $this->evaluacion_parcial;
			}catch(Exception $e) {
				return null;
			}
		}
		//mutadores
		public function setnumero_quincenal($numero_quincenal) {
			try {
				$this->numero_quincenal = $numero_quincenal;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setevaluacion_parcial($evaluacion_parcial) { 
			try {
				$this->evaluacion_parcial = $evaluacion_parcial;
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