<template>
  <div class="layout users">
    <div class="title">
      <h2 class="grow-1 text-center">{{ $t("users.title") }}</h2>
      <al-button variation="link" @click="addNew" class="text-center">
        <em class="gg-add mx-1" />
        <span>{{ $t("general.new") }}</span>
      </al-button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="created-at">{{ $t("users.createdAt") }}</th>
          <th>{{ $t("users.username") }}</th>
          <th>{{ $t("users.admin") }}</th>
          <th>{{ $t("users.readonly") }}</th>
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
            {{ row.username }}
          </td>
          <td>
            {{ row.admin }}
          </td>
          <td>
            {{ row.readonly }}
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
        <form @submit.prevent="saveUser">
          <div class="row m-2">
            <al-input v-model="currentUser.username" :label="$t('users.username')" required />
          </div>
          <div class="row m-2">
            <al-input v-model="currentUser.password" :label="$t('users.password')" type="password" required />
          </div>
          <div class="row m-2">
            <label class="text-center">
              <input v-model="currentUser.readonly" type="checkbox" />
              {{ $t("users.readonly") }}
            </label>
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
<style lang="css" src="./user.css" />
<script lang="ts" src="./user.controller.ts" />
