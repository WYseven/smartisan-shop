<template>
  <div>
    <h2>注册页面</h2>
    <p>用户名：<input type="text" v-model="username" /></p>
    <p>密码：<input type="password" v-model="password" /></p>
    <p><input type="button" @click="registerMethods" value="注册" /></p>
  </div>
</template>
<script>
  import {register} from '@/api/user'
  export default {
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods:{
      registerMethods(){
        register({
          username: this.username,
          password: this.username
        }).then(({data}) => {
          console.log(data)
        })
      }
    }
  }
</script>
