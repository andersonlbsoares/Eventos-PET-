<template> 
    <navbarComponent/>
 
    <confirmDeletePerson :aparecer="aparecerDeletar" :person_full_name="external_person_full_name" :person_id="external_person_id"
    @fechar="fecharDeletar()" @deleteFunction="deleteFunction($event)"/>

    <externalPersonShow v-show="aparecer" :external_person_cpf=parseInt(external_person_cpf) :external_person_email="external_person_email"
    :external_person_full_name="external_person_full_name" :person_full_name="person_full_name" @closeModal="closeModal()"
    :event_acess="event_acess"/>

    
    <div class="container">
        <div class="box">
            <h1 class="title is-5">Gerenciar pessoas Externas</h1>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Pesquisar</label>
                        <div class="is-flex is-justify-content-space-between">
                            <input class="input" type="text" placeholder="Digite o nome do aluno" v-model="pesquisa">
                            <button class="button is-primary" @click="pesquisar()" >Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="pessoa in pessoasExternasFiltradas" :key="pessoa.external_person_id">
            <externalPersonComponent :external_person_full_name="pessoa.external_person_full_name"
             :external_person_id=pessoa.external_person_id :external_person_email="pessoa.external_person_email" 
             :external_person_cpf=parseInt(pessoa.external_person_cpf) :person_full_name="pessoa.person_full_name" 
             @deleteMe="deleteMe($event)" @showMe="showMe($event)"/>
        </div>
</div>
</template>

<script>
import axios from 'axios'
import externalPersonComponent from '@/components/externalPersonComponent.vue';
import externalPersonShow from '@/components/externalPersonShow.vue';
import confirmDeletePerson from '@/components/confirmDeletePerson.vue';
import navbarComponent from '@/components/navbarComponent.vue';


export default {
    data(){
     return{
        aparecer: false,
        aparecerDeletar: false,
         pessoasExternas: [],
         pessoasExternasFiltradas: [],
         event_acess: [],
         pesquisa: '',
         aparecerConfirmDelete: false,
         DeleteExternalPersonName: '',
         DeleteExternalPersonId:0,
         external_person_full_name: '',
         person_full_name: '',
         external_person_cpf: 0,
         external_person_id: 0,
         external_person_email: ''
     }   
    },
    created: function(){
        axios.get("ipdoserver:porta/pessoa-externa-responsavel")
        .then(res => {
            this.pessoasExternas = res.data;
            this.pessoasExternasFiltradas = res.data;
            this.pessoasExternasFiltradas = this.pessoasExternasFiltradas.slice(0, 10);
        })
        .catch(err => {
            console.log(err);
        });
    },
    components:{
        externalPersonComponent,
        externalPersonShow,
        confirmDeletePerson,
        navbarComponent
    },
    methods:{
        closeModal(){
            this.aparecer = false;
        },
        showMe($event){
            this.aparecer = true;
            this.external_person_full_name = $event.external_person_full_name;
            this.person_full_name = $event.person_full_name;
            this.external_person_cpf = $event.external_person_cpf;
            this.external_person_email = $event.external_person_email;


            axios.get("ipdoserver:porta/venda/pessoa-externa/" + $event.external_person_id)
            .then(res => {
                this.event_acess = res.data;
            })
            .catch(err => {
                this.event_acess = [];
                console.log(err);
            });
        },
        pesquisar(){
            this.pessoasExternasFiltradas = this.pessoasExternas.filter(pessoa => pessoa.external_person_full_name.toLowerCase().includes(this.pesquisa.toLowerCase()));
            this.pessoasExternasFiltradas = this.pessoasExternasFiltradas.slice(0, 10);
        },
        fecharDeletar(){
            this.aparecerDeletar = false;
        },
        deleteMe($event){
            this.external_person_full_name = $event.external_person_full_name;
            this.external_person_id = $event.external_person_id;
            this.aparecerDeletar = true;

        },
        deleteFunction($event){
            axios.delete("ipdoserver:porta/pessoa-externa/" + $event.external_person_id)
            .then(res => {
                console.log(res);
            
                this.pessoasExternas = this.pessoasExternas.filter(pessoa => pessoa.external_person_id != $event.person_id);
                this.pessoasExternasFiltradas = this.pessoasExternasFiltradas.filter(pessoa => pessoa.external_person_id != $event.person_id);
                this.aparecerDeletar = false;


            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    
}
</script>

<style>

</style>