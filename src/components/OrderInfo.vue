<template>
  <ai-dialog v-model="modelValue" :width="'600px'" :title="'订单详情'" @closed="handleClose" @opened="handleOpened">
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
import { ref, reactive, computed } from 'vue'
import {
  companyList,
  CurrencyList,
  BillingPublishStatus,
  BillingConfirmationStatus,
  BillingSettlementStatus
} from '../hooks/useOrderList'

const modelValue = defineModel({ type: Boolean, default: false })
const props = defineProps({
  pageType: { type: String, default: 'add' },
  orderInfo: { type: Object, default: () => ({}) }
})
const emits = defineEmits(['update:modelValue', 'confirm'])

const formInfo = reactive({
  billId: '',
  billMonth: '',
  companyId: '',
  billAmount: '',
  currency: ''
})

const formEl = ref()

const formConfig = computed(() => {
  return [
    {
      key: 'billId',
      label: '账单ID',
      type: 'input',
      model: 'billId',
      prop: 'billId',
      required: true,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'billMonth',
      label: '账单月份',
      type: 'date',
      model: 'billMonth',
      prop: 'billMonth',
      required: true,
      dateType: 'month',
      valueFormat: 'YYYY-MM'
    },
    {
      key: 'companyId',
      label: '归属企业',
      type: 'select',
      model: 'companyId',
      prop: 'companyId',
      required: true,
      dictList: companyList
    },
    {
      key: 'billAmount',
      label: '账单金额',
      type: 'input-select',
      model: 'billAmount',
      prop: 'billAmount',
      required: true,
      appendModel: 'currency',
      appendPlaceholder: '请选择币种',
      dictList: CurrencyList
    },
    {
      key: 'payableAmount',
      label: '应付金额',
      type: 'input-select',
      model: 'payableAmount',
      prop: 'payableAmount',
      required: true,
      appendModel: 'currency',
      appendPlaceholder: '请选择币种',
      dictList: CurrencyList
    },
    {
      key: 'settlementAmount',
      label: '结算金额',
      type: 'input-select',
      model: 'settlementAmount',
      prop: 'settlementAmount',
      required: true,
      appendModel: 'currency',
      appendPlaceholder: '请选择币种',
      dictList: CurrencyList,
    },
    {
      key: 'publishStatus',
      label: '发布状态',
      type: 'select',
      model: 'publishStatus',
      prop: 'publishStatus',
      required: true,
      dictList: BillingPublishStatus,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'confirmStatus',
      label: '确认状态',
      type: 'select',
      model: 'confirmStatus',
      prop: 'confirmStatus',
      required: true,
      dictList: BillingConfirmationStatus,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'settlementStatus',
      label: '结算状态',
      type: 'select',
      model: 'settlementStatus',
      prop: 'settlementStatus',
      required: true,
      dictList: BillingSettlementStatus,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'publishTime',
      label: '发布时间',
      type: 'input',
      model: 'publishTime',
      prop: 'publishTime',
      required: true,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'confirmTime',
      label: '确认完成时间',
      type: 'input',
      model: 'confirmTime',
      prop: 'confirmTime',
      required: true,
      showFun: () => props.pageType === 'view'
    },
    {
      key: 'billDueTime',
      label: '账单到期时间',
      type: 'input',
      model: 'billDueTime',
      prop: 'billDueTime',
      required: true,
      showFun: () => props.pageType === 'view'
    },
  ]
})

const handleOpened = () => {
  if (props.pageType === 'add') {
    //
  } else {
    Object.assign(formInfo, props.orderInfo)
  }
}

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
