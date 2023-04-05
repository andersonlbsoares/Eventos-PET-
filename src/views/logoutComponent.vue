<template>
<div></div>
</template>

<script>
export default {
    name: 'logoutComponent',
    created: function(){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('exp')
        this.$router.push({ name: 'login' })
    }
}
</script>

<style>

</style>