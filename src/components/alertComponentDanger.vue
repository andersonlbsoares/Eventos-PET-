<template>
   <div v-show="aparecer" class="sobreposto is-danger notification">
      <button class="delete" @click="fechar"></button>
      {{err}}
    </div>
</template>

<script>
export default {

    props: {
        aparecer: Boolean,
        err: String,
        fechar: Function
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