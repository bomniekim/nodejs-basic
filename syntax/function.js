f123();
console.log('A');
console.log('Z');
console.log('B');
f123();
console.log('F');
console.log('C');
console.log('P');
console.log('J');
f123();
console.log('U');
console.log('A');
console.log('Z');
console.log('J');
console.log('I');
f123();
 
function f123(){
  console.log(1);
  console.log(2);
  console.log(3);
  console.log(4);
}


console.log(Math.round(1.6)); //2
console.log(Math.round(1.4)); //1
 
function sum(first, second){ // parameter
  console.log(first+second);
}
 
sum(2,4); // argument 인자: 입력받은 값


function sumR(first, second){ // parameter
    return first+second; // return: 출력과 종료를 동시에 
    // 출력 값(return)을 통해서 보다 가치있는 부품으로서 함수를 만드는 방법!
    // 출력 값을 다양한 방법으로 사용할 수 있도록..!
  }
   
  sumR(2,4); // argument 인자: 입력받은 값