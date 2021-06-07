<template>
  <div class="layout users">
    <h2>{{ $t("rooms.title") }}</h2>
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
  </div>
</template>
<style lang="css" src="./room.css" />
<script lang="ts" src="./room.controller.ts" />
