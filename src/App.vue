<script>
import { Login, GetUserInfo, GetData } from "./utils/server.js";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    console.log("app created and cache logs by setStorageSync");
  },
  methods: {},
  onLaunch() {
    console.log("app onlaunch");
    let userInfo = wx.getStorageSync("userInfo") || {};
    let userID = wx.getStorageSync("userID") || {};
    Login();
    GetUserInfo();
    GetData();
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
  box-sizing: border-box;
}
@keyframes rotate_pacman_half_up {
  0% {
    transform: rotate(270deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

@keyframes rotate_pacman_half_down {
  0% {
    transform: rotate(90deg);
  }

  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(90deg);
  }
}

@keyframes pacman-balls-1 {
  62%{
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-70px, -6.25px);
  }
}
@keyframes pacman-balls-2 {
  58%{
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-75px, -6.25px);
  }
}


.pacman {
  position: relative;
}
.pacman > div:nth-child(3) {
  animation: pacman-balls-1 1s 0.05s infinite ease-out;
}
.pacman > div:nth-child(4) {
  animation: pacman-balls-2 1s 0.32s infinite ease-out;
}
.pacman > div:first-of-type {
  width: 0px;
  height: 0px;
  border-right: 20px solid transparent;
  border-top: 20px solid rgb(238, 136, 53);
  border-left: 20px solid rgb(238, 136, 53);
  border-bottom: 20px solid rgb(238, 136, 53);
  border-radius: 20px;
  animation: rotate_pacman_half_up 1s 0s infinite;
}
.pacman > div:nth-child(2) {
  width: 0px;
  height: 0px;
  border-right: 20px solid transparent;
  border-top: 20px solid rgb(238, 136, 53);
  border-left: 20px solid rgb(238, 136, 53);
  border-bottom: 20px solid rgb(238, 136, 53);
  border-radius: 20px;
  animation: rotate_pacman_half_down 1s 0s infinite;
  margin-top: -40px;
}
.pacman > div:nth-child(3),
.pacman > div:nth-child(4){
  /* background-color: rgb(238, 136, 53); */
  color: rgb(238, 136, 53);
  border-radius: 100%;
  margin: 2px;
  width: 10px;
  height: 10px;
  position: absolute;
  transform: translate(0, -6.25px);
  top: 20px;
  left: 75px;
  font-weight: bolder;
  font-size:0.18rem;
}
</style>
