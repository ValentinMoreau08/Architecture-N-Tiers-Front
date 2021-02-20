<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
         <f7-link href="/user-home/"  icon-f7="house"></f7-link>
      </f7-nav-left>
          <div class="title">Mes mobilités</div>
          <f7-nav-right>
         <f7-link class="panel-open" panel-open="#panel-user" icon="fas fa-bars"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-card v-for="mobility in mobilities" :key="mobility.id" class="bg-color-gray">
      <f7-card-header
        class="no-border"
        valign="bottom"
        ><f7-block-title>{{mobility.company}}</f7-block-title>
      </f7-card-header>
      <f7-card-content>
        <f7-list>
        <f7-list-item header="Location" :title="mobility.city + ', ' + mobility.country"></f7-list-item>
        <f7-list-item header="Début" :title="new Date(mobility.startDate).toLocaleDateString('fr-FR')"></f7-list-item>
        <f7-list-item header="Fin" :title="new Date(mobility.endDate).toLocaleDateString('fr-FR')"></f7-list-item>
        </f7-list>
      </f7-card-content>
      <f7-card-footer>
        <!--<f7-link>Modifier</f7-link>
        <f7-link>Supprimer</f7-link>-->
        <f7-button @click="goToModifyMobility(mobility.id)">Modifier</f7-button>
        <f7-button @click="deleteMobility(mobility.id)">Supprimer</f7-button>
      </f7-card-footer>
    </f7-card>

    <f7-button @click="goToCreateMobility">Créer une mobilité</f7-button>
   
  </f7-page>
</template>
<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      mobilities: []
    };
  },
  created() {
    this.loadMobilities();
  },
  methods: {
    loadMobilities() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      var sortByProperty = function(property) {
        return function(x, y) {
          return x[property] === y[property]
            ? 0
            : x[property] > y[property]
            ? 1
            : -1;
        };
      };
      app.preloader.show();
      setTimeout(function() {
        app.preloader.hide();
      }, 3000);

      //ALL PROJECTS
      const loggedInPersonId = localStorage.getItem('loggedInPersonId');
      Axios.get("http://localhost:8180" + "/students/" + loggedInPersonId + "/travels")
        .then(response => {
          this.mobilities = response.data;

          //.sort(sortByProperty('firstname'));
          app.preloader.hide();
          //  console.log(response.data)
        })
        .catch(function(error) {
          app.preloader.hide();
          /*app.dialog.alert(
            "Une erreure est survenue pendant le chargement de vos mobilités.","Mobilités TSE"
          );*/
        });
    },
    goToCreateMobility() {
      //this.$f7router.push(`/user-create-mobility/`);
      //this.$f7.router.routes.push("/user-create-mobility/");
      //this.$f7router.routes.push("/user-create-mobility/");
      this.$f7router.navigate("/user-create-mobility/");
      //this.$f7router.back();
    },
    goToModifyMobility(mobilityId) {
      this.$f7router.navigate("/user-modify-mobility/"+mobilityId+"/");
    },
    deleteMobility(id) {
      const loggedInPersonId = localStorage.getItem('loggedInPersonId');
      Axios.delete('http://localhost:8180/students/'+loggedInPersonId+'/travels/'+id)
      .then(response => {
        //this.$f7router.back();
        this.loadMobilities();
      })
      .catch(e => {
        this.errors.push(e)
        alert(e)
      })
    }
  }
};
</script>
