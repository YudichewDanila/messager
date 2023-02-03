<template>
   <div class="authorization_registration" >
        <button class="authorization_buttonshowregister"  v-on:click="inverauthtype()">Авторизация</button>
        <form @submit.prevent="registrationRequest()">
            <input v-model="registration.inputSurname" class="authorization_inputenter" placeholder="Фамилия"/>
            <input v-model="registration.inputName" class="authorization_inputenter" placeholder="Имя" />
            <input v-model="registration.inputLogin" class="authorization_inputenter" placeholder="Логин"/>
            <input v-model="registration.inputPassword" class="authorization_inputenter" placeholder="Пароль" />
            <button class="authorization_buttonforenter">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script>
import {reactive, ref} from 'vue'
import { useStore } from 'vuex'
import {requestPOST} from '../../request/request'
import { useToast } from "vue-toastification";
export default {
    name:"registration",
    setup(){
        const registration = reactive({
            inputSurname:'',
            inputName:'',
            inputLogin:'',
            inputPassword:'',
    })
        const store = useStore();

        const toast = useToast();
        const eror = ref(null);

        function inverauthtype(){
            store.dispatch('authtypeer', true);
        }
         function registrationRequest(){
        requestPOST('registrationuser', registration).then((res)=>  eror.value = res);
        
            setTimeout(()=>{
            if(typeof eror.value.message == 'string' && eror.value.status != 200){
                toast.error(eror.value.message);
            }
            else if (typeof eror.value.message == 'string' && eror.value.status == 200){
                toast.success(eror.value.message);
            }
            else if (typeof eror.value.message == 'object'){
                for(let i = 0; i < eror.value.message.length; i++){
                    toast.error(eror.value.message[i].msg);
                }
            }
             
        }, 200);
        
           
        }
        return{
            inverauthtype,
            registrationRequest,
            registration,
        }
    }
}
</script>

<style lang="scss" scoped>
  .authorization_registration{
        width:70%;
        height:100%;
        margin:0% auto;

        form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height:100%;
            gap:10%;
            border:solid 2px rgb(36, 36, 36);
            background: rgb(36, 36, 36);
            border-top-left-radius:0px;
            border-top-right-radius: 15px;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            color:rgb(112, 112, 112);
        }
    }  
</style>