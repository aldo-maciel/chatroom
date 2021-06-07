<template>
    <div class="layout home">
      <h2 class="text-center">{{ $t("home.title") }}</h2>
      <div class="row">
        <div class="column rooms">
          <ul>
            <li v-for="room in rooms" :key="room._id" @click="selectRoom(room)" :class="{'selected': selectedRoom && selectedRoom._id === room._id}">
              {{ room.roomName }}
            </li>
          </ul>
        </div>
        <div class="column chat">
          <div class="row">
            <div class="row grow-1 flex-center">
              <template v-if="!chatroom.messages">
                <h3 v-html="$t('home.noMessages')" />
              </template>
              <template v-else>
                <div class="row" v-for="message in chatroom.messages" :key="message.date">
                  <div>{{ message.text }}{{ message.date }}{{ message.userId }}</div>
                </div>
              </template>
            </div>
            <form @submit.prevent="sendMessage">
            <div class="column">
              <al-input :label="$t('home.chatPlaceholder')" v-model="currentText"></al-input>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="css" src="./home.css" scoped />
<script lang="ts" src="./home.controller.ts" />
