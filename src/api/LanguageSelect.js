class LanguageSelect {
    constructor() {
      this.data = require('./data/language.json')
      this.labelMap = {}
      this.valueMap = {}
  
      this.data.forEach(language => {
        this.labelMap[language.label.toLowerCase()] = language.code
        this.valueMap[language.code.toLowerCase()] = language.label
      })
    }
  
    getValue(label) {
      return this.labelMap[label.toLowerCase()]
    }
  
    getLabel(value) {
      return this.valueMap[value.toLowerCase()]
    }
  
    getLabels() {
      return this.data.map(language => language.label)
    }
  
    getValues() {
      return this.data.map(language => language.code)
    }
  
    getLabelList() {
      return this.labelMap
    }
  
    getValueList() {
      return this.valueMap
    }
  
    getData() {
      return this.data
    }
  
    setLabel(value, label) {
      this.data.forEach(language => {
        if (language.code === value) {
          language.label = label
          this.valueMap[language.code.toLowerCase()] = language.label
        }
      })
  
      return this
    }
  
    setEmpty(label) {
      this.data.unshift({
        value: '',
        label: label,
      })
      this.valueMap[''] = label
      this.labelMap[label] = ''
  
      return this
    }
  }
  
  const languageList = () => {
    if (!(this instanceof LanguageSelect)) return new LanguageSelect()
  }
  
  export default languageList