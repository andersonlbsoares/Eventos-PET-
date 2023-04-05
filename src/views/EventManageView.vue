<template>
  <navbarComponent/>

  <confirmDelete v-show="showDelete" :idEvent="event_id" :name="event_name" @closeDelete="closeDelete" @deleteFunction="deleteFunction($event)"/>
    <div>
      <h1 class="title">Eventos cadastrados</h1>
      <hr>
      <div class="container">
        <eventEditar v-show="aparecer" :event_name="event_name" :event_id=event_id
                 :event_workload=event_workload :event_start_date="event_start_date"
                 :event_end_date="event_end_date" :event_type="event_type" :closeModal="closeModal" />



          <div class="columns is-multiline is-centered">
              <div v-for="event in events" :key="event.event_id">
                <eventGerenciar :event_name="event.event_name" :event_id=event.event_id :event_workload=event.event_workload 
                :event_start_date="event.event_start_date" :event_end_date="event.event_end_date" :event_type="event.event_type" 
                @editarEvento="editarEvento($event)" @deleteEvent="deleteEventConfirm($event)"/>
            </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  import eventGerenciar from '@/components/eventGerenciar.vue'
  import eventEditar from '@/components/eventEditar.vue'
  import confirmDelete from '@/components/confirmDelete.vue'
  import navbarComponent from '@/components/navbarComponent.vue';


  
  
  
  export default {
    name: 'EventsView',
    components: {
      eventGerenciar,
      eventEditar,
      confirmDelete,
      navbarComponent
    },
    data(){
      return{
        events: [],
        event_name: '',
        event_id: 0,
        event_workload: 0,
        event_start_date: '',
        event_end_date: '',
        event_type: '',
        aparecer: false,
        showDelete: false,


      }
    },
    methods: {
      editarEvento($event) {
        this.event_name = $event.event_name;
        this.event_id = $event.event_id;
        this.event_workload = $event.event_workload;
        this.event_start_date = $event.event_start_date;
        this.event_end_date = $event.event_end_date;
        this.event_type = $event.event_type;
        this.aparecer = true;
      },
      closeModal() {
        this.aparecer = false;
      },
      deleteEventConfirm($event) {
        this.event_name = $event.event_name;
        this.event_id = $event.event_id;
        this.showDelete = true;
      },
      closeDelete() {
        this.showDelete = false;
      },
      deleteFunction($event) {
        axios.delete('http://ipdoserver:porta/evento/' + $event.idEvent)
          .then(response => {
            console.log(response);
            this.showDelete = false;
            this.events = this.events.filter(event => event.event_id !== $event.idEvent);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    created: function() {
      axios.get('http://ipdoserver:porta/evento')
        .then(response => {
          this.events = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  </script>
  