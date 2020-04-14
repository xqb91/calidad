<?php
	class EvaluacionFinal  implements Serializable {
		//columnas de la tabla
		private $numero_final; 
		private $fecha_creacion;
		private $periodo;
		private $ejecutivo_rut_ejecutivo; 
		private $evaluador_rut_evaluador; 
		private $ejecutivo_codigo_area; 
		private $observaciones;

		//Constructor
		//Obtiene un arreglo que es generado de forma automática por MySQL
		//mediante un mysql_result, debe entregarse un arreglo de tipo asociativo
		private function __construct($arreglo) {
			$this->numero_final				= $arreglo['numero_final'];
			$this->fecha_creacion			= $arreglo['fecha_creacion'];
			$this->periodo					= $arreglo['periodo'];
			$this->ejecutivo_rut_ejecutivo	= $arreglo['ejecutivo_rut_ejecutivo'];
			$this->evaluador_rut_evaluador	= $arreglo['evaluador_rut_evaluador'];
			$this->ejecutivo_codigo_area	= $arreglo['ejecutivo_codigo_area'];
			$this->observaciones			= $arreglo['observaciones'];
		}


		//accesadores
		public function getnumero_final() {
			try {
				return $this->numero_final;
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
		
		public function getperiodo() {
			try {
				return $this->periodo;
			}catch(Exception $e) {
				return null;
			}
		}
		
		public function getejecutivo_rut_ejecutivo() {
			try {
				return $this->ejecutivo_rut_ejecutivo;
			}catch(Exception $e) {
				return null;
			}
		}
		
		public function getejecutivo_codigo_area() {
			try {
				return $this->ejecutivo_codigo_area;
			}catch(Exception $e) {
				return null;
			}
		}
		
		public function getobservaciones() {
			try {
				return $this->observaciones;
			}catch(Exception $e) {
				return null;
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