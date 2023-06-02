<template>
  <circle
    v-if="x !== null && y !== null"
    :cx="x"
    :cy="y"
    r="16"
    stroke="black"
    fill="white"
  />
  <text>{{ lastX }}</text>
</template>

<script>
  export default {
    props: {
      players: Array
    },
    data() {
      return {
        x: null,
        y: null
      }
    },
    created() {
      const pingLoop = async () => {
        const [{ x, y }] = await Agent.state('the-egg-is-where')
        this.x = x
        this.y = y
        setTimeout(pingLoop, 1000)
      }
      pingLoop()
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
