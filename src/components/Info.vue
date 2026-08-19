<template>
  <ai-dialog v-model="modelValue" :width="'600px'" :title="'新增'" @closed="handleClose">
    <ai-form ref="formEl" :model="formInfo" :formConfig="formConfig"></ai-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ '取消' }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ '确认' }}</el-button>
      </span>
    </template>
  </ai-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const modelValue = defineModel({ type: Boolean, default: false })
const props = defineProps({
  pageType: { type: String, default: 'add' }
})
const emits = defineEmits(['update:modelValue', 'confirm'])

const dict1 = [
  { dictKey: 1, dictValue: 'Zone one' },
  { dictKey: 2, dictValue: 'Zone two' }
]

const dict2 = [
  {
    value: 'cn',
    label: '中国',
    children: [
      { value: 'sh', label: '上海' },
      { value: 'sz', label: '深圳' }
    ]
  },
  {
    value: 'us',
    label: '美国',
    children: [
      { value: 'ne', label: '纽约' },
      { value: 'ja', label: '加利福利亚' }
    ]
  }
]

const dict3 = [
  { dictKey: 1, dictValue: 'Online activities' },
  { dictKey: 2, dictValue: 'Promotion activities' },
  { dictKey: 3, dictValue: 'Offline activities' },
  { dictKey: 4, dictValue: 'Simple brand exposure' }
]

const dict4 = [
  { dictKey: 1, dictValue: 'Sponsorship' },
  { dictKey: 2, dictValue: 'Venue' }
]

const formInfo = reactive({
  id: '',
  name: '',
  type: '',
  date: '2026-08-14',
  area: '',
  checkbox: [],
  resource: '',
  file: ''
})
const formEl = ref()

const formConfig = computed(() => {
  return [
    {
      key: 'id',
      label: 'Activity Id',
      type: 'input',
      model: 'id',
      prop: 'id',
      required: true
    },
    // {
    //   key: 'my-name',
    //   label: 'My名称',
    //   type: 'my-input',
    //   model: 'name',
    //   prop: 'name',
    // },
    {
      key: 'type',
      label: 'Activity zone',
      type: 'select',
      model: 'type',
      prop: 'type',
      required: true,
      dictList: dict1
    },
    {
      key: 'date',
      label: 'Activity time',
      type: 'date',
      model: 'date',
      prop: 'date',
      required: true,
      dateType: 'date'
    },
    {
      key: 'area',
      label: 'Activity 地区',
      type: 'cascader',
      model: 'area',
      prop: 'area',
      required: true,
      dictList: dict2,
      dictKey: 'value',
      dictValue: 'label'
    },
    {
      key: 'resource',
      label: 'Activity 来源',
      type: 'radio',
      model: 'resource',
      prop: 'resource',
      required: true,
      dictList: dict4
    },
    {
      key: 'checkbox',
      label: 'Activity Check',
      type: 'checkbox',
      model: 'checkbox',
      prop: 'checkbox',
      width: 24,
      required: true,
      dictList: dict3
    },
    {
      key: 'file',
      label: 'Activity File',
      type: 'upload',
      model: 'file',
      prop: 'file',
      width: 24,
      required: true
    }
  ]
})

const handleClose = () => {
  emits('update:modelValue', false)
  setTimeout(() => {
    formEl.value?.resetFields()
  }, 0)
}
const handleConfirm = () => {
  formEl.value.validate((res) => {
    if (res) {
      console.log(formInfo)
    }
  })
}
</script>

<style lang="scss" scoped></style>
