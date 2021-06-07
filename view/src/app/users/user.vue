<template>
  <div class="layout users">
    <h2>{{ $t("users.title") }}</h2>
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
  </div>
</template>
<style lang="css" src="./user.css" />
<script lang="ts" src="./user.controller.ts" />
