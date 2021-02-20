<template>
  <f7-page>
    <f7-navbar title="Carte des mobilités" back-link="Back">
      <f7-nav-right>
        <f7-link class="panel-open" panel-open="#panel-admin" icon="fas fa-bars"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!--<div id="app">

      <gmaps-map>
        <gmaps-marker :position="{ lat: -27, lng: 153 }" />
      </gmaps-map>

      <div class="gmaps-map"></div>

      <gmaps-map />
      <p>test texte</p>

      <div id="map"></div>
      <gmaps-map :options="mapOptions">
        <gmaps-heatmap :items="items" />
      </gmaps-map>

    </div>-->


    <template>
      <div class="App"/>
    </template>


<!--<div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-heatmap :items="items" />
&lt;/gmaps-map>

...

items = [
  { lat: -27.41, lng: 153.01 },
  { lat: -27.42, lng: 153.02 },
  ...,
  { lat: -27.48, lng: 153.08 },
  { lat: -27.49, lng: 153.09 },
]
          </pre
        >
      </div>-->

  </f7-page>
</template>

<script>
import Axios from "axios";
//import { gmapsMap, gmapsHeatmap, gmapsMarker } from 'x5-gmaps'; // import from 'x5-gmaps' for plugin
import gmapsInit from './utils/gmaps';

/*export default {
  //name: 'ExampleHeatmap',
  //components: { gmapsMap, gmapsHeatmap, gmapsMarker },,
  data: () => ({
    mapOptions: {
      center: { lat: -27.5, lng: 153 },
      zoom: 11,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    },
    items: []
  }),
  created() {
    for (let i = 0; i < 200; i++)
      this.items.push({
        lat: -27.5 + Math.random() / 10 - 0.05,
        lng: 153 + Math.random() / 10 - 0.05
      })
  }
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      var map = new google.maps.Map(this.$$('#map'), {
      //map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  }
}*/
export default {
  name: 'App',
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'Austria' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
