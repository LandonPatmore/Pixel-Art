<template>
  <div class="colorCanvas">
    <div id="wrapper" :style="fullboard">
      <section id="flexarea" v-for="(rows, outterIndex) in overallRows" :key="outterIndex">
        <template v-for="(col, innerIndex) in rows">
          <component :key="innerIndex" :currentSelectedColor="selectedColor" :screenLocation="{x: outterIndex, y: innerIndex}" :is="col.type" :socketColor="col.color"></component>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import Pixel from './Pixel'
import axios from 'axios'

export default {
  name: 'colorCanvas',
  components: {
    Pixel
  },
  props: [
    'selectedColor',
    'fullboard'
  ],
  data() {
    return {
      overallRows: Array(50).fill().map(() => [])
    }
  },
  methods: {
    initializePixelsBlank: function() {
      for (let i = 0; i < this.overallRows.length; i++) {
        for (let j = 0; j < 50; j++) {
          let row = this.overallRows[i]
          row.splice(j, 1, { type: Pixel, color: 'white' })
          this.overallRows.splice(i, 1, row)
        }
      }
    },
    setUpdatedPixel: function(pixel) {
      let row = this.overallRows[pixel.posX]
      row.splice(pixel.posY, 1, { type: Pixel, color: pixel.hex })
      this.overallRows.splice(pixel.posX, 1, row)
    },
    setDatabasePixels: function() {
      var vm = this
      axios.get('http://10.33.1.149:7000/api/initialRender')
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            let d = response.data[i]
            let row = vm.overallRows[d.posX]
            if (row) {
              row.splice(d.posY, 1, { type: Pixel, color: d.currentHex })
              vm.overallRows.splice(d.posX, 1, row)
            }
          }
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created: function() {
    this.initializePixelsBlank()
    this.setDatabasePixels()
  },
  socket: {
    events: {
      pixel_update: function(data) {
        this.setUpdatedPixel(data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.colorCanvas {}

#wrapper {
  height: 5000px;
  width: 5000px;
}

#flexarea {
  display: flex;
  height: 2%;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
}
</style>
