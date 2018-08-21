<template>
<scroll-view>
  <div class="root">
    <div class="avator-dec">
      <!-- <img class="avator-bg" mode="aspectFill" :src="logoAdd" /> -->
      <img class="avator" mode="aspectFill" :src="userInfo.avatar_url" />
    </div>
    <div class="login-info">
      <div v-if="userInfo.loginStatus" class="info-nickname">{{userInfo.nickname}}</div>
      <button v-else class="login-btn" open-type='getUserInfo' @click="getClick">获取授权并登陆</button>
      <div class="info-status">登陆状态: {{userInfo.loginStatusText}}</div>
    </div>
    <div class="opt-tab">
      <div class="opt"><div class="opt-title">我的帖子</div><div>（未开放）</div></div>
      <div class="opt"><div class="opt-title">签到</div><div>（未开放）</div></div>
      <div class="opt"><div class="opt-title">意见反馈</div><div>（未开放）</div></div>
    </div>
  </div>
</scroll-view>
</template>

<script>
import { logoAdd } from "../../utils/data";
import { Login, GetUserInfo, UserReg, CheckUser } from "../../utils/server";
import fly from "../../utils/fly";
export default {
  name: "myinfo",
  data() {
    return {
      logoAdd: logoAdd,
      userInfo: {
        avatar_url: logoAdd,
        nickname: "获取中...",
        loginStatusText: "登陆中...",
        loginStatus : false,
      }
    };
  },
  methods: {
    getClick() {
      Login();
      GetUserInfo();
      this.userInfo.nickname = "获取中";
      this.userInfo.loginStatusText = "重新登陆中";
      setTimeout(Init, 3000, this);
    }
  },
  created() {
    setTimeout(Init, 3000, this);
  }
};
function Init(vue) {
  UpdateInfo(vue);
}
async function UpdateInfo(vue) {
  wx.setStorageSync("loginStatus", { status: 0 });
  let userInfo = wx.getStorageSync("userInfo") || {};
  let userID = wx.getStorageSync("userID") || {};
  if (Object.keys(userInfo).length == 0) {
    console.log("userInfo required in UpdateInfo. Abort...");
    vue.userInfo.nickname = "信息获取失败，请点击下方按钮重新获取";
    return;
  } else {
    vue.userInfo.avatar_url = userInfo.avatar_url;
    vue.userInfo.nickname = userInfo.nickname;
  }
  if (Object.keys(userID).length == 0) {
    console.log("userID required in UpdateInfo. Abort...");
    vue.userInfo.nickname = "OpenID获取失败，请点击下方按钮重新获取";
    return;
  }
  await fly
    .post("user/", {
      openid: userID.openid,
      avatar_url: userInfo.avatar_url,
      nickname: userInfo.nickname,
      code: userID.code,
      language: userInfo.language,
      gender: userInfo.gender,
      country: userInfo.country,
      city: userInfo.city,
      province: userInfo.province
    })
    .then(res => {
      console.log(res);
      if ("msg" in res) {
        vue.userInfo.loginStatusText = "登陆成功";
        vue.userInfo.loginStatus = true;
        wx.setStorageSync("loginStatus", { status: 1, pk: res.pk });
      } else {
        vue.userInfo.loginStatusText = "未登陆(成功获取OPENID)";
      }
    })
    .catch(err => {
      vue.userInfo.loginStatusText = "未登陆(服务器连接失败)";
    });
}
</script>

<style scoped>
.opt-tab{
  height: 100%;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 8px -3px #000 inset;
}
.opt{
  display: flex;
  margin: 0.1rem 0 0 0;
  width: 100%;
  background-color: #fff;
  padding: 0.2rem 0;
  font-size: 0.3rem;
  box-shadow: 0px 0px 8px -3px #000;
  /* border-radius: 0.3rem; */
}
.opt:last-child{
  margin-bottom: 0.1rem;
}
.opt-title{
  margin-left: 0.5rem;
}
.avator-dec {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 2.4rem;
}
.avator-bg {
  width: 100%;
  filter: blur(3px);
}
.avator {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 2px solid #ccc;
  box-shadow: 0 -2px 20px -5px #000;
  position: absolute;
  top: 0.5rem;
}
.login-info {
  margin: 0.75rem 0 0.4rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}
.info-nickname {
  color: #333;
  font-size: 0.5rem;
}
.info-status {
  font-size: 0.2rem;
  color: #999;
}
.login-btn {
  margin: 0.1rem 0;
  font-size: 0.3rem;
  background-color: rgb(238, 136, 53);
  color: #fff;
  /* transition: all 0.3s ease; */
}
</style>

