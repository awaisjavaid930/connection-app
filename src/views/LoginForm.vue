<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center">Login Form</h1>
      <form v-on:submit.prevent="login">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" v-model="formData.password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
        <router-link to="/register" class="btn btn-primary mx-2">Sign Up</router-link>
      </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginForm',
  data() {
    return {
      formData : {
        email : '',
        password: ''
      }
    }
  },
  methods: {
    login()
    {
      axios.post(process.env.VUE_APP_API_URL+'/login' , this.formData)
        .then(response => {
          if (response.data.status == 201) {
            localStorage.setItem('token',response.data.data.token)
            this.$router.push("/request/suggested"); 
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
}
</script>
