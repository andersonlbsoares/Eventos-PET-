<template>
    <div class="modal is-active" id="ativarModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title title is-5">{{ event_name }}</p>
                <button class="delete" @click="closeModal()" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <label class="label has-text-left">Nome do evento</label>
                <input :value="event_name" class="input mb-3" type="text" placeholder="Nome do evento">
                <label class="label has-text-left">Data incio</label>
                <input :value="this.event_start_date.split('T')[0].split('-').join('-')" class="input mb-3" type="date" placeholder="Data de inicio">
                <label class="label has-text-left">Data fim</label>
                <input :value="this.event_end_date.split('T')[0].split('-').join('-')" class="input mb-3" type="date" placeholder="Data de termino">
                <label class="label has-text-left">Carga horária</label>
                <input :value="event_workload" class="input mb-3" type="number" placeholder="Carga horaria">
                <label class="label has-text-left">Tipo do evento</label>
                <select class="input" name="tipo" id="tipo">
                    <option v-for="tipo in tiposEvento" :key="tipo" :value="tipo" :selected="tipo == event_type">{{ tipo }}</option>
                </select>
            </section>
                <footer class="modal-card-foot">
                <button class="button is-success" @click="salvarAlteracoes()">Salvar</button>
                <button class="button" @click="closeModal()">Discartar</button>
            </footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'eventEditar',

        props: {
            event_id: Number,
            event_name: String,
            event_start_date: String,
            event_end_date: String,
            event_workload: Number,
            event_type: String,
            closeModal: Function
        },
        
        data(){
            return {
                tiposEvento: [
                'Selecione uma categoria',
                'artístico-cultural',
                'iniciação à docência',
                'participação de eventos',
                'organização de eventos',
                'experiências ligadas à formação profissional',
                'produção Técnica e/ou científica',
                'vivências de gestão',
                'outras atividades'
                ]
            }
        },
        methods: {
            salvarAlteracoes(){
                let event_name = document.querySelector('input[type="text"]').value
                let event_start_date = document.querySelector('input[type="date"]').value
                let event_end_date = document.querySelectorAll('input[type="date"]')[1].value
                let event_workload = document.querySelector('input[type="number"]').value
                let event_type = document.querySelector('select').value

                let data = {
                    event_name,
                    event_start_date,
                    event_end_date,
                    event_workload,
                    event_type
                }

                console.log(data)
                axios.put(`ipdoserver:porta/evento/${this.event_id}`, data)
                .then(res => {
                    console.log(res)
                    window.location.reload()

                })
                .catch(err => {
                    console.log(err)
                })


            }
        }
        
    
}

</script>

<style>


</style>