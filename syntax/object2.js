// JS에서 함수는 값이다
// 처리 방법들을 담고 있는 구문이면서 동시에 값이 될 수 있다. 
var f = function(){
    console.log(1+1);
    console.log(1+2);
    console.log(1+3);
}
// console.log(f);
// f();

var a = [f];
a[0]; // 배열의 원소로써 함수가 존재할 수 있다. 

var o = {
    func:f // 객체의 데이터로써 함수가 존재할 수 있다. 
  }
  o.func();

// var a = if(true){console.log(1);}
// var b = while(true){console.log(1);}