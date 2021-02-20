import Vuex from './assets/vue/pages/vuex.vue';
import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';
//ADMIN
import AdminHomePage from './assets/vue/pages/admin/admin-home.vue';
import AdminSearchMobilityPage from './assets/vue/pages/admin/admin-search-mobility.vue';
import AdminMapPage from './assets/vue/pages/admin/admin-map.vue';
import AdminPanelLeftPage from './assets/vue/pages/admin/admin-panel-left.vue';
//USER
import UserListMobilitiesPage from './assets/vue/pages/user/user-list-mobilities.vue';
import UserHomePage from './assets/vue/pages/user/user-home.vue';
import UserPanelLeftPage from './assets/vue/pages/user/user-panel-left.vue';
import UserCreateMobilityPage from './assets/vue/pages/user/user-create-mobility.vue';
import UserModifyMobilityPage from './assets/vue/pages/user/user-modify-mobility.vue';


export default [
  {
    path: '/',
    component: Vuex
  },
  //ADMIN
  {
    path: '/admin-home/',
    component: AdminHomePage
  },
  {
    path: '/admin-search-mobility/',
    component: AdminSearchMobilityPage
  },
  {
    path: '/admin-map/',
    component: AdminMapPage
  },

  //USER
  {
    path: '/user-home/',
    component: UserHomePage
  },
  {
    path: '/user-list-mobilities/',
    component: UserListMobilitiesPage
  },
  {
    path: '/user-create-mobility/',
    component: UserCreateMobilityPage
  },
  {
    path: '/user-modify-mobility/:id/',
    component: UserModifyMobilityPage
  },
  
  //MANAGER
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },

  //PANELS
  {
    path: '/admin-panel-left/',
    component: AdminPanelLeftPage
  },
  {
    path: '/user-panel-left/',
    component: UserPanelLeftPage
  },
  {
    path: '/vuex/',
    component: Vuex
  },
];
