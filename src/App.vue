<script>
import { Login, GetUserInfo, GetData } from "./utils/server.js";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    // console.log("app created and cache logs by setStorageSync");
  },
  methods: {},
  onLaunch() {
    // console.log("app onlaunch");
    let userInfo = wx.getStorageSync("userInfo") || {};
    let userID = wx.getStorageSync("userID") || {};
    Login();
    GetUserInfo();
    GetData();
  }
};
</script>
<style lang="scss">
*{
  font-size: 0.4rem;
}
$theme-color: rgb(238, 136, 53);
.show {
  opacity: 1;
}
.hide {
  opacity: 0;
}
.content-root{
  position: absolute;
  width: 100%;
  transition: all 0.1s;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.float-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
}
@keyframes rotate_pacman_half_up {
  0% {
    transform: rotate(270deg);
  }

  40% {
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

  40% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(90deg);
  }
}

@keyframes pacman-balls {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
    transform: translate(-60px, 0);
  }
  51% {
    opacity: 0;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
  }
}

.pacman {
  position: relative;
}
.pacman > div:nth-child(3) {
  animation: pacman-balls 2s 0s infinite ease-out;
}
.pacman > div:nth-child(4) {
  animation: pacman-balls 2s 1s infinite ease-out;
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
.pacman > div:nth-child(4) {
  /* background-color: rgb(238, 136, 53); */
  color: rgb(238, 136, 53);
  border-radius: 100%;
  margin: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 10px;
  left: 60px;
  font-weight: bolder;
  font-size: 0.25rem;
  opacity: 0;
}
</style>
