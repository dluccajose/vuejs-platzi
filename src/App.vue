<template lang="pug">
  #app
    img(src='./assets/logo.png')
    h1 PlatziMusic
    p
      select(v-model="paisSeleccionado")
        option(v-for="pais in paises" :value="pais.name" :label="pais.name") {{ pais.name }}
    Spinner(v-show="cargando")
    MostrarArtista(v-for="artist in artistas" 
          v-bind:artist="artist")
</template>

<script>
import getArtists from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'app',
  data () {
    return {
      artistas: [],
      cargando: false,
      paises: [ { name: 'Venezuela'},
                { name: 'Colombia'},
                { name: 'Argentina'}],
      paisSeleccionado: 'venezuela'
    }
  },
  components: {
    MostrarArtista: Artist,
    Spinner: Spinner
  },
  methods: {
    refrescarArtistas: function() {
      this.artistas = []
      const self = this
      self.cargando = true
      getArtists(this.paisSeleccionado)
      .then(function (res) {
        self.cargando = false
        self.artistas = res
      })
    }
  },
  // Ejecuta una funcion al cargar la pagina
  mounted: function() {
    this.refrescarArtistas()
  },
  // Si ocurre algun cambio en la variable indicada, ejecuta una funcion
  watch: {
    paisSeleccionado: function() {
      this.refrescarArtistas()
    }
  }
}
</script>

<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

h1, h2
    font-weight normal

ul
    list-style-type none
    padding 0

li
    display inline-block
    margin 0 10px

a
    color #42b983
</style>
