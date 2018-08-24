console.log("Import utils/index.js");
import {
    name,
    ename,
    picUrl,
    timeTable,
    closeDay,
    canteenCount
} from "./data";
var debugText = "";
var canteenInfos = new Array();
var canteenOpenedInfos = new Array();
var randomIndex = -1;
var canteenInfo = function (id, name, ename, isOpen, isClosed, openTimeSeq) {
  this.isOpen = isOpen;
  this.isClosed = isClosed;
  if (!this.Closed) {
    this.openTimeSeq = openTimeSeq;
  } else {
    this.openTimeSeq = null;
  }
  this.name = name;
  this.ename = ename;
  this.id = id;
  this.picUrl = picUrl[id];
  this.text = GetTimeLeftText(this);
}
// var canteenCount = name.length;

function GetSortedCanteenInfos(){
  GetAllInfo();
  Sort();
  return canteenInfos;
}
function comp(a,b){
  if(a.isOpen){
    return true;
  }
}
function Sort(){
  // console.log("sort");
  for(var i=0;i<canteenInfos.length;i++){
    for(var j=i+1;j<canteenInfos.length;j++){
      if(!comp(canteenInfos[i],canteenInfos[j])){
        // console.log(i, j, canteenInfos[i].id, canteenInfos[j].id);
        var data = canteenInfos[i];
        canteenInfos[i] = canteenInfos[j];
        canteenInfos[j] = data;
        // console.log(i, j, canteenInfos[i].id, canteenInfos[j].id);
      }
    }
  }
}

function GetAllInfo() {
  canteenInfos = [];
  for (var i = 0; i < canteenCount; i++) {
    let item = GetCanteenInfo(i)
    canteenInfos.push(item);
    if(item.isOpen){
      canteenOpenedInfos.push(item);
    }
  }
  // console.log(canteenInfos);
}

function GenerateSpot() {
  GetAllInfo();
  randomIndex = parseInt(Math.random() * canteenOpenedInfos.length);
  if(canteenOpenedInfos.length<=0){
    return null;
  }else{
    return canteenOpenedInfos[randomIndex];
  }
}
function TransToMins(h, m) {
  return h * 60 + m;
}
function oTransToMins(o) {
  return o.h * 60 + o.m;
}
function TransToObj(mins) {
  let h = parseInt(mins / 60);
  let m = mins - h * 60;
  return { h: h, m: m };
}
function TransToString(x) {
  return (x < 10 ? "0" : "") + x;
}
function GetCanteenInfo(index) {
  var time = new Date();
  var hours = time.getHours();
  var mins = time.getMinutes();
  var curMins = TransToMins(hours, mins);
  var isClosed = false;
  var isOpen = false;
  var timeSeq = { s: {}, e: {} };
  var seq = timeTable[index];
  // console.log(seq);
  
  if (ename[index] in closeDay) {
    // console.log(ename[index] + " " + closeDay[ename[index]] + " " + new Date().getDay());
    if (closeDay[ename[index]].indexOf(new Date().getDay()) > -1) {
      return new canteenInfo(index, name[index], ename[index], isOpen = false, isClosed = true, timeSeq);
    }
  }
  for (var i = 0; i < seq.length; i++) {
    var sMins = oTransToMins(seq[i].s);
    var eMins = oTransToMins(seq[i].e);
    if (curMins < sMins) {
      isOpen = false;
      isClosed = false;
      timeSeq.s = seq[i].s;
      timeSeq.e = seq[i].e;
      // console.log("before start", isOpen, isClosed);
      return new canteenInfo(index, name[index], ename[index], isOpen, isClosed, timeSeq);
    }
    if (curMins < eMins) {
      isOpen = true;
      isClosed = false;
      timeSeq.s = seq[i].s;
      timeSeq.e = seq[i].e;
      // console.log("before end");
      return new canteenInfo(index, name[index], ename[index], isOpen, isClosed, timeSeq);
    }
  }
  isOpen = false;
  isClosed = true;
  return new canteenInfo(index, name[index], ename[index], isOpen, isClosed, null);
}
function GetTimeLeftText(obj) {
  var ret = "出错了:(";
  var time = new Date();
  var hours = time.getHours();
  var mins = time.getMinutes();
  var curMins = TransToMins(hours, mins);
  var info = obj;
  var index = obj.id;
  debugText += hours + ":" + mins + " " + curMins + "\n";
  if (ename[index] in closeDay) {
    console.log(ename[index] + " " + closeDay[ename[index]] + " " + new Date().getDay());
    if (closeDay[ename[index]].indexOf(new Date().getDay()) > -1) {
      ret = "这个食堂今天不营业呢！";
      return ret;
    }
  }
  if (info.isClosed) {
    ret = "今天不会再开门了哦";
    if (curMins > TransToMins(20, 0)) {
      ret = "现在很晚了<br />" + ret;
    }
    return ret;
  }
  var sMins = oTransToMins(info.openTimeSeq.s);
  var eMins = oTransToMins(info.openTimeSeq.e);
  debugText += sMins + " " + eMins + "\n";
  if (info.isOpen) {
    ret = "开放中...";
    if (eMins - curMins < 30) {
      ret += "距离关门还有" + (eMins - curMins) + "分钟";
    }
    return ret;
  }
  if (!info.isOpen && !info.isClosed) {
    if (sMins - curMins < 30) {
      ret = "距离食堂开门还有" + (sMins - curMins) + "分钟";
    } else {
      ret = "还没开呢~";
      let obj = TransToObj(sMins);
      ret += "<br />下次会在" + TransToString(obj.h) + ":" + TransToString(obj.m) + "开放。";
    }
    return ret;
  }
  return ret;
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

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export {
  GenerateSpot,
  GetSortedCanteenInfos,
  GetTimeOffsetText,
  GetFormattedTimeText
}