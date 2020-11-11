<template>
    <div id ="contactlist">
        <div class="page-header">
            <h1 class="text-center">연락처 관리 애플리케이션</h1>
            <p>(Dynamic Component + EventBus + Axios) </p>
        </div>
        <component :is="currentView"></component>
        <contactList></contactList>
    </div>
</template>

<script>
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';
import UpdatePhoto from './components/UpdatePhoto';

import {mapState} from 'vuex';

export default {
    name : 'app',
    components : {ContactList,ContactForm, UpdatePhoto},
    computed : mapState(['currentView'])
}
</script>

<style scoped>
#container{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>