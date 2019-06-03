<template>
  <div id="app">
    <!-- <button @click="add">+</button>
    <button @click="asuncAdd">+</button>
    {{this.$store.state.count}}
    {{count}}
    <button @click="reductio">-</button>
    <button @click="prosmiseprduction">-</button> -->
    <ul>
      <li v-for=" item in getMineBaseMsg" :key="item.id">{{item.title}}</li>
    </ul>

    <input type="text" v-model="newVal" />
    <button @click="addNews"></button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  data:{
    newVal:"",
  },
  components: {},
  computed: {
    // ...mapState({
    //   count: state => state.count
    // })
    ...mapGetters([
      'getMineBaseMsg'
    ])
  },
  created () {
    this.getNews()
  },
  methods: {

    ...mapActions({
      getNews: "mineBaseMsgApi" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),

    addNews() {
      console.log(this.newVal)
      let params = {
        title: this.newVal
      }
      this.$store.dispatch('addNewsList',params)
    }










    // ...mapActions({
    //   asuncAdd: "asuncadd" // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    // }),
    // add() {
    //   this.$store.commit('increase');
    // },
    // // asuncAdd() {
    // //   this.$store.dispatch('asuncadd');
    // // },
    // async prosmiseprduction() {
    //   let res = await this.$store.dispatch('promiseAction');
    //   console.log(res)
    // },
    // reductio() {
    //   var n = 10;
    //   this.$store.commit('reduction',n);
    // }
  }
};
</script>

<style>
ul,li {
  list-style: none;
}
</style>
