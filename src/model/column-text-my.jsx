import { ColumnDefault } from '@yukino-luo/ai-ui'

export default class ColumnMyText extends ColumnDefault {
  constructor() {
    super()
    this.name = 'my-text'
  }

  getTemplate(config, scope, childConfig) {
    return <div style="width: 100%;">My Text</div>
  }
}
