import { ref, reactive, computed, watch, inject } from 'vue'

export const CurrencyList = [
  { dictValue: 'CNY', dictKey: 'CNY' },
  { dictValue: 'USD', dictKey: 'USD' },
  { dictValue: 'EUR', dictKey: 'EUR' }
]

export const statusOptions = [
  { dictKey: 0, dictValue: '下架' },
  { dictKey: 1, dictValue: '上架' }
]

export const useGoodsList = () => {
  const showGoodsInfo = ref(false)
  const goodsPageType = ref('add')
  const goodsInfo = ref({})
  const GoodsListEl = ref()

  const { apiHttp } = inject('$global')

  const goodsSearchModel = reactive({
    data: {
      pageNum: 1,
      pageSize: 10,
      id: '',
      name: '',
      currency: '',
      status: '',
      createdAtTemp: [],
      createdAtStart: '',
      createdAtEnd: ''
    }
  })

  const goodsSearchConfig = computed(() => {
    return [
      {
        key: 'id',
        label: 'ID',
        type: 'input',
        noneLabel: true,
        width: 6,
        model: 'data.id'
      },
      {
        key: 'name',
        label: '名称',
        type: 'input',
        noneLabel: true,
        width: 6,
        model: 'data.name'
      },
      {
        key: 'currency',
        label: '币种',
        type: 'select',
        noneLabel: true,
        width: 6,
        model: 'data.currency',
        dictList: CurrencyList
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        width: 8,
        model: 'data.status',
        more: true,
        dictList: statusOptions
      },
      {
        key: 'createTime',
        label: '创建时间范围',
        type: 'date',
        width: 16,
        model: 'data.createdAtTemp',
        more: true,
        dateType: 'daterange',
        endModel: 'data.createdAtEnd',
        startModel: 'data.createdAtStart',
        endPlaceholder: '结束时间',
        startPlaceholder: '开始时间'
      }
    ]
  })

  const goodsListConfig = computed(() => {
    return [
      {
        key: 'id',
        head: 'ID',
        width: 50,
        type: 'text',
        model: 'id',
        orderModel: 'id',
        fixed: 'left',
        multiple: true
      },
      {
        key: 'image',
        head: '商品图片',
        width: 100,
        type: 'image',
        model: 'image'
      },
      {
        key: 'name',
        head: '商品名称',
        type: 'text',
        model: 'name',
        orderModel: 'name'
      },
      {
        key: 'originalPrice',
        head: '原价',
        width: 100,
        type: 'price',
        model: 'originalPrice',
        orderModel: 'originalPrice',
        currency: 'currency'
      },
      {
        key: 'currentPrice',
        head: '现价',
        width: 100,
        type: 'price',
        model: 'currentPrice',
        orderModel: 'currentPrice',
        currency: 'currency'
      },
      {
        key: 'totalInventory',
        head: '总库存',
        width: 100,
        type: 'text',
        model: 'totalInventory',
        orderModel: 'totalInventory'
      },
      {
        key: 'currentInventory',
        head: '剩余库存',
        width: 120,
        type: 'text',
        model: 'currentInventory',
        orderModel: 'currentInventory'
      },
      {
        key: 'monthSales',
        head: '月销量',
        width: 100,
        type: 'text',
        model: 'monthSales',
        orderModel: 'monthSales'
      },
      {
        key: 'status',
        head: '在线状态',
        width: 120,
        type: 'status',
        model: 'status',
        orderModel: 'status',
        dictList: statusOptions,
        color: (row) => {
          if ([0, 1].includes(row.status)) {
            return ['#d93f34', '#1f9d68'][row.status]
          }
        }
      },
      {
        key: 'createdAt',
        head: '创建时间',
        width: 180,
        type: 'text',
        model: 'createdAt',
        orderModel: 'createdAt'
      },
      {
        key: 'option',
        head: '操作',
        type: 'option',
        fixed: 'right',
        width: 160,
        optionConfig: [
          {
            label: '查看',
            icon: 'View',
            clickFun: async ({ row }) => {
              showGoodsInfo.value = true
              goodsPageType.value = 'view'
              goodsInfo.value = row
            }
          },
          {
            label: '编辑',
            icon: 'Edit',
            clickFun: ({ row }) => {
              showGoodsInfo.value = true
              goodsPageType.value = 'edit'
              goodsInfo.value = row
            }
          },
          {
            label: '删除',
            icon: 'DeleteFilled',
            clickFun: ({ row }) => {
              window.ElMessageBox.confirm('确定要删除吗？', '删除', { type: 'error' }).then(() => {
                apiHttp({
                  method: 'post',
                  url: '/goods/delete',
                  data: { id: row.id },
                  loading: true,
                  successMsg: '删除成功'
                }).then(() => {
                  handleGoodsRefresh()
                })
              })
            }
          }
        ]
      }
    ]
  })

  const goodsActionConfig = computed(() => {
    return [
      {
        key: 'add',
        icon: 'CirclePlus',
        label: '新增',
        type: 'primary',
        left: true,
        clickFun: () => {
          showGoodsInfo.value = true
          goodsPageType.value = 'add'
          goodsInfo.value = {}
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

  const goodsSettingConfig = reactive({
    customKey: 'test-list3',
    showColumnSetting: true
  })

  const handleGoodsRefresh = () => {
    GoodsListEl.value?.search()
  }

  return {
    GoodsListEl,
    showGoodsInfo,
    goodsPageType,
    goodsInfo,
    goodsSearchModel,
    goodsSearchConfig,
    goodsListConfig,
    goodsActionConfig,
    goodsSettingConfig,
    handleGoodsRefresh
  }
}
