<template>
    <div class="sideBur">
        <nav class="sideBur_nuvbur">
            <button  
            class="sideBur_button"
            :class="{sideBur_activebutton:butonnactive[0]}"
            v-on:click="updatepagenumber(1)">
            <img  src="assets/img/chat.png"/>
            </button>
            <button 
            class="sideBur_button" 
            v-on:click="updatepagenumber(2), activeAddFrends()"
            :class="{sideBur_activebutton:butonnactive[1]}">
            <img  src="assets/img/contact.png"/>
            <div v-if="countFrends != 0" class="sideBur_countNewFrends">
                {{countFrends}}
            </div>
            </button>
        </nav>
        <button 
        class="sideBur_exitbutton"
        v-on:click="exitChat"
        >
            <img class="sideBur_exitbutton_exit"  src="assets/img/iconexit.png"/>
            <img class="sideBur_exitbutton_Activeexit"  src="assets/img/iconActiveExit.png"/>
        </button>
    </div>
</template>

<script>
import { computed,  ref, watchEffect } from 'vue'
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { requestGET } from '../../request/request';
export default({
    name:"main_sideBur",
    setup() {
        const store = useStore();
        const route = useRouter();
        const myProfel = computed(()=>ref(store.getters.myprofel).value);
        const updatefrend = computed(()=>ref(store.getters.updateFrend).value);
        let count = ref(0);
        let countFrends = ref(0);
        let dataFrends = ref([]);
        let butonnactive = ref([false,false,false])
   
        function updatepagenumber(num){
            store.dispatch('addcount', num);   
            count = computed(() => store.getters.PageNumber);
            for(let i=0; i<butonnactive.value.length; i++){
                butonnactive.value[i] = (count.value == (i+1)) ? true : false;
            }
            store.dispatch('mainscrollbur', true);
        }

        function activeAddFrends(){
            store.dispatch('clierstatus');
            store.dispatch('mainaddfrend', true);
        }

        function getCountFrend(id){
            const dataFrend = new Promise(async (resolve, reject)=>{
            await requestGET('getfrend?idUser='+id).then((res)=> dataFrends.value = res);
            resolve(dataFrends.value);
            })

            dataFrend.then( d =>{
                countFrends.value = 0;
                d.filter((data)=>{   
                if(data.status == 1){
                    countFrends.value++;
                }
              })
            })
       
        }

        function exitChat(){
            localStorage.removeItem('authorizStatus');
            route.push('/auth');
        }

        watchEffect(()=>{
            if(updatefrend.value){
                getCountFrend(myProfel.value.id);
            }
        })

        onMounted(()=>{
                store.dispatch('mainscrollbur', true);
                getCountFrend(myProfel.value.id);
        })
 
        return{
            updatepagenumber,
            activeAddFrends,
            exitChat,
            count,
            countFrends,
            butonnactive,
        }
    },
   
})
</script>

<style lang="scss" scoped>
.sideBur{
        width:5%;
        height:100%;
        background-color:rgb(48, 56, 65);
        position: fixed;

        .sideBur_nuvbur{
            width:100%;
            height:75%;
            margin-top:50%;
            padding-top:50%;
        }

        .sideBur_button{
            width:100%;
            height:15%;
            background-color:rgb(48, 56, 65);
            color:white;
            border:none;

            img{
                width:50%;
                pointer-events: none;
            }

            .sideBur_countNewFrends{
                border:solid 2px  rgb(5, 193, 144);
                width:28%;
                font-size:15px;
                margin-left:50%;
                background: red;
                border-radius:100%;
            }
        }
        .sideBur_exitbutton{
            width:100%;
            height:15%;
            background-color:rgb(48, 56, 65);
            color:white;
            border:none;

            .sideBur_exitbutton_exit{
                width:60%;
                pointer-events: none;
            }
            .sideBur_exitbutton_Activeexit{
                display: none;
                width:60%;
                pointer-events: none;
            }
        }

        .sideBur_exitbutton:hover{
            width:100%;
            height:15%;
            background-color:rgb(48, 56, 65);
            color:white;
            border:none;

            .sideBur_exitbutton_exit{
                display: none;
                width:60%;
                pointer-events: none;
            }
            .sideBur_exitbutton_Activeexit{
                display: block;
                width:80%;
                margin-left:12%;
                pointer-events: none;
            }
        }


        .sideBur_activebutton{
            border-left:3px solid rgb(5, 193, 144);
        }
    }

@media screen and (max-width: 769px) {
    .sideBur{
        width:15%;
        height:100%;
        background-color:rgb(48, 56, 65);
        position: fixed;
    }
}
</style>