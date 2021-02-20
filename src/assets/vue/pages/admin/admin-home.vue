<template>
  <f7-page>
    <f7-navbar title="Accueil - Administrateur">
      <f7-nav-right>
        <f7-link class="panel-open" panel-open="#panel-admin" icon="fas fa-bars"></f7-link>
      </f7-nav-right>
   
    </f7-navbar>
    <f7-block-title>Accueil administrateur</f7-block-title>
    <!-- <f7-block inner>
      <p>This is template for Framework75, Vue and Phonegap.</p>
    </f7-block> -->
    <f7-block-title class="searchbar-found">Qu'est-ce que je peux faire ?</f7-block-title>
    <f7-list class="components-list searchbar-found">

      <f7-list-item link="/admin-search-mobility/" title="Rechercer une mobilité" panel-close>
        <f7-icon slot="media" ios="f7:list_bullet" md="material:list_bullet"></f7-icon>
      </f7-list-item>

      <f7-list-item link="/admin-map/" title="Carte des mobilités" panel-close>
        <f7-icon slot="media" ios="f7:map_pin" md="material:map_pin"></f7-icon>
      </f7-list-item>
    
    </f7-list>

   
  </f7-page>
</template>
<script>
export default {
  components: {}
};
</script>
