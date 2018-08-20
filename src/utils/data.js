export{
    logoAdd,
    name,
    ename,
    picAdd,
    timeTable,
    dayClose,
    picUrl
}
var picUrl = "https://static.wzz.moe/pic/"
// var logoAdd = 'https://wx3.sinaimg.cn/mw1024/63f5b29fly1fqmy19dz6gj20o40ciabk.jpg';
var logoAdd = picUrl + "logo.jpg";
var name = ["北一层", "北二层", "北三层", "北四层", "北五层", "南一层", "南二层", "南三层", "南四层", "南五层", "面包房", "烤冷面"];
var ename = ["n1", "n2", "n3", "n4", "n5", "s1", "s2", "s3", "s4", "s5", "mbf", "klm"];
var picAdd = [];
for(var i=0;i<ename.length;i++){
  picAdd.push(picUrl+ename[i]+".jpg");
}
// var picAdd = ["https://wx2.sinaimg.cn/mw1024/63f5b29fly1foqpqd9tcij21kw16onnk.jpg",
//   "https://wx3.sinaimg.cn/mw1024/63f5b29fly1foqpqdp0qij21kw16o1kx.jpg",
//   "https://wx4.sinaimg.cn/mw1024/63f5b29fly1foqpqd7rjhj21kw16o1kx.jpg",
//   "https://wx2.sinaimg.cn/mw1024/63f5b29fly1foqpqjgq7bj21kw16ohdy.jpg",
//   "https://wx1.sinaimg.cn/mw1024/63f5b29fly1foqpqee5j2j21kw1bb7og.jpg",
//   "https://wx4.sinaimg.cn/mw1024/63f5b29fly1foqpqw9f07j21kw16o4j0.jpg",
//   "https://wx2.sinaimg.cn/mw1024/63f5b29fly1foqpqecwugj21kw1ax1kx.jpg",
//   "https://wx2.sinaimg.cn/mw1024/63f5b29fly1foqpqf6x2rj21kw16o7wh.jpg",
//   "https://wx3.sinaimg.cn/mw1024/63f5b29fly1foqpqgwj3aj21kw16oe84.jpg",
//   "https://wx1.sinaimg.cn/mw1024/63f5b29fly1foqpqxpe85j21kw16onpg.jpg",
//   "https://wx3.sinaimg.cn/mw1024/63f5b29fly1foqpqeml5sj21kw16o4qp.jpg",
//   "https://wx4.sinaimg.cn/mw1024/63f5b29fly1fqdnj2aazkj21kw16oe82.jpg"
// ];
var timeTable = [
  [{ s: { h: 6, m: 30 }, e: { h: 20, m: 0 } }],   //n1
  [{ s: { h: 6, m: 30 }, e: { h: 8, m: 0 } }, { s: { h: 11, m: 0 }, e: { h: 12, m: 30 } }, { s: { h: 17, m: 0 }, e: { h: 18, m: 0 } }], //n2
  [{ s: { h: 11, m: 0 }, e: { h: 12, m: 30 } }, { s: { h: 17, m: 0 }, e: { h: 18, m: 0 } }],   //n3
  [{ s: { h: 10, m: 30 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 0 } }],   //n4
  [{ s: { h: 10, m: 30 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 0 } }],   //n5
  [{ s: { h: 6, m: 30 }, e: { h: 20, m: 30 } }],   //s1
  [{ s: { h: 6, m: 30 }, e: { h: 9, m: 0 } }, { s: { h: 11, m: 0 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 0 }, e: { h: 19, m: 0 } }], //s2
  [{ s: { h: 11, m: 0 }, e: { h: 13, m: 0 } }, { s: { h: 16, m: 0 }, e: { h: 19, m: 0 } }],   //s3
  [{ s: { h: 10, m: 0 }, e: { h: 13, m: 20 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 20 } }],   //s4
  [{ s: { h: 10, m: 0 }, e: { h: 13, m: 20 } }, { s: { h: 16, m: 30 }, e: { h: 20, m: 20 } }],   //s5
  [{ s: { h: 6, m: 30 }, e: { h: 21, m: 0 } }],   //br
  [{ s: { h: 6, m: 30 }, e: { h: 21, m: 0 } }]    //cn
];
var dayClose = {
  "s3": [6, 0]
};