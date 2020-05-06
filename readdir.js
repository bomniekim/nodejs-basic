var testFolder = './data';
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
  // 파일의 목록을 배열의 형식으로 만들어서 전달
})