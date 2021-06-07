<template>
  <div class="pagination">
    <div class="pagination-info">
      {{ $t("pagination.showing") }} {{ from }} {{ $t("pagination.until") }} {{ of }} {{ $t("pagination.from") }}
      {{ totalRecords }}
    </div>
    <div class="pagination-actions">
      <Button :variation="EVariation.LINK" :disabled="pagination.start < step" :title="$t('pagination.first')" @click="paginate(0)">
        <em class="gg-chevron-double-left" />
      </Button>
      <Button
        class="btn btn-link"
        :variation="EVariation.LINK"
        :disabled="pagination.start < step"
        :title="$t('pagination.previous')"
        @click="paginate(2)"
      >
        <em class="gg-chevron-left" />
      </Button>
      <Button
        class="btn btn-link"
        :variation="EVariation.LINK"
        :disabled="totalRecords <= step + pagination.start"
        :title="$t('pagination.next')"
        @click="paginate(1)"
      >
        <em class="gg-chevron-right" />
      </Button>
      <Button
        class="btn btn-link"
        :variation="EVariation.LINK"
        :disabled="totalRecords <= step + pagination.start"
        :title="$t('pagination.last')"
        @click="paginate(3)"
      >
        <em class="gg-chevron-double-right" />
      </Button>
    </div>
  </div>
</template>
<style lang="css" src="./paginate.css" scoped />
<script lang="ts" src="./paginate.ts" />
