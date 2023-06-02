<template>
  <table>
    <tr>
      <th>Player</th>
      <th>Score</th>
    </tr>
    <tr v-for="score in scores">
      <td>{{ score.owner }}</td>
      <td>{{ score.score }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: {
      players: Array
    },
    data() {
      return {
        scores: {}
      }
    },
    created() {
      const scoreLoop = async () => {
        this.scores = await Agent.state('scoreboard')
        setTimeout(scoreLoop, 1000)
      }
      scoreLoop()
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
