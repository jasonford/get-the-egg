<template>
  <svg viewBox="0 0 600 600">
    <circle
      :cx="location.x"
      :cy="location.y"
      r="8"
      fill="black"
    />
    <OtherPlayers
      :players="players"
    />
  </svg>
</template>

<script>
  import OtherPlayers from './other-players.vue'

  export default {
    components: {
      OtherPlayers
    },
    data() {
      return {
        players: [],
        location: {
          x: 0,
          y: 0
        }
      }
    },
    async created() {
      window.addEventListener('mousemove', ({ clientX, clientY}) => {
        this.location.x = clientX
        this.location.y = clientY
      })
      Agent.mutate('players').then(s => s.me = {})
      const players = await Agent.state('all-players')
      this.players = players.map(({ owner }) => owner)
    }
  }
</script>

<style scoped>

svg {
  width: 600px;
  height: 600px;
  background: #EEEEEE;
}

</style>
