<template>
    <div class="chat_inputblock">
       <div  class="chat_input" contenteditable  ref="messageBlock"></div>
            <button class="chat_submit" v-on:click="handler()">
                <img class="chat_imgiconenter" src="/assets/img/iconenter.png"/>
                <img class="chat_imgiconenteractiv" src="/assets/img/iconenteractive.png"/>
            </button>
    </div>
</template>

<script>
import { ref,  toRefs, reactive, computed, watchEffect} from 'vue'
import {useStore} from 'vuex'
export default ({
name:"chat_input",
    props: {
        Socket:{}
    },
    setup(props) {

        let store = useStore();
        let socket = toRefs(props);
        socket = socket.Socket;
        let messageBlock = ref(null);
       
        let idChat = computed(()=>ref(store.getters.myprofel).value);
        let toidChat  = computed(()=>ref(store.getters.toidChat).value);
  
    const message = computed(()=> reactive({
            event:'message',
            id:idChat.value.id,
            idto:toidChat.value.id,
            message:'',
        }));

    function handler() {
       const text = messageBlock.value.innerText;
       message.value.message = text;
       if(/\s*\S+.*/.test(text)){socket.value.send(JSON.stringify(message.value));}
       messageBlock.value.innerText = '';
    }
   
    return{
        messageBlock,
        handler
        
       }

       
       
    },
})
</script>

<style lang="scss" scoped>
  .chat_inputblock{
            display:flex;
            justify-content: center;
            position: absolute;
            bottom:0.1px;
            width:100%;
            min-height:5%;
            padding-top:1%;
            background-color: rgb(242, 247, 247);
            background-color: rgb(36, 40, 44);
        }
 .chat_input{
            width:80%;
            border-radius:5px;
            padding:1%;
            margin-bottom:2%;
            background-color: rgb(242, 247, 247);
            font-size:16px;
            flex-wrap: wrap; 
            background-color: -moz-field;
            border: 1px solid darkgray;
            box-shadow: 1px 1px 1px 0 lightgray inset;  
            margin-top: 5px;
            padding: 5px 3px;  
        }
        .chat_input:active, :hover, :focus {
            outline: 0;
            outline-offset: 0;
        }
        .chat_submit{
            width:40px;
            height:10px;
            margin:0.5%;
            background-color: rgba(0, 0, 0, 0);
            border:none;
            .chat_imgiconenter{
                width:80%;   
            } 
            .chat_imgiconenteractiv{
                width:100%;
                rotate: 90deg;
                display:none;
            }   
        }

        .chat_submit:hover{
            .chat_imgiconenter{
                width:90%;
                display:none;
            } 
            .chat_imgiconenteractiv{
                display: block;
                width:80%;
                
            }  
        }

            

</style>

