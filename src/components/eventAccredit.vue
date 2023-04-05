<template>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="card m-1">
                <div class="card-content">
                    <div class="content">
                        <div class="is-flex is-align-items-center is-justify-content-space-between">
                            <div class="is-inline-block">{{ event_name }}</div>
                            <div><button @click="accreditMe" class="button is-primary">Credenciar</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'eventAcrredit',
    data() {
        return {
        }
    },
    props: {
        event_name: String,
        event_id: Number
    },
    methods: {
        accreditMe() {
            this.$emit('accreditMe', this.event_id);
        }
    }
}
</script>


<style>

</style>