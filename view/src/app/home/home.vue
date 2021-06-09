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
        <div class="messages-container">
          <template v-if="!selectedRoom._id">
            <h3 v-html="$t('home.selectARoom')" />
          </template>
          <template v-else-if="!chatroom.messages">
            <h3 v-html="$t('home.noMessages')" />
          </template>
          <template v-else>
            <div class="messages" ref="chatContainer">
              <div v-for="message in chatroom.messages" :key="message.date">
                <small class="messages-date">{{ $d(new Date(message.date), "long") }}</small>
                <div class="messages-text">
                  <div class="messages-user">
                    {{ message.user || "?" }}
                  </div>
                  {{ message.text }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="row">
          <form @submit.prevent="sendMessage" v-if="selectedRoom._id" class="flex grow-1 py-2">
            <al-input class="grow-1" :label="$t('home.chatPlaceholder')" v-model="currentText"></al-input>
            <em class="gg-chevron-right" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" src="./home.css" scoped />
<script lang="ts" src="./home.controller.ts" />
