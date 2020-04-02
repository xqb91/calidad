<?php
	class Evaluador {

		private $rutEvaluador;
		private $nombreEvaluador;
		private $login;
		private $password;
		private $fechaCreacion;
		private $codigoEstado;
		private $rutEjecutivo;
		private $codigoArea;


		public function getRutEvaluador() {
			return $this->rutEvaluador;
		}

		public function getNombreEvaluador() {
			return $this->nombreEvaluador;
		}

		public function getLogin() {
			return $this->login;
		}

		public function getPassword() {
			return $this->password;
		}

		public function getFechaCreacion() {
			return $this->fechaCreacion;
		}

		public function getCodigoEstado() {
			return $this->codigoEstado;
		}

		public function getRutEjecutivo() {
			return $this->rutEjecutivo;
		}

		public function getCodigoArea() {
			return $this->codigoArea;
		}



		public function setrutEvaluador($rutEvaluador) {
			try {
				$this->rutEvaluador = $rutEvaluador;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setnombreEvaluador($nombreEvaluador) {
			try {
				$this->nombreEvaluador = $nombreEvaluador;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setlogin($login) {
			try {
				$this->login = $login;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setpassword($password) {
			try {
				$this->password = $password;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setfechaCreacion($fechaCreacion) {
			try {
				$this->fechaCreacion = $fechaCreacion;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setcodigoEstado($codigoEstado) {
			try {
				$this->codigoEstado = $codigoEstado;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

		public function setrutEjecutivo($rutEjecutivo) {
			try {
				$this->rutEjecutivo = $rutEjecutivo;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}
		
		public function setcodigoArea($codigoArea) {
			try {
				$this->codigoArea = $codigoArea;
				return true;
			}catch(Exception $e) {
				return false;
			}
		}

	}
?>