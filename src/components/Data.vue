<template>
  <div>
    <div class="apiItems" v-if="reverseAddress != 'Empty JSON'">
      Nominatim Reverse: {{ reverseAddress.address.road }}, {{ reverseAddress.address.hamlet }},
      {{ reverseAddress.address.city }}
      <p id="rightStuff">
        Lat:
        <input id="inputLat" v-model="inputLat" placeholder="52.536940" />
        Lon:
        <input id="inputLon" v-model="inputLon" placeholder="13.649490" />
        <button id="nominatimReverseButton" class="submitButton" @click="submitOnClick">
          Submit
        </button>
      </p>
    </div>
    <div class="apiItems" v-else>
      Nominatim Reverse: {{ reverseAddress }}
      <p id="rightStuff">
        Lat:
        <input id="inputLat" v-model="inputLat" placeholder="52.536940" />
        Lon:
        <input id="inputLon" v-model="inputLon" placeholder="13.649490" />
        <button id="nominatimReverseButton" class="submitButton" @click="submitOnClick">
          Submit
        </button>
      </p>
    </div>
    <div class="apiItems" v-if="address != 'Empty JSON'">
      Nominatim: {{ address[0].lat }}, {{ address[0].lon }}
      <p id="rightStuff">
        Street name:
        <input id="inputStreetname" v-model="inputStreetname" placeholder="Käthe-Kollwitz-Straße" />
        House number:
        <input id="inputHousenumber" v-model="inputHousenumber" placeholder="12" />
        City:
        <input id="inputCity" v-model="inputCity" placeholder="Luckenwalde" />
        <button id="nominatimButton" class="submitButton" @click="submitOnClick">Submit</button>
      </p>
    </div>
    <div class="apiItems" v-else>
      Nominatim: {{ address }}
      <p id="rightStuff">
        Street name:
        <input id="inputStreetname" v-model="inputStreetname" placeholder="Käthe-Kollwitz-Straße" />
        House number:
        <input id="inputHousenumber" v-model="inputHousenumber" placeholder="12" />
        City:
        <input id="inputCity" v-model="inputCity" placeholder="Luckenwalde" />
        <button id="nominatimButton" class="submitButton" @click="submitOnClick">Submit</button>
      </p>
    </div>
    <div class="apiItems" v-if="randomData != 'Empty JSON'">
      Own DB data: {{ randomData.data }}
      <p id="rightStuff">
        Database URL:
        <input v-model="inputDBUrl" placeholder="..." />
        <button id="databaseButton" class="submitButton" @click="submitOnClick">Submit</button>
      </p>
    </div>
    <div class="apiItems" v-else>
      Own DB data: {{ randomData }}
      <p id="rightStuff">
        Database URL:
        <input v-model="inputDBUrl" placeholder="..." />
        <button id="databaseButton" class="submitButton" @click="submitOnClick">Submit</button>
      </p>
    </div>
  </div>
</template>

<script>
import { nominatimReverse, nominatim, getDataOfGivenURL } from './extern/axios'
import { fillJSONIfEmpty, isAnyNotNullOrUndefined } from './extern/validator'

export default {
  name: 'DataView',

  data() {
    return {
      reverseAddress: 'Empty JSON',
      address: 'Empty JSON',
      randomData: 'Empty JSON',
      inputLat: null,
      inputLon: null,
      inputStreetname: null,
      inputHousenumber: null,
      inputCity: null,
      inputDBUrl: null
    }
  },

  async mounted() {
    this.reverseAddress = fillJSONIfEmpty(await nominatimReverse('52.536940', '13.649490'))
    this.address = fillJSONIfEmpty(await nominatim('Käthe-Kollwitz-Straße', '12', 'Luckenwalde'))
    this.randomData = fillJSONIfEmpty(await getDataOfGivenURL())
  },

  methods: {
    async submitOnClick(event) {
      if (event.target.id == 'nominatimReverseButton') {
        if (isAnyNotNullOrUndefined(this.inputLat) && isAnyNotNullOrUndefined(this.inputLon)) {
          this.reverseAddress = fillJSONIfEmpty(
            await nominatimReverse(this.inputLat, this.inputLon)
          )
        }
      } else if (event.target.id == 'nominatimButton') {
        if (
          isAnyNotNullOrUndefined(this.inputStreetname) &&
          isAnyNotNullOrUndefined(this.inputHousenumber) &&
          isAnyNotNullOrUndefined(this.inputCity)
        ) {
          this.address = fillJSONIfEmpty(
            await nominatim(this.inputStreetname, this.inputHousenumber, this.inputCity)
          )
        }
      } else if (event.target.id == 'databaseButton') {
        if (isAnyNotNullOrUndefined(this.inputDBUrl)) {
          this.randomData = fillJSONIfEmpty(await getDataOfGivenURL(this.inputDBUrl))
        }
      }
    }
  }
}
</script>

<style>
.apiItems {
  display: block;
  color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 2rem;
  overflow: hidden;
  margin: 1rem;
}
.submitButton {
  background-color: greenyellow;
}
#rightStuff {
  float: right;
  margin-right: 1rem;
  color: white;
}
</style>
