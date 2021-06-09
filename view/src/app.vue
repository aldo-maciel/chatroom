<template>
  <div class="app">
    <navbar />
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--z-index here is really bad. I know. I have no time to fix that ;( -->
    <vue-js-modal name="loginModal" style="z-index: 99999" :clickToClose="false">
      <div class="column flex-center p-2">
        <form @submit.prevent="login">
          <div class="row m-2">
            <al-input v-model="currentUser.username" :label="$t('users.username')" required />
          </div>
          <div class="row m-2">
            <al-input v-model="currentUser.password" :label="$t('users.password')" type="password" required />
          </div>
          <div class="flex m-2 flex-end">
            <al-button type="submit" variation="primary">{{ $t("users.login") }}</al-button>
          </div>
        </form>
      </div>
    </vue-js-modal>
  </div>
</template>
<style lang="css" src="./app.css" />
<script lang="ts" src="./app.ts" />
