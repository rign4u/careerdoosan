/**
* Head include
* ------------------
* css & script 공통 include
*/

(function(){
	var str=''
	+'<!-- favicon -->'
		// +'<link rel="icon" type="image/png" sizes="16x16" href="../../assets/img/favicon/favicon.ico">'
		+'<link rel="shortcut icon" type="image/x-icon" href="../../assets/img/common/favicon.ico">'

		+'<!-- CSS -->'
		// +'<link href="../../assets/font/fontawesome/css/all.min.css" rel="stylesheet" />'// fontaweasome  //2/2제거
		+'<link href="../../assets/css/common.css" rel="stylesheet" />'

		+'<!-- JS : core -->'
		+'<script src="../../assets/plugins/modernizr/modernizr.js"></script>'
		+'<script src="../../assets/plugins/detectizr/detectizr.min.js"></script>'
		+'<script src="../../assets/plugins/jquery/v3.5.1/jquery.min.js"></script>'

		+'<!-- JS : plugins -->'
		+'<script src="../../assets/plugins/popper/popper.min.js"></script>'// 12.28 추가
		+'<script src="../../assets/plugins/bootstrap/bootstrap.js"></script>'
		+'<script src="../../assets/plugins/moment/moment.min.js"></script>'
		+'<script src="../../assets/plugins/tempusdominus-bootstrap-4/tempusdominus-bootstrap-4.js"></script>'//bootstarp4 datetimepicker
		+'<script src="../../assets/plugins/swiper/swiper.min.js"></script>'
				
		+'<!-- JS : motion -->'
		// +'<script src="../../assets/plugins/lottie/lottie.min.js"></script>'
		// +'<script src="../../assets/js/motion.js"></script>'

		+'<!-- JS : common -->'
		+'<script src="../../assets/js/common.js"></script>'

		+'<!-- JS : 퍼블리싱 테스트 용도 : 개발시 삭제 바랍니다. -->'
		+'<script src="../../assets/js/pub.js"></script>'
	;

	document.write(str);
})();
