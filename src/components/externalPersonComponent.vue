<template>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="card">
                <div class="card-content">
                    <div class="content is-align-items-center">
                        <div class="is-flex is-justify-content-space-between">
                            <p class="pt-3 title is-6">{{ external_person_full_name }}</p>
                            <div>
                            <button class="button is-info mr-3" @click="showMe()">Detalhar</button>
                            <button class="button is-danger" @click="deleteMe()">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'externalPersonComponent',
    data() {
        return {
            dados: {
                external_person_full_name: "",
                external_person_email: "",
                external_person_cpf: 0,
                person_full_name: "",
                external_person_id: 0
            }
        }
    },
    props: {
        external_person_full_name: String,
        external_person_email: String,
        external_person_cpf: Number,
        person_full_name: String,
        external_person_id: Number

    },
    methods: {
        showMe(){
            this.dados={
                external_person_id: this.external_person_id,
                external_person_full_name: this.external_person_full_name,
                external_person_email: this.external_person_email,
                external_person_cpf: this.external_person_cpf,
                person_full_name: this.person_full_name
            }
            this.$emit('showMe', this.dados)
        },
        deleteMe(){
            this.dados={
                external_person_full_name: this.external_person_full_name,
                external_person_id: this.external_person_id
            }
            this.$emit('deleteMe', this.dados)
        }
    }
}
</script>


<style>

</style>