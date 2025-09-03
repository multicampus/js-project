$(function(){
	setCancelEvent();
	setBuyEvent();
	setPriceEvent();	
});

// 취소 버튼 클릭
function setCancelEvent(){
	$('form button[type=reset]').on('click', function(){
    window.history.back();
  });
}

// 구매 버튼 클릭
function setBuyEvent(){
	$('.detail form').on('submit', function(event){
    event.preventDefault(); // submit 기본 동작 취소
    const body = $(this).serialize(); // form의 입력 요소 값을 query string으로 변환
    console.log(body);
    const result = $.post('/purchase', body);
    if(result.errors){
      alert(result.errors.message);
    }else{
      alert('쿠폰 구매가 완료 되었습니다.');
      location.href = '/';
    }
  });
}

// 구매수량 수정시 결제가격 계산
function setPriceEvent(){
	$('.detail form input[name=quantity]').on('input', function(){
    $('form output').text($(this).val() * $('form input[name=unitPrice]').val());
  });
}