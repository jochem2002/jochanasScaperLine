<template>
  <div class="max-w-2xl mx-auto space-y-6 p-4">
    <SchemaSelector v-model="selectedSchema" />
    <DatePicker v-model="startDate" />

    <div v-if="schedule.length" class="space-y-2">
      <UCard v-for="day in schedule" :key="day.day">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="font-semibold">Dag {{ day.day }} – {{ formatDate(day.day) }}</span>
            <div class="flex items-center gap-2">
              <UIcon name="lucide:check-circle" class="text-green-600" />
              <UCheckbox v-model="checkedDays[day.day]" @change="saveProgress" label="Gevoerd" />
            </div>
          </div>
        </template>
        <p><strong>Voer:</strong> {{ day.food }}</p>
        <p><strong>Dosering:</strong> {{ day.dosage }}</p>
        <p><strong>Doelgroep:</strong> {{ day.target }}</p>
        <p><strong>Toelichting:</strong> {{ day.notes }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recoverySchema, regularSchema } from '@/data/schemas'
import SchemaSelector from '@/components/SchemaSelector.vue'
import DatePicker from '@/components/DatePicker.vue'

const selectedSchema = ref('')
const startDate = ref('')
const checkedDays = ref<Record<number, boolean>>({})

const schedule = computed(() => {
  const schema = selectedSchema.value === 'Herstelkuur bij Aeromonas/Pseudomonas'
    ? recoverySchema
    : selectedSchema.value === 'Regulier Voedingsschema'
    ? regularSchema
    : []

  if (!startDate.value || !schema.length) return []

  const start = new Date(startDate.value)
  return schema.map(day => ({
    ...day,
    formattedDate: new Date(start.getTime() + (day.day - 1) * 86400000)
  }))
})

function formatDate(dayNum: number) {
  if (!startDate.value) return ''
  const date = new Date(new Date(startDate.value).getTime() + (dayNum - 1) * 86400000)
  return date.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function saveProgress() {
  const key = `${selectedSchema.value}-${startDate.value}`
  localStorage.setItem(key, JSON.stringify(checkedDays.value))
}

watch([selectedSchema, startDate], () => {
  const key = `${selectedSchema.value}-${startDate.value}`
  const stored = localStorage.getItem(key)
  checkedDays.value = stored ? JSON.parse(stored) : {}
})
</script>
