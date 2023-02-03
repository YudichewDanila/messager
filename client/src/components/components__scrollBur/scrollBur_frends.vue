<template>
    <div>
        <div 
        v-for="(item, index) in frends" 
        :key="index" class="frends_item" 
        v-on:click="showChat(item.status, item.idToUser, item.idToUserSurname, item.idToUserName)"
        >
            <img class="frends_img" :src="`assets/img/avatarlist/${item.idToUserImageAvatar}`" />
            <div  class="frends_text">
                <p class="namePerson">{{item.idToUserSurname+' '}}{{item.idToUserName}}</p>
                <div v-show="item.status == 0">Ожидайте подтверждения от другого пользователя</div>
                <div class="btnconfirmation" v-show="item.status == 1">
                    <button class="AddFrendBtn" v-on:click="updateFrendFunction(item.idToUser, 2, item.idToUserSurname, item.idToUserName)">Добавить</button>
                    <button class="DeletFrendBtn" v-on:click="updateFrendFunction(item.idToUser, 3, item.idToUserSurname, item.idToUserName)">Отклонить</button>
                </div>
            </div>    
        </div>   
    </div>
</template>

<script>
import {ref,  toRefs, reactive, computed, watchEffect } from 'vue';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { requestGET, requestPUT, requestPOST } from '../../request/request';
import { useToast } from "vue-toastification";
export default ({
    name:'scrollBur_frends',
    props: {
        Socket:{}
    },
    setup(props) {
        const store = useStore();
        const myProfel = computed(()=>ref(store.getters.myprofel).value);
        const updatefrend = computed(()=>ref(store.getters.updateFrend).value);
        const frends = ref([]);
        const toast = useToast();
        let socket = toRefs(props);
        socket = socket.Socket;
     
        const message = computed(()=> reactive({
            event:'updatedata',
            id:myProfel.value.id,
            idto:'',
            name:'',
            status:'true',
            status2:null,
        }));
        
       



        function showFrends(){
            const dataFrend = new Promise(async (resolve, reject)=>{
            await requestGET('getfrend?idUser='+myProfel.value.id).then((res)=> frends.value = res); 
            resolve(frends.value);
            })
            dataFrend.then( d =>{
                d.sort((a,b)=>{
                    return a.idToUserSurname > b.idToUserSurname ? 1 : -1;
                })
            })
            
        }

        function updateFrendFunction(id, status, surname, name){
            let data = {userid:id, usertoid:myProfel.value.id, status:status}
            requestPUT('updatestatusfrend', data);
            message.value.idto = id;
            message.value.status2 = status;
            message.value.name = myProfel.value.surname+' '+ myProfel.value.name;
            socket.value.send(JSON.stringify(message.value));
            showFrends();
            switch (data.status){
                case 2:
                toast(`Вы приняли предложение пользователя ${surname+' '+ name}, пользователь добавлен`); 
                break
                case 3:
                toast(`Вы отклонили предложение пользователя ${surname+' '+ name}`);
                break
            }
        }

        function showChat(status, id, surname, name){
        if(status == 2){
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
    }

        
        watchEffect(()=>{
          
            if(updatefrend.value){
                showFrends();

            }
                  
        })

        onMounted(()=>{
            store.dispatch('updatefrend', true);
        })

        return{
            frends,
            updateFrendFunction,
            showChat
        }
    },
})
</script>

<style lang="scss" scoped>
 .frends_item{
            display: flex;
            width:90%;
            height:10%;
            margin:5%;


            .btnconfirmation{
                display: flex;
                margin-top:2%;
                .AddFrendBtn{
                    width:50%;
                    background: green;
                    border:solid 1px green;
                    color: white;
                }
                
                .DeletFrendBtn{
                    width:50%;
                    background: rgb(231, 3, 3);
                    border:solid 1px rgb(231, 3, 3);
                    color: white;
                }
            }
        }
        .frends_img{
            border:rgb(52, 51, 51) 2px solid;
            border-radius:50px;
            width: 50px;
            height:50px;
        }
        .frends_text{
            width:70%;
            padding-left:10%;
            padding-top:2%;
            
            color:white;
        }
        .namePerson{
            font-size:20px;
        }
</style>