import { createApp } from 'vue'
import AiUI, { aiZhCn } from '@yukino-luo/ai-ui'
import App from './App.vue'
import './style.css'
import FormMyInput from './model/form-input-my.jsx'
import ColumnMyText from './model/column-text-my.jsx'
import '@yukino-luo/ai-ui/packages/ai-ui/dist/style.css'

createApp(App)
.use(AiUI, { aiLocale: aiZhCn })
.use((app, options) => {
    const tableColumnHook = AiUI.useTableColumn()
    const formItemHook = AiUI.useFormItem()
    tableColumnHook.instance.newModel(ColumnMyText)
    formItemHook.instance.newModel(FormMyInput)
  })
	.mount('#app')
