<template>
  <main class="page">
    <h1>AI UI Local Examples</h1>
    <section class="card">
      <AiList
        v-if="tabConfig.active === 1"
        row-key="id"
        ref="List"
        :tab-config="tabConfig"
        :list-model="userList"
        :search-model="userSearchModel"
        :list-config="userListConfig"
        :search-config="userSearchConfig"
        :action-Config="userActionConfig"
        :settingConfig="userSettingConfig"
        :treeSelectConfig="userTreeSelectConfig"
        @search="handleUserSearch"
      ></AiList>
      <AiList
        v-if="tabConfig.active === 2"
        row-key="id"
        ref="List2"
        :tab-config="tabConfig"
        :list-model="orderList"
        :search-model="orderSearchModel"
        :list-config="orderListConfig"
        :search-config="orderSearchConfig"
        :action-Config="orderActionConfig"
        :settingConfig="orderSettingConfig"
        @search="handleOrderSearch"
      ></AiList>
    </section>
    <UserInfo v-model="showUserInfo" :pageType="userPageType" :userInfo="userInfo" />
    <OrderInfo v-model="showOrderInfo" :pageType="orderPageType" :orderInfo="orderInfo" />
  </main>
</template>

<script setup>
import UserInfo from './components/UserInfo.vue'
import OrderInfo from './components/OrderInfo.vue'
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import { useUserList } from './hooks/useUserList'
import { useOrderList } from './hooks/useOrderList'

const { proxy } = getCurrentInstance()

const tabConfig = reactive({
  active: 1,
  tabs: [
    { label: '常规列表', key: 1 },
    { label: '可编辑列表', key: 2 }
  ]
})

const {
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
} = useUserList()

const {
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
} = useOrderList()
</script>
