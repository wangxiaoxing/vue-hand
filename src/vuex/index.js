import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
    count:1,
    obj:{
        message:'input的初始值'
    }
}


const mutations={
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    },
    updateMessage(state,value){
        state.obj.message=value;
        console.log('我已经修改了state的值了');
    }
}

const getters={
    //类似于计算属性
    count:function(state){
        return state.count+=100;
    }
}

const actions={
    
    addAction(context){
        setTimeout(()=>{
            context.commit('add',10)
        },3000);
        console.log('我比add提前执行');
    },
    reduceAction({commit}){
        commit('reduce')
    }
}

const moduleA={
    state,mutations,getters,actions
}

export default new Vuex.Store({
    modules:{a:moduleA}
})
