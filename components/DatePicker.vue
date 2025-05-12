<template>
  <div class="flex flex-col gap-1">
    <label for="start-date" class="font-medium">Startdatum</label>
    <input
        id="start-date"
        type="date"
        v-model="model"
        :class="'border rounded px-3 py-2 w-fit'"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>