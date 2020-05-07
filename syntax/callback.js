// function a(){
//     console.log('hi');
// }

var a = function(){ // 익명함수 - JS에서는 함수도 값이다 
    console.log('hi');
} 

//a();
// a가 담고 있는 값인 함수를 호출 

function slowfunc(callback){
    callback();
}

slowfunc(a);

// 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있다.