<template>
  <UFormGroup label="Voedingsschema" name="schema">
    <div class="flex items-center gap-2">
      <UIcon name="lucide:list" class="text-gray-500" />
      <USelect
        v-model="modelValue"
        :options="options"
        placeholder="Kies een schema"
        class="flex-1"
      />
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()

const options = [
  'Herstelkuur bij Aeromonas/Pseudomonas',
  'Regulier Voedingsschema'
]
</script>