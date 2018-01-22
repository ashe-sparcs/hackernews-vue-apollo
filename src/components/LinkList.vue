<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <link-item
      v-for="(link, index) in links"
      :key="link.id"
      :link="link"
      :index="index">
    </link-item>
  </div>
</template>

<script>
import { LINKS_QUERY } from '../constants/graphql'
import LinkItem from './LinkItem'

export default {
  name: 'LinkList',
  data () {
    return {
      links: [],
      loading: 0
    }
  },
  components: {
    LinkItem
  },
  apollo: {
    links: {
      query: LINKS_QUERY
    }
  }
}
</script>
