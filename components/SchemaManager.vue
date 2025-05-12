<template>
  <UCard class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Schema's beheren</h2>
      <UButton icon="plus" @click="newSchemaDialog = true">Nieuw schema</UButton>
    </div>

    <div v-if="schemas.length === 0" class="text-gray-500">Nog geen schema’s beschikbaar.</div>

    <ul class="space-y-2">
      <li
          v-for="schema in schemas"
          :key="schema.id"
          class="border rounded p-3 flex items-center justify-between"
          :style="{ borderColor: schema.color }"
      >
        <div>
          <strong>{{ schema.name }}</strong><br />
          <span class="text-sm text-gray-600">{{ schema.days.length }} dagen</span>
        </div>
        <div class="flex gap-2">
          <UButton size="xs" variant="ghost" icon="pencil" @click="editSchema(schema)" />
          <UButton size="xs" variant="ghost" icon="trash" @click="removeSchema(schema.id)" />
        </div>
      </li>
    </ul>

    <UModal v-model="newSchemaDialog">
      <UCard>
        <template #header>
          <h3 class="text-md font-semibold">Nieuw schema aanmaken</h3>
        </template>
        <form @submit.prevent="createSchema" class="space-y-3">
          <div>
            <label class="block mb-1">Naam</label>
            <input v-model="newSchema.name" required class="input" />
          </div>
          <div>
            <label class="block mb-1">Kleur</label>
            <input type="color" v-model="newSchema.color" />
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <UButton type="button" variant="ghost" @click="newSchemaDialog = false">Annuleer</UButton>
            <UButton type="submit">Opslaan</UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

type Day = {
  day: number
  food: string
  dosage: string
  target: string
  notes?: string
}

type Schema = {
  id: string
  name: string
  color: string
  days: Day[]
}

const schemas = ref<Schema[]>([])

const STORAGE_KEY = 'customSchemas'

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    schemas.value = JSON.parse(stored)
  }
})

watch(schemas, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schemas.value))
}, { deep: true })

// Nieuw schema dialoog
const newSchemaDialog = ref(false)
const newSchema = reactive({
  name: '',
  color: '#3BAAA1'
})

function createSchema() {
  const emptySchema: Schema = {
    id: uuidv4(),
    name: newSchema.name,
    color: newSchema.color,
    days: []
  }
  schemas.value.push(emptySchema)
  newSchema.name = ''
  newSchema.color = '#3BAAA1'
  newSchemaDialog.value = false
}

function removeSchema(id: string) {
  schemas.value = schemas.value.filter(s => s.id !== id)
}

function editSchema(schema: Schema) {
  alert(`Bewerkfunctie volgt nog voor schema "${schema.name}"`)
}
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 w-full;
}
</style>