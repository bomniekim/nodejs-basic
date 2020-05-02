var name = 'bomin';
var letter = 'Dear '+name+'\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. '+name+'Quidem commodi fuga consectetur ea facilis ullam, libero quas culpa minima iste, veniam obcaecati laudantium possimus'+name+' dolores quibusdam quisquam nesciunt ab voluptas.'+name;

var letter = `Dear ${name}

Lorem ipsum, dolor sit amet consectetur adipisicing elit. ${name}Quidem commodi fuga consectetur ea facilis ullam, libero quas culpa minima iste, ${1+1} veniam obcaecati laudantium possimus ${name} dolores quibusdam quisquam nesciunt ab voluptas. ${name}`;
// `: 그레이브 액센트를 이용한 template literals (ES6에 새롭게 도입됨)
// ${}: 문자열 인터폴레이션 (String Interpolation): 문자열로 강제 타입 변환

console.log(letter);