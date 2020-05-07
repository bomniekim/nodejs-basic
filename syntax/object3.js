var v1 = 'v1';
// 1억줄 이상의 코드에 중간에 끼어들면 유지/보수가 불편 -> gruoping 필요 => 객체로 만들기
var v2 = 'v2';

var o = {
    v1:'v1',
    v2:'v2',
    f1:function (){
      console.log(this.v1);
      // 함수가 객체 안에서 사용될 때 자신이 속해있는 객체를 참조할 수 있는 약속된 키워드 : this
      // 객체는 값을 저장하는 그릇
    },
    f2:function(){
      console.log(this.v2);
    }
  }
   
  o.f1();
  o.f2();