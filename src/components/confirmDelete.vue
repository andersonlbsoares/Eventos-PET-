<template>
    <div class="sobreposto is-white box notification">
       <button class="delete" @click="closeDelete"></button>
      <br><p class="subtitle is-5">Tem certeza que deseja deletar {{name}}?</p><br>
         <button class="button is-danger mr-5" @click="deleteEvent">Sim</button>
            <button class="button is-success" @click="closeDelete" >Não</button>
     </div>
 </template>
 
 <script>
 export default {

     props: {
        name: String,
        idEvent: Number
     },
     methods:{
         deleteEvent(){
             this.$emit('deleteFunction', {nameEvent:this.name, idEvent:this.idEvent});
         },
         closeDelete(){
             this.$emit('closeDelete');
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