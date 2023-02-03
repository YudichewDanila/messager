import {authorizToken, requestPOST} from './request'
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";

const toast = useToast();



export async function getUserProfilefetch(Token){
    const store = useStore();
    let profel = {};
    if(Token){
    await authorizToken('getUserProfile',Token).then((res)=> profel = res);
    store.dispatch('myprofel', profel);
    return profel;
    }
}

export async function updateUserProfile(profile, store){
        profile.id = store.getters.myprofel.id;
        profile.surname = store.getters.myprofel.surname;
        profile.name = store.getters.myprofel.name;
        profile.image = store.getters.myprofel.image;  
    
        return await profile;
}


export async function updateDataProfel(profelData, store){
    if((/\s*\S+.*/.test(profelData.Surname))&&(/\s*\S+.*/.test(profelData.Name))){ 
        requestPOST('updateUserProfile', profelData);
        let profile = {
            id: profelData.Id,
            surname: profelData.Surname,
            name: profelData.Name,
            image: profelData.Image,
            }
            toast.success("Данные обновлены", {
                timeout: 10000
            });
            store.dispatch('myprofel', profile);
    }
    else{
        toast.error("Данные не корректны", {
            timeout: 10000
        });
    }
}