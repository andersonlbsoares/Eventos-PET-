<template>
<navbarComponent/>
<section class="hero is-halfheight is-centered">
    <div class="hero-body is-half">
        <div class="container">
            <div class="margintop columns is-vcentered">
                <div class="column">
                    <h1 class="title">Olá, daqui você pode decidir para onde ir!</h1>
                </div>
                <div class="column is-one-fifth">
                    <div class="card">
                    <p class="title is-4 pt-5">Eventos</p>
                    <ul class="menu-list">
                        <li class="menu-label">Opções:</li>
                        <li><a href="#"><router-link to="/event/create">Novo Evento</router-link></a></li>
                        <li><a href="#"><router-link to="/event/manage">Gerenciar Eventos</router-link></a></li>
                        <li><a href="#"><router-link to="/event/accredit">Credenciar</router-link></a></li>
                        <li class="pb-5"><a href="#"><router-link to="/event/sell-ticket">Vender ingresso</router-link></a></li>
                    </ul>
                    </div>
                </div>
                <div class="column is-one-fifth">
                    <div class="card">
                    <p class="title is-4 pt-5">Alunos UFC</p>
                    <ul class="menu-list">
                        <li class="menu-label">Opções:</li>
                        <li><a href="#"><router-link to="/person/create">Novo aluno</router-link></a></li>
                        <li class="pb-5"><a href="#"><router-link to="/person/manage">Gerenciar alunos</router-link></a></li>
                    </ul>
                    </div>
                </div>
                <div class="column is-one-fifth">
                    <div class="card">
                    <p class="title is-4 pt-5">Pessoas Externas</p>
                    <ul class="menu-list">
                        <li class="menu-label">Opções:</li>
                        <li><a href="#"><router-link to="/external-person/create">Novo cadastro</router-link></a></li>
                        <li class="pb-5"><a href="#"><router-link to="/external-person/manage">Gerenciar pessoas externas</router-link></a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</section>
</template>

<script>
import navbarComponent from '@/components/navbarComponent.vue';

export default {
    components: {
        navbarComponent
    }
}
</script>

<style>
.margintop{
    margin-top: 12%;
}
</style>