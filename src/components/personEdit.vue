<template>
    <div class="modal is-active" id="ativarModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title title is-5 pt-5">{{ person_full_name }}</p>
                <button class="delete" @click="closeModal()" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <label class="label has-text-left pt-4">Nome completo</label>
                <input class="input" type="text" :value="person_full_name">
                <label class="label has-text-left pt-4">E-mail</label>
                <input class="input" type="text" :value="person_email">
                <label class="label has-text-left pt-4">Matricula</label>
                <input class="input" type="number" :value=person_enrollment>
                <label class="label has-text-left pt-4">N° cartão</label>
                <input class="input" type="number" :value=person_rfid>
                <label class="label has-text-left pt-4">Curso</label>
                <select class="input" :value="person_course">
                    <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
                </select>
                <hr>
                <label class="label has-text-center pt-4">Eventos com acesso</label> 
                <ul class="">
                    <li v-if="event_acess.length == 0">Nenhum evento com acesso</li>
                    <li v-for="event in event_acess" :key="event.event_id" class="is-flex is-justify-content-center">
                        <p >{{ event.event_name }} -</p>
                        <p v-if=" event.event_person_presence == 0"> Não presente</p>
                        <p v-else>Presente</p>
                    </li>
                </ul>
            </section>
                <footer class="modal-card-foot">
                <button class="button is-success" @click="salvarAlteracoes()">Salvar</button>
                <button class="button" @click="closeModal()">Discartar</button>
            </footer>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    name: 'personEdit',

        props: {
            person_full_name: String,
            person_id: Number,
            person_rfid: Number,
            person_course: String,
            person_enrollment: Number,
            person_email: String,
            event_acess: Array

        },
        
        data(){
            return{
                courses:[
                    'Ciência da Computação',
                    'Desing Digital',
                    'Engenharia de Computação',
                    'Engenharia de Software',
                    'Sistemas de Informação',
                    'Redes de Computadores'
                ]
            }
        },
        methods: {
            salvarAlteracoes(){
                let person_full_nameChanged = document.querySelector('input[type="text"]').value
                let person_emailChanged = document.querySelectorAll('input[type="text"]')[1].value
                let person_enrollmentChanged = document.querySelectorAll('input[type="number"]')[0].value
                let person_rfid1Changed = document.querySelectorAll('input[type="number"]')[1].value
                let person_course1Changed = document.querySelector('select').value
                let person_idChanged = this.person_id

                this.$emit('salvarAlteracoes', {
                    person_id: person_idChanged,
                    person_full_name: person_full_nameChanged,
                    person_rfid: person_rfid1Changed,
                    person_course: person_course1Changed,
                    person_enrollment: person_enrollmentChanged,
                    person_email: person_emailChanged
                })

            },
            closeModal(){
                this.$emit('closeModal')
            }
        }
        
    
}

</script>

<style>


</style>