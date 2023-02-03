<template>      
        <div class="myprofel" >
            <transition name="nuvbur">
            <div class="myprofel_nuvbur" v-if="nuvburShow">
            <div  class="myprofel_Profel" v-on:click="nuvburShow = !nuvburShow">   
            <img class="myprofel_img" v-if="profile.image !=''" :src="`assets/img/avatarlist/${profile.image}`"/>    
            <p class="myprofel_text">{{profile.surname+' '}}{{profile.name}}</p>
            </div>
                <button class="myprofel_nuvburButton" v-on:click="openProfel">Профель</button>
            </div>
            </transition>

            <div v-if="!nuvburShow" class="myprofel_blockprofel" v-on:click="nuvburShow = !nuvburShow">   
            <img class="myprofel_img" v-if="profile.image !=''" :src="`assets/img/avatarlist/${profile.image}`"/>    
                <p class="myprofel_text">{{profile.surname+' '}}{{profile.name}}</p>
            </div>  

        </div>
</template>

<script>
import {ref, reactive, computed, watchEffect} from 'vue';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'
import {getUserProfilefetch, updateUserProfile} from '../../request/getProfile'
export default {
    name:"main_blockprofile",
    setup(){
        const store = useStore();
        const route = useRouter();
        let profile = reactive({
            id:'',
            name:'',
            surname:'',
            image:'',
        })

       let Token = ref(localStorage.getItem('jwtTockenpush'));
       
        let nuvburShow = ref(false);

        watchEffect(() => {  
            updateUserProfile(profile, store).then((res)=> profile = res); 
            
        });

        function openProfel(){
            store.dispatch('clierstatus');
            store.dispatch('mainprofel', true);
            if(window.innerWidth < 426 ){
            store.dispatch('mainscrollbur', false);
        }
        }
        

    onMounted(()=>{
        getUserProfilefetch(Token.value);
        updateUserProfile(profile, store).then((res)=> profile = res); 
        
        if(Token.value == ''){
            localStorage.removeItem('authorizStatus');
            route.push('/auth');
        }
    })
  
        return{
            profile,
            nuvburShow,
            openProfel
        }
    }

}
</script>

<style lang="scss" scoped>

    .myprofel{
        display: flex;
        width: 100%;
        height:9%;
        padding-top:1%;
        background: rgb(36, 40, 44);
        cursor: pointer;

        .myprofel_nuvbur{
            position: absolute;
            width:97%;
            margin-top:-22%;
            background: rgb(48, 56, 65);
            border-top-right-radius:5px;
            border-top-left-radius:5px;

            .myprofel_Profel{
            width:100%;
            display:flex;

            .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            border-radius:50px;
            margin:2%;
            width: 65px;
            height:65px;
        }

        .myprofel_text{
            width:60%;
            height:90%;
            padding:10%;
            color:white;
        }
        .myprofel_name{
            width:100%;
            height: 100%;
            font-size:24px;
        }
            }
            
            .myprofel_nuvburButton{
                width:100%;
                height:35px;
                margin-top:1%;
                background-color:rgb(36 40 44);
                border: solid 1px rgb(48 56 65);
                color:white;
                
            }
            .myprofel_nuvburButton:active{
                width:100%;
                height:35px;
                margin-top:1%;
                background-color:rgb(64, 71, 78);
                border: solid 1px rgb(48 56 65);
                color:white;
            }
        }
        .myprofel_blockprofel{
            width:100%;
            display:flex;

            .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            border-radius:50px;
            margin-left:10%;
            width: 45px;
            height:45px;
        }

        .myprofel_text{
            width:60%;
            height:90%;
            padding:5%;
            color:white;
        }
        .myprofel_name{
            width:100%;
            height: 100%;
            font-size:24px;
        }
    }
        
   

       
    }
.nuvbur-enter-active {
  animation: nuvbur-in .2s;
}
.nuvbur-leave-active {
  animation: nuvbur-in .2s reverse;
}
    @keyframes nuvbur-in {
  0% {
    transform: scale(0);
    margin-top:100%;
    opacity: 0;
  }
  50% {
    transform: scale(0.5);
    margin-top:0%;
    opacity: 0;
  }
  100% {
    transform: scale(1);
    margin-top:-22%;
    opacity: 1;
  }
}
@media (min-width: 426px) and (max-width: 929px) {
    .myprofel{
        display: flex;
        width: 100%;
        height:9%;
        padding-top:-10%;
        background: rgb(36, 40, 44);
        cursor: pointer;

        .myprofel_nuvbur{
            position: absolute;
            width:97%;
            margin-top:-52%;
            background: rgb(48, 56, 65);
            border-top-right-radius:5px;
            border-top-left-radius:5px;

            .myprofel_Profel{
            width:100%;
            display:flex;

            .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            border-radius:50px;
            margin:2%;
            width: 65px;
            height:65px;
        }

        .myprofel_text{
            width:60%;
            height:90%;
            padding:10%;
            color:white;
        }
        .myprofel_name{
            width:100%;
            height: 100%;
            font-size:24px;
        }
            }
            
            .myprofel_nuvburButton{
                width:100%;
                height:35px;
                margin-top:1%;
                background-color:rgb(36 40 44);
                border: solid 1px rgb(48 56 65);
                color:white;
                
            }
            .myprofel_nuvburButton:active{
                width:100%;
                height:35px;
                margin-top:1%;
                background-color:rgb(64, 71, 78);
                border: solid 1px rgb(48 56 65);
                color:white;
            }
        }
        .myprofel_blockprofel{
            width:100%;
            display:flex;

            .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            border-radius:50px;
            margin-left:10%;
            width: 45px;
            height:45px;
        }

        .myprofel_text{
            width:60%;
            height:90%;
            padding:5%;
            color:white;
        }
        .myprofel_name{
            width:100%;
            height: 100%;
            font-size:24px;
        }
    }
        
   

       
    }
.nuvbur-enter-active {
  animation: nuvbur-in .2s;
}
.nuvbur-leave-active {
  animation: nuvbur-in .2s reverse;
}
    @keyframes nuvbur-in {
  0% {
    transform: scale(0);
    margin-top:100%;
    opacity: 0;
  }
  50% {
    transform: scale(0.5);
    margin-top:0%;
    opacity: 0;
  }
  100% {
    transform: scale(1);
    margin-top:-22%;
    opacity: 1;
  }
}

}
@media (max-width: 320px) {
   
}
</style>