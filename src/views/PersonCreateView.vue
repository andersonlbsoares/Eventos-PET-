<template>
    <navbarComponent/>

    <alertComponentDanger :aparecer="aparecer" :err="err" :fechar="fechar"></alertComponentDanger>
    <AlertComponentSuccess :aparecer2="aparecer2" :err="err" :fechar2="fechar2"></AlertComponentSuccess>
    <div class="pt-5 container box">
        <h1 class="title">Cadastrar aluno</h1>
        <hr>
        <div class="columns is-multiline">
            <div class="column is-half">
                <label class="label has-text-left">Nome completo</label>
                <input class="input" type="text" placeholder="Nome completo..." v-model="person.person_full_name">
                </div>
                <div class="column is-half">
                    <label class="label has-text-left">Email</label>
                    <input class="input" type="text" placeholder="e-mail..." v-model="person.person_email">
                </div>
                <div class="column is-half">
                    <label class="label has-text-left">Matricula</label>
                    <input class="input" type="number" v-model="person.person_enrollment">
                </div>
                <div class="column is-half">
                    <label class="label has-text-left">Curso</label>
                    <select class="input" v-model="person.person_course">
                        <option value="Selecione um curso" selected>Selecione um curso</option>
                        <option value="Ciência da Computação">Ciência da Computação</option>
                        <option value="Desing Digital">Desing Digital</option>
                        <option value="Engenharia de Computação">Engenharia de Computação</option>
                        <option value="Engenharia de Software">Engenharia de Software</option>
                        <option value="Sistemas de Informação">Sistemas de Informação</option>
                        <option value="Redes de Computadores">Redes de Computadores</option>
                        <option value="PCOMP">PCOMP</option>
                    </select>
                </div>
                <div class="column is-half">
                    <label class="label has-text-left">Número Cartão</label>
                    <input class="input" type="number" v-model="person.person_rfid">
                </div>
                <div class="column is-full">
                    <button class="button mt-5 is-primary" @click="createPerson">Cadastrar Aluno</button>
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
    name: "AlunosCriarView",
    data() {
        return {
            person: {
                person_full_name: "",
                person_email: "",
                person_enrollment: "",
                person_course: "Selecione um curso",
                person_rfid: ""
            },
            aparecer: false,
            aparecer2: false,
            err: ""

        };
    },
    methods: {
        createPerson() {
            if (this.person.person_full_name == "") {
                this.err = "Preencha o campo nome completo";
                this.aparecer = true;
                return;
            } else if(this.person.person_email == ""){
                this.err = "Preencha o campo email";
                this.aparecer = true;
                return;
            } else if(this.person.person_enrollment == ""){
                this.err = "Preencha o campo matricula";
                this.aparecer = true;
                return;
            } else if(this.person.person_course == "Selecione um curso"){
                this.err = "Selecione um curso";
                this.aparecer = true;
                return;
            } else if(this.person.person_rfid == ""){
                this.err = "Preencha o campo número cartão";
                this.aparecer = true;
                return;
            } else {
                axios.post("ipdoserver:porta/pessoa", this.person)
                .then(res => {
                    console.log(res);
                    this.person.person_full_name = "";
                    this.person.person_email = "";
                    this.person.person_enrollment = "";
                    this.person.person_course = "Selecione um curso";
                    this.person.person_rfid = "";
                    
                    this.aparecer2 = true;
                    this.err = "Aluno cadastrado com sucesso";
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
        }

    },
    components: { 
        AlertComponentSuccess,
        AlertComponentDanger,
        navbarComponent
    }
}
</script>

<style>

</style>