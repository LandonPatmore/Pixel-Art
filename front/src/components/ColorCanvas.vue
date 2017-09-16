<template>
  <div id="colorCanvas">
    <section id="flexarea" v-for="(array, index) in test" :key="index">
      <template v-for="(data, dataIndex) in array">
        <component :key="dataIndex" :position='{x: index, y: dataIndex}' @coordinates='getCoords' @click.native="setColorPixel" :initial='data.color' :currentSelectedColor="colorPicked" :is="data.type"></component>
      </template>
    </section>
    <h1>Coordinates</h1>
    <p>{{x}}, {{y}}</p>
    <color-pallete @pickedColor="getSelectedColor"></color-pallete>
    <h1>Color Selected</h1>
    <p>{{colorPicked}}</p>
  </div>
</template>

<script>
import Pixel from './Pixel'
import ColorPallete from './ColorPallete'
import axios from 'axios'

export default {
  name: 'colorCanvas',
  components: {
    Pixel,
    ColorPallete
  },
  data() {
    return {
      x: 0,
      y: 0,
      colorPicked: null,
      test: new Array(10),
      dataArray: []
    }
  },
  methods: {
    getCoords: function(args) {
      this.x = args.x
      this.y = args.y
    },
    getSelectedColor: function(color) {
      this.colorPicked = color
    },
    setColorPixel: function() {
      this.color = this.colorPicked ? this.colorPicked : ''
    },
    getInitialData: function() {
      var that = this
      axios.get('http://10.33.1.149:7000/api/initialRender')
        .then(response => {
          that.dataArray = response.data
          console.log('done loading')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    dataArray: function() {
      for (let i = 0; i < this.test.length; i++) {
        this.test[i] = new Array(10)
      }

      for (let i = 0; i < this.dataArray.length; i++) {
        if (this.test[this.dataArray[i].posX][this.dataArray[i].posY] === undefined) {
          this.test[this.dataArray[i].posX][this.dataArray[i].posY] = { type: Pixel, color: this.dataArray[i].currentHex, x: this.dataArray[i].posX, y: this.dataArray[i].posY }
        }
        console.log(this.test[this.dataArray[i].posX][this.dataArray[i].posY])
      }
      for (let j = 0; j < this.test.length; j++) {
        for (let k = 0; k < this.test[j].length; k++) {
          if (this.test[j][k] === undefined) {
            this.test[j][k] = { type: Pixel, color: '#FFFFFF', x: j, y: k }
          }
        }
      }
    }
  },
  created: function() {
    this.getInitialData()
    console.log('after created')
  }
}
</script>

<style lang="scss">
#canvas {}

#flexarea {
  display: flex;
  width: 1000px;
  justify-content: center;
  margin: 0 auto;
}
</style>
