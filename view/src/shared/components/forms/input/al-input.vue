<template>
  <div class="al-input">
    <input
      class="al-input-box"
      :name="name"
      :class="{ 'valid': !!value || isValid, 'invalid': value && !isValid }"
      :value="value"
      @input="onInputChange"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      :pattern="pattern"
      :required="required"
    />
    <label :for="name" class="al-input-label">{{ label }}</label>
    <span class="al-input-bar" />
    <div v-if="value && !isValid" class="invalid-message">
      {{ errorMessage }}
    </div>
  </div>
</template>
<style lang="css" src="./al-input.css" />
<script lang="ts" src="./al-input.controller.ts" />
