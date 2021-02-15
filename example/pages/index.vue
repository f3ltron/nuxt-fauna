<template>
  <div class="container h-screen m-auto">
    <div class="px-4 py-2 rounded-lg bg-gray-200 w-2/3 m-auto mb-8">
      <h1 class="text-center text-lg mb-8">CREATE TODO</h1>
      <form class="flex justify-center flex-wrap" @submit.prevent="createTodo">
        <div class="w-full mb-8">
          <label for="name">
            <input
              id="name"
              v-model="name"
              placeholder="name"
              type="text"
              class="px-4 py-2 border border-gray-600 w-full"
            />
          </label>
        </div>
        <div class="w-full mb-8">
          <label for="description">
            <input
              id="description"
              v-model="description"
              placeholder="description"
              type="text"
              class="px-4 py-2 border border-gray-600 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          class="px-4 py-2 uppercase bg-gray-600 text-white"
        >
          Create Todo
        </button>
      </form>
    </div>
    <h1 class="text-lg font-bold mb-8">TODO</h1>
    <div
      v-for="todo in todos.data"
      :key="todo.ref['@ref'].id"
      class="px-4 py-2 bg-gray-200 font-bold flex mb-8"
    >
      <div class="flex-grow">
        {{ todo.data.name }} <br />
        {{ todo.data.description }}
      </div>
      <div>
        <button
          class="px-4 py-2 uppercase bg-gray-600 text-white"
          @click="deleteTodo(todo)"
        >
          DELETE
        </button>
        <button
          class="px-4 py-2 uppercase bg-gray-600 text-white"
          @click="updateTodo(todo.ref['@ref'].id)"
        >
          DONE
        </button>
      </div>
    </div>
    <h1 class="text-lg font-bold mb-8">DONE</h1>
    <div
      v-for="done in dones.data"
      :key="done.ref['@ref'].id"
      class="px-4 py-2 bg-gray-200 font-bold flex mb-8"
    >
      <div class="flex-grow">
        {{ done.data.name }} <br />
        {{ done.data.description }}
      </div>
      <div>
        <button
          class="px-4 py-2 uppercase bg-gray-600 text-white"
          @click="deleteDone(done)"
        >
          DELETE
        </button>
        <button
          class="px-4 py-2 uppercase bg-gray-600 text-white"
          @click="updateTodo(done.ref['@ref'].id, false)"
        >
          UNDONE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $fauna }) {
    try {
      const { todos } = await $fauna
        .client()
        .readCollections({ collections: ['todos'] })
      return {
        todos: {
          data: todos.data.filter((t) => t.data.done === false),
        },
        dones: {
          data: todos.data.filter((t) => t.data.done === true),
        },
      }
    } catch (e) {
      console.log(e)
    }
  },
  data: () => ({
    name: '',
    description: '',
    todos: {
      data: [],
    },
    dones: {
      data: [],
    },
  }),
  methods: {
    async deleteTodo(todo) {
      try {
        await this.$fauna
          .client()
          .delete({ collection: 'todos', id: todo.ref['@ref'].id })
        this.todos.data = this.todos.data.filter(
          (t) => t.ref['@ref'].id !== todo.ref['@ref'].id
        )
      } catch (e) {
        console.log(e)
      }
    },
    async createTodo() {
      if (!this.name.length || !this.description) return
      try {
        const todo = await this.$fauna.client().create({
          collection: 'todos',
          data: {
            name: this.name,
            description: this.description,
            done: false,
          },
        })
        todo.ref['@ref'] = todo.ref.value
        this.todos.data = [...this.todos.data, todo]
      } catch (e) {
        console.log(e)
      } finally {
        this.name = ''
        this.description = ''
      }
    },
    async deleteDone(done) {
      try {
        await this.$fauna
          .client()
          .delete({ collection: 'todos', id: done.ref['@ref'].id })
        this.dones.data = this.dones.data.filter(
          (t) => t.ref['@ref'].id !== done.ref['@ref'].id
        )
      } catch (e) {
        console.log(e)
      }
    },
    async updateTodo(id, done = true) {
      try {
        const todo = await this.$fauna.client().update({
          collection: 'todos',
          id,
          data: {
            done,
          },
        })

        todo.ref['@ref'] = todo.ref.value
        if (done) {
          this.dones.data = [...this.dones.data, todo]
          this.todos.data = this.todos.data.filter(
            (t) => t.ref['@ref'].id !== id
          )
        } else {
          this.todos.data = [...this.todos.data, todo]
          this.dones.data = this.dones.data.filter(
            (t) => t.ref['@ref'].id !== id
          )
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
