<template>
  <div class="container">
    <h3>Mutual Connections List</h3>
    <div class="row">
      <table class="table table-striped table-bordered">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.email }}</td>
              <td><button class="btn btn-outline-primary">Connect</button></td>
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
      items: []
    }
  },
  methods: {
    getItems() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };
      axios.get(process.env.VUE_APP_API_URL + '/suggested-request', config)
        .then(response => {
          this.items = response.data.data;
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