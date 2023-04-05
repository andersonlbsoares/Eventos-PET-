<template>
<div id="localBody">
    <img src="@/assets/mapaMarrom.png" id="mapa" alt="mapa">
    <div @click="focar()" class="is-flex is-align-items-center" style="height: 90vh;">
    <div>
        <p onload="focar()" class="conteudo" id="conteudo"></p><br>
        <p class="convidados" id="convidados"></p>
    </div>
        <p class="aproxime">Aproxime o cartão</p>
        <p class="leitor">do leitor</p>
    </div>
    <img src="@/assets/logoGamedayMarrom.png" id="logoGameday" alt="logoGameday">
    <img src="@/assets/logoPetMarrom.png" id="logoPet" alt="logoPet">
    <img src="@/assets/logoUfcMarrom.png" id="logoUfc" alt="logoUfc">


</div>
<input class="invisivel" autofocus id="rfid" type="text" v-model="rfid" @keyup.enter="search()">
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            rfid: '',
            person: [],
            person_external: [],
            event_id: this.$route.params.id
        }
    },
    created: function () {        

        axios.get("ipdoserver:porta/credenciamento-pessoas/" + this.event_id)
            .then(res => {
                this.person = res.data;
            })
            .catch(err => {
                console.log(err);
            });
            

        },
    methods: {
        search() {
            var rfid = this.rfid;
            var person = this.person;
            var conteudo = document.getElementById("conteudo");
            var ocultar1 = document.getElementsByClassName("aproxime");
            var ocultar2 = document.getElementsByClassName("leitor");
            var convidados = document.getElementById("convidados");
            var i;
            //remove os 0 a esquerda
            rfid = rfid.replace(/^0+/, '');
            var achado=0;
            for (i = 0; i < person.length; i++) {
                if (person[i].person_rfid == rfid) {
                    achado=1;
                    ocultar1[0].style.display = "none";
                    ocultar2[0].style.display = "none";
                    conteudo.innerHTML = "Bem-vindo " + person[i].person_full_name + ", aproveite o evento!";

                    //credenciamento/:event_id/:person_id/:external_person
                    axios.put("ipdoserver:porta/credenciamento/" + this.event_id + "/" + person[i].person_id + "/0")
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                    axios.get("ipdoserver:porta/pessoa-externa-responsavel-evento/" + this.event_id + "/" + person[i].person_id)
                    .then(res => {
                        console.log(res);
                        this.person_external = res.data;
                        convidados.innerHTML =  "Convidados:"+"</br>";
                        var pessoas="";
                            for (i = 0; i < this.person_external.length; i++) {
                                pessoas = pessoas + this.person_external[i].external_person_full_name + "</br>";
                                axios.put("ipdoserver:porta/credenciamento/" + this.event_id + "/" + this.person_external[i].external_person_id + "/" + 1)
                            }
                            convidados.innerHTML = convidados.innerHTML + pessoas;
                        })
                        .catch(err => {
                            console.log(err);
                        }); 

                    //     break;
                } else if(achado==0){
                    ocultar1[0].style.display = "none";
                    ocultar2[0].style.display = "none";
                    conteudo.innerHTML = "Cartão n° " + rfid + " não cadastrado ou não autorizado";
                }
            }
            //atrasa a execução do código em 1 segundo
            setTimeout(function () {
                conteudo.innerHTML = "";
                ocultar1[0].style.display = "block";
                ocultar2[0].style.display = "block";
                convidados.innerHTML = "";
                achado=0;
            }, 2000);

            this.rfid = '';
        },
        focar(){
            document.getElementById("rfid").focus();
        }
    },
}
</script>

<style>
/* deixa o campo invisivel porem continua funcionando */
.invisivel {
    position: absolute;
    left: -9999px;
    top: -9999px;
}
#localBody{
    /* assets/fundo.jpg */
    background-image: url(@/assets/fundo.png);
    background-size: cover;

    height: 100vh;
    font-family: 'enchanted';
}

@font-face {
    font-family: 'enchanted';
    src: url(@/assets/EnchantedLand.otf);
}
.aproxime{
    font-size: 9em!important;
    position: absolute;
    color: #5D4D35;
    top: 2em;
    left: 1.5em;
}
.leitor{
    font-size: 9em!important;
    position: absolute;
    color: #5D4D35;
    top: 2.9em;
    left: 3em;
}

#mapa{
    position: absolute;
    height: 100vh;
}
/* ocutar barra de rolagem */
::-webkit-scrollbar {
    display: none;
}
#logoGameday{
    position: absolute;
    height: 7vh;
    bottom: 6em;
    left: 10em;
}
#logoPet{
    position: absolute;
    height: 7vh;
    bottom: 6em;
    left: 20em;
}
#logoUfc{
    position: absolute;
    height: 7vh;
    bottom: 6em;
    left: 37em;
}
.conteudo{
    font-size: 5.5em!important;
    color: #5D4D35;
    left: 1em;
    top: 2em;
    width: 50vw;
    line-height: 0.9;
    padding-left: 1em!important;
    text-align: center;
}
.convidados{
    font-size: 4em!important;
    color: #5D4D35;
    width: 100vw;
    width: 50vw;
    padding-left: 1em!important;
    padding-top: .5em!important;
    text-align: center;
    line-height: 0.95;
}	

</style>


