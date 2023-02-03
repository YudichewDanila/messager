<template>
    <div class="main_profel" v-if="statusProfel">
    <teleport to="#app">
        <div class="wrapper" v-if="renderCropp"></div>
        <div class="wrapCropper" v-if="renderCropp">
            <vue-cropper
                v-if="renderCropp"
                class="vCropper"
                ref="Cropp"
                :src="ImageFile"
                :zoomable="false"
                alt="Source Image"
                :viewMode="1"
                :aspectRatio="1/1">
            </vue-cropper> 
            <button v-on:click="cropImage" class="finishCropButton">Завершить</button>
            <button class="exitFromCrop" v-on:click="closeImage()">X</button>
        </div>
    </teleport>
    

        <h1>Профель</h1>
        <div class="main_setingprofel"> 
            <div class="main_seting">
                <input v-model="profelData.Surname" placeholder="Фамилия" class="main_Input"/>
                <input v-model="profelData.Name" placeholder="Имя" class="main_Input"/>
                <input v-show="false" v-on:change="handleChange" ref="uploadfile" accept="image/*, .png, .jpg, .gif" type="file"/>
                <button class="main_Input updateDataUser" v-on:click="updateDataUser">Изменить</button>
            </div>
            <div class="main_profelshow">
                <div class="mainprofel_descriptiontext">
                    <p class="mainprofel_Surname">Фамилия: {{profel.surname}}</p>
                    <p class="mainprofel_Name">Имя: {{profel.name}}</p>
                    <button v-on:click="uploadImage" class="main_addPhotoButton">Добавить фото</button>
                </div> 
 
                <img v-if="profel.image !=''" class="myprofel_img" :src="`assets/img/avatarlist/${profel.image}`"/>
              
            </div>
        </div>

    </div>
</template>

<script>
import {ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import {requestPOST, downloadAvatar} from '../../request/request';
import {updateDataProfel, updateUserProfile} from '../../request/getProfile'
import VueCropper from 'vue-cropperjs';
import { useToast } from "vue-toastification";
import 'cropperjs/dist/cropper.css';
export default({
    name:'main_profel',
    components: { VueCropper},
    setup() {
        const store = useStore();
        const statusProfel = computed(()=>ref(store.getters.mainProfel).value);
        const profel = computed(()=>ref(store.getters.myprofel).value);
       
        const uploadfile = ref(null);
        const ImageFile = ref('');
        const NewImage = ref('');
        const renderCropp = ref(false);
        const Cropp = ref(null);
        const toast = useToast();

        const profelData = reactive({
            Id:'',
            Surname:'',
            Name:'',
            Image:'',
        });
        
      
        async function updateDataUser(){
            profelData.Id = profel.value.id;
            profelData.Image = profel.value.image;
            updateDataProfel(profelData, store); 
        }
        

        function uploadImage(){
            uploadfile.value.click();
        }

        function handleChange(event){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = function(){
                ImageFile.value = fileReader.result;
            if(event.target.files[0].type == 'image/gif'){
                NewImage.value = ImageFile.value;
                if(NewImage.value){
                    fetch(NewImage.value)
                    .then(res => res.blob())
                    .then(blob=>{
                        NewImage.value = new File([blob], profel.value.id, {type:blob.type});
                        downloadAvatar('addAvatar', NewImage.value);
                    })
                }
                
            }else{
                renderCropp.value = true;
               }
            }
        }

        function cropImage(){
            NewImage.value = Cropp.value.getCroppedCanvas().toDataURL();
            if(NewImage.value){
                fetch(NewImage.value)
                .then(res => res.blob())
                .then(blob=>{
                    NewImage.value = new File([blob], profel.value.id, {type:blob.type});
                    downloadAvatar('addAvatar', NewImage.value);
                    renderCropp.value = false;
                })
            }
        }
 
        function closeImage(){
            renderCropp.value = false
            store.dispatch('mainprofel', false);
            setTimeout(()=>store.dispatch('mainprofel', true), 300);
        }


        return{
            statusProfel,
            profel,
            updateDataUser,
            uploadImage,
            handleChange,
            cropImage,
            closeImage,
            profelData,
            uploadfile,
            ImageFile,
            renderCropp,
            Cropp,
            NewImage

        }
    },
})
</script>

<style lang="scss" >
.wrapper{
    position: fixed;
    width:100%;
    height:100%;
    background: rgba(36, 40, 44, 0.436);
    z-index:0;
}
 .wrapCropper{
        display: flex;
        width:800px;
        height:600px;
        margin:5% 25%;
        border:solid 2px rgb(36, 40, 44); 
        background: rgb(36, 40, 44);
        position: absolute;
        z-index:1;

       
        .finishCropButton{
            width:30%;
            height:10%;
            margin-top:67%;
            font-size:18px;
            background:rgb(36, 40, 44);
            color: white; 
            border:solid 1px gray;
        }

        .exitFromCrop{
            position:absolute;
            margin-left:96%;
            width: 30px;
            height: 30px;
            color:white;
            background: #30384100;
            border:solid 1px white;
        }

        .vCropper{
        
            
        .cropper-crop-box, .cropper-view-box {
            border-radius: 50%;
        }
        .cropper-view-box {
            box-shadow: 0 0 0 1px rgb(5, 193, 144);
            outline: 0;
        }

        .cropper-point{
            background:  rgb(5, 193, 144) !important;
        }

        .cropper-face {
        background-color:inherit !important;
        }

        .cropper-dashed, .cropper-point.point-se, .cropper-point.point-sw, .cropper-point.point-nw,   .cropper-point.point-ne, .cropper-line {
        display:none !important;
        }

        .cropper-view-box {
            outline:inherit !important;
        }
    }

}



    .main_profel{
        margin:2%;
        color:white;     
       
    .main_setingprofel{
        display: flex;
        width: 100%;
        margin-top:2%;
       

    .main_seting{
        width: 60%;
        margin:2%;

        .main_Input{
            width: 80%;
            height:35%;
            font-size:18px;
            background: rgba(46, 46, 46, 0);
            color:white;
            margin-top:1%;
            border:solid 1px white; 
        }

        .updateDataUser:active{
            background: rgb(107, 107, 107);
        }
        
    }

    .main_profelshow{
        display: flex;
        width:40%;
        border-radius:10px;
        padding:1%;
        border:solid 2px solid rgb(36 40 44);
        background: rgb(36 40 44);

        .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            background: silver;
            border-radius:50px;
            margin:2%;
            width: 85px;
            height:85px;
        }
        .mainprofel_descriptiontext{
            width:60%;
            word-wrap: break-word;
            font-size: 20px;
            margin:2%;
            padding-top:2%;

            .main_addPhotoButton{
                width:70%;
                height:25px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #303841;
            }

            .main_addPhotoButton:active{
                width:70%;
                height:25px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #303841;
            }
        }
    }
    }
    
    }
    @media screen and (max-width: 426px) {
    
    .wrapper{
    position: fixed;
    width:100%;
    height:100%;
    background: rgba(36, 40, 44, 0.436);
    z-index:0;
}
 .wrapCropper{
        display: flex;
        width:300px !important;
        height:300px !important;
        margin:5% 25%;
        border:solid 2px rgb(36, 40, 44); 
        background: rgb(36, 40, 44);
        position: absolute;
        z-index:1;

       
        .finishCropButton{
            width:60% !important;
            height:10%;
            margin-top:67%;
            font-size:18px;
            background:rgb(36, 40, 44);
            color: white; 
            border:solid 1px gray;
        }

        .exitFromCrop{
            position:absolute;
            margin-left:90% !important;
            width: 30px;
            height: 30px;
            color:white;
            background: #30384100;
            border:solid 1px white;
        }

        .vCropper{
            width:300px;
            height:300px;
  
        
            
        .cropper-crop-box, .cropper-view-box {
            border-radius: 50%;
        }
        .cropper-view-box {
            box-shadow: 0 0 0 1px rgb(5, 193, 144);
            outline: 0;
        }

        .cropper-point{
            background:  rgb(5, 193, 144) !important;
        }

        .cropper-face {
        background-color:inherit !important;
        }

        .cropper-dashed, .cropper-point.point-se, .cropper-point.point-sw, .cropper-point.point-nw,   .cropper-point.point-ne, .cropper-line {
        display:none !important;
        }

        .cropper-view-box {
            outline:inherit !important;
        }
    }

}



    .main_profel{
        margin:2%;
        color:white;     
       
    .main_setingprofel{
        display: flex;
        width: 100%;
        margin-top:2%;
        flex-direction: column;
      

    .main_seting{
        width: 100%;
        margin:5%;

        .main_Input{
            width: 90%;
            height:45%;
            font-size:18px;
            background: rgba(46, 46, 46, 0);
            color:white;
            margin-top:5%;
            border:solid 1px white; 
        }

        .updateDataUser:active{
            background: rgb(107, 107, 107);
        }
        
    }

    .main_profelshow{
        display: flex;
        width:80%;
        height:230px;
        border-radius:10px;
        flex-direction: column;
        padding:10%;
        border:solid 2px solid rgb(36 40 44);
        background: rgb(36 40 44);
        

        .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            background: silver;
            border-radius:50px;
            margin:2%;
            width: 85px;
            height:85px;
            order:0;
        
        }
        .mainprofel_descriptiontext{
            width:80%;
            word-wrap: break-word;
            font-size: 20px;
            margin:2%;
            padding-top:2%;
            order:1;

            .main_addPhotoButton{
                width:100%;
                height:45px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #303841;
                order:2;
            }

            .main_addPhotoButton:active{
                width:100%;
                height:45px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #485462;
            }
        }
    }
    }
    }
}
@media screen and (max-width: 769px) {
    
    .wrapper{
    position: fixed;
    width:100%;
    height:100%;
    background: rgba(36, 40, 44, 0.436);
    z-index:0;
}
 .wrapCropper{
        display: flex;
        width:800px;
        height:600px;
        margin:5% 25%;
        border:solid 2px rgb(36, 40, 44); 
        background: rgb(36, 40, 44);
        position: absolute;
        z-index:1;

       
        .finishCropButton{
            width:30%;
            height:10%;
            margin-top:67%;
            font-size:18px;
            background:rgb(36, 40, 44);
            color: white; 
            border:solid 1px gray;
        }

        .exitFromCrop{
            position:absolute;
            margin-left:96%;
            width: 30px;
            height: 30px;
            color:white;
            background: #30384100;
            border:solid 1px white;
        }

        .vCropper{
        
            
        .cropper-crop-box, .cropper-view-box {
            border-radius: 50%;
        }
        .cropper-view-box {
            box-shadow: 0 0 0 1px rgb(5, 193, 144);
            outline: 0;
        }

        .cropper-point{
            background:  rgb(5, 193, 144) !important;
        }

        .cropper-face {
        background-color:inherit !important;
        }

        .cropper-dashed, .cropper-point.point-se, .cropper-point.point-sw, .cropper-point.point-nw,   .cropper-point.point-ne, .cropper-line {
        display:none !important;
        }

        .cropper-view-box {
            outline:inherit !important;
        }
    }

}



    .main_profel{
        margin:2%;
        color:white;     
       
    .main_setingprofel{
        display: flex;
        width: 90%;
        margin-top:2%;
        flex-direction: column;
      

    .main_seting{
        width: 100%;
        margin:5%;

        .main_Input{
            width: 90%;
            height:45%;
            font-size:18px;
            background: rgba(46, 46, 46, 0);
            color:white;
            margin-top:5%;
            border:solid 1px white; 
        }

        .updateDataUser:active{
            background: rgb(107, 107, 107);
        }
        
    }

    .main_profelshow{
        display: flex;
        width:80%;
        height:230px;
        border-radius:10px;
        flex-direction: column;
        padding:10%;
        border:solid 2px solid rgb(36 40 44);
        background: rgb(36 40 44);
        

        .myprofel_img{
            border:rgba(88, 87, 87, 0.742) 2px solid;
            background: silver;
            border-radius:50px;
            margin:2%;
            width: 85px;
            height:85px;
            order:0;
        
        }
        .mainprofel_descriptiontext{
            width:80%;
            word-wrap: break-word;
            font-size: 20px;
            margin:2%;
            padding-top:2%;
            order:1;

            .main_addPhotoButton{
                width:100%;
                height:45px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #303841;
                order:2;
            }

            .main_addPhotoButton:active{
                width:100%;
                height:45px;
                margin-top:2%;
                font-size: 14px;
                color:white;
                border:solid 1px white;
                background: #485462;
            }
        }
    }
    }
    }
}

</style>