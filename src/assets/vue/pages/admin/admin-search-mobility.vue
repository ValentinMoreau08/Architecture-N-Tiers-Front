<template>
  <f7-page>

    <f7-navbar>
      <f7-nav-left>
        <f7-link href="/admin-home/" icon-f7="house"></f7-link>
      </f7-nav-left>
      <div class="title">Rechercher une mobilité</div>
      <f7-nav-right>
        <f7-link
          class="panel-open"
          panel-open="#panel-admin"
          icon="fas fa-bars"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <div class="block">Citères de recherche :</div>
    <form class="list" id="search-mobility-form">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Pays</div>
            <div class="item-input-wrap">
              <input name="country" type="text" validate placeholder="Pays ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Ville</div>
            <div class="item-input-wrap">
              <input name="city" type="text" validate placeholder="Ville ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Entrprise</div>
            <div class="item-input-wrap">
              <input name="company" type="text" validate placeholder="Entreprise ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Promotion</div>
            <div class="item-input-wrap">
              <select name="promotionId" placeholder="Promotion ...">
                <option value="" selected>Promotion ...</option>
                <option v-for="promotion in promotions" :key="promotion.id" v-bind:value="promotion.id">{{ promotion.label }}</option>
              </select>
            </div>
          </div>
        </li>
      </ul>
    </form>

    <f7-button @click="loadMobilities">Rechercher</f7-button>

    <f7-card v-for="mobility in mobilities" :key="mobility.id" class="bg-color-gray">
      <f7-card-header
        class="no-border"
        valign="bottom"
        ><f7-block-title>{{mobility.company}}</f7-block-title>
      </f7-card-header>
      <f7-card-content>
        <f7-list>
        <f7-list-item header="Étudiant" :title="mobility.student.lastname + ' ' + mobility.student.firstname + ' (' + mobility.student.promotion.label + ')'"></f7-list-item>
        <f7-list-item header="Location" :title="mobility.city + ', ' + mobility.country"></f7-list-item>
        <f7-list-item header="Début" :title="mobility.startDate"></f7-list-item>
        <f7-list-item header="Fin" :title="mobility.endDate"></f7-list-item>
        </f7-list>
      </f7-card-content>
      <!--<f7-card-footer>
        <f7-button @click="goToModifyMobility(mobility.id)">Modifier</f7-button>
        <f7-button @click="deleteMobility(mobility.id)">Supprimer</f7-button>
      </f7-card-footer>-->
    </f7-card>

  </f7-page>
</template>
<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      promotions: [],
      mobilities: []
    };
  },
  created() {
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

    this.loadPromotions();
    this.loadMobilities();
    
  },
  methods: {
    isEmpty(str) {
      return (!str || 0 === str.length);
    },
    loadPromotions() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;

      app.preloader.show();

      Axios.get("http://localhost:8180" + "/promotions?")
        .then(response => {
          this.promotions = response.data;
          //.sort(sortByProperty('firstname'));
          app.preloader.hide();

          //  console.log(response.data)
        })
        .catch(function(error) {
          app.preloader.hide();
          app.dialog.alert(
            "Une erreur est survenue lors de la récupération des promotions",
            "Mobilités TSE"
          );
      });
    },
    loadMobilities() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;

      app.preloader.show();

      var params = {};

      var formEl = this.$$('form#search-mobility-form')[0];
      var formData = new window.FormData(formEl);

      const country = formData.get('country');
      if(!this.isEmpty(country)){
        params['country'] = country;
      }

      const city = formData.get('city');
      if(!this.isEmpty(city)){
        params['city'] = city;
      }

      const company = formData.get('company');
      if(!this.isEmpty(company)){
        params['company'] = company;
      }

      const promotionId = formData.get('promotionId');
      if(!this.isEmpty(promotionId)){
        params['promotion'] = promotionId;
        
      }

      /*for (const [key, value] of Object.entries(params)) {
        console.log('key='+key+'|value='+value);
        console.log(`${key}: ${value}`);
      }*/

      Axios.get("http://localhost:8180" + "/travels", { params: params })
        .then(response => {
          this.mobilities = response.data;
          //.sort(sortByProperty('company'));
          app.preloader.hide();
        })
        .catch(function(error) {
          app.preloader.hide();
          app.dialog.alert(
            "Une erreur est survenue lors de la récupération des mobilités",
            "Mobilités TSE"
          );
      });
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
