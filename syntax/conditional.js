var args = process.argv;
console.log(args[2]); // 콘솔로 입력한 입력값 표시 

// args[0] : nodejs의 런타임의 위치
// args[1] : 실행 파일의 경로


console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');