<template>
  <div>
    <div>
      Search
      <!-- 1 -->
      <input type="text" v-model="searchText">
    </div>
    <link-item
      v-for="(link, index) in links"
      :key="link.id"
      :link="link"
      :index="index">
    </link-item>
  </div>
</template>

<script>
// 2
import { LINKS_QUERY } from '../constants/graphql'
import LinkItem from './LinkItem'

export default {
  name: 'Search',
  data () {
    return {
      links: [],
      searchText: ''
    }
  },
  // 3
  apollo: {
    links: {
      query: LINKS_QUERY,
      variables () {
        return {
          searchText: this.searchText
        }
      },
      skip () {
        return !this.searchText
      }
    }
  },
  components: {
    LinkItem
  }
}
</script>
