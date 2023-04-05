<template>
    <navbarComponent/>
    <alertComponentDanger :aparecer="aparecer" :err="err" :fechar="fechar"></alertComponentDanger>
    <AlertComponentSuccess :aparecer2="aparecer2" :err="err" :fechar2="fechar2"></AlertComponentSuccess>

    <div class="container box">
        <h1 class="title">Cadastrar pessoa externa</h1>
        <hr>
        <div class="columns is-multiline">
            <div class="column is-half">
                <label class="label has-text-left">Nome completo</label>
                <input class="input" type="text" placeholder="Nome completo..." v-model="externalPerson.external_person_full_name">
            </div>
            <div class="column is-half">
                <label class="label has-text-left">Email</label>
                <input class="input" type="text" placeholder="e-mail..." v-model="externalPerson.external_person_email">
            </div>
            <div class="column is-half">
                <label class="label has-text-left">CPF</label>
                <input class="input" type="number" v-model="externalPerson.external_person_cpf"> 
            </div>
            <div class="column is-half">
                <label class="label has-text-left">Responsável</label>
                <input class="input" type="text" placeholder="Responsável..." v-model="nomeDigitado" @input="searchResponsible">
                <br>
                <div class="dropdown is-active" v-if="responsibleSuggestions.length > 0">
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <a class="dropdown-item" v-for="suggestion in responsibleSuggestions" :key="suggestion.external_person_id" @click="selectResponsible(suggestion)">
                                {{ suggestion.person_full_name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                <div class="column is-full">
                <button class="button mt-5 is-primary" @click="createExternalPerson">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import AlertComponentSuccess from "@/components/alertComponentSuccess.vue";
import AlertComponentDanger from "@/components/alertComponentDanger.vue";
import navbarComponent from '@/components/navbarComponent.vue';

import axios from "axios";
export default {
    name: "PessoasExternasCriarView",
    data() {
        return {
            nomeDigitado: "",
            responsibleSuggestions: [],
            externalPerson: {
                external_person_full_name: "",
                external_person_email: "",
                external_person_cpf: "",
                external_person_responsible_person_id: "",
            },
            responsible_persons: [],
            aparecer: false,
            aparecer2: false,
            err: ""

        };
    },
    methods: {
        createExternalPerson() {
            if (this.externalPerson.external_person_full_name == ""){
                this.err = "O campo nome completo é obrigatório";
                this.aparecer = true;
            } else if (this.externalPerson.external_person_email == ""){
                this.err = "O campo email é obrigatório";
                this.aparecer = true;
            } else if (this.externalPerson.external_person_cpf == ""){
                this.err = "O campo CPF é obrigatório";
                this.aparecer = true;
            } else if (isNaN(this.externalPerson.external_person_responsible_person_id) || this.externalPerson.external_person_responsible_person_id == ""){
                this.err = "Selecione um responsável";
                this.aparecer = true;
            } else {
                axios.post("http://ipdoserver:porta/pessoa-externa", this.externalPerson)
                .then(res => {
                    console.log(res);
                    this.externalPerson.external_person_full_name = "";
                    this.externalPerson.external_person_email = "";
                    this.externalPerson.external_person_cpf = "";
                    this.externalPerson.external_person_responsible_person_id = "";
                    this.nomeDigitado = "";


                    this.aparecer2 = true;
                    this.aparecer = false;
                    this.err = "Pessoa externa cadastrada com sucesso";
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        fechar() {
            this.aparecer = false;
        },
        fechar2() {
            this.aparecer2 = false;
        },
        searchResponsible(){
            this.responsibleSuggestions = this.responsible_persons.filter(responsible => responsible.person_full_name.toLowerCase().includes(this.nomeDigitado.toLowerCase()));
            this.responsibleSuggestions = this.responsibleSuggestions.slice(0, 5);
        },
        selectResponsible(responsible){
            this.nomeDigitado = responsible.person_full_name;
            this.externalPerson.external_person_responsible_person_id = responsible.person_id;
            this.responsibleSuggestions = [];
        }

    },
    components: { 
        AlertComponentSuccess,
        AlertComponentDanger,
        navbarComponent
    },
    created: function(){
        axios.get("http://ipdoserver:porta/pessoa")
        .then(res => {
            this.responsible_persons = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    }
}
</script>

<style>

</style>