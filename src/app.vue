<template>
  <div id="app">
      <h1>{{msg}}</h1>
      <cp1></cp1>
      <h1>静态资源路径测试</h1>
      <img src="./assets/logo.png">
      <h1>vuex测试</h1>
      <h2>store中的信息：{{$store.state.a.obj.message}}</h2>
      <h1>router测试</h1>
      <router-link to="/cp1">显示子组件</router-link>
      <router-view></router-view>
      <h1>axios+mockjs测试</h1>
      <button @click="axios2">发送get请求，控制台查看效果</button>
      <h1>mintUI测试</h1>
      <mt-button type="default">default</mt-button>
      <h1>zepto测试</h1>
      <button @click="testZepto">点击后查看控制台</button>
  </div>
</template>

<script>
import cp1 from "./componets/cp1"
export default {
  components:{
      cp1:cp1
  },
  props:{},
  data(){
    return {
        msg:'手动搭建vue项目'
    }
  },
  watch:{},
  computed:{},
  methods:{
     testZepto(){
        console.log($('#app'));
     },
     //post请求用data,默认提交是application/json编码方式，传递到后台的将是序列化后的json字符串 
      axios1(){
          this.$axios({
              method:'post',
              url:'/user1',
              data:{
                  firstName:'ths',
                  lastName:'the'
              }
          })
           .then(function(response){
              console.log(response);
          })
          .catch(function(response){
              console.log(response);
          });
          
      },
      //get请求用params
      axios2(){
          this.$axios({
              method:'get',
              url:'/user1',
              params:{
                  // ID:123
              },
          })
           .then(function(response){
              console.log(response);
              console.log(JSON.stringify(response.data, null, 4));
          })
          .catch(function(response){
              console.log(response);
          });
          
      }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>
