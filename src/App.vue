<template>
  <main class="page">
    <h1>AI UI Local Examples</h1>
    <p>用于本地联调 @ai-ui/ui（含 Element Plus 与自定义组件）。</p>
    <section class="card">
      <AiList
        v-if="tabConfig.active === 1"
        row-key="id"
        ref="List"
        :tab-config="tabConfig"
        :list-model="list"
        :search-model="searchModel"
        :tree-config="treeConfig"
        :list-config="listConfig"
        :search-config="searchConfig"
        :action-Config="actionConfig"
        :settingConfig="settingConfig"
        :treeSelectConfig="treeSelectConfig"
      ></AiList>
      <AiList
        v-if="tabConfig.active === 2"
        row-key="id"
        ref="List2"
        :tab-config="tabConfig"
        :list-model="list"
        :search-model="searchModel"
        :list-config="listConfig2"
        :search-config="searchConfig"
        :action-Config="actionConfig"
        :settingConfig="settingConfig2"
      ></AiList>
    </section>
    <Info v-model="showInfo" />
  </main>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import Info from './components/Info.vue'

const { proxy } = getCurrentInstance()

const showInfo = ref(false)

const regionOptions = [
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

const list = [
  {
    id: 1,
    name: 'yukino',
    type: 1,
    region: 'cn',
    price: 111.11,
    currency: 'CNY',
    switch: true,
    status: 1,
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    date: '2026-08-01',
    checkbox: [],
    children: [
      { id: 11, name: 'yukino-1', type: 1, price: 30.12, currency: 'CNY', switch: true, status: 1 },
      { id: 12, name: 'yukino-2', type: 1, price: 1287.78, currency: 'CNY', switch: true, status: 1 }
    ]
  },
  {
    id: 2,
    name: 'fufu',
    type: 2,
    price: 9.99,
    currency: 'USD',
    switch: true,
    status: 2,
    checkbox: [],
    image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  { id: 3, name: '三三', type: 3, price: 68.87, currency: 'EUR', switch: true, status: 3, checkbox: [] },
  { id: 4, name: '蛋仔', type: 1, price: 99.05, currency: 'USD', switch: false, status: 4, checkbox: [] },
  { id: 5, name: '狗屎', type: 1, price: 2836.86, currency: 'USD', switch: false, status: 1, checkbox: [] },
  { id: 6, name: '小鸡毛', type: 4, price: 9876.0, currency: 'USD', switch: false, status: 1, checkbox: [] }
]

const searchModel = reactive({
  data: {
    pageNum: 1,
    pageSize: 5,
    checkbox: []
  }
})

const tabConfig = reactive({
  active: 2,
  tabs: [
    { label: '常规列表', key: 1 },
    { label: '可编辑列表', key: 2 }
  ]
})

const listConfig = computed(() => {
  return [
    {
      key: 'key',
      head: 'key',
      width: 50,
      type: 'select',
      fixed: 'left',
      multiple: true
    },
    {
      key: 'image',
      head: '头像',
      width: 100,
      type: 'image',
      model: 'image',
      radius: true
    },
    {
      key: 'name',
      head: '名称',
      type: 'text',
      model: 'name',
      orderModel: 'name'
    },
    {
      key: 'type',
      head: '角色',
      width: 100,
      type: 'enum',
      model: 'type',
      dictList: [
        { dictKey: 1, dictValue: '管理员' },
        { dictKey: 2, dictValue: '站长' },
        { dictKey: 3, dictValue: '副站长' },
        { dictKey: 4, dictValue: '科长' }
      ]
    },
    {
      key: 'price',
      head: '价格',
      width: 100,
      type: 'price',
      model: 'price',
      currency: 'currency'
    },
    {
      key: 'switch',
      width: 100,
      head: '开关',
      type: 'switch',
      model: 'switch',
      changeFun: (val, scope) => {
        scope.row.switch = val
      }
    },
    {
      key: 'status',
      head: '状态',
      width: 100,
      type: 'status',
      model: 'status',
      dictList: [
        { dictKey: 1, dictValue: '成功', color: '#1f9d68' },
        { dictKey: 2, dictValue: '失败', color: '#d93f34' },
        { dictKey: 3, dictValue: '待处理', color: '#c97700' },
        { dictKey: 4, dictValue: '处理中', color: '#2a6af5' }
      ],
      color: (row) => {
        if ([1, 2, 3, 4].includes(row.status)) {
          return ['', '#1f9d68', '#d93f34', '#c97700', '#2a6af5'][row.status]
        }
      }
    },
    {
      key: 'tags',
      head: '标签',
      width: 180,
      type: 'tags',
      model: (row) => {
        return ['test', 'tag-1', 'tag-2', 'tag-3']
      }
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
          clickFun: async ({ row }) => {}
        },
        {
          label: '编辑',
          icon: 'Edit',
          clickFun: ({ row }) => {}
        },
        {
          label: '执行',
          icon: 'SwitchButton',
          clickFun: ({ row }) => {}
        },
        {
          label: '删除',
          icon: 'DeleteFilled',
          clickFun: ({ row }) => {}
        }
      ]
    }
  ]
})

const listConfig2 = computed(() => {
  return [
    {
      key: 'image',
      head: '头像',
      type: 'image',
      model: 'image',
      radius: true
    },
    {
      key: 'name',
      head: '名称',
      type: 'edit',
      width: 150,
      readOption: {
        type: 'text',
        model: 'name'
      },
      editOption: {
        type: 'input',
        model: 'name',
        required: true,
        prop: (row) => {
          const index = list.findIndex((item) => item.id === row.id)
          return `${index}.name`
        },
        changeFun: (val, scope, done) => {
          done()
        }
      }
    },
    {
      key: 'type',
      head: '角色',
      type: 'edit',
      width: 150,
      dictList: [
        { dictKey: 1, dictValue: '管理员' },
        { dictKey: 2, dictValue: '站长' },
        { dictKey: 3, dictValue: '副站长' },
        { dictKey: 4, dictValue: '科长' }
      ],
      readOption: {
        type: 'enum',
        model: 'type'
      },
      editOption: {
        type: 'select',
        model: 'type',
        required: true,
        prop: (row) => {
          const index = list.findIndex((item) => item.id === row.id)
          return `${index}.type`
        },
        changeFun: (val, scope, done) => {
          done()
        }
      }
    },
    {
      key: 'date',
      head: '日期',
      type: 'edit',
      width: 150,
      readOption: {
        type: 'text',
        model: 'date'
      },
      editOption: {
        type: 'date',
        model: 'date',
        dateType: 'date',
        required: true,
        prop: (row) => {
          const index = list.findIndex((item) => item.id === row.id)
          return `${index}.date`
        },
        changeFun: (val, scope, done) => {
          done()
        }
      }
    },
    {
      key: 'checkbox',
      head: '多选',
      type: 'edit',
      width: 200,
      dictList: [
        { dictKey: 1, dictValue: '成功', color: '#1f9d68' },
        { dictKey: 2, dictValue: '失败', color: '#d93f34' }
      ],
      readOption: {
        type: 'enum',
        model: 'checkbox'
      },
      editOption: {
        type: 'checkbox',
        model: 'checkbox',
        required: true,
        prop: (row) => {
          const index = list.findIndex((item) => item.id === row.id)
          return `${index}.status`
        },
        changeFun: (val, scope, done) => {
          done()
        }
      }
    },
    {
      key: 'region',
      head: '区域',
      type: 'edit',
      width: 150,
      dictList: regionOptions,
      readOption: {
        type: 'text',
        model: 'region'
      },
      editOption: {
        type: 'cascader',
        model: 'region',
        required: true,
        dictKey: 'value',
        dictValue: 'label',
        prop: (row) => {
          const index = list.findIndex((item) => item.id === row.id)
          return `${index}.region`
        },
        changeFun: (val, scope, done) => {
          done()
        }
      }
    },
    {
      key: 'option',
      head: '操作',
      type: 'option',
      fixed: 'right',
      width: 100,
      optionConfig: [
        {
          label: '编辑',
          icon: 'EditPen',
          showFun: ({ row }) => !row?.isEdit,
          clickFun: ({ row }) => {
            row.isEdit = true
          }
        },
        {
          label: '删除',
          icon: 'DeleteFilled',
          showFun: ({ row }) => !row?.isEdit,
          clickFun: ({ row }) => {}
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
            row.isEdit = false
          }
        }
      ]
    }
  ]
})

const searchConfig = computed(() => {
  return [
    {
      key: 'checkbox',
      label: 'checkbox',
      type: 'checkbox',
      noneLabel: true,
      width: 6,
      model: 'data.checkbox',
      isButton: true,
      dictList: [
        { dictKey: 'cn', dictValue: '中国' },
        { dictKey: 'us', dictValue: '美国' }
      ]
    },
    {
      key: 'radio',
      label: 'radio',
      type: 'radio',
      noneLabel: true,
      width: 6,
      model: 'data.radio',
      dictList: [
        { dictKey: 'cn', dictValue: '中国' },
        { dictKey: 'us', dictValue: '美国' }
      ]
    },
    {
      key: 'name4',
      label: '名称4',
      type: 'tree-select',
      noneLabel: true,
      width: 6,
      model: 'data.name4',
      data: regionOptions,
    },
    {
      key: 'id',
      label: 'Id',
      type: 'input',
      width: 8,
      more: true,
      model: 'data.code'
    },
    {
      key: 'region',
      label: '区域',
      type: 'cascader',
      width: 8,
      model: 'data.region',
      more: true,
      dictList: regionOptions,
      dictKey: 'value',
      dictValue: 'label'
    },
    {
      key: 'scope',
      label: '范围',
      type: 'select',
      width: 8,
      model: 'data.scope',
      more: true,
      dictList: [
        { dictKey: 'cn', dictValue: '中国' },
        { dictKey: 'us', dictValue: '美国' }
      ]
    }
  ]
})

const actionConfig = computed(() => {
  return [
    {
      key: 'add',
      icon: 'CirclePlus',
      label: '新增',
      type: 'primary',
      left: true,
      clickFun: () => {
        showInfo.value = true
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

const settingConfig = reactive({
  customKey: 'test-list',
  showColumnSetting: true
})

const settingConfig2 = reactive({
  customKey: 'test-list2',
  showColumnSetting: true
})

const treeConfig = reactive({
  key: 'id',
  head: 'ID',
  width: 50,
  type: 'text',
  model: 'id',
  fixed: 'left',
  orderModel: 'id'
})

const treeSelectConfig = reactive({
  title: '地区搜索',
  enable: true,
  treeExpand: true,
  treeData: regionOptions,
  currentNodeKey: ''
})
</script>
