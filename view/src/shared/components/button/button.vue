<template>
    <button class="btn" :class="`btn-${variation} btn-${size} ${disabled ? 'disabled' : ''}`" :disable="disabled" @click="onClick">
        <span class="btn-text">
            <slot></slot>
        </span>
    </button>
</template>
<style lang="css" src="./button.css" scoped />
<script lang="ts" src="./button.controller.ts" />
