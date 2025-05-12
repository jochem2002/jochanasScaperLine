<template>
  <div class="flex gap-3 items-center">
    <label for="schema" class="font-medium">Kies schema</label>
    <select
        id="schema"
        v-model="model"
        @change="$emit('update:selectedId', model)"
        class="border rounded px-3 py-2"
    >
      <option
        v-for="s in schemas"
        :key="s.id"
        :value="s.id"
      >
        {{ s.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  schemas: { id: string, name: string }[]
  selectedId: string
}>()

const model = ref(props.selectedId)

watch(() => props.selectedId, (val) => {
  model.value = val
})
</script>