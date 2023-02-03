import { createRouter, createWebHistory  } from 'vue-router'
import {computed, ref} from 'vue'
import main_page from '../page/mainpag.vue'
import authorization_page from '../page/authorization_page.vue'
import {authorizStatus} from '../index'
const routes = [
    {
        path: '/',
        name: 'main_page',
        component: main_page,
        meta: {Auth:true}
    },
    {
        path: '/auth',
        name: 'authorization_page',
        component: authorization_page,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
  })
 

 
 
router.beforeEach(function(to,from,next){
   // if(to.meta.Auth && !authorizStatus.value) next('/auth');
   if(to.meta.Auth && !localStorage.getItem('authorizStatus')) next('/auth');
    else next();
})
    


  export default router
