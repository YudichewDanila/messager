<template>
   <div class="authorization_enterform" >
        <button class="authorization_buttonshowregister" v-on:click="inverauthtype()">Регистрация</button>
        <form  @submit.prevent="auth()">
            <input v-model="authoriz.inputLogin"  class="authorization_inputenter" placeholder="Логин"/>
            <input v-model="authoriz.inputPassword" class="authorization_inputenter" placeholder="Пароль" />
            <button class="authorization_buttonforenter">Войти</button>
        </form>
    </div>
</template>

<script>
import {reactive, computed, ref} from 'vue'
import { useStore } from 'vuex'
import {requestPOST} from '../../request/request'
import {useRouter} from 'vue-router'
import { useToast } from "vue-toastification";

export default {
    name:"enterform",
    setup(){
        const store = useStore();
        const route = useRouter();
        const authoriz = reactive({
            inputLogin:'',
            inputPassword:'',
    })
    let token = ref(null);
    const toast = useToast();

        function inverauthtype(){
            store.dispatch('authtypeer', false);
        }
        async function auth(){
            await requestPOST('auth', authoriz).then((res)=> token.value = res);
                try{
                    if(token.value?.token != null && token.value?.token != undefined){
                        localStorage.setItem('jwtTockenpush', token.value.token);
                        localStorage.setItem('authorizStatus', true);
                        route.push('/');
                    }
                    else{
                        toast.error(token.value.message);
                    }
                }catch(e){
                    toast.error(e);
                }
        }
        
       
        return{
            inverauthtype,
            auth,
            authoriz,
        }
    }
}
</script>

<style lang="scss" scoped>
 .authorization_enterform{
        width:70%;
        height:100%;
        margin:0% auto;

        form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height:90%;
            gap:10%;
            border:solid 2px rgb(36, 36, 36);
            background: rgb(36, 36, 36);
            border-top-left-radius:0px;
            border-top-right-radius: 15px;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            color:rgb(112, 112, 112);
           
          
        }
        ::-webkit-input-placeholder {
            text-align:center;
        }
        
    }

</style>