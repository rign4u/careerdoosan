/**
* Skip include
* ------------------
*/

(function(){
	var str='';
	str+='	<!-- ====================================== -->';
	str+='	<!-- Start of skip -->';
	str+='	<!-- <script type="text/javascript" src="../_pub_include/skip.js"></script> -->';
	str+='	<!-- ====================================== -->';
	str+='	<div id="skip">';
	str+='		<a href="#header">메뉴 바로가기</a>';
	str+='		<a href="#wrapper">본문 바로가기(skip to content)</a>';
	str+='	</div>';
	str+='	<!-- ====================================== -->';
	str+='	<!-- //End of skip -->';
	str+='	<!-- ====================================== -->';

	document.write(str);
})();

