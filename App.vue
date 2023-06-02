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
    <TheEgg
      @gotIt="gotTheEgg"
      :cursor="location"
    />
  </svg>
  <Scoreboard />
</template>

<script>
  import TheEgg from './the-egg.vue'
  import OtherPlayers from './other-players.vue'
  import Scoreboard from './scoreboard.vue'

  export default {
    components: {
      OtherPlayers,
      TheEgg,
      Scoreboard
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
      Agent
        .mutate('whereistheegg')
        .then(whereistheegg => {
          const eggLoop = () => {
            const x = Math.round(Math.random() * 600)
            const y = Math.round(Math.random() * 600)
            whereistheegg[Date.now()] = { x, y }
            setTimeout(eggLoop, 1000)
          }
          eggLoop()
        })
      window.addEventListener('mousemove', ({ clientX, clientY}) => {
        this.location.x = clientX
        this.location.y = clientY
      })
      Agent.mutate('players').then(s => s.me = {})
      const players = await Agent.state('all-players')
      this.players = players.map(({ owner }) => owner)
    },
    methods: {
      gotTheEgg(eggId) {
        Agent
          .mutate('eggassertions')
          .then(eggassertions => eggassertions[eggId] = {})
      }
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
