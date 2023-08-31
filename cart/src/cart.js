let cart ={
    totalPrice: 0,
    delCheckedItem: function(){
        document.querySelectorAll("input[name=buy]:checked").forEach(function (item) {
            item.parentElement.parentElement.remove();
        });
        //AJAX 서버 업데이트 전송
    
        //전송 처리 결과가 성공이면
        this.reCalc();
        this.updateUI();
    },
    //장바구니 전체 비우기
    delAllItem: function(){
        document.querySelectorAll('.rowdata').forEach(function (item) {
            item.remove();
          });
          //AJAX 서버 업데이트 전송
        
          //전송 처리 결과가 성공이면
          this.totalPrice = 0;
          this.reCalc();
          this.updateUI();
    },
    //재계산
    reCalc: function(){
        this.totalPrice = 0;
        document.querySelectorAll(".p_price").forEach(function (item) {
            if(item.parentElement.parentElement.firstElementChild.firstElementChild.checked == true){
                var price = item.getAttribute('value');
                price = Number(price);
                this.totalPrice += price;
            }
        }, this);
    },
    //화면 업데이트
    updateUI: function () {
        document.querySelector('#sum_p_price').textContent = this.totalPrice.formatNumber() + '원';
    },
    checkItem: function(){
        this.reCalc();
        this.updateUI();
    },
    delItem: function () {
        event.target.parentElement.parentElement.remove();
        this.reCalc();
        this.updateUI();
    }
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};