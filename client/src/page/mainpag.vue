<template>
  <div>
    <main>
        <main_sideBur />
        <div class="main_additionalBur" v-if="mainscrollbur">
            <main_scrollBur :Socket="socket.sock"/>
            <main_blockprofile />
        </div>
     <div class="main_mainblock">
        <main_chat :Socket="socket.sock"/>
        <main_addfrends :Socket="socket.sock"/>
        <main_proofel />
     </div>    
    </main>
  </div>
</template>

<script>
import main_sideBur from '../components/components_sideBur/main_sideBur.vue';
import main_scrollBur from '../components/components__scrollBur/main_scrollBur.vue';
import main_blockprofile from '../components/components_profile/main_blockprofile.vue';
import main_chat from '../components/components_chat/main_chat.vue';
import main_addfrends from '../components/components_addfrends/main_addfrends.vue';
import main_proofel from '../components/components_profile/main_profel.vue';
import {reactive, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex'

export default({
name:"mainpages",
components:{
    main_sideBur,
    main_scrollBur,
    main_blockprofile,
    main_chat,
    main_addfrends,
    main_proofel,
},

setup(){
    const store = useStore();    
    const connectedWebSocket = ref(false);
    
    let socket = reactive({sock:''});
    let idChat  = ref(store.getters.myprofel);
    idChat = computed(()=>store.getters.myprofel);
    let mainscrollbur = ref(store.getters.mainScrollBur);
    mainscrollbur = computed(()=>store.getters.mainScrollBur);
    const connection = reactive({
        event:'connect',
        id:'',
    })
    watchEffect(()=> {
    if(idChat.value.id){ 
        connection.id = idChat.value.id;
        socket.sock = new WebSocket('ws://localhost:8083');
        
       if(!connectedWebSocket.value){
           socket.sock.onopen = () =>{
           connectedWebSocket.value = true;
           socket.sock.send(JSON.stringify(connection));
       }
   }
}
})
    
    return{
        socket,
        mainscrollbur
    }
},
})
</script>

<style lang="scss" scoped>
.main_additionalBur{
    position: fixed;
    width:21%;
    height:100%;
    margin-left:5%;
}
.main_mainblock{
    width:75%;
    height:100%;
    margin-left:25%;
    background: #303841;
    position: fixed;
}

@media screen and (max-width: 769px) {
    .main_additionalBur{
    position: fixed;
    z-index:1;
    width:85%;
    height:100%;
    margin-left:15%;
}
.main_mainblock{
    width:85%;
    height:100%;
    margin-left:15%;
    background: #303841;
    position: fixed;
}
}
</style>
