import { ref, reactive, computed, inject, watch } from 'vue'

export const BillingSettlementStatus = [
  { dictKey: 1, dictLabel: '待结算' },
  { dictKey: 2, dictLabel: '结算中' },
  { dictKey: 3, dictLabel: '人工结算' },
  { dictKey: 4, dictLabel: '系统结算' }
]
export const BillingConfirmationStatus = [
  { dictKey: 1, dictLabel: '待确认' },
  { dictKey: 2, dictLabel: '人工确认' },
  { dictKey: 3, dictLabel: '系统确认' }
]
export const BillingPublishStatus = [
  { dictKey: 1, dictLabel: '待发布' },
  { dictKey: 2, dictLabel: '发布中' },
  { dictKey: 3, dictLabel: '已发布' },
  { dictKey: 99, dictLabel: '发布失败' }
]
export const companyList = [
  { dictKey: '1', dictLabel: '企业A' },
  { dictKey: '2', dictLabel: '企业B' },
  { dictKey: '3', dictLabel: '企业C' },
  { dictKey: '4', dictLabel: '企业D' },
  { dictKey: '5', dictLabel: '企业E' },
  { dictKey: '6', dictLabel: '企业F' },
  { dictKey: '7', dictLabel: '企业G' },
  { dictKey: '8', dictLabel: '企业H' },
  { dictKey: '9', dictLabel: '企业I' },
  { dictKey: '10', dictLabel: '企业J' }
]

export const CurrencyList = [
  { dictLabel: 'CNY', dictKey: 'CNY' },
  { dictLabel: 'USD', dictKey: 'USD' },
  { dictLabel: 'EUR', dictKey: 'EUR' }
]

export const useOrderList = () => {
  const { ElMessageBox } = inject('$global')

  const showOrderInfo = ref(false)
  const orderPageType = ref('add')
  const orderInfo = ref({})

  const orderList = [
    {
      billId: '202309010001',
      companyName: '企业A',
      companyId: '1',
      billMonth: '2023-09',
      billAmount: 1000,
      payableAmount: 800,
      settlementAmount: 700,
      currency: 'CNY',
      publishStatus: 1,
      confirmStatus: 2,
      billPushStatus: 1,
      settlementStatus: 3,
      publishTime: '2023-09-01 10:00:00',
      confirmTime: '2023-09-02 15:30:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010002',
      companyName: '企业B',
      companyId: '2',
      billMonth: '2023-09',
      billAmount: 1500,
      payableAmount: 1200,
      settlementAmount: 1100,
      currency: 'CNY',
      publishStatus: 2,
      confirmStatus: 1,
      billPushStatus: 2,
      settlementStatus: 2,
      publishTime: '2023-09-01 11:00:00',
      confirmTime: '2023-09-02 16:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010003',
      companyName: '企业C',
      companyId: '3',
      billMonth: '2023-09',
      billAmount: 2000,
      payableAmount: 1800,
      settlementAmount: 1700,
      currency: 'CNY',
      publishStatus: 3,
      confirmStatus: 3,
      billPushStatus: 3,
      settlementStatus: 1,
      publishTime: '2023-09-01 12:00:00',
      confirmTime: '2023-09-02 17:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010004',
      companyName: '企业D',
      companyId: '4',
      billMonth: '2023-09',
      billAmount: 2500,
      payableAmount: 2200,
      settlementAmount: 2100,
      currency: 'USD',
      publishStatus: 1,
      confirmStatus: 2,
      billPushStatus: 1,
      settlementStatus: 3,
      publishTime: '2023-09-01 13:00:00',
      confirmTime: '2023-09-02 18:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010005',
      companyName: '企业E',
      companyId: '5',
      billMonth: '2023-09',
      billAmount: 3000,
      payableAmount: 2800,
      settlementAmount: 2700,
      currency: 'EUR',
      publishStatus: 2,
      confirmStatus: 1,
      billPushStatus: 2,
      settlementStatus: 2,
      publishTime: '2023-09-01 14:00:00',
      confirmTime: '2023-09-02 19:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010006',
      companyName: '企业F',
      companyId: '6',
      billMonth: '2023-09',
      billAmount: 3500,
      payableAmount: 3200,
      settlementAmount: 3100,
      currency: 'CNY',
      publishStatus: 3,
      confirmStatus: 3,
      billPushStatus: 3,
      settlementStatus: 1,
      publishTime: '2023-09-01 15:00:00',
      confirmTime: '2023-09-02 20:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010007',
      companyName: '企业G',
      companyId: '7',
      billMonth: '2023-09',
      billAmount: 4000,
      payableAmount: 3800,
      settlementAmount: 3700,
      currency: 'USD',
      publishStatus: 1,
      confirmStatus: 2,
      billPushStatus: 1,
      settlementStatus: 3,
      publishTime: '2023-09-01 16:00:00',
      confirmTime: '2023-09-02 21:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010008',
      companyName: '企业H',
      companyId: '8',
      billMonth: '2023-09',
      billAmount: 4500,
      payableAmount: 4200,
      settlementAmount: 4100,
      currency: 'EUR',
      publishStatus: 2,
      confirmStatus: 1,
      billPushStatus: 2,
      settlementStatus: 2,
      publishTime: '2023-09-01 17:00:00',
      confirmTime: '2023-09-02 22:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010009',
      companyName: '企业I',
      companyId: '9',
      billMonth: '2023-09',
      billAmount: 5000,
      payableAmount: 4800,
      settlementAmount: 4700,
      currency: 'CNY',
      publishStatus: 3,
      confirmStatus: 3,
      billPushStatus: 3,
      settlementStatus: 1,
      publishTime: '2023-09-01 18:00:00',
      confirmTime: '2023-09-02 23:00:00',
      billDueTime: '2023-09-30'
    },
    {
      billId: '202309010010',
      companyName: '企业J',
      companyId: '10',
      billMonth: '2023-09',
      billAmount: 5500,
      payableAmount: 5200,
      settlementAmount: 5100,
      currency: 'USD',
      publishStatus: 1,
      confirmStatus: 2,
      billPushStatus: 1,
      settlementStatus: 3,
      publishTime: '2023-09-01 19:00:00',
      confirmTime: '2023-09-03 00:00:00',
      billDueTime: '2023-09-30'
    }
  ]

  const orderSearchModel = reactive({
    data: {
      pageNum: 1,
      pageSize: 10,
      billMonth: '',
      billId: '',
      companyId: '',
      publishStatus: '',
      billPushStatus: '',
      confirmStatus: '',
      settlementStatus: '',
      companyId: ''
    },
  })

  const orderListConfig = computed(() => {
    return [
      {
        key: 'select',
        width: '50',
        type: 'select',
        multiple: true,
        selectable: (row, index) => {
          if (!row) {
            return false
          }
          return row?.publishStatus !== 1
        },
        fixed: 'left'
      },
      {
        key: 'id',
        head: '账单ID',
        width: 150,
        type: 'text',
        model: 'billId',
        orderModel: 'bill_id',
        fixed: 'left'
      },
      {
        key: 'companyName',
        head: '归属企业',
        width: 120,
        type: 'edit',
        orderModel: 'company_id',
        readOption: {
          type: 'enum',
          model: 'companyId',
          dictList: companyList
        },
        editOption: {
          type: 'select',
          model: 'companyId',
          required: true,
          dictList: companyList,
          prop: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.companyId`
          },
          changeFun: (val, scope, done) => {
            done()
          }
        }
      },
      {
        key: 'month',
        head: '账单月份',
        width: 160,
        type: 'edit',
        orderModel: 'bill_month',
        readOption: {
          type: 'text',
          model: 'billMonth',
        },
        editOption: {
          type: 'date',
          model: 'billMonth',
          dateType: 'month',
          valueFormat: 'YYYY-MM',
          required: true,
          prop: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.billMonth`
          },
          changeFun: (val, scope, done) => {
            done()
          }
        }
      },
      {
        key: 'billAmount',
        head: '账单金额',
        type: 'edit',
        width: 160,
        orderModel: 'bill_amount',
        readOption: {
          type: 'price',
          model: 'billAmount',
          currency: 'currency',
        },
        editOption: {
          type: 'input-select',
          model: 'billAmount',
          required: true,
          appendModel: 'currency',
          dictList: CurrencyList,
          prop: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.billAmount`
          },
          appendProp: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.currency`
          },
          changeFun: (val, scope, done) => {
            done()
          }
        }
      },
      {
        key: 'payableAmount',
        head: '应付金额',
        type: 'edit',
        width: 160,
        orderModel: 'payable_amount',
        readOption: {
          type: 'price',
          model: 'payableAmount',
          currency: 'currency',
        },
        editOption: {
          type: 'input-select',
          model: 'payableAmount',
          required: true,
          appendModel: 'currency',
          dictList: CurrencyList,
          prop: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.payableAmount`
          },
          appendProp: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.currency`
          },
          changeFun: (val, scope, done) => {
            done()
          }
        }
      },
      {
        key: 'settlementAmount',
        head: '结算金额',
        type: 'edit',
        width: 160,
        orderModel: 'settlement_amount',
        readOption: {
          type: 'price',
          model: 'settlementAmount',
          currency: 'currency',
        },
        editOption: {
          type: 'input-select',
          model: 'settlementAmount',
          required: true,
          appendModel: 'currency',
          dictList: CurrencyList,
          prop: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.settlementAmount`
          },
          appendProp: (row) => {
            const index = orderList.findIndex((item) => item.billId === row.billId)
            return `${index}.currency`
          },
          changeFun: (val, scope, done) => {
            done()
          }
        }
      },
      {
        key: 'publishStatus',
        head: '发布状态',
        width: 120,
        type: 'status',
        model: 'publishStatus',
        orderModel: 'publish_status',
        dictList: BillingPublishStatus,
        color: (row) => {
          if ([1, 2, 3].includes(row.publishStatus)) {
            return ['#d93f34', '#c97700', '#1f9d68'][row.publishStatus - 1]
          }
        }
      },
      {
        key: 'confirmStatus',
        head: '确认状态',
        width: 120,
        type: 'status',
        model: 'confirmStatus',
        orderModel: 'confirm_status',
        dictList: BillingConfirmationStatus,
        color: (row) => {
          if ([1, 2, 3].includes(row.confirmStatus)) {
            return ['#d93f34', '#1f9d68', '#2a6af5'][row.confirmStatus - 1]
          }
        }
      },
      {
        key: 'settlementStatus',
        head: '结算状态',
        width: 120,
        type: 'status',
        model: 'settlementStatus',
        orderModel: 'settlement_status',
        dictList: BillingSettlementStatus,
        color: (row) => {
          if ([1, 2, 3, 4].includes(row.settlementStatus)) {
            return ['#d93f34', '#c97700', '#1f9d68', '#1f9d68'][row.settlementStatus - 1]
          }
        }
      },
      {
        key: 'publishTime',
        head: '发布时间',
        width: 180,
        type: 'text',
        orderModel: 'publish_time',
        model: 'publishTime'
      },
      {
        key: 'confirmTime',
        head: '确认完成时间',
        width: 180,
        type: 'text',
        orderModel: 'confirm_time',
        model: 'confirmTime'
      },
      {
        key: 'billDueTime',
        head: '账单到期时间',
        width: 180,
        type: 'text',
        orderModel: 'bill_due_time',
        model: 'billDueTime'
      },
      {
        key: 'option',
        head: '操作',
        width: 180,
        type: 'option',
        fixed: 'right',
        optionConfig: [
          {
            label: '查看',
            icon: 'View',
            showFun: ({ row }) => !row?.isEdit,
            clickFun: ({ row }) => {
              showOrderInfo.value = true
              orderPageType.value = 'view'
              orderInfo.value = row
            }
          },
          {
            label: '调账',
            icon: 'EditPen',
            showFun: ({ row }) => !row?.isEdit,
            clickFun: ({ row }) => {
              row._copyData = {}
              Object.keys(row).forEach((key) => {
                if (key !== '_copyData') {
                  row._copyData[key] = row[key]
                }
              })
              row.isEdit = true
            }
          },
          {
            label: '保存',
            icon: 'SuccessFilled',
            color: '#1f9d68',
            showFun: ({ row }) => row?.isEdit,
            clickFun: ({ row, FormEl }) => {
              FormEl.validate((res) => {
                if (res) {
                  row.isEdit = false
                }
              })
            }
          },
          {
            label: '取消',
            icon: 'CircleCloseFilled',
            color: '#c97700',
            showFun: ({ row }) => row?.isEdit,
            clickFun: ({ row }) => {
              Object.keys(row).forEach((key) => {
                if (key !== '_copyData') {
                  row[key] = row._copyData[key]
                }
              })
              row.isEdit = false
            }
          },
          {
            label: '发布',
            icon: 'Promotion',
            showFun: ({ row }) => row.publishStatus === 1 && !row?.isEdit,
            clickFun: ({ row }) => {
              // 发布
            }
          },
          {
            label: '导出',
            icon: 'Download',
            showFun: ({ row }) => !row?.isEdit,
            clickFun: ({ row }) => {
              // 导出
            }
          }
        ]
      }
    ]
  })

  const orderSearchConfig = computed(() => {
    return [
      {
        label: '账单月份',
        type: 'date',
        noneLabel: true,
        width: 6,
        dateType: 'month',
        model: 'data.billMonth',
        valueFormat: 'YYYY-MM'
      },
      {
        label: '账单编号',
        type: 'input',
        noneLabel: true,
        width: 6,
        model: 'data.billId'
      },
      {
        label: '归属企业',
        type: 'select',
        noneLabel: true,
        width: 6,
        model: 'data.companyId',
        dictList: companyList
      },
      {
        label: '发布状态',
        type: 'select',
        more: true,
        width: 8,
        model: 'data.publishStatus',
        dictList: BillingPublishStatus
      },
      {
        label: '确认状态',
        type: 'select',
        more: true,
        width: 8,
        model: 'data.confirmStatus',
        dictList: BillingConfirmationStatus
      },
      {
        label: '结算状态',
        type: 'select',
        more: true,
        width: 8,
        model: 'data.settlementStatus',
        dictList: BillingSettlementStatus
      },
      {
        label: '币种',
        type: 'select',
        more: true,
        width: 8,
        model: 'data.currency',
        dictList: CurrencyList
      }
    ]
  })

  const orderActionConfig = computed(() => {
    return [
      {
        key: 'add',
        icon: 'CirclePlus',
        label: '新增',
        type: 'primary',
        left: true,
        clickFun: () => {
          showOrderInfo.value = true
          orderPageType.value = 'add'
          orderInfo.value = {}
        }
      },
      {
        key: 'import',
        icon: 'Upload',
        label: '导入',
        left: true,
        clickFun: () => {}
      },
      {
        key: 'more',
        label: '批量操作',
        type: 'primary',
        left: false,
        dropdown: true,
        menuList: [
          { label: 'action1', clickFun: () => {} },
          { label: 'action2', clickFun: () => {} },
          { label: 'action3', clickFun: () => {} },
          { label: 'action4', clickFun: () => {} }
        ]
      }
    ]
  })

  const orderSettingConfig = reactive({
    customKey: 'test-list-2',
    showColumnSetting: true
  })

  const handleOrderSearch = (searchModel) => {
    const title = '搜索条件'
    const message = `${JSON.stringify(orderSearchModel)}`
    ElMessageBox.confirm(message, title, {})
  }

  return {
    showOrderInfo,
    orderPageType,
    orderInfo,
    orderList,
    orderSearchModel,
    orderSearchConfig,
    orderListConfig,
    orderActionConfig,
    orderSettingConfig,
    handleOrderSearch
  }
}
