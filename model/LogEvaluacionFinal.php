<?php
	class LogDetalleEvaluacionParcial  {
		private $id;
		private $fecha;
		private $usuario;
		private $numero_final;
		private $fecha_creacion;
		private $periodo;
		private $rut_ejecutivo;
		private $rut_evaluador;
		private $codigo_area;
		private $observaciones;
		private $nota_final;
		private $estado;
		private $accion;

		public function __construct($arreglo) {
			$this->id					= $arreglo['id'];
			$this->fecha				= $arreglo['fecha'];
			$this->usuario				= $arreglo['usuario'];
			$this->numero_final			= $arreglo['numero_final'];
			$this->fecha_creacion		= $arreglo['fecha_creacion'];
			$this->periodo				= $arreglo['periodo'];
			$this->rut_ejecutivo		= $arreglo['rut_ejecutivo'];
			$this->rut_evaluador		= $arreglo['rut_evaluador'];
			$this->codigo_area			= $arreglo['codigo_area'];
			$this->observaciones		= $arreglo['observaciones'];
			$this->nota_final			= $arreglo['nota_final'];
			$this->estado				= $arreglo['estado'];
			$this->accion				= $arreglo['accion'];
		}


		public function getid() {
			try {
				return $this->id;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getfecha() {
			try {
				return $this->fecha;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getusuario() {
			try {
				return $this->usuario;
			}catch(Exception $e) {
				return null;
			}
		}

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

		public function getrut_ejecutivo() {
			try {
				return $this->rut_ejecutivo;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getrut_evaluador() {
			try {
				return $this->rut_evaluador;
			}catch(Exception $e) {
				return null;
			}
		}

		public function getcodigo_area() {
			try {
				return $this->codigo_area;
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

		public function getnota_final() {
			try {
				return $this->nota_final;
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

		public function getaccion() {
			try {
				return $this->accion;
			}catch(Exception $e) {
				return null;
			}
		}



		public function setid($id) {
			try {
				$this->id = $id;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setfecha($fecha) {
			try {
				$this->fecha = $fecha;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setusuario($usuario) {
			try {
				$this->usuario = $usuario;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnumero_final($numero_final) {
			try {
				$this->numero_final = $numero_final;
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

		public function setperiodo($periodo) {
			try {
				$this->periodo = $periodo;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setrut_ejecutivo($rut_ejecutivo) {
			try {
				$this->rut_ejecutivo = $rut_ejecutivo;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setrut_evaluador($rut_evaluador) {
			try {
				$this->rut_evaluador = $rut_evaluador;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setcodigo_area($codigo_area) {
			try {
				$this->codigo_area = $codigo_area;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setobservaciones($observaciones) {
			try {
				$this->observaciones = $observaciones;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnota_final($nota_final) {
			try {
				$this->nota_final = $nota_final;
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

		public function setaccion($accion) {
			try {
				$this->accion = $accion;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

	}
?>		