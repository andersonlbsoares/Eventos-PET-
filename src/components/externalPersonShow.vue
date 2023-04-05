<template>
    <div class="modal is-active" id="ativarModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title title is-5">{{ external_person_full_name }}</p>
                <button class="delete" @click="closeModal()" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <label class="label has-text-left">Nome completo</label>
                <input class="input" type="text" :value="external_person_full_name" disabled>
                <label class="label pt-5 has-text-left">CPF</label>
                <input class="input" type="text" :value="external_person_cpf" disabled>
                <label class="label pt-5 has-text-left">E-mail</label>
                <input class="input" type="text" :value="external_person_email" disabled>
                <label class="label pt-5 has-text-left">Aluno responsável</label>
                <input class="input" type="text" :value="person_full_name" disabled>
                <hr>
                <label class="label has-text-center">Eventos com acesso</label>
                <ul>
                    <li v-if="event_acess.length == 0">Nenhum evento com acesso</li>
                    <li v-for="event in event_acess" :key="event.event_id" class="is-flex is-justify-content-center">
                        <p >{{ event.event_name }} -</p>
                        <p v-if=" event.event_person_presence == 0"> Não presente</p>
                        <p v-else>Presente</p>
                    </li>
                </ul>
            </section>
                <footer class="modal-card-foot">
                <button class="button" @click="closeModal()">Fechar</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'personEdit',

        props: {
            external_person_full_name: String,
            person_full_name: String,
            external_person_cpf: Number,
            external_person_email: String,
            event_acess: Array
        },
        
        data(){
            return{
            
            }
        },
        methods: {

            closeModal(){
                this.$emit('closeModal')
            }
        }
        
    
}

</script>

<style>


</style>