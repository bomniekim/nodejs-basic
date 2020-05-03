var fs = require('fs'); // file system
fs.readFile('sample.txt', 'utf8', function(err, data){
    console.log(data);
});