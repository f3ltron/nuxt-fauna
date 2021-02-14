<template>
  <div class="container">
    <div>
      <h1>CUSTOMERS</h1>
      <div v-for="(customer, i) in customers.data" :key="i + customer.ts">
        <Customer :customer="customer" @update="update" />
      </div>
    </div>
    <div>
      <h1>STOREHOUSES</h1>
      <div v-for="(storehouse, i) in storehouses.data" :key="i + storehouse.ts">
        <Storehouse :storehouse="storehouse" @update="update" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    const data = await ctx.$fauna.pullData(['storehouses', 'customers'])
    return data
  },
  data: () => ({
    customers: {
      data: [],
    },
    storehouses: {
      data: [],
    },
  }),
  methods: {
    async update(data) {
      try {
        await this.$fauna.pushData(data)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
