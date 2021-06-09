<template>
  <div class="layout rooms">
    <div class="flex grow-1">
      <h2 class="grow-1 text-center">{{ $t("rooms.title") }}</h2>
      <al-button variation="link" @click="addNew" class="text-center">
        <em class="gg-add mx-1" />
        <span>{{ $t("general.new") }}</span>
      </al-button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="created-at">{{ $t("rooms.createdAt") }}</th>
          <th>{{ $t("rooms.name") }}</th>
          <th>{{ $t("rooms.capacity") }}</th>
          <th>{{ $t("rooms.owner") }}</th>
        </tr>
      </thead>
      <tbody v-if="rows.length === 0">
        <tr>
          <td class="text-center" colspan="4">
            {{ $t("general.noResults") }}
          </td>
        </tr>
      </tbody>
      <tbody v-if="rows.length > 0">
        <tr v-for="row in rows" :key="row._id">
          <td class="created-at">{{ $d(new Date(), "long") }}</td>
          <td>
            {{ row.roomName }}
          </td>
          <td>
            {{ row.capacity }}
          </td>
          <td>
            <template v-if="row.owner">
              {{ row.owner.username }}
            </template>
            <template v-else>
              {{ $t("rooms.notFoundOwner") }}
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            <paginate :totalRecords="counter" @onChange="callServer"></paginate>
          </td>
        </tr>
      </tfoot>
    </table>
    <vue-js-modal name="addNew">
      <div class="column flex-center p-2">
        <form @submit.prevent="save">
          <div class="row m-2">
            <al-input v-model="record.roomName" :label="$t('rooms.name')" required />
          </div>
          <div class="row m-2">
            <al-input v-model="record.capacity" :label="$t('rooms.capacity')" type="number" />
          </div>
          <div class="flex m-2 flex-end">
            <al-button type="button" variation="link" @click="onCloseModal">{{ $t("general.cancel") }}</al-button>
            <al-button type="submit" variation="primary">{{ $t("general.save") }}</al-button>
          </div>
        </form>
      </div>
    </vue-js-modal>
  </div>
</template>
<style lang="css" src="./room.css" />
<script lang="ts" src="./room.controller.ts" />
