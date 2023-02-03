<template>
    <div class="chat" v-if="stateChat">
            <div class="chat_heder">
                <div class="chat_touser">
                    <p>{{touser.Surname+' '}}{{touser.Name}}</p>
                </div>
            </div>
            <div class="chat_showblock" ref="chatShowblock">
                <div v-for="(item, index) in messeges" :key="index" class="chat_messege">
                    <div class="chat_blockL" v-if="item.idto == toidChat.id || item.idToUser == toidChat.id">
                        <p>{{item.message}}</p>
                    </div>
                    <div class="chat_blockR" v-if="item.idto != toidChat.id && item.idToUser != toidChat.id ">
                            <p>{{item.message}}</p>
                    </div>
                </div> 
            </div>
            <chat_inputblock :Socket="socket"/>
        </div>
</template>

<script>
import chat_inputblock from './chat_inputblock.vue';
import {ref, computed, watchEffect, reactive, toRefs, onMounted} from 'vue'
import {useStore} from 'vuex'
import {requestPOST} from '../../request/request'
import { useToast } from "vue-toastification";

export default {
name:"main_chat",
components:{
    chat_inputblock
},
props: {
        Socket:{}
    },
setup(props){
    const store = useStore();
    const stateChat = ref(store.getters.mainChat);
    const messeges = ref([]);
    const myProfel = computed(()=>ref(store.getters.myprofel).value);
    const toast = useToast();
    const audiosrc = 'assets/static/audio/1.wav';
    const audio = new Audio(audiosrc);
    const chatShowblock = ref(null);

    let socket = toRefs(props);
    socket = socket.Socket;

    let touser = reactive({
        Name:'',
        Surname:'',
    })

    let idChat = computed(()=>ref(store.getters.myprofel).value);
    let toidChat  = computed(()=>ref(store.getters.toidChat).value);
   
   
   watchEffect(()=> {
  
    if(toidChat.value.id){
        setTimeout(()=>{
            if(chatShowblock.value != null){
                chatShowblock.value.scrollTop = chatShowblock.value.scrollHeight;
            }
        },50)
        
        stateChat.value = false;
        messeges.value = [];
      
        let data = {
            idChat:idChat.value,
            toidChat:toidChat.value, 
        }

        requestPOST('messeges', data).then((res)=> messeges.value = res);
        stateChat.value = store.getters.mainChat;

        

        touser.Name = toidChat.value.name;
        touser.Surname = toidChat.value.surname;   
   }
  
   if(typeof(socket.value) == 'object'){
        socket.value.onmessage = (event)=>{
                let message = JSON.parse(event.data);
                if(message.status){
                    store.dispatch('updatefrend', false);
                    setInterval(()=>store.dispatch('updatefrend', message.status), 1000);  
                    if(myProfel.value.id == message.idto){
                        switch(message.status2){
                            case 0:
                                toast.info(`Новый пользователь ${message.name} послал запрос дружбы!`, {
                                    timeout: 10000
                                });
                                audio.play();
                            break
                            case 2:
                                toast.success(`Пользователь ${message.name} принял ваш запрос!`, {
                                    timeout: 10000
                                });
                                audio.play();
                            break
                            case 3:
                                toast.error(`Пользователь ${message.name} отказался дружить!`, {
                                    icon: false,
                                    timeout: 10000
                                });
                                audio.play();
                            break
                        } 
                    }
                }
            messeges.value = [...messeges.value, message]; 
        }
    }
})




    return{
        stateChat,
        toidChat,
        touser,
        socket,
        chatShowblock,
        messeges
    }
}
}
</script>

<style lang="scss" scoped>
.chat{
        width:75%;
        height:100%;
        position: fixed;
       
        .chat_heder{
            width:100%;
            height:8%;
            background-color:rgb(36, 40, 44);

            .chat_touser{
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right:5%;
                color:white;
            }
        }
        .chat_showblock{
            width:100%;
            height:80%;
            padding-top:2%;
            background: #303841;
            overflow-y:scroll;
            .chat_messege{
               width:100%;
               margin-top:1%;
            }
            .chat_blockL{
            display: flex;
            position: relative;
            font-size:18px;
            width:30%;
            margin-left:5%;
            padding: 6px 7px 8px 9px;
            word-break:break-all;
            p{
                border-top-right-radius:15px;
                border-bottom-right-radius:15px;
                border-bottom-left-radius:10px;
                padding: 6px 10px 8px 9px;
                border:solid 2px #05c190;
                background: #05c190;
                color:white;
            }
            }
            .chat_blockR{
                display: flex;
                position: relative;
                font-size:18px;
                width:20%;
                margin-left:75%;
                padding: 6px 7px 8px 9px;
                word-break:break-all ;
                p{
                    border:solid 2px rgb(41, 40, 40);
                    border-bottom-left-radius:15px;
                    border-top-left-radius:15px;
                    border-top-right-radius:15px;
                    padding: 6px 10px 8px 9px;
                    border:solid 2px #272727;
                    background: #272727;
                    color:white;
                }
                }   
        }  
    }
    @media screen and (max-width: 426px) {
        .chat{
        width:85%;
        height:100%;
        position: fixed;
    }

}
</style>