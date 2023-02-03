<template>
    <div v-if="mainAddFrend">
       <div class="mainAddFrend_blockSerch">
            <input  v-model="serchValue" class="mainAddFrend_Serch" placeholder="Поиск..."/>
            <div class="mainAddFrend_blockUsers">
                <div v-for="(item, index) in UsersData" :key="index" class="mainAddFrend_Users">
                    <img class="mainAddFrend_img" :src="`assets/img/avatarlist/${item.ImageAvatar}`"  />
                    <p>{{item.Surname}}</p>
                    <p>{{item.Name}}</p>
                    <button v-on:click="addFrend(item._id, item.Name, item.Surname, item.ImageAvatar)">Добавить</button>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
import {ref, computed, watch, watchEffect, reactive, toRefs, onMounted} from 'vue'
import {useStore} from 'vuex'
import {requestPOST} from '../../request/request'
import { useToast } from "vue-toastification";
export default{
    name:'main_addfrends',
    props: {
        Socket:{}
    },
    setup(props) {
        const store = useStore();
        const mainAddFrend  = computed(()=>ref(store.getters.mainAddFrend).value);
        const myProfel = computed(()=>ref(store.getters.myprofel).value);
        const serchValue = ref('');
        const lastCall = ref(Date.now());
        const UsersData = ref([]);
        const toast = useToast();
        let socket = toRefs(props);
        socket = socket.Socket;
     

        function serchUsers(){ 
           let previosCall = lastCall.value;
           lastCall.value = Date.now();
           let tm = setTimeout(()=>{
                let data = {serchValue:serchValue.value, idUser:myProfel.value.id}
                requestPOST('serch', data).then((res)=> UsersData.value = res);
            }, 1000);

            if(previosCall && lastCall.value - previosCall < 1000){
                clearTimeout(tm);
                let alternative = lastCall.value;
                setTimeout(()=>{
                    if( lastCall.value == alternative){
                        return setTimeout(()=>{
                            let data = {serchValue:serchValue.value, idUser:myProfel.value.id}
                            requestPOST('serch', data).then((res)=> UsersData.value = res);
                        }, 2000);
                    }
                })
            }
        }

      

        function addFrend(id, Name, Surname, ImageAvatar){
            let data = {
                idUser:myProfel.value.id,
                idToUser:id,
                Name:Name,
                Surname:Surname,
                ImageAvatar:ImageAvatar,
                Name2:myProfel.value.name,
                Surname2: myProfel.value.surname,
                ImageAvatar2: myProfel.value.image,
                status:'0'
            }
            requestPOST('addfrend', data);
            UsersData.value = [];
            serchValue.value = '';
  
            const message = computed(()=> reactive({
            event:'updatedata',
            id:data.idUser,
            idto:data.idToUser,
            name:data.Surname2+' '+data.Name2,
            status:'true',
            status2:0,
        }));
            socket.value.send(JSON.stringify(message.value));
            toast.success("Пользователь добавлен, ожидайте подтверждения!", {
                icon: false,
                timeout: 10000
            });
        }

        watch(serchValue, ()=>{
            serchUsers();
        });

        return{
            mainAddFrend,
            serchValue,
            UsersData,
            serchUsers,
            addFrend
        }
    },
}
</script>
<style lang="scss" scoped>
.mainAddFrend_blockSerch{
    display: flex;
    width:100%;
    justify-content: center;
    margin-top:2%;
    flex-wrap: wrap;
    .mainAddFrend_Serch{
        width:80%;
        height:30px;
        padding-left:1%;
        font-size:20px;
        background: #24282c;
        border: #24282c;
        border-radius:5px;
        color: #f1ffff;
    }

    .mainAddFrend_blockUsers{
        width: 80%;

        .mainAddFrend_Users{
            display: flex;
            font-size:20px;
            margin-top: 1%;
            background: #24282c;
            border: #24282c;
            color:white;

            .mainAddFrend_img{
            border:rgb(52, 51, 51) 2px solid;
            border-radius:50px;
            margin-left:2%;
            width: 50px;
            height:50px;
        }

            p{
                margin-left: 1%;
                align-self: center;
            }

            button{
                margin-left: auto;
                color: white;
                background: #009688a1;
                border: #009688a1;
                width: 10%;
            }
        }
    }
}
@media screen and (max-width: 426px) {
    .mainAddFrend_blockSerch{
    display: flex;
    width:100%;
    justify-content: center;
    margin-top:2%;
    flex-wrap: wrap;
    .mainAddFrend_Serch{
        width:90%;
        height:30px;
        padding-left:1%;
        font-size:20px;
        background: #24282c;
        border: #24282c;
        border-radius:5px;
        color: #f1ffff;
    }

    .mainAddFrend_blockUsers{
        width: 90%;

        .mainAddFrend_Users{
            display: flex;
            font-size:20px;
            margin-top: 1%;
            background: #24282c;
            border: #24282c;
            color:white;

            .mainAddFrend_img{
            border:rgb(52, 51, 51) 2px solid;
            border-radius:50px;
            margin-left:2%;
            width: 50px;
            height:50px;
        }

            p{
                margin-left: 1%;
                align-self: center;
            }

            button{
                margin-left: auto;
                color: white;
                background: #009688a1;
                border: #009688a1;
                width: 30%;
            }
        }
    }
}
}
</style>