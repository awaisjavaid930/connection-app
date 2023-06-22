<template>
  <div class="container">
    <div class="row">
      <h3>Suggestion Request List</h3>

      <table class="table table-striped table-bordered">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.email }}</td>
            <td><button class="btn btn-primary" @click="sendRequest(item.id)">Connect</button></td>
          </tr>
          <tr class="text-center">
              <td colspan="2"><button class="btn btn-primary float-center" @click="loadMore">Load More</button></td>
          </tr>
          
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SuggestionView',
  data() {
    return {
      items: [],
      page:1
    }
  },
  methods: {
    getItems() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.get(process.env.VUE_APP_API_URL + '/suggested-request?page='+this.page , config)
        .then(response => {
          this.items = response.data.data.data;
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadMore() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.get(process.env.VUE_APP_API_URL + '/suggested-request?page=' + ++this.page, config)
        .then(response => {
          
          this.items = this.items.concat(response.data.data.data);
        })
        .catch(error => {
          console.log(error)
        })
    },
    sendRequest(id) {

      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };

      axios.post(process.env.VUE_APP_API_URL + '/create-request', { receiver_id: id }, config)
        .then(response => {
          if (response.data.status == 201) {
            this.$router.push('/request/send')
          }
        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  mounted() {
    return this.getItems();    
  },
  
}
</script>