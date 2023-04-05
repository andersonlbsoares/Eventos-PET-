<template>
    <div v-show="aparecer2" class="sobreposto is-success notification">
       <button class="delete" @click="fechar2"></button>
       {{err}}
     </div>
 </template>
 
 <script>
 export default {
     props: {
         aparecer2: Boolean,
         err: String,
         fechar2: Function
     }
 }
 </script>
 
 <style>
 .sobreposto{
    position: absolute  !important;
    top: 50px;
    right: 50px;
}
 </style>