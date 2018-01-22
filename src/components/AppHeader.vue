<template>
  <div class="flex pa1 justify-between nowrap orange">
    <div class="flex flex-fixed black">
      <div class="fw7 mr1">Hacker News</div>
      <router-link to="/" class="ml1 no-underline black">new</router-link>
      <div class="ml1">|</div>
      <router-link to="/search" class="ml1 no-underline black">search</router-link>
      <div class="ml1">|</div>
      <router-link to="/create" class="ml1 no-underline black">submit</router-link>
    </div>
    <div class="flex flex-fixed">
      <div v-if="userId" class="ml1 pointer black" @click="logout()">logout</div>
      <router-link v-else to="/login" class="ml1 no-underline black">login</router-link>
    </div>
  </div>
</template>

<script>
import { API_USER_ID, API_AUTH_TOKEN } from '../constants/settings'

export default {
  name: 'AppHeader',
  computed: {
    userId () {
      return this.$root.$data.userId
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(API_USER_ID)
      localStorage.removeItem(API_AUTH_TOKEN)
      this.$root.$data.userId = localStorage.getItem(API_USER_ID)
    }
  }
}
</script>
