<template>
    <div :class="isShow?'show':'hide'" v-show="isDisplay" class="content-root">
        <!-- <div class="dis-tab"><span>所有评论({{commentList.length}})</span></div> -->
        <comment-list :commentList.sync="commentList"></comment-list>
        <load-screen ref="loadScreenRef"></load-screen>
        <comment-smt></comment-smt>
    </div>
</template>

<script>
import fly from "../../../utils/fly.js";
import commentList from "../comment-list";
import commentSmt from "../comment-smt";
import loadScreen from "../../load-screen";
import { GetTimeOffsetText, GetFormattedTimeText } from "../../../utils/tool";
export default {
  name: "comment",
  data() {
    return {
      isShow: false,
      isDisplay: false,
      isLoadComplete: false,
      commentList: []
    };
  },
  components: {
    commentList: commentList,
    commentSmt: commentSmt,
    loadScreen: loadScreen
  },
  methods: {
    AddComment(com) {
      this.commentList.splice(0, 0, com);
    },
    GetComments() {
      getComments(this);
    },
    Hide() {
      this.isShow = false;
      setTimeout(() => {
        this.isDisplay = false;
      }, 100);
    },
    Show() {
      this.isDisplay = true;
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    }
  },
  onUnload() {
    this.commentList = [];
  }
};
function getComments(vue) {
  let userID = wx.getStorageSync("userID") || {};
  // console.log(vue.canteen);
  fly
    .get("comment_list/", {
      canteen_ename: vue.$root.$mp.query.canteen_ename,
      user_openid: userID ? userID.openid : ""
    })
    .then(res => {
      vue.commentList = [];
      for (var i = 0; i < res.data.length; i++) {
        addTimeText(res.data[i]);
        vue.commentList.splice(0, 0, res.data[i]);
      }
      var compare = function(x, y) {
        if (x.up_count > y.up_count) {
          return -1;
        } else if (x.up_count < y.up_count) {
          return 1;
        } else {
          return 0;
        }
      };
      vue.commentList.sort(compare);
      vue.$refs.loadScreenRef.OnLoadComplete();
    })
    .catch(err => {
      console.log(err);
      vue.commentList = [];
      vue.$refs.loadScreenRef.OnLoadComplete();
    });
}
function addTimeText(obj) {
  let strs = obj.add_time.split(" ");
  strs[1] = strs[1].replace(/-/g, ":");
  obj.add_time_text = GetTimeOffsetText(new Date(strs));
}
</script>

<style lang="scss" scoped>
.show {
  opacity: 1;
  top: 0rem;
}
.hide {
  opacity: 0;
  top: 1rem;
}
.dis-tab {
  border-left: 5px solid rgb(238, 136, 53);
  padding: 8px 0 8px 10px;
  text-align: left;
  font-size: 0.4rem;
  background-color: #fff;
}
</style>
