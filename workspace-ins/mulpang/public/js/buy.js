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
	
}

// 구매수량 수정시 결제가격 계산
function setPriceEvent(){
	
}