<script>
import {Login,UserReg,GetUserInfo} from "./utils/server.js";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    console.log("app created and cache logs by setStorageSync");
  },
  methods:{
  },
  onLaunch() {
    console.log("app onlaunch");
    let userInfo = wx.getStorageSync("userInfo") || {};
    let userID = wx.getStorageSync("userID") || {};
    console.log('userInfo: ');
    console.log(userInfo);
    console.log('userID: ');
    console.log(userID);
    // if(Object.keys(userID).length == 0){
      Login();
    // }
    // if(Object.keys(userInfo).length == 0){
      GetUserInfo();
    console.log('after userInfo: ');
    console.log(userInfo);
    console.log('after userID: ');
    console.log(userID);
    // } 
  }
};
</script>
<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
