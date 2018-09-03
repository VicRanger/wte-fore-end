function Obj2style(style){
    let str = [];
    Object.keys(style).forEach(key => {
      str.push(`${key}:${style[key]};`);
    });
    return str.join(";");
};
function addTimeText(obj) {
    let strs = obj.add_time.split(" ");
    strs[1] = strs[1].replace(/-/g, ":");
    obj.add_time_text = GetTimeOffsetText(new Date(strs));
  }
  function GetTimeOffsetText(date){
    let now = new Date();
    let time = now - date; 
    time/=1000;
    if(time<60){
      return "刚刚";
    }else if(time<60*60){
      return `${parseInt(time/60)}分钟前`
    }else if(time<60*60*24){
      if(date.getDay()!=now.getDay()){
        return '昨天';
      }else{
        return `${parseInt(time/60/60)}小时前`;
      }
    }else{
      return GetFormattedTimeText(date);
    }
  }
  
  function GetFormattedTimeText(date,type=0){
    let year = date.getFullYear();
    let month = Formatter(date.getMonth()+1);
    let day = Formatter(date.getDate());
    let hour = Formatter(date.getHours());
    let minute = Formatter(parseInt(date.getMinutes()));
    let second = Formatter(parseInt(date.getSeconds()));
    switch(type){
      case 0:
        return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
      case 1:
        return `${hour}:${minute}:${second}`;
    }
  }
  
  function Formatter(n){
    let str = n.toString();
    return n<=9?`0${n}`:`${n}`;
  }
  
  function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  }
export{
    Obj2style,
    addTimeText,
    GetTimeOffsetText,
    GetFormattedTimeText,
}