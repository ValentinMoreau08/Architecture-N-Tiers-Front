<template>
  <div class="page no-navbar no-toolbar no-swipeback">
    <div class="page-content login-screen-content">
      <div class="login-screen-title">Mobilités TSE</div>
      <form id="login-form">
        <div class="list">
          <ul>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Login</div>
                <div class="item-input-wrap">
                  <input type="text" name="username" required validate placeholder="Votre login"/>
                </div>
              </div>
            </li>
            <li class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Mot de passe</div>
                <div class="item-input-wrap">
                  <input type="password" name="password" required validate placeholder="Votre mot de passe"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </form>
      <f7-button @click="login">Se connecter</f7-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";

export default {
  
  data() {
      return {
          users:[],
          username: '',
          password: ''
      }
  },
  props: {
    msg: String
  },
  methods: {
    login() {
      Vue.use(VueSimpleAlert);

      const myApp = this;
      const router = this.$f7router;

      // Get data time, projectId and date from Form object
      var formEl = this.$$('form#login-form')[0];
      var formData = new window.FormData(formEl);

      const options = {
        headers: {'Content-Type': 'application/json'}
      };
      Axios.post("http://localhost:8180"+'/login', {
        username: formData.get('username'),
        password: formData.get('password'),
      }, options).then(response => {
        var user = response.data
        localStorage.setItem('loggedInAppId',user.id);
        localStorage.setItem('loggedInPersonId',user.person.id)
        localStorage.setItem('loggedInRole',user.role.id);
        switch(user.role.id){
          case 1:
            router.back(`/user-home/`, {
                ignoreCache: true,
                force: true,
                context: {}
              });
            break;
          case 2:
            router.back(`/admin-home/`, {
                ignoreCache: true,
                force: true,
                context: {}
              });
            break;
          default:
            myApp.$alert("Role inconnu : Erreur interne. Veuillez contacter un administrateur")
            break;
        }
      }).catch(
        function (error) {
          //myApp.$alert(error)
          myApp.$alert("Login ou mot de passe incorrecte")
        }
      );
    }
  }
};
</script>