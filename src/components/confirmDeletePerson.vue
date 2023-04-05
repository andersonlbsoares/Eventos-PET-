<template>
    <div v-show="aparecer" class="sobreposto is-white box notification">
       <button class="delete" @click="fechar"></button>
      <br><p class="subtitle is-5">Tem certeza que deseja deletar {{person_full_name}}?</p><br>
         <button class="button is-danger mr-5" @click="deleteFunction">Sim</button>
            <button class="button is-success" @click="fechar" >Não</button>
     </div>
 </template>
 
 <script>
 export default {
     data(){
      return{
      }
     },
     props: {
        aparecer: Boolean,
        person_full_name: String,
        person_id: Number
     },
       methods:{
          fechar(){
                this.$emit('fechar')
          },
            deleteFunction(){
               this.$emit('deleteFunction', {person_full_name:this.person_full_name, person_id:this.person_id})
            }
       }
 }
 </script>
 
 <style>
 .sobreposto{
    position: fixed !important;
    z-index: 100;
    top: 30vh;
    left: 34vw;
    width: 30%;


        
 }
 </style>