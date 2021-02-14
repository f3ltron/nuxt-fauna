<template>
  <div class="container">
    <!-- <div>
      <div v-for="(customer, i) in customers.data" :key="i + customer.ts">
        <Customer :customer="customer" @update="update" />
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    // const ret = await ctx.$axios.get('http://localhost:3000/api')
    // console.log(ret)
    // return ctx.$fauna.client('default').pullData(['storehouses', 'customers'])
  },
  mounted() {
    this.$axios.post('http://localhost:3000/fauna/get-collections')
  },
  methods: {
    update(data) {
      // console.log(this.$fauna)
      // console.log(this.fauna)
      // console.log('je suis la', data)
    },
  },
}
</script>
