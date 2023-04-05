<template>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="card">
                <div class="card-content">
                    <div class="content is-align-items-center">
                        <div class="is-flex is-justify-content-space-between">
                            <p class="pt-3 title is-6">{{ person_full_name }}</p>
                            <div>
                            <button class="button is-info mr-3" @click="editMe()">Editar</button>
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
    name: 'personComponent',
    data() {
        return {
            dados: {
                person_id: 0,
                person_full_name: '',
                person_rfid: 0,
                person_course: '',
                person_enrollment: 0,
                person_email: ''
            }
            
        }
    },
    props: {
        person_full_name: String,
        person_id: Number,
        person_rfid: Number,
        person_course: String,
        person_enrollment: Number,
        person_email: String

    },
    methods: {
        deleteMe(){
            this.$emit('deleteMe', {id:this.person_id, name:this.person_full_name})
        },
        editMe(){
            this.dados={
                person_id: this.person_id,
                person_full_name: this.person_full_name,
                person_rfid: this.person_rfid,
                person_course: this.person_course,
                person_enrollment: this.person_enrollment,
                person_email: this.person_email
            }
            this.$emit('editMe', this.dados)
        }
    }
}
</script>


<style>

</style>