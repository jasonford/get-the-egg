<template>
  <circle
    v-if="x !== null && y !== null && visible"
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
      players: Array,
      cursor: Object
    },
    emits: ['gotIt'],
    data() {
      return {
        id: null,
        x: null,
        y: null,
        visible: false
      }
    },
    created() {
      const pingLoop = async () => {
        const [egg] = await Agent.state('the-egg-is-where')
        if (egg) {
          this.visible = true
          this.id = egg.id
          this.x = egg.x
          this.y = egg.y
        }
        setTimeout(pingLoop, 1000)
      }
      pingLoop()
    },
    watch: {
      distanceToEgg(d) {
        if (this.visible && d !== null && d < 16) {
          this.visible = false
          this.$emit('gotIt', this.id)
        }
      }
    },
    computed: {
      distanceToEgg() {
        if (this.x === null || this.y === null) return null
        const a = this.cursor.x - this.x
        const b = this.cursor.y - this.y
        return Math.sqrt(a*a + b*b)
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
