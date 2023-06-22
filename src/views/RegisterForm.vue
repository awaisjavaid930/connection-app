<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Register Form</h1>
            <form v-on:submit.prevent="register">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" v-model="formData.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" v-model="formData.password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <router-link to="/" class="btn btn-primary mx-2">Sign In</router-link>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'RegisterForm',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
            }
        }
    },
    methods: {
        register(e)
        {
            e.preventDefault();
            axios.post(process.env.VUE_APP_API_URL +'/register' , this.formData)
                .then(response => {
                    if (response.data.status == 201) {
                        this.$router.push("/");   
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
}
</script>