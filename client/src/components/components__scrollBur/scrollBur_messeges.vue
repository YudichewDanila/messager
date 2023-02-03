<template>
    <div class="messeges">
        <div class="messeges_item" v-for="(item, index) in Users" :key="index" v-on:click="showChat(item.idToUser, item.idToUserName, item. idToUserSurname)">
            <img class="messeges_img" :src="`assets/img/avatarlist/${item.idToUserImageAvatar}`" />
            <div   class="messeges_text">
                <p class="namePerson"> {{item.idToUserSurname+' '}}{{item.idToUserName}}</p>
            </div>
        </div>              
    </div>
</template>
<script>
import {ref, reactive, computed } from 'vue';

import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import {authorizToken} from '../../request/request';

export default ({
    setup() {
    const store = useStore();
    const Users = ref([]);
    let Token = ref(localStorage.getItem('jwtTockenpush'));

    async function get(){
        await authorizToken('user', Token.value).then((res)=>Users.value = res);
    }

    function showChat(id, surname, name){
        let idd = {
            id:id,
            surname:surname,
            name:name,
        }
        
        store.dispatch('updatetoid', idd);
        store.dispatch('mainchat', true);
        if(window.innerWidth < 426 ){
            store.dispatch('mainscrollbur', false);
        }
    }

    onMounted(()=>{
            get();
        })
    
    return{
        Users,
        showChat
    }
    
    },
})
</script>

<style lang="scss" scoped>
 .messeges{
            width:90%;
            height:100%;
            margin-left:5%;
            cursor: pointer;
            animation-duration: 0.5s;
            animation-name: messeges;
            

        .messeges_item{
            display: flex;
            width:100%;
            height:10%;
            margin-top:5%;
        }
        .messeges_img{
            border:rgb(52, 51, 51) 2px solid;
            border-radius:50px;
            width: 50px;
            height:50px;
        }
        .messeges_text{
            width:70%;
            padding-left:10%;
            padding-top:2%;
            
            color:white;
        }
        .namePerson{
            font-size:20px;
        }
        .statusPerson{
            margin-top:2%;
            font-size:14px;
        }} 
        @keyframes messeges{
            from {
                margin-left:0%;
                opacity:0;
            }
            to {
                opacity:1;
            }
        }
</style>
