import { FormDefault } from '@yukino-luo/ai-ui'

export default class FormMyInput extends FormDefault {
  constructor() {
    super()
    this.name = 'my-input'
  }

  getTemplate(config, model) {
    return (
      <ai-input
        type={config.inputType || 'text'}
        label="My Input"
        prop={this.getModelName(config)}
        modelValue={this.getModelValue(config, model)}
        placeholder={config.placeholder}
        width={config.width}
        clearable={config.clearable ?? true}
        disabled={config.disabled}
        onInput={this.setModelValue(config, model)}
        prefixIcon={config.prefixIcon}
        suffixIcon={config.suffixIcon}
        showPreSelect={config.showPreSelect ?? false}
        dictList={config.dictList}
        dictKey={config.dictKey}
        dictLabel={config.dictLabel}
        maxLength={config.maxLength}
        regExp={config.regExp}
        regMsg={config.regMsg}
      />
    )
  }
}
