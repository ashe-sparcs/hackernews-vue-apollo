<template>
  <div class="flex mt2 items-start">
    <div class="flex items-center">
      <span class="gray">{{linkNumber}}.</span>
      <div v-if="userId" class="ml1 gray f11 upvote" @click="voteForLink()">▲</div>
    </div>
    <div class="ml1">
      <a :href="link.url" class="link">{{link.description}} ({{link.url}})</a>
      <div class="f6 lh-copy gray">
        {{link.votes.edges.length}} votes | by {{link.postedBy ? link.postedBy.username : 'Unknown'}} {{timeDifferenceForDate(link.createdAt)}}
      </div>
    </div>
  </div>
</template>

<script>
import { timeDifferenceForDate } from '../utils'
import { LINKS_QUERY, CREATE_VOTE_MUTATION } from '../constants/graphql'
import { API_USER_ID } from '../constants/settings'

export default {
  name: 'LinkItem',
  computed: {
    userId () {
      return this.$root.$data.userId
    },
    linkNumber () {
      if (this.$route.path.includes('new')) {
        return (this.pageNumber - 1) * this.linksPerPage + (this.index + 1)
      } else {
        return this.index + 1
      }
    }
  },
  props: ['link', 'index'],
  methods: {
    timeDifferenceForDate,
    updateStoreAfterVote (store, createVote, linkId) {
      // 1
      const data = store.readQuery({
        query: LINKS_QUERY
      })

      // 2
      const votedLink = data.links.find(link => link.id === linkId)
      votedLink.votes = createVote.link.votes

      // 3
      store.writeQuery({ query: LINKS_QUERY, data })
    },
    voteForLink () {
      const userId = localStorage.getItem(API_USER_ID)
      const voterIds = this.link.votes.edges.map(x => x.node.user.id)
      if (voterIds.includes(userId)) {
        alert(`User (${userId}) already voted for this link.`)
        return
      }
      const linkId = this.link.id
      this.$apollo.mutate({
        mutation: CREATE_VOTE_MUTATION,
        variables: {
          linkId
        },
        update: (store, { data: { createVote } }) => {
          this.updateStoreAfterVote(store, createVote, linkId)
        }
      })
    }
  }
}
</script>

<style scoped>
  .upvote {
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>
