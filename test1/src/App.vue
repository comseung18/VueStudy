<template>
    <div id ="contactlist">
        <div class="page-header">
            <h1 class="text-center">연락처 관리 애플리케이션</h1>
            <p>(Dynamic Component + EventBus + Axios) </p>
        </div>
        <component :is="currentView" :contact="contact"></component>
        <contactList :contactlist="contactlist"></contactList>
    </div>
</template>

<script>
import ContactList from './components/ContactList.vue';
import AddContact from './components/AddContact.vue';
import UpdateContact from './components/UpdateContact.vue';
import UpdatePhoto from './components/UpdatePhoto';
import CONF from './Config';
import eventBus from './EventBus';
import ax from 'axios';
export default {
    name : 'app',
    components : {ContactList, AddContact, UpdateContact, UpdatePhoto},
    created() {
        this.$axios = ax;
    },
    data: function(){
        return{
            currentView : null,
            contact : {no:0, name:'', tel:'', address:'', photo:''},
            contactlist : {
                pageno : 1, pageSize: CONF.PAGESIZE, totalcount:0, contacts:[]
            }
        }
    },
    mounted() {
        this.fetchContacts();
        eventBus.on("cancel",()=>{
            this.currentView = null;
        });
        eventBus.on("addSubmit", (contact)=>{
            this.currentView = null;
            this.addContact(contact);
        });
        eventBus.on("updateSubmit", (contact)=>{
            this.currentView = null;
            this.updateContact(contact);
        });
        eventBus.on("addContactForm",()=>{
            this.currentView = 'addContact';
        });
        eventBus.on("editContactForm", (no)=>{
            this.fetchContactOne(no);
            this.currentView = 'updateContact';
        });
        eventBus.on("deleteContact", (no)=>{
            this.deleteContact(no);
        });
        eventBus.on("editPhoto", (no)=>{
            this.fetchContactOne(no);
            this.currentView = 'updatePhoto';
        });
        eventBus.on("updatePhoto", (no, file)=>{
            if(typeof file !== 'undefined'){
                console.log('여기까지도 왔음')
                this.updatePhoto(no, file);
            }
            this.currentView = null;
        });
        eventBus.on("pageChanged", (page)=>{
            this.pageChanged(page);
        })
    },
    methods: {
        pageChanged : function(page){
            console.log(page);
            this.contactlist.pageno = page;
            this.fetchContacts();
        },
        fetchContacts : function(){
            this.$axios.get(CONF.FETCH,{
                params : {
                    pageno: this.contactlist.pageno,
                    pagesize: this.contactlist.pagesize
                }
            })
            .then((response)=>{
                this.contactlist = response.data;
            })
            .catch((ex)=>{
                console.log('fetchContacts failed', ex);
                this.contactlist.contacts= [];
            })
        },
        addContact : function(contact){
            this.$axios.post(CONF.ADD, contact)
            .then((response)=>{
                if(response.data.status=== 'success'){
                    this.contactlist.pageno = 1;
                    
                    this.fetchContacts();
                }else{
                    console.log('연락처 추가 실패 : ' + response.data.message);
                }
            })
            .catch((ex)=>{
                console.log('addContact failed : ', ex);
            })
        },
        updateContact : function(contact){
            this.$axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
            .then((response)=>{
                if(response.data.status === 'success'){
                    this.fetchContacts();
                }else{
                    console.log('연락처 변경 실패 : ' + response.data.message);
                }
            })
            .catch((ex)=>{
                console.log('updateContact failed : ', ex);
            })
        },
        fetchContactOne : function(no){
            this.$axios.get(CONF.FETCH_ONE.replace("${no}", no))
            .then((res)=>{
                this.contact = res.data;
            })
            .catch((ex)=>{
                console.log('fetchContactOne failed', ex);
            })
        },
        deleteContact : function(no){
            this.$axios.delete(CONF.DELETE.replace("${no}", no))
            .then((res)=>{
                if(res.data.status === 'success'){
                    this.fetchContacts();
                }else{
                    console.log('연락처 삭제 실패 : ' + res.data.message);
                }
            })
            .catch((ex)=>{
                console.log('delete failed', ex);
            })
        },
        updatePhoto : function(no, file){
            console.log('사진 업데이트 ㄱㄱ');
            var data = new FormData();
            data.append('photo', file);
            this.$axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
            .then((res)=>{
                if(res.data.status === 'success'){
                    this.fetchContacts();
                }else{
                    console.log('연락처 사진 변경 실패 : ' + res.data.message);
                }
            })
            .catch((ex)=>{
                console.log('updatePhoto failed', ex);
            })
        }
    },
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