<script lang="ts" setup>
import { ref } from "vue";
import Info from "./modules/info.vue";
import EditInfo from "./modules/edit-info.vue";
// import EditPassword from "./modules/editPassword.vue";

const tab = ref("editInfo");
const infoRef = ref<InstanceType<typeof Info> | null>(null);
const infoChange = () => {
  // infoRef.value?.init();
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-auto">
    <NGrid
      class="flex-1"
      cols="1 s:2"
      x-gap="16"
      y-gap="16"
      responsive="screen"
      item-responsive
    >
      <NGridItem>
        <NCard title="个人信息" class="h-full w-full overflow-auto">
          <Info ref="infoRef" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard class="h-full w-full overflow-hidden">
          <NTabs v-model:value="tab" class="mb-5" type="line" animated>
            <NTab
              class="h-full"
              name="editInfo"
              tab="修改个人信息"
            ></NTab>
            <NTab name="editPwn" tab="修改密码"></NTab>
          </NTabs>
          <EditInfo v-if="tab === 'editInfo'" @change="infoChange" />
          <!-- <EditPassword v-else /> -->
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>
