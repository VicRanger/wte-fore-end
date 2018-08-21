export{
    logoAdd,
    name,
    ename,
    picAdd,
    timeTable,
    canteenCount,
    closeDay,
    picUrl,
    LoadData
}
var picUrl = "https://static.wzz.moe/pic/"
var logoAdd = picUrl + "logo.jpg";
var name = [];
var ename = [];
var picAdd = [];
var canteenCount = 0;
var timeTable = [];
var closeDay = [];
// var timeTable = [
//   [{ s: { h: 6, m: 30 }, e: { h: 20, m: 0 } }],   //n1
//   [{ s: { h: 6, m: 30 }, e: { h: 8, m: 0 } }, { s: { h: 11, m: 0 }, e: { h: 12, m: 30 } }, { s: { h: 17, m: 0 }, e: { h: 18, m: 0 } }], //n2
//   [{ s: { h: 11, m: 0 }, e: { h: 12, m: 30 } }, { s: { h: 17, m: 0 }, e: { h: 18, m: 0 } }],   //n3
//   [{ s: { h: 10, m: 30 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 0 } }],   //n4
//   [{ s: { h: 10, m: 30 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 0 } }],   //n5
//   [{ s: { h: 6, m: 30 }, e: { h: 20, m: 30 } }],   //s1
//   [{ s: { h: 6, m: 30 }, e: { h: 9, m: 0 } }, { s: { h: 11, m: 0 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 0 }, e: { h: 19, m: 0 } }], //s2
//   [{ s: { h: 11, m: 0 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 0 }, e: { h: 19, m: 0 } }],   //s3
//   [{ s: { h: 10, m: 0 }, e: { h: 13, m: 20 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 20 } }],   //s4
//   [{ s: { h: 10, m: 0 }, e: { h: 13, m: 20 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 20 } }],   //s5
//   [{ s: { h: 6, m: 30 }, e: { h: 21, m: 0 } }],   //br
//   [{ s: { h: 6, m: 30 }, e: { h: 21, m: 0 } }]    //cn
// ];
// var closeDay = {
//   "s3": [6, 0]
// };
function LoadData(data){
  canteenCount = data.canteen.length;
  for(let i=0;i<canteenCount;i++){
    let item = data.canteen[i];
    ename.push(item.ename);
    name.push(item.name);
    picAdd.push(item.pic_url);
    // console.log(item.timetable);
    timeTable.push(item.timetable);
    closeDay.push(item.closeDay);
  }
  console.log(timeTable);  
  console.log(ename);  
}