import { ref, reactive, computed, watch } from 'vue'

export const regionOptions = [
  {
    value: 'cn',
    label: '中国',
    children: [
      { value: 'bg', label: '北京' },
      { value: 'sh', label: '上海' },
      { value: 'sz', label: '深圳' },
      { value: 'cq', label: '重庆' }
    ]
  },
  {
    value: 'en',
    label: '英国',
    children: [{ value: 'lo', label: '伦敦' }]
  },
  {
    value: 'us',
    label: '美国',
    children: [
      { value: 'ne', label: '纽约' },
      { value: 'ja', label: '加利福利亚' },
      { value: 'la', label: '洛杉矶' }
    ]
  },
  {
    value: 'jp',
    label: '日本',
    children: [
      { value: 'to', label: '东京' },
      { value: 'ky', label: '京都' },
      { value: 'lv', label: '大阪' }
    ]
  }
]

export const roleOptions = [
  { dictKey: 1, dictValue: '管理员' },
  { dictKey: 2, dictValue: '研发' },
  { dictKey: 3, dictValue: '产品' },
  { dictKey: 4, dictValue: '运营' }
]

export const statusOptions = [
  { dictKey: 1, dictValue: '在线' },
  { dictKey: 2, dictValue: '离线' },
  { dictKey: 3, dictValue: '忙碌' },
  { dictKey: 4, dictValue: '会议中' }
]

export const tagList = [
  { dictValue: 'test', dictKey: 't' },
  { dictValue: '标签1', dictKey: 't1' },
  { dictValue: '标签2', dictKey: 't2' },
  { dictValue: '标签3', dictKey: 't3' },
  { dictValue: '标签4', dictKey: 't4' },
  { dictValue: '标签5', dictKey: 't5' }
]

export const useUserList = () => {
  const showUserInfo = ref(false)
  const userPageType = ref('add')
  const userInfo = ref({})

  const userList = [
    {
      id: 1,
      image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: 'yukino',
      role: 1,
      switch: true,
      status: 1,
      region: 'cq',
      tags: ['t1', 't2'],
      createTime: '2026-08-01 00:00:00'
    },
    {
      id: 2,
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: 'fufu',
      role: 2,
      switch: true,
      status: 2,
      region: 'bg',
      tags: ['t1', 't2'],
      createTime: '2026-08-02 00:00:00'
    },
    {
      id: 3,
      image: '',
      name: '二二',
      role: 3,
      switch: true,
      status: 3,
      region: 'sh',
      tags: ['t1', 't2', 't3', 't4'],
      createTime: ''
    },
    {
      id: 4,
      image: '',
      name: '三三',
      role: 1,
      switch: false,
      status: 4,
      region: 'to',
      tags: ['t', 't4'],
      createTime: ''
    },
    {
      id: 5,
      image: '',
      name: '小鸡毛',
      role: 4,
      switch: true,
      status: 1,
      region: 'la',
      tags: ['t1', 't2', 't3'],
      createTime: ''
    },
    {
      id: 6,
      image: '',
      name: '小白',
      role: 4,
      switch: true,
      status: 1,
      region: 'cq',
      tags: [],
      createTime: ''
    },
    {
      id: 7,
      image: '',
      name: '布布',
      role: 4,
      switch: true,
      status: 1,
      region: 'ky',
      tags: [],
      createTime: ''
    },
    {
      id: 8,
      image: '',
      name: '一二',
      role: 4,
      switch: true,
      status: 1,
      region: 'lv',
      tags: [],
      createTime: ''
    },
    {
      id: 9,
      image: '',
      name: 'sakura',
      role: 4,
      switch: true,
      status: 1,
      region: 'la',
      tags: [],
      createTime: ''
    },
    {
      id: 10,
      image: '',
      name: '绘梨衣',
      role: 4,
      switch: true,
      status: 1,
      region: 'sh',
      tags: ['t3', 't4'],
      createTime: ''
    },
    {
      id: 11,
      image: '',
      name: 'leach',
      role: 4,
      switch: true,
      status: 1,
      region: 'sh',
      tags: ['t'],
      createTime: ''
    }
  ]

  const userSearchModel = reactive({
    data: {
      pageNum: 1,
      pageSize: 10,
      name: '',
      role: '',
      region: '',
      status: '',
      tags: [],
      createTimeTmp: [],
      createTimeStart: '',
      createTimeEnd: ''
    }
  })

  const userSearchConfig = computed(() => {
    return [
      {
        key: 'name',
        label: '名称',
        type: 'input',
        noneLabel: true,
        width: 6,
        model: 'data.name'
      },
      {
        key: 'role',
        label: '角色',
        type: 'select',
        noneLabel: true,
        width: 6,
        model: 'data.role',
        dictList: roleOptions
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        noneLabel: true,
        width: 6,
        model: 'data.status',
        dictList: statusOptions
      },
      {
        key: 'tags',
        label: '标签',
        type: 'select',
        width: 8,
        multiple: true,
        model: 'data.tags',
        more: true,
        dictList: tagList
      },
      {
        key: 'createTime',
        label: '创建时间范围',
        type: 'date',
        width: 16,
        model: 'data.createTimeTmp',
        more: true,
        dateType: 'daterange',
        endModel: 'data.createTimeEnd',
        startModel: 'data.createTimeStart',
        endPlaceholder: '结束时间',
        startPlaceholder: '开始时间'
      }
    ]
  })

  const userListConfig = computed(() => {
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
        key: 'role',
        head: '角色',
        width: 100,
        type: 'enum',
        model: 'role',
        dictList: roleOptions
      },
      {
        key: 'region',
        head: '归属地区',
        width: 100,
        type: 'enum',
        model: 'region',
        isTree: true,
        dictKey: 'value',
        dictValue: 'label',
        dictList: regionOptions
      },
      {
        key: 'status',
        head: '在线状态',
        width: 100,
        type: 'status',
        model: 'status',
        dictList: statusOptions,
        color: (row) => {
          if ([1, 2, 3, 4].includes(row.status)) {
            return ['#1f9d68', '#d93f34', '#c97700', '#2a6af5'][row.status - 1]
          }
        }
      },
      {
        key: 'tags',
        head: '标签',
        width: 180,
        type: 'tags',
        model: (row) => {
          if (!row?.tags || !row?.tags.length) return []
          return row.tags.map((item) => {
            return tagList.find((tag) => tag.dictKey == item)?.dictValue ?? item
          })
        }
      },
      {
        key: 'switch',
        width: 100,
        head: '启用状态',
        type: 'switch',
        model: 'switch',
        changeFun: (val, scope) => {
          scope.row.switch = val
        }
      },
      {
        key: 'createTime',
        head: '创建时间',
        width: 160,
        type: 'text',
        model: 'createTime',
        orderModel: 'createTime'
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
              showUserInfo.value = true
              userPageType.value = 'view'
              userInfo.value = row
            }
          },
          {
            label: '编辑',
            icon: 'Edit',
            clickFun: ({ row }) => {
              showUserInfo.value = true
              userPageType.value = 'edit'
              userInfo.value = row
            }
          },
          {
            label: '执行',
            icon: 'SwitchButton',
            clickFun: ({ row }) => {
              window.ElMessageBox.confirm('确定要执行吗？', '执行', {type: 'warning'})
            }
          },
          {
            label: '删除',
            icon: 'DeleteFilled',
            clickFun: ({ row }) => {
              window.ElMessageBox.confirm('确定要删除吗？', '删除', {type: 'error'})

            }
          }
        ]
      }
    ]
  })

  const userActionConfig = computed(() => {
    return [
      {
        key: 'add',
        icon: 'CirclePlus',
        label: '新增',
        type: 'primary',
        left: true,
        clickFun: () => {
          showUserInfo.value = true
          userPageType.value = 'add'
          userInfo.value = {}
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

  const userSettingConfig = reactive({
    customKey: 'test-list',
    showColumnSetting: true
  })

  const userTreeSelectConfig = reactive({
    title: '归属地区',
    enable: true,
    treeExpand: true,
    treeData: regionOptions,
    currentNodeKey: ''
  })

  const handleUserSearch = () => {
    const title = '搜索条件'
    const message = `${JSON.stringify(userSearchModel)}`
    window.ElMessageBox.confirm(message, title, {})
  }

  return {
    showUserInfo,
    userPageType,
    userInfo,
    userList,
    userSearchModel,
    userSearchConfig,
    userListConfig,
    userActionConfig,
    userSettingConfig,
    userTreeSelectConfig,
    handleUserSearch
  }
}
