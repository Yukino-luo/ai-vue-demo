<template>
  <ai-dialog v-model="modelValue" :width="'600px'" :title="'商品详情'" @closed="handleClose" @opened="handleOpened">
    <ai-form ref="formEl" :model="formInfo" :formConfig="formConfig" :disabled="pageType === 'view'"></ai-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ '取消' }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ '确认' }}</el-button>
      </span>
    </template>
  </ai-dialog>
</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue'
import { CurrencyList } from '../hooks/useGoodsList'

const { apiHttp } = inject('$global')

const modelValue = defineModel({ type: Boolean, default: false })
const props = defineProps({
  pageType: { type: String, default: 'add' },
  goodsInfo: { type: Object, default: () => ({}) }
})
const emits = defineEmits(['update:modelValue', 'confirm'])

const formInfo = reactive({
  name: '',
  image: '',
  banners: [],
  originalPrice: '',
  currentPrice: '',
  currency: '',
  totalInventory: '',
  currentInventory: '',
  monthSales: '',
  status: 1
})

const formEl = ref()

const formConfig = computed(() => {
  return [
    {
      key: 'id',
      label: 'ID',
      type: 'input',
      model: 'id',
      prop: 'id',
      required: true,
      disabled: true,
      showFun: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'name',
      label: '商品名称',
      type: 'input',
      model: 'name',
      prop: 'name',
      required: true
    },
    {
      key: 'image',
      label: '商品图片',
      type: 'upload',
      model: 'image',
      prop: 'image',
      isImage: true,
      disabled: () => props.pageType === 'view',
      fileTypes: ['jpg', 'png', 'gif'],
      fileSize: 1,
      width: 24,
      required: true
    },
    {
      key: 'banners',
      label: '轮播图',
      type: 'upload',
      model: 'banners',
      prop: 'banners',
      isImage: true,
      showFileList: true,
      multiple: true,
      disabled: () => props.pageType === 'view',
      fileTypes: ['jpg', 'png', 'gif'],
      fileSize: 1,
      width: 24,
      required: true
    },
    {
      key: 'originalPrice',
      label: '原价',
      type: 'input-select',
      model: 'originalPrice',
      prop: 'originalPrice',
      required: true,
      appendModel: 'currency',
      appendPlaceholder: '请选择币种',
      dictList: CurrencyList
    },
    {
      key: 'currentPrice',
      label: '现价',
      type: 'input-select',
      model: 'currentPrice',
      prop: 'currentPrice',
      required: true,
      appendModel: 'currency',
      appendPlaceholder: '请选择币种',
      dictList: CurrencyList
    },
    {
      key: 'totalInventory',
      label: '总库存',
      type: 'input',
      model: 'totalInventory',
      prop: 'totalInventory',
      required: true,
      disabled: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'currentInventory',
      label: '剩余库存',
      type: 'input',
      model: 'currentInventory',
      prop: 'currentInventory',
      disabled: () => props.pageType === 'view',
      showFun: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'monthSales',
      label: '月销量',
      type: 'input',
      model: 'monthSales',
      prop: 'monthSales',
      disabled: true,
      showFun: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'status',
      label: '上架状态',
      type: 'switch',
      model: 'status',
      prop: 'status',
      activeValue: 1,
      inactiveValue: 0,
      required: true,
      disabled: () => props.pageType === 'view',
      showFun: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'createdAt',
      label: '创建时间',
      type: 'date',
      dateType: 'datetime',
      model: 'createdAt',
      prop: 'createdAt',
      format: 'YYYY-MM-DD hh:mm:ss',
      required: true,
      disabled: true,
      showFun: () => ['view', 'edit'].includes(props.pageType)
    },
    {
      key: 'updatedAt',
      label: '更新时间',
      type: 'date',
      dateType: 'datetime',
      model: 'updatedAt',
      prop: 'updatedAt',
      format: 'YYYY-MM-DD hh:mm:ss',
      required: true,
      disabled: true,
      showFun: () => ['view', 'edit'].includes(props.pageType)
    }
  ]
})

const handleOpened = () => {
  if (props.pageType === 'add') {
    //
  } else {
    Object.assign(formInfo, props.goodsInfo)
  }
}

const handleClose = () => {
  emits('update:modelValue', false)
  setTimeout(() => {
    formEl.value?.resetFields()
  }, 0)
}
const handleConfirm = () => {
  console.log(formInfo)
  formEl.value.validate((res) => {
    if (res) {
      if (props.pageType === 'add') {
        const data = {
          name: formInfo.name,
          image: formInfo.image,
          banners: formInfo.banners,
          originalPrice: formInfo.originalPrice,
          currentPrice: formInfo.currentPrice,
          currency: formInfo.currency,
          totalInventory: formInfo.totalInventory,
          status: 1
        }
        apiHttp({
          method: 'post',
          url: '/goods/create',
          data: { data },
          loading: true,
          successMsg: '新建成功'
        }).then((res) => {
          emits('confirm')
          handleClose()
        })
      } else if (props.pageType === 'edit') {
        apiHttp({
          method: 'post',
          url: '/goods/update',
          data: { data: formInfo },
          loading: true,
          successMsg: '更新成功'
        }).then((res) => {
          emits('confirm')
          handleClose()
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
