<?php
	class LogDetalleEvaluacionParcial  {
		private $id;
		private $fecha;
		private $usuario;
		private $numero_quincenal;
		private $rut_ejecutivo;
		private $fecha_creacion;
		private $rut_evaluador;
		private $periodo;
		private $codigo_area;
		private $nota_quincenal;
		private $estado;
		private $accion;

		public function __construct($arreglo) {
			$this->id					= $arreglo['id'];
			$this->fecha				= $arreglo['fecha'];
			$this->usuario				= $arreglo['usuario'];
			$this->numero_quincenal		= $arreglo['numero_quincenal'];
			$this->rut_ejecutivo		= $arreglo['rut_ejecutivo'];
			$this->fecha_creacion		= $arreglo['fecha_creacion'];
			$this->rut_evaluador		= $arreglo['rut_evaluador'];
			$this->periodo				= $arreglo['periodo'];
			$this->codigo_area			= $arreglo['codigo_area'];
			$this->nota_quincenal		= $arreglo['nota_quincenal'];
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

		public function getnumero_quincenal() {
			try {
				return $this->numero_quincenal;
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

		public function getfecha_creacion() {
			try {
				return $this->fecha_creacion;
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

		public function getperiodo() {
			try {
				return $this->periodo;
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

		public function getnota_quincenal() {
			try {
				return $this->nota_quincenal;
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
			}catch(Exception $e) {
				return false;
			}
		}

		public function setfecha($fecha) {
			try {
				$this->fecha = $fecha;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setusuario($usuario) {
			try {
				$this->usuario = $usuario;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnumero_quincenal($numero_quincenal) {
			try {
				$this->numero_quincenal = $numero_quincenal;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setrut_ejecutivo($rut_ejecutivo) {
			try {
				$this->rut_ejecutivo = $rut_ejecutivo;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setfecha_creacion($fecha_creacion) {
			try {
				$this->fecha_creacion = $fecha_creacion;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setrut_evaluador($rut_evaluador) {
			try {
				$this->rut_evaluador = $rut_evaluador;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setperiodo($periodo) {
			try {
				$this->periodo = $periodo;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setcodigo_area($codigo_area) {
			try {
				$this->codigo_area = $codigo_area;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnota_quincenal($nota_quincenal) {
			try {
				$this->nota_quincenal = $nota_quincenal;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setestado($estado) {
			try {
				$this->estado = $estado;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setaccion($accion) {
			try {
				$this->accion = $accion;
			}catch(Exception $e) {
				return false;
			}
		}
	}
?>		