<template>
  <div class="space-y-4">
    <div
      class="rounded px-4 py-2 mb-2"
      :style="{ borderLeft: '5px solid ' + selectedSchema?.color }"
    >
      <h2 class="font-bold text-xl">{{ selectedSchema?.name }}</h2>
    </div>
    <SchemaSelector
      :schemas="allSchemas"
      :selectedId="selectedId"
      @update:selectedId="selectedId = $event"
    />

    <div
        v-for="day in selectedSchema?.days || []"
        :key="day.day"
        class="border rounded p-4 flex flex-col gap-1"
        :class="dayColor(day)"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-semibold">
          Dag {{ day.day }} – {{ formatDate(day.day) }}
        </h3>
        <input type="checkbox" v-model="checked[day.day]" @change="saveProgress" />
      </div>
      <p><strong>Voer:</strong> {{ day.food }}</p>
      <p><strong>Dosering:</strong> {{ day.dosage }}</p>
      <p><strong>Doelgroep:</strong> {{ day.target }}</p>
      <p v-if="day.notes"><strong>Notitie:</strong> {{ day.notes }}</p>
    </div>

    <SchemaStats :days="selectedSchema?.days || []" :checked="checked" />
    <SchemaCalendar :days="selectedSchema?.days || []" :checked="checked" :startDate="startDate" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { regularSchema, recoverySchema } from '@/data/schemas'
import SchemaStats from '@/components/SchemaStats.vue'
import SchemaCalendar from '@/components/SchemaCalendar.vue'
import SchemaSelector from '@/components/SchemaSelector.vue'

const staticSchemas = [
  { id: 'regulier', name: 'Regulier voedingsschema', days: regularSchema, color: '#3BAAA1' },
  { id: 'herstel', name: 'Herstelkuur bij Aeromonas/Pseudomonas', days: recoverySchema, color: '#BA7D7D' }
]

const customSchemas = ref([])
const selectedId = ref('regulier')

onMounted(() => {
  const stored = localStorage.getItem('customSchemas')
  if (stored) {
    customSchemas.value = JSON.parse(stored)
  }
  const savedChecked = localStorage.getItem('checked')
  if (savedChecked) {
    checked.value = JSON.parse(savedChecked)
  }
})

const allSchemas = computed(() => [...staticSchemas, ...customSchemas.value])
const selectedSchema = computed(() =>
    allSchemas.value.find(s => s.id === selectedId.value) ?? allSchemas.value[0]
)

const startDate = ref(new Date().toISOString().slice(0, 10))
const checked = ref<Record<number, boolean>>({})

function saveProgress() {
  localStorage.setItem('checked', JSON.stringify(checked.value))
}

function formatDate(day: number): string {
  const base = new Date(startDate.value)
  const offset = day - 1
  const d = new Date(base.getTime() + offset * 86400000)
  return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function dayColor(day: any) {
  if (day.food.includes('Rustdag')) return 'bg-orange-50 dark:bg-orange-900'
  if (day.food.includes('Garlic')) return 'bg-orange-50 dark:bg-orange-900'
  if (day.food.includes('Acai')) return 'bg-purple-50 dark:bg-purple-900'
  if (day.food.includes('Shrimp')) return 'bg-green-50 dark:bg-green-900'
  return 'bg-white dark:bg-neutral-800'
}

watch(selectedId, () => {
  checked.value = {}
  saveProgress()
})
</script>