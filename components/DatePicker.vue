<template>
  <UFormGroup label="Startdatum" name="date">
    <div class="flex items-center gap-2">
      <UIcon name="lucide:calendar" class="text-gray-500" />
      <UInput
        type="date"
        v-model="modelValue"
        :max="maxDate"
        class="flex-1"
      />
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()
const today = new Date()
const maxDate = today.toISOString().split('T')[0]
</script>