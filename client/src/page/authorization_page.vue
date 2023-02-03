<template>
    <div class="authorization" >
        <div class="authorization_block" >
           <enterform v-if="authtype"/>
           <registration v-if="!authtype"/>
        </div>
    </div>
</template>

<script>
import enterform from '../components/components_authorization/authorization_enterform.vue';
import registration from '../components/components_authorization/authorization_registration.vue';
import {ref, computed } from 'vue'
import { useStore } from 'vuex'


export default ({
    name:"authorization",
    components:{
        enterform,
        registration
    },
    setup() {
        const store = useStore();
       
        let authtype = ref(store.getters.AuthType);
        authtype = computed(()=>store.getters.AuthType);
        return{
            authtype
        }
    },

})
</script>

<style lang="scss" scoped>
.authorization{
    background: #2e2e2e;
    width: 100%;
    height: 100%;
    position: fixed;
    .authorization_block{
        margin:10% auto;
        width:40%;
        height:50%;
    }  
}

@media screen and (max-width: 769px) {
    .authorization{
    background: #2e2e2e;
    width: 100%;
    height: 100%;
    position: fixed;
    .authorization_block{
        margin:15% auto;
        width:110%;
        height:70%;
    }  
}
}
</style>