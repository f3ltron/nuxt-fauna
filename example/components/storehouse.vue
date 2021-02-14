<template>
  <form @submit.prevent="updateCustomer">
    <label for="name">
      <input id="name" v-model="name" type="text" />
    </label>
    <label for="address">
      <input id="address" v-model="address.city" type="text" />
    </label>
    <button type="submit">Update</button>
  </form>
</template>

<script>
export default {
  props: {
    storehouse: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => {
    return {
      name: vm._props.storehouse.data.name,
      address: {
        city: vm._props.storehouse.data.address.city,
      },
    }
  },
  methods: {
    updateCustomer() {
      this.$emit('update', {
        data: {
          name: this.name,
          address: {
            city: this.address.city,
          },
        },
        collection: 'storehouses',
        id: this.storehouse.ref['@ref'].id,
      })
    },
  },
}
</script>

<style></style>
