<template>
<scroll-view>
  <div class="root container">
    <div><img class="img" mode="aspectFill" @click="imgClick" :src="canteenInfo.picAdd?canteenInfo.picAdd:logoAdd" /></div>
    <div class="title" v-if="canteenInfo">{{canteenInfo.name}}</div>
    <div class="text" v-if="canteenInfo" v-html="canteenInfo.text"></div>
      <!-- <button class="fixed conf-btn" :class="{'conf-btn-hide':!reChoose}" @click="OnConfBtnClick">就去这了</button> -->
      <button class="fixed chs-btn" @click="GetCanteen()">{{mainBtn}}</button>
  </div>
</scroll-view>
</template>

<script>
import { logoAdd } from "../../utils/data";
import { GenerateSpot } from "../../utils/index";
export default {
  name: "choose",
  data() {
    return {
      mainBtn: "吃什么呢",
      logoAdd: logoAdd,
      canteenInfo: {}
    };
  },
  methods: {
    // OnConfBtnClick(){
    //   this.reChoose = false;
    //   this.mainBtn = "已确认";
    // },
    GetCanteen() {
      // if(this.mainBtn == "已确认"){
      //   return;
      //   setTimeout(()=>{
      //     this.logoAdd = logoAdd;
      //     this.mainBtn = "吃什么呢";
      //   },5*1000);
      // }
      // console.log("GetCanteen()");
      this.canteenInfo = GenerateSpot();
      if (this.canteenInfo == null) {
        this.canteenInfo = {
          text: "现在一家食堂都没有开哦～<br />不妨去 <b>随便逛逛</b> 选项卡看看吧！",
          picAdd: logoAdd
        };
      }else{
        this.mainBtn = "再来一次";
      }
      // this.reChoose = true;
    },
    imgClick() {
      wx.navigateTo({
        url: "/pages/comment/main?data=" + JSON.stringify(this.canteenInfo)
      });
    }
  },
  created() {
    // console.log("choose created");
  },
  onShow() {
    console.log("choose onshow");
  }
};
</script>

<style scoped>
.root {
  padding: 0.2rem 0;
  height: 100%;
}
.img {
  margin: 1rem 0 0 0;
  box-shadow: 0px 0px 20px -5px #333;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 6rem;
  height: 4rem;
}
.img-container img {
  border-radius: 10px;
}
.title {
  margin: 0.4rem 0;
  font-size: 0.6rem;
  color: #666;
}
.text {
  font-size: 0.4rem;
  color: #666;
  text-align: center;
}
button {
  font-size: 0.35rem;
}
.fixed {
  position: fixed;
}
.chs-btn {
  background-color: rgb(238, 136, 53);
  color: #fff;
  transition: all 0.3s ease;
  bottom: 0.5rem;
}
/* .rechs-btn {
} */
.conf-btn {
  border: 1px solid rgb(238, 136, 53);
  background-color: #fff;
  color: rgb(238, 136, 53);
  bottom: 1.6rem;
  transition: all 0.3s ease;
  opacity: 0.5;
}
.conf-btn-hide {
  bottom: 0.5rem;
  opacity: 0;
}
</style>


