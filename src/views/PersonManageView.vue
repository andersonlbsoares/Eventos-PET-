<template>
    <navbarComponent/>

    <confirmDeletePersonVue :aparecer="aparecerConfirmDelete" :person_id=DeletePersonId :person_full_name="DeletePersonName" 
    @fechar="fechar()" @deleteFunction="deleteFunction($event)" />
    
    <personEdit v-show="aparecerPersonEdit" :person_full_name="person_full_name" :person_id=person_id 
    :person_enrollment = person_enrollment :person_rfid=person_rfid :person_course="person_course" :person_email="person_email"
    :event_acess="event_acess" 
    @closeModal="closeModal($event)"  @salvarAlteracoes="salvarAlteracoes($event)"/>

    
    <div class="container">
        <div class="box">
            <h1 class="title is-5">Gerenciar alunos</h1>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Pesquisar</label>
                        <div class="is-flex is-justify-content-space-between">
                            <input class="input" type="text" placeholder="Digite o nome do aluno" v-model="pesquisa">
                            <button class="button is-primary" @click="pesquisar()">Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="aluno in alunosFiltrados" :key="aluno.person_id">
            <personComponent :person_full_name="aluno.person_full_name" :person_id=aluno.person_id
            :person_enrollment=parseInt(aluno.person_enrollment) :person_rfid=parseInt(aluno.person_rfid) :person_course="aluno.person_course" 
            :person_email="aluno.person_email"  @deleteMe="confirmDeleteFunction($event)" @editMe="editPerson($event)" />
        </div>
</div>
</template>

<script>
import axios from 'axios'
import personComponent from '@/components/personComponent.vue'
import confirmDeletePersonVue from '@/components/confirmDeletePerson.vue'
import personEdit from '@/components/personEdit.vue'
import navbarComponent from '@/components/navbarComponent.vue';


export default {
    data(){
        return{
            alunos: [],
            alunosFiltrados: [],
            event_acess: [],
            pesquisa: '',
            aparecerConfirmDelete: false,
            aparecerPersonEdit: false,
            DeletePersonName: '',
            DeletePersonId:0,
            person_full_name: '',
            person_id: 0,
            person_enrollment: 0,
            person_rfid: 0,
            person_course: '',
            person_email: ''
        }
    },
    created: function(){
        axios.get('ipdoserver:porta/pessoa')
        .then(response => {
            this.alunos = response.data
            this.alunosFiltrados = response.data
            this.alunosFiltrados = this.alunosFiltrados.slice(0, 10)
            this.alunosFiltrados.sort((a, b) => a.person_full_name.localeCompare(b.person_full_name))
        })
        .catch(error => {
            console.log(error)
        })
    },
    components:{
        personComponent,
        confirmDeletePersonVue,
        personEdit,
        navbarComponent
    },
    methods:{
        pesquisar(){
            this.alunosFiltrados = this.alunos.filter(aluno => aluno.person_full_name.toLowerCase().includes(this.pesquisa.toLowerCase()))
            this.alunosFiltrados = this.alunosFiltrados.slice(0, 10)
        },
        show(){
            this.aparecerConfirmDelete = true
        },
        fechar(){
            this.aparecerConfirmDelete = false
        },
        confirmDeleteFunction($event){
            this.DeletePersonName = $event.name
            this.DeletePersonId = $event.id
            this.show();
        },
        deleteFunction($event){
            axios.delete('ipdoserver:porta/pessoa/' + $event.person_id)
            .then(response => {
                console.log(response)
                this.alunos = this.alunos.filter(aluno => aluno.person_id != $event.person_id)
                this.alunosFiltrados = this.alunosFiltrados.filter(aluno => aluno.person_id != $event.person_id)
                this.fechar()
            })
        },
        closeModal($event){
            this.aparecerPersonEdit = false
            this.person_full_name = ''
            this.person_id = 0
            this.person_enrollment = 0
            this.person_rfid = 0
            this.person_course = ''
            this.person_email = ''
            console.log($event)
        },
        salvarAlteracoes($event){
            axios.put('ipdoserver:porta/pessoa/' + $event.person_id, {
                person_full_name: $event.person_full_name,
                person_enrollment: $event.person_enrollment,
                person_rfid: $event.person_rfid,
                person_course: $event.person_course,
                person_email: $event.person_email
            })
            .then(response => {
                console.log(response)
                this.closeModal()
                this.alunos = this.alunos.map(aluno => {
                    if(aluno.person_id == $event.person_id){
                        aluno.person_full_name = $event.person_full_name
                        aluno.person_enrollment = $event.person_enrollment
                        aluno.person_rfid = $event.person_rfid
                        aluno.person_course = $event.person_course
                        aluno.person_email = $event.person_email
                    }
                    return aluno
                })
            })
        },
        editPerson($event){
            this.aparecerPersonEdit = true 
            this.person_full_name = $event.person_full_name
            this.person_id = $event.person_id
            this.person_enrollment = $event.person_enrollment
            this.person_rfid = $event.person_rfid
            this.person_course = $event.person_course
            this.person_email = $event.person_email

            axios.get('ipdoserver:porta/venda/pessoa/' + $event.person_id)
            .then(response => {
                this.event_acess = response.data
            })
            .catch(error => {
                this.event_acess = []
                return error

            })

        }
    }
}

</script>

<style>

</style>