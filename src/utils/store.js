import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //store data
        tabList: [
            { text: "我要去吃", selected: false },
            { text: "随便逛逛", selected: true },
            { text: "我的信息", selected: false }
          ],
        curIndex: 1,
    },
    getters: {
        //methods
        tabList(state){
            return state.tabList;
        },
        curIndex(state){
            return state.curIndex;
        }
    },
    mutations: {
        //写法与getters相类似
        //组件想要对于vuex 中的数据进行的处理
        //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
        //内部操作必须在此刻完成(同步)
        SetCurIndex(state,_cur){
            if(_cur == state.curIndex) return;
            state.tabList[state.curIndex].selected = false;
            state.tabList[_cur].selected = true;
            state.curIndex = _cur;
        }
    }
});