var fs = require('fs'); // 파일 시스템 모듈 불러오기

/*
// readFileSync : 동기식
console.log('a');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('c'); 

// 결과: a B c */

console.log('a');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
}); // 비동기식 선호 
console.log('c');
// 결과: a c B
