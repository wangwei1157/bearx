<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";
const authStore = useAuthStore();
const { userInfo } = authStore;
</script>
<template>
  <div>
    <NDescriptions label-placement="left" bordered :column="2">
      <NDescriptionsItem label="头像" :span="2">
        <NAvatar :src="userInfo.avatar" size="large" />
      </NDescriptionsItem>
      <NDescriptionsItem label="用户名">{{ userInfo.userName }}</NDescriptionsItem>
      <NDescriptionsItem label="昵称">{{ userInfo.nickName }}</NDescriptionsItem>
      <NDescriptionsItem label="性别">
        <NTag :type="userInfo.gender == 1 ? 'info' : 'error'">{{
          userInfo.gender == 1 ? "男" : "女"
        }}</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem label="用户角色">
        <NTag>超管</NTag>
      </NDescriptionsItem>
      <NDescriptionsItem label="邮箱">{{ userInfo.email }}</NDescriptionsItem>
      <NDescriptionsItem label="手机号码">{{ userInfo.phone }}</NDescriptionsItem>
      <NDescriptionsItem label="生日">{{ userInfo.birthDate }}</NDescriptionsItem>
      <NDescriptionsItem label="个性签名">{{ userInfo.signature }}</NDescriptionsItem>
    </NDescriptions>
  </div>
</template>

<style scoped></style>
