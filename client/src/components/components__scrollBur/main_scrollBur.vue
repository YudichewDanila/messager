<template>
  <div class="scrollBur" >
        <div class="scrollBur_header">
            <button v-on:click="cloaseScrollBur()" class="cloaseScrollBurButton">Закрыть</button>
        </div>
        <div class="scrollBur_content" >
            <scrollBur_messeges v-if="pagenumber.value == 1" />
            <scrollBur_frends v-if="pagenumber.value == 2" :Socket="socket" />
        </div>
    </div>
</template>

<script>
import scrollBur_messeges from './scrollBur_messeges.vue';
import scrollBur_frends from './scrollBur_frends.vue';
import { computed,  toRefs,  ref } from 'vue'
import { useStore } from 'vuex'
export default {
name:"main_scrollBur",
components:{
    scrollBur_messeges,
    scrollBur_frends
},
props:{
        Socket:{}
    },
setup(props){
    const store = useStore();
    let pagenumber = ref(0);
    pagenumber.value = computed(() => store.getters.PageNumber);
    let socket = toRefs(props);
    socket = socket.Socket;

    function cloaseScrollBur(){
        store.dispatch('mainscrollbur', false);
    }

    return{
        pagenumber,
        socket,
        cloaseScrollBur
    }
}
}
</script>

<style lang="scss" scoped>
 .scrollBur{
        width:100%;
        height:91%;
        background-color:rgb(36, 40, 44);

        .scrollBur_header{
            width:100%;
            height:8%;
            border-bottom:2px solid rgb(48, 56, 65);

        }
        .cloaseScrollBurButton{
               display: none;
                width:50%;
                height:100%;
                font-size:20px;
                color:white;
                background: rgb(48, 56, 65);
                border:none;
            }
        .scrollBur_content{
            width:100%;
            height:90%;
            overflow-y:scroll;
        }
}

@media screen and (max-width: 769px) {
    .scrollBur_header{
        
            width:100%;
            height:8%;
            border-bottom:2px solid rgb(48, 56, 65);

            .cloaseScrollBurButton{
                display: block;
                width:50%;
                height:100%;
                font-size:20px;
                color:white;
                background: rgb(48, 56, 65);
                border:none;
            }
        }
}

</style>