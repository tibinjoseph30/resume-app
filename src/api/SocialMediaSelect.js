class SocialMediaSelect {
    constructor() {
      this.data = require('./data/socialMedia.json')
      this.labelMap = {}
      this.valueMap = {}
  
      this.data.forEach(social => {
        this.labelMap[social.label.toLowerCase()] = social.code
        this.valueMap[social.code.toLowerCase()] = social.label
      })
    }
  
    getValue(label) {
      return this.labelMap[label.toLowerCase()]
    }
  
    getLabel(value) {
      return this.valueMap[value.toLowerCase()]
    }
  
    getLabels() {
      return this.data.map(social => social.label)
    }
  
    getValues() {
      return this.data.map(social => social.code)
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
      this.data.forEach(social => {
        if (social.code === value) {
          social.label = label
          this.valueMap[social.code.toLowerCase()] = social.label
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
  
  const socialMediaList = () => {
    if (!(this instanceof SocialMediaSelect)) return new SocialMediaSelect()
  }
  
  export default socialMediaList