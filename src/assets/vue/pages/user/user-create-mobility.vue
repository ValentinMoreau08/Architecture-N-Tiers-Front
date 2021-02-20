<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <!--<f7-link href="/user-home/" icon-f7="house"></f7-link>-->
        <f7-button @click="back" icon-f7="arrow_left"></f7-button>
      </f7-nav-left>
      <div class="title">Créer une mobilité</div>
      <f7-nav-right>
        <f7-link
          class="panel-open"
          panel-open="#panel-user"
          icon="fas fa-bars"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
     <form class="list" id="create-mobility-form">
      <ul>
        <!--<li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Pays</div>
            <div class="item-input-wrap">
              <select name="projectId" placeholder="Please choose...">
                <option v-for="project in projects" :key="project.id" v-bind:value="project.id">{{ project.name }} - {{ project.clientName }}</option>
              </select>
            </div>
          </div>
        </li>-->
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Pays</div>
            <div class="item-input-wrap">
              <input name="country" type="text" required validate placeholder="Pays ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Ville</div>
            <div class="item-input-wrap">
              <input name="city" type="text" required validate placeholder="Ville ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Entrprise</div>
            <div class="item-input-wrap">
              <input name="company" type="text" required validate placeholder="Entreprise ...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Début</div>
            <div class="item-input-wrap">
              <input name="startDate" type="date" required validate placeholder="Please choose...">
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Fin</div>
            <div class="item-input-wrap">
              <input name="endDate" type="date" required validate placeholder="Please choose...">
            </div>
          </div>
        </li>
      </ul>
    </form>
    <f7-button @click="postCreateMobility">Créer</f7-button>
  </f7-page>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
      return {
        errors: [],
        projects: []
      }
  },
  props: {
    msg: String
  },
  mounted: function() {
      /*axios
        .get('http://localhost:8180/projects')
        .then(response => {
          console.log(response.data)
          this.projects = response.data;
        })*/
  },
  methods: {
    // Post method to create time with body
    postCreateMobility() {
      // Get data time, projectId and date from Form object
      var formEl = this.$$('form#create-mobility-form')[0];
      var formData = new window.FormData(formEl);

      const options = {
        headers: {'Content-Type': 'application/json'}
      };
      const loggedInPersonId = localStorage.getItem('loggedInPersonId');
      axios.post('http://localhost:8180/students/'+loggedInPersonId+'/travels', {
        country: formData.get('country'),
        city: formData.get('city'),
        company: formData.get('company'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate')
      }, options)
      .then(response => {
        this.$f7router.back({
            url: "/user-list-mobility/",
            force: true,
            ignoreCache: true
        });
      })
      .catch(e => {
        this.errors.push(e)
        alert(e)
      })
    },
    back() {
      this.$f7router.back();
    }
  }
}
</script>
