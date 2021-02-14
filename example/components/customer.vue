<template>
  <form @submit.prevent="updateCustomer">
    <label for="lastName">
      <input id="lastName" v-model="lastName" type="text" />
    </label>
    <label for="firstName">
      <input id="firstName" v-model="firstName" type="text" />
    </label>
    <button type="submit">Update</button>
  </form>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => {
    return {
      lastName: vm._props.customer.data.lastName,
      firstName: vm._props.customer.data.firstName,
    }
  },
  methods: {
    updateCustomer() {
      console.log(this.$emit)
      this.$emit('update', {
        lastName: this.lastName,
        firstName: this.firstName,
      })
    },
  },
}
</script>

<style></style>
