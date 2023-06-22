<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="btn btn-outline-primary" to="/request/suggested">Suggestions</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="btn btn-outline-primary" to="/request/send">Send Request</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="btn btn-outline-primary" to="/request/received">Received Request</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="btn btn-outline-primary" to="/request/connection">Connections</router-link>
                        </li>
                        <li class="nav-item pull-right">
                            <button class="btn btn-danger" @click="logout">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'NavbarComponent',
    data() {
        return {

        }
    },
    methods: {
        logout() {
            localStorage.setItem('token',null)
            this.$router.push('/')
        }
    },
}
</script>