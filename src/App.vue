<template>
  <main class="page">
    <h1>AI UI Local Examples</h1>
    <section class="card">
      <AiList
        v-if="tabConfig.active === 1"
        row-key="id"
        ref="UserListEl"
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
        ref="OrderListEl"
        :tab-config="tabConfig"
        :list-model="orderList"
        :search-model="orderSearchModel"
        :list-config="orderListConfig"
        :search-config="orderSearchConfig"
        :action-Config="orderActionConfig"
        :settingConfig="orderSettingConfig"
        @search="handleOrderSearch"
      ></AiList>
      <AiList
        v-if="tabConfig.active === 3"
        row-key="id"
        ref="GoodsListEl"
        :tab-config="tabConfig"
        :list-model="'list'"
        :search-url="'/goods/list'"
        :search-model="goodsSearchModel"
        :list-config="goodsListConfig"
        :search-config="goodsSearchConfig"
        :action-Config="goodsActionConfig"
        :settingConfig="goodsSettingConfig"
      ></AiList>
    </section>
    <UserInfo v-model="showUserInfo" :pageType="userPageType" :userInfo="userInfo" />
    <OrderInfo v-model="showOrderInfo" :pageType="orderPageType" :orderInfo="orderInfo" />
    <GoodsInfo v-model="showGoodsInfo" :pageType="goodsPageType" :goodsInfo="goodsInfo" @confirm="handleGoodsRefresh" />
  </main>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import UserInfo from './components/UserInfo.vue'
import OrderInfo from './components/OrderInfo.vue'
import GoodsInfo from './components/GoodsInfo.vue'
import { useUserList } from './hooks/useUserList'
import { useOrderList } from './hooks/useOrderList'
import { useGoodsList } from './hooks/useGoodsList'

const { proxy } = getCurrentInstance()

const tabConfig = reactive({
  active: 1,
  tabs: [
    { label: '常规列表', key: 1 },
    { label: '可编辑列表', key: 2 },
    { label: '异步列表', key: 3 },
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

const {
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
} = useGoodsList()
</script>
