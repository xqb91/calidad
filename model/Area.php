<?php
	class Area {

		private $codigoArea;
		private $nombreArea;
		private $codigoEstado;
		private $fechaCreacion;
		private $evalNormal;
		private $evalQuincenal;

		public function __construct($codigoArea, $nombreArea, $codigoEstado, $fechaCreacion, $evalNormal, $evalQuincenal) {
			$this->codigoArea		= $codigoArea;
			$this->nombreArea		= $nombreArea;
			$this->codigoEstado		= $codigoEstado;
			$this->fechaCreacion	= $fechaCreacion;
			$this->evalNormal		= $evalNormal;
			$this->evalQuincenal	= $evalQuincenal;
		}

		public function getCodigoArea() {
			return $this->codigoArea;
		}
		public function getNombreArea() {
			return $this->nombreArea;
		}
		public function getCodigoEstado() {
			return $this->codigoEstado;
		}
		public function getFechaCreacion() {
			return $this->fechaCreacion;
		}
		public function getEvalNormal() {
			return $this->evalNormal;
		}
		public function getEvalQuincenal() {
			return $this->evalQuincenal;
		}

		public function setCodigoArea($codigoArea) {
			try {
				$this->codigoArea = $codigoArea;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setNombreArea($nombreArea) {
			try {
				$this->nombreArea = $nombreArea;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setCodigoEstado($codigoEstado) {
			try {
				$this->codigoEstado = $codigoEstado;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setFechaCreacion($fechaCreacion) {
			try {
				$this->fechaCreacion = $fechaCreacion;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setEvalNormal($evalNormal) {
			try {
				$this->evalNormal = $evalNormal;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setEvalQuincenal($evalQuincenal) {
			try {
				$this->evalQuincenal = $evalQuincenal;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

	}
?>