<template>
<div>
  <swiper class="swiper-container" :current="curTab" :style="'height:'+swiperHeight" @change="tabChange">
      <swiper-item><choose></choose></swiper-item>
      <swiper-item><listall></listall></swiper-item>
      <swiper-item><myinfo></myinfo></swiper-item>
</swiper>
<slider-nav :currentTab.sync="curTab" :winWidth="winWidth"></slider-nav>
</div>
</template>
<script>
import choose from "../../components/choose";
import listall from "../../components/listall";
import sliderNav from "../../components/slider-nav";
import myinfo from "../../components/myinfo";
import wxp from "minapp-api-promise";
import { GenerateSpot } from "../../utils/index";
export default {
  name : "index",
  data() {
      return{
          curTab:0,
          winWidth:0,
          winHeight:0
      }
  },
  components:{
      choose:choose,
      listall:listall,
      sliderNav:sliderNav,
      myinfo:myinfo
  },
  computed:{
      swiperHeight(){
        console.log(this.winHeight);
        return this.winHeight-66+parseInt((1-this.winHeight/800)*15)+'px';
      }
  },
  methods:{
      tabChange(e){
        this.curTab = e.target.current;
      }
  },
  async onLoad(){
      let info = await wxp.getSystemInfo();
      this.winWidth = info.windowWidth;
      this.winHeight = info.windowHeight;
      console.log(parseInt((this.winHeight/800)*10));
  }
};
</script>
<style scoped>
.swiper-container {
    margin: 0;
    padding: 0;
    display: block;
}
</style>
