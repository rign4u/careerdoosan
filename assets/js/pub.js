/**
* Pub 화면용
* -----------------------------------------
* 퍼블리싱 페이지에서만 사용합니다.
* 개발시 해당 스크립트는 제외 바랍니다. 
*/


$(document).ready(function() {
	upload();
});


//===================================
// E-mail 직접입력 폼 변경
function emailChange(){
	var $select = $('.form-email').find('select');
	var $input =  $select.next();

	$select.on('change', function() {
		if($select.val() == "direct") {
			$select.hide();
			$input.removeClass('d-n').focus();
		}else if(!$select.val() == "direct") {
			$select.show();
			$input.removeClass('d-n');
		}else {
			$input.addClass('d-n');
		}
		return false;
	});

	$input.on('focusout', function(){
		if($(this).val()) return false;
		$input.addClass('d-n');
		$select.show().focus().val('select').attr('selected", "selected');
		return false;
	});
}


//===================================
// phone 폼 변경
function phoneChange(){
	var $target = $('.form-number');

	$target.each(function(){
		var $select = $(this).find('.form-select select')
		var $domestic = $(this).find('.num-domestic')
		var $overseas = $(this).find('.num-overseas')

		$select.change(function() {
			if($select.val() == "overseas") {
				$domestic.hide();
				$overseas.show();
			}else {
				$domestic.show();
				$overseas.hide();
			}
			return false;
		});
	});
}


//===================================
//datepicker
$(document).ready(function($) {
	//년.월.일 표시
	$('.datepicker').datetimepicker({
		format: 'YYYY.MM.DD'
		, icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-chevron-up",
			down: "fa fa-chevron-down",
			previous: 'ui-previous',
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			today: 'fa fa-screenshot',
			clear: 'fa fa-trash',
			close: 'fa fa-remove'
		}
		, widgetPositioning: {
			horizontal: "auto",
			vertical: "auto"
		}
		// , viewMode: 'years'
		, focusOnShow : false // CSS 대체용 테스트
	});

	//년.월 표시
	$('.monthpicker').datetimepicker({
		format: 'YYYY.MM'
		, icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-chevron-up",
			down: "fa fa-chevron-down",
			previous: 'ui-previous',
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			today: 'fa fa-screenshot',
			clear: 'fa fa-trash',
			close: 'fa fa-remove'
		}
		, widgetPositioning: {
			horizontal: "auto",
			vertical: "auto"
		}
		, viewMode: 'years'
		, focusOnShow : false // CSS 대체용 테스트
	});
});

//===================================
// Upload
function upload(){
	$('.file_upload span.btn').bind('keypress keyup', function(e) {
	  if(e.which === 32 || e.which === 13){
		e.preventDefault();
		$(this).closest('.file_upload').find('.type_file').click();
	  }    
	});
	$('.file_upload .type_file').change(function(e) {
	  var filename = $(this).val().split('\\').pop();
	  if(filename.length>0)$(this).closest('.file_upload').find('.txt').val(filename).attr('placeholder', filename).focus();
	});
};



//===================================
//windowPop Test Function 
function openWPopup(_url, _width, _height){
	var options = 'width='+ _width +', height='+ _height +', resizable=no, status=no, menubar=no, toolbar=no';
	window.open(_url, "", options);
}
