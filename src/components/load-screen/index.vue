<template>
    <div v-if="!isFadeOutComplete" class="float-container curtain">
      <div class="pacman" :class="{'pacman-fit':isLoadComplete}">
        <div></div>
          <div></div>
          <div>502</div>
          <div>404</div>
      </div>
    </div>
</template>
<script>
export default {
  name: "load-screen",
  data() {
    return {
      isLoadComplete: false,
      isFadeOutComplete: false,
    };
  },
  methods: {
    OnLoadComplete() {
      setTimeout(()=>{
        this.isLoadComplete = true;
        setTimeout(()=>{
          this.isFadeOutComplete = true;
        },300);
      }, 500);
    },
  },
  onUnload(){
    this.isLoadComplete = false;
    this.isFadeOutComplete = false;
    // console.log("display/load-screen onUnload");
  }
};
</script>
<style scoped>
.curtain{
  /* background-color:#eee; */
  background-color:transparent;
}
.pacman-fit{
  transition: opacity 0.3s ease-in;
  opacity: 0;
}
</style>
