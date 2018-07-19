<template>
  <div class="wrapper">
      <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        msg:"我是子组件的内容"
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>
