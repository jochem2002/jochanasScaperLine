<template>
  <UCard class="mt-6">
    <h2 class="text-lg font-semibold mb-3">Kalenderoverzicht</h2>
    <div class="grid grid-cols-7 gap-1 text-center text-sm">
      <div class="font-medium" v-for="d in daysOfWeek" :key="d">{{ d }}</div>
      <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
          'p-2 rounded border h-20 flex items-center justify-center text-xs flex-col',
          day.isToday ? 'border-blue-600 font-bold' : 'border-gray-200',
          day.checked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
        ]"
      >
        <span>{{ day.date?.getDate?.() }}</span>
        <small v-if="day.schemaDay">Dag {{ day.schemaDay.day }}</small>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  days: any[]
  checked: Record<number, boolean>
  startDate: string
}>()

const daysOfWeek = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']

const calendarDays = computed(() => {
  const start = new Date(props.startDate)
  const items = []
  const today = new Date()

  props.days.forEach((d: any) => {
    const date = new Date(start.getTime() + (d.day - 1) * 86400000)
    items.push({
      date,
      isToday: sameDay(date, today),
      checked: !!props.checked[d.day],
      schemaDay: d
    })
  })

  const firstDate = items[0]?.date
  const padding = firstDate ? (firstDate.getDay() + 6) % 7 : 0 // week start op maandag
  return [
    ...Array(padding).fill({}),
    ...items
  ]
})

function sameDay(d1: Date, d2: Date): boolean {
  return d1.toDateString() === d2.toDateString()
}
</script>

<style scoped>
.grid {
  grid-auto-rows: minmax(3rem, auto);
}
</style>