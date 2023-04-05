<template>
    <navbarComponent/>

    <alertComponentDanger :aparecer="this.aparecer" :err="this.err" :fechar="fechar"/>
    <alertComponentSuccess :aparecer2="this.aparecer2" :err="this.err" :fechar2="fechar2"/>


    <section class="hero is-halfheight is-centered">
        <div class="hero-body is-half">
            <div class="container box">
                <div class="columns is-multiline">
                    <div class="column is-half">
                        <label class="label has-text-left">Nome do evento</label>
                        <input class="input" type="text" placeholder="Nome do evento..." v-model="evento.event_name">
                        </div>
                        <div class="column is-half">
                            <label class="label has-text-left">Quantidade de horas</label>
                            <input class="input" type="number" placeholder="Quantas horas de evento?" v-model="evento.event_workload">
                        </div>
                        <div class="column is-half">
                            <label class="label has-text-left">Data Inicio</label>
                            <input class="input" type="date" v-model="evento.event_start_date">
                        </div>
                        <div class="column is-half">
                            <label class="label has-text-left">Data Fim</label>
                            <input class="input" type="date" v-model="evento.event_end_date">
                        </div>
                        <div class="column is-half">
                            <label class="label has-text-left">Categoria do evento</label>
                            <select class="input" v-model="evento.event_type">
                                <option value="Selecione uma categoria" selected>Selecione uma categoria</option>
                                <option value="artístico-cultural">Artístico-culturais e esportivas</option>
                                <option value="iniciação à docência">Iniciação à docência</option>
                                <option value="participação de eventos">Participação de eventos</option>
                                <option value="organização de eventos">Organização de eventos</option>
                                <option value="experiências ligadas à formação profissional">Experiências ligadas à formação profissional</option>
                                <option value="produção Técnica e/ou científica">Produção Técnica e/ou Científica</option>
                                <option value="vivências de gestão">Vivências de gestão</option>
                                <option value="outras atividades">Outras atividades</option>
                            </select>
                        </div>
                        <div class="column is-full">
                            <button class="button mt-5 is-primary" @click="createEvent">Criar Evento</button>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    
</template>

<script>
import axios from 'axios'
import alertComponentDanger from '@/components/alertComponentDanger.vue'
import alertComponentSuccess from '@/components/alertComponentSuccess.vue'
import navbarComponent from '@/components/navbarComponent.vue';

export default {
    components: {
    alertComponentDanger,
    alertComponentSuccess,
    navbarComponent
  },
    data(){
        return{
            aparecer: false,
            aparecer2: false,
            cor: 'is-danger',
            err:'Verifique o forms',
            evento:{
                event_name: '',
                event_workload: '',
                event_start_date: '',
                event_end_date: '',
                event_type: 'Selecione uma categoria'
            }
        }
    },
    methods: {
        createEvent(){
            console.log(this.evento)
            if (this.evento.event_end_date == ''){
                this.evento.event_end_date = this.evento.event_start_date
            }

            if(this.evento.event_name == ''){
                this.err = 'Preencha o nome do evento'
                this.aparecer = true
                return
            }else if (this.evento.event_workload == ''){
                this.err = 'Preencha a quantidade de horas'
                this.aparecer = true
                return
            }else if (this.evento.event_start_date == ''){
                this.err = 'Preencha a data de inicio'
                this.aparecer = true
                return
            }else if (this.evento.event_type == 'Selecione uma categoria'){
                this.err = 'Selecione uma categoria'
                this.aparecer = true
                return
            }else if (this.evento.event_end_date < this.evento.event_start_date){
                this.err = 'A data de fim não pode ser menor que a data de inicio'
                this.aparecer = true
                return
            } else{

                
                axios.post('http://ipdoserver:porta/evento', this.evento)
                .then(response => {
                    console.log(response)
                    this.aparecer = false
                    this.aparecer2 = true
                    this.err = 'Evento criado com sucesso!'
                    this.evento.event_name = ''
                    this.evento.event_workload = ''
                    this.evento.event_start_date = ''
                    this.evento.event_end_date = ''
                    this.evento.event_type = 'Selecione uma categoria'
                    
                })
                .catch(function(error) {
                    console.log(error);
                });

            }
        },
        fechar(){
            this.aparecer = false;
        }
        ,
        fechar2(){
            this.aparecer2 = false;
        }
    }

}
</script>

<style>

</style>