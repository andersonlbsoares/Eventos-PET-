<template>
    <navbarComponent/>
    <alertComponentDanger :aparecer="showDangerAlert" :err="errorMessage" :fechar="closeDangerAlert"/>
    <alertComponentSuccess :aparecer2="showSuccessAlert" :err="successMessage" :fechar2="closeSuccessAlert"/>
    <div class="container box">
        <h1 class="title">Venda de Ingresso</h1>
        <div class="tabs is-centered">
            <ul>
                <li @click="changeSelectedPerson" id="person" class="is-active"><a>Aluno(a)</a></li>
                <li @click="changeSelectedPerson" id="externalPerson"><a>Pessoa Externa</a></li>
            </ul>
        </div>
        <div class="columns">
            <div class="column">
                <div v-for="event in events" :key="event.event_id">
                <a class="eventBox" @click="selectEvent(event.event_id)"
                :style="{ backgroundColor: selectedEvent === event.event_id ? '#00d1b2' : '', color: selectedEvent === event.event_id ? 'white' : '' }"> {{ event.event_name }} </a>
                </div>
            </div>
            <div class="column">
                <br>
                <div v-if="externalPerson == false">
                    <input class="input" type="text" placeholder="Nome" v-model="nameTyped" @input="searchPerson"><br>
                    <div class="dropdown is-active" v-if="suggestions.length > 0">
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <a class="dropdown-item" v-for="suggestion in suggestions" :key="suggestion.person_id" @click="selectPerson(suggestion)">
                                    {{ suggestion.person_full_name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="externalPerson == true">
                    <input class="input" type="text" placeholder="Nome" v-model="nameTyped" @input="searchExternalPerson"><br>
                    <div class="dropdown is-active" v-if="suggestions.length > 0">
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <a class="dropdown-item" v-for="suggestion in suggestions" :key="suggestion.external_person_id" @click="selectPersonExternal(suggestion)">
                                    {{ suggestion.external_person_full_name}}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <button class="button mt-5 is-primary" @click="sellticket()">Confirmar venda</button>
    </div>
</template>

<script>
import axios from 'axios';
import navbarComponent from '@/components/navbarComponent.vue';
import alertComponentSuccess from '@/components/alertComponentSuccess.vue';
import alertComponentDanger from '@/components/alertComponentDanger.vue';

export default {
    name: "EventSellTicketView",
    components: {
        navbarComponent,
        alertComponentSuccess,
        alertComponentDanger
    },
    data() {
        return {
            externalPerson: false,
            events: [],
            people: [],
            external_people: [],
            suggestions: [],
            nameTyped: "",
            selectedPersonId: 0,
            selectedEvent: null,
            showSuccessAlert: false,
            showDangerAlert: false,
            errorMessage: "",
            successMessage: "Venda realizada com sucesso!",
            insertTicket: true
        }
    },
    created: function(){
        axios.get('http://ipdoserver:porta/evento')
        .then(response => {
            this.events = response.data;
        })
        .catch(function(error){
            console.log(error);
        });
        axios.get('http://ipdoserver:porta/pessoa')
        .then(response => {
            this.people = response.data;
        })
        .catch(function(error){
            console.log(error);
        });
        axios.get('http://ipdoserver:porta/pessoa-externa')
        .then(response => {
            this.external_people = response.data;
        })
        .catch(function(error){
            console.log(error);
        });
    },
    methods:{
        sellticket() {
            this.insertTicket = true;
            if(this.selectedEvent == null){
                this.showDangerAlert = true;
                this.errorMessage = "Selecione um evento";
            }
            else if(this.selectedPersonId == 0){
                this.showDangerAlert = true;
                this.errorMessage = "Selecione uma pessoa";
            }
            else if(this.externalPerson == false){
                let self = this;
                axios.get('http://ipdoserver:porta/venda/pessoa/' + this.selectedPersonId).then(function(response){
                    for(var i = 0; i < response.data.length; i++){
                        if(response.data[i].event_id == self.selectedEvent){
                            self.showDangerAlert = true;
                            self.errorMessage = "Pessoa já possui ingresso para este evento";
                            self.insertTicket = false;
                        }
                    }

                    if(self.insertTicket == true){
                        axios.post("http://ipdoserver:porta/venda", {
                            event_person_event_id: self.selectedEvent,
                            event_person_person_id: self.selectedPersonId,
                            event_person_person_external: self.externalPerson,
                            event_person_presence: false
                            
                        }).then(response => {
                            self.showSuccessAlert = true;
                            self.selectedEvent = null;
                            self.selectedPersonId = 0;
                            self.nameTyped = "";
                            console.log(response);
                        }).catch(error => {
                            self.showDangerAlert = true;
                            self.errorMessage = "Erro ao realizar venda";
                            console.log(error);
                        });
                    }
                }).catch(error => {
                    if(error.response.status == 404){
                        axios.post("http://ipdoserver:porta/venda", {
                            event_person_event_id: self.selectedEvent,
                            event_person_person_id: self.selectedPersonId,
                            event_person_person_external: self.externalPerson,
                            event_person_presence: false

                        }).then(response => {
                            self.showSuccessAlert = true;
                            self.selectedEvent = null;
                            self.selectedPersonId = 0;
                            self.nameTyped = "";
                            return response;
                        }).catch(error => {
                            self.showDangerAlert = true;
                            self.errorMessage = "Erro ao realizar venda";
                            console.log(error);
                        });
                    }
                });

                


            }else if(this.externalPerson == true){
                let self = this;
                axios.get('http://ipdoserver:porta/venda/pessoa-externa/' + this.selectedPersonId).then(function(response){
                    for(var i = 0; i < response.data.length; i++){
                        if(response.data[i].event_id == self.selectedEvent){
                            self.showDangerAlert = true;
                            self.errorMessage = "Pessoa já possui ingresso para este evento";
                            self.insertTicket = false;
                        }
                    }

                    console.log(self.insertTicket);
                    if(self.insertTicket == true){
                        axios.post("http://ipdoserver:porta/venda", {
                            event_person_event_id: self.selectedEvent,
                            event_person_person_id: self.selectedPersonId,
                            event_person_person_external: self.externalPerson,
                            event_person_presence: false

                        }).then(response => {
                            self.showSuccessAlert = true;
                            self.selectedEvent = null;
                            self.selectedPersonId = 0;
                            self.nameTyped = "";
                            return response;
                        }).catch(error => {
                            self.showDangerAlert = true;
                            self.errorMessage = "Erro ao realizar venda";
                            console.log(error);
                        });   
                    }
                }).catch(error => {
                    if(error.response.status == 404){
                        axios.post("http://ipdoserver:porta/venda", {
                            event_person_event_id: self.selectedEvent,
                            event_person_person_id: self.selectedPersonId,
                            event_person_person_external: self.externalPerson,
                            event_person_presence: false

                        }).then(response => {
                            self.showSuccessAlert = true;
                            self.selectedEvent = null;
                            self.selectedPersonId = 0;
                            self.nameTyped = "";
                            return response;
                        }).catch(error => {
                            self.showDangerAlert = true;
                            self.errorMessage = "Erro ao realizar venda";
                            console.log(error);
                        });
                    }
                });
            }else{
                this.showDangerAlert = true;
                this.errorMessage = "Erro desconhecido, entre em contato com o suporte";
            }
        },
        selectEvent(eventId) {
            this.selectedEvent = eventId
        },
        searchPerson() {
            this.suggestions = this.people.filter(person => person.person_full_name.toLowerCase().includes(this.nameTyped.toLowerCase()))
            this.suggestions = this.suggestions.slice(0, 5)
        },
        searchExternalPerson() {
            this.suggestions = this.external_people.filter(person => person.external_person_full_name.toLowerCase().includes(this.nameTyped.toLowerCase()))
            this.suggestions = this.suggestions.slice(0, 5)
        },
        selectPerson(person) {
            this.nameTyped = person.person_full_name
            this.selectedPersonId = person.person_id
            this.suggestions = []
        },
        selectPersonExternal(person) {
            this.nameTyped = person.external_person_full_name
            this.selectedPersonId = person.external_person_id
            this.suggestions = []
        },
        changeSelectedPerson() {
            this.externalPerson = !this.externalPerson
            //get element by id and change class
            document.getElementById("person").classList.toggle("is-active");
            document.getElementById("externalPerson").classList.toggle("is-active");
            this.nameTyped = ""
            if(this.externalPerson == true){
                this.suggestions = this.external_people.filter(person => person.external_person_full_name.toLowerCase().includes(this.nameTyped.toLowerCase()))
                this.suggestions = this.suggestions.slice(0, 5)
            }
            else{
                this.suggestions = this.people.filter(person => person.person_full_name.toLowerCase().includes(this.nameTyped.toLowerCase()))
                this.suggestions = this.suggestions.slice(0, 5)
            }
        },

        closeSuccessAlert() {
            this.showSuccessAlert = false;
        },
        closeDangerAlert() {
            console.log("close");
            this.showDangerAlert = false;
        }
    }

}
</script>

<style>
.eventBox{
    display: block;
    width: 100%;
    padding: 0.75rem 1.25rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    color: black;
    border: 1px solid #dbdbdb;
    border-radius: 0.55rem;
}

</style>