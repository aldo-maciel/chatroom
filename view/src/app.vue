<template>
  <div class="app">
    <navbar />
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="css" src="./app.css" />
<script lang="ts" src="./app.ts" />
