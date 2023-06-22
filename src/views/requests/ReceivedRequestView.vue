<template>
  <div class="container">
    <div class="row">
      <h3>Received Connections List</h3>

      <table class="table table-striped table-bordered">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.sender.email }}</td>
            <td><button class="btn btn-success" @click="acceptRequest(item.id)">Approved</button></td>
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
      axios.get(process.env.VUE_APP_API_URL + '/received-request', config)
        .then(response => {
          // console.log(response.data.data.data)
          this.items = response.data.data.data;
        })
        .catch(error => {
          console.log(error)
        })
    },
    acceptRequest(id) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      };

      axios.post(process.env.VUE_APP_API_URL + '/approved-request', { request_id: id }, config)
        .then(response => {
          if (response.data.status == 201) {
            this.$nextTick(
              this.getItems()
            )
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