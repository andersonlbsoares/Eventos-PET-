<template>
<navbarComponent/>
  <div>
    <h1 class="title">O que iremos credenciar hoje?</h1>
    <hr>
    <div v-for="event in events" :key="event.event_id">
      <eventAccredit :event_name="event.event_name" :event_id="event.event_id" @accreditMe="accreditMe($event)" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import navbarComponent from '@/components/navbarComponent.vue';
import eventAccredit from '@/components/eventAccredit.vue'


export default {
  name: 'EventsView',
  components: {
    eventAccredit,
    navbarComponent
  },
  data(){
    return{
      events: [],
    }
  },
  created: function() {
    axios.get('ipdoserver:porta/evento')
      .then(response => {
        this.events = response.data;
        console.log(this.events);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    accreditMe($event) {
      this.$router.push({ name: 'accredit', params: { id: $event } });
      console.log($event);
    }
  }
}
</script>
