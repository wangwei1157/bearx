<script setup lang="ts">
import { fetchGetUserInfo } from "@/service/api";
import { NForm, UploadFileInfo } from "naive-ui";
import { onMounted, ref } from "vue";

const userForm = ref<
  Omit<Api.Auth.UserInfo, "avatar"> & { avatar: Omit<UploadFileInfo, "id">[] }
>({
  userId: undefined,
  userName: "",
  nickName: "",
  email: "",
  phone: "",
  birthDate: "",
  signature: "",
  avatar: [],
  gender: 1,
});

async function getUserInfo() {
  const { data, error } = await fetchGetUserInfo();
  if (!error) {
    userForm.value = {
      ...data,
      avatar: [
        {
          name: 'avatar.png',
          url: data.avatar as string,
          status: "finished",
        },
      ]
    };
  }
}

onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div class="px-16px">
    <NForm
      class="flex-col"
      :model="userForm"
      inline
      label-placement="left"
      label-width="100"
      size="small"
    >
      <NGrid cols="1 s:2" x-gap="16" y-gap="10" responsive="screen">
        <NGridItem span="2">
          <NFormItem label="头像">
            <NUpload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :file-list="userForm.avatar as UploadFileInfo[]"
              list-type="image-card"
              :max="1"
            />
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="用户名">
            <NInput disabled :value="userForm.userName" />
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="昵称">
            <NInput v-model:value="userForm.nickName" />
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="生日">
            <NDatePicker
              class="w-100%"
              placeholder="请选择日期"
              v-model="userForm.birthDate"
            />
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="性别">
            <NRadioGroup v-model:value="userForm.gender">
              <NRadio :value="1">男</NRadio>
              <NRadio :value="2">女</NRadio>
            </NRadioGroup>
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="手机号码">
            <NInput v-model:value="userForm.phone" />
          </NFormItem>
        </NGridItem>
        <NGridItem>
          <NFormItem label="邮箱">
            <NInput v-model:value="userForm.email" />
          </NFormItem>
        </NGridItem>
        <NGridItem span="2">
          <NFormItem label="个性签名">
            <NInput type="textarea" v-model:value="userForm.signature" />
          </NFormItem>
        </NGridItem>
      </NGrid>
      <div class="flex-center w-100%">
        <NButton class="w-100px" type="primary">修改</NButton>
      </div>
    </NForm>
  </div>
</template>

<style scoped></style>
