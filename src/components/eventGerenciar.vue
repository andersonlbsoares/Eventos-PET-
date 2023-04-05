<template>
    <div class="column">
        <div class="card tamanho">
            <div class="card-content">
                <div class="content">
                    <div class="is-align-items-center">
                        <table>
                            <tr>
                                <td class="title is-5">{{ event_name }}</td>
                            </tr>
                            <tr>
                                <td>ID: {{ event_id }}</td>
                            </tr>
                            <tr>
                                <td>Horas: {{ event_workload }}</td>
                            </tr>
                            <tr>
                                <td>Data de Início: {{ event_start_date_formated }}</td>
                            </tr>
                            <tr>
                                <td>Data de Término: {{ event_end_date_formated }}</td>
                            </tr>
                            <tr>
                                <td>Tipo: {{ event_type }}</td>
                            </tr>
                            
                        </table>

                        <div><button @click="editarEvento()" class="button is-info mr-5">Editar</button><button class="button is-danger" @click="deleteEvent">Excluir</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    name: 'eventBlock',
    data() {
        return {
            event_start_date_formated: this.event_start_date.split('T')[0].split('-').reverse().join('/'),
            event_end_date_formated: this.event_end_date.split('T')[0].split('-').reverse().join('/'),
            aparecer: false
        }
    },
    props: {
        event_name: String,
        event_id: Number,
        event_workload: Number,
        event_start_date: String,
        event_end_date: String,
        event_type: String
    },
    methods: {
        deleteEvent() {
            this.$emit('deleteEvent',{event_name:this.event_name, event_id:this.event_id});
        },
        fechar() {
            this.aparecer = false;
        },
        editarEvento() {
            this.$emit('editarEvento',{
                event_name: this.event_name,
                event_id: this.event_id,
                event_workload: this.event_workload,
                event_start_date: this.event_start_date,
                event_end_date: this.event_end_date,
                event_type: this.event_type,
            });
        }

    }
}
</script>


<style>
.tamanho{
    width: 40vh;
    height: 40vh;
}
td {border:none!important}
</style>