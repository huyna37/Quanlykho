<template>
    <loading v-show="isLoading" v-model:active="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="true" />
    <router-view></router-view>
</template>
  
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { mapState } from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapState({
            isLoading: state => state.app.isLoading
        })
    },
    components: {
        Loading
    },
    methods: {
        onCancel() {
            console.log('User cancelled the loader.')
        }
    },
}
</script>
  
<style></style>
  