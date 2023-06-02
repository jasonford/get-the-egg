<template>
  <circle
    v-for="state, id in playerStates"
    :key="id"
    :cx="state.location.x"
    :cy="state.location.y"
    r="8"
    fill="black"
  />
  <text>{{ lastX }}</text>
</template>

<script>
  import * as jsonpatch from 'fast-json-patch/index.mjs'

  export default {
    props: {
      players: Array
    },
    data() {
      return {
        lastX: Date.now(),
        playerStates: {}
      }
    },
    created() {
      this
        .players
        .forEach(async playerId => {
          const scope = window.location.host
          this.playerStates[playerId] = await (
            Agent
              .state(scope, playerId)
              .watch(update => {
                const patch = update.patch.map(p => {
                  return {...p, path: '/' + p.path.join('/')}
                })
                this.playerStates[playerId] = (
                  jsonpatch
                    .applyPatch(this.playerStates[playerId], patch)
                    .newDocument
                )
                this.lastX = this.playerStates[playerId].location.x
              })
          )
        })
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
