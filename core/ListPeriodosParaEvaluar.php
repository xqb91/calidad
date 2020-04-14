<?php
	/*class ListPeriodo {
		private $peridos;
	
		public function __construct() {
			for($i=1; i<=3; $i++) {
				$fecha 		=  	new DateTime(date('Y-m-d H:i:s'));
				$intervalo 	=	new DateInterval();
			}
		}
	}*/

	$fecha 		=  	new DateTime(date('Y-m-d H:i:s'));
	$intervalo 	=	new DateInterval("2M");
	$fecha->add($intervalo);
	echo $fecha->format('Y-m')

?>