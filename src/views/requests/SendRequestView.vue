<template>
  <div class="container">
    <div class="row">
      <h3>Send Request List</h3>

      <table class="table table-striped table-bordered">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.user.email }}</td>
            <td><button class="btn btn-danger" @click="withdrawRequest(item.id)">Withdraw Request</button></td>
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
      axios.get(process.env.VUE_APP_API_URL + '/send-request', config)
        .then(response => {
          this.items = response.data.data;
        })
        .catch(error => {
          console.log(error)
        })
    },
    withdrawRequest(id) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };

      axios.post(process.env.VUE_APP_API_URL + '/withdraw-request', { request_id: id }, config)
        .then(response => {
          if (response.data.status == 201) {
            this.$nextTick(() => {
              this.getItems()
            });
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