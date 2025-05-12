<template>
  <UCard v-if="stats.totalDays > 0" class="mt-6">
    <h2 class="text-lg font-semibold mb-2">Statistieken</h2>
    <div class="space-y-1">
      <p><strong>Totaal aantal dagen:</strong> {{ stats.totalDays }}</p>
      <p><strong>Dagen gevoerd:</strong> {{ stats.checkedDays }}</p>
      <p><strong>Laatste gevoerde dag:</strong> {{ stats.lastFed || '–' }}</p>
      <div v-for="(avg, unit) in stats.averages" :key="unit">
        <p><strong>Gemiddeld ({{ unit }}):</strong> {{ avg }}</p>
      </div>
      <div class="mt-2">
        <p class="mb-1"><strong>Voltooid:</strong> {{ stats.percentage }}%</p>
        <progress :value="stats.percentage" max="100" class="w-full h-2"></progress>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  days: any[]
  checked: Record<number, boolean>
}>()

const stats = computed(() => {
  const totalDays = props.days.length
  const checkedDays = props.days.filter(d => props.checked[d.day]).length
  const percentage = totalDays ? Math.round((checkedDays / totalDays) * 100) : 0

  const lastFedDay = [...props.days].reverse().find(d => props.checked[d.day])
  const lastFed = lastFedDay ? dToDate(lastFedDay.day) : null

  const dosageByUnit: Record<string, number[]> = {}

  props.days.forEach(d => {
    const match = d.dosage.match(/([\d.]+)\s?(mg|tab|stick)/i)
    if (match) {
      const amount = parseFloat(match[1])
      const unit = match[2].toLowerCase()
      if (!dosageByUnit[unit]) dosageByUnit[unit] = []
      dosageByUnit[unit].push(amount)
    }
  })

  const averages: Record<string, string> = {}
  Object.entries(dosageByUnit).forEach(([unit, values]) => {
    const sum = values.reduce((a, b) => a + b, 0)
    const avg = sum / values.length
    averages[unit] = avg.toFixed(1)
  })

  return {
    totalDays,
    checkedDays,
    percentage,
    lastFed,
    averages
  }
})

function dToDate(day: number): string {
  if (!props.days.length) return ''
  const start = new Date()
  const offset = props.days[0].day - 1
  const date = new Date(start.getTime() + (day - 1 - offset) * 86400000)
  return date.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}
</script>