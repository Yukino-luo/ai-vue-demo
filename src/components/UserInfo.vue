<template>
  <ai-dialog
    v-model="modelValue"
    :width="'600px'"
    :title="'用户详情'"
    @closed="handleClose"
    @opened="handleOpened"
  >
    <ai-form
      ref="formEl"
      :model="formInfo"
      :formConfig="formConfig"
      :disabled="pageType === 'view'"
    ></ai-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ "取消" }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          "确认"
        }}</el-button>
      </span>
    </template>
  </ai-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { regionOptions, roleOptions, tagList } from "../hooks/useUserList";

const modelValue = defineModel({ type: Boolean, default: false });
const props = defineProps({
  pageType: { type: String, default: "add" },
  userInfo: { type: Object, default: () => ({}) },
});
const emits = defineEmits(["update:modelValue", "confirm"]);

const formInfo = reactive({
  id: "",
  name: "",
  role: "",
  region: "",
  tags: [],
  createTime: "",
  image: "",
});

const formEl = ref();

const formConfig = computed(() => {
  return [
    {
      key: "name",
      label: "名称",
      type: "input",
      model: "name",
      prop: "name",
      required: true,
    },
    {
      key: "role",
      label: "角色",
      type: "select",
      model: "role",
      prop: "role",
      required: true,
      dictList: roleOptions,
    },
    {
      key: "region",
      label: "归属地区",
      type: "cascader",
      model: "region",
      prop: "region",
      required: true,
      dictList: regionOptions,
      dictKey: "value",
      dictLabel: "label",
    },
    {
      key: "createTime",
      label: "创建时间",
      type: "date",
      model: "createTime",
      prop: "createTime",
      required: true,
      dateType: "date",
    },
    {
      key: "tags",
      label: "标签",
      type: "checkbox",
      model: "tags",
      prop: "tags",
      width: 24,
      required: true,
      dictList: tagList,
    },
    {
      key: "image",
      label: "头像",
      type: "upload",
      model: "image",
      prop: "image",
      isImage: true,
      fileTypes: ['jpg', 'png', 'gif'],
      width: 24,
      required: true,
    },
  ];
});

const handleOpened = () => {
  if (props.pageType === "add") {
    //
  } else {
    Object.assign(formInfo, props.userInfo);
  }
};

const handleClose = () => {
  emits("update:modelValue", false);
  setTimeout(() => {
    formEl.value?.resetFields();
  }, 0);
};
const handleConfirm = () => {
  formEl.value.validate((res) => {
    if (res) {
      console.log(formInfo);
    }
  });
};
</script>

<style lang="scss" scoped></style>
