import Vue from 'vue'
import VueRouter from 'vue-router'

import ClassRoom from '../views/pages/ClassRoom.vue'
import ClassRoomDetail from '../views/pages/ClassRoomDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'class-room',
      component: ClassRoom
    },
    {
      path: '/class-rrom-detail',
      name: 'class-room-detail',
      component: ClassRoomDetail
    },
  ]
})

export default router
