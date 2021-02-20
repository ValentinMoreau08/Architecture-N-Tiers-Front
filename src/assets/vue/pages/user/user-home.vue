<template>
  <f7-page>
    <f7-navbar title="Accueil - Utilisateur">
      <f7-nav-right>
         <f7-link class="panel-open" panel-open="#panel-user" icon="fas fa-bars"></f7-link>

      </f7-nav-right>
     
    </f7-navbar>
    <f7-block-title>Accueil utilisateur</f7-block-title>
    <f7-block-title class="searchbar-found">Qu'est-ce que je peux faire ?</f7-block-title>
    <f7-list class="components-list searchbar-found">

      <f7-list-item link="/user-list-mobilities/" title="Mes mobilités" panel-close>
        <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
      </f7-list-item>

    </f7-list>
   
  </f7-page>
</template>
<script>
import axios from 'axios';

export default {
 data: function() {
   const currentLoggedIn = localStorage.getItem('currentloggedin');
    return {
      linkUser: "http://localhost:8180/users/"+currentLoggedIn+"/exportDoc",

    };
  },
  components: {},
  methods: {

  }
};
</script>
