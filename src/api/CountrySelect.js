class CountrySelect {
    constructor() {
      this.data = require('./data/country.json')
      this.labelMap = {}
      this.valueMap = {}
  
      this.data.forEach(country => {
        this.labelMap[country.label.toLowerCase()] = country.code
        this.valueMap[country.code.toLowerCase()] = country.label
      })
    }
  
    getValue(label) {
      return this.labelMap[label.toLowerCase()]
    }
  
    getLabel(value) {
      return this.valueMap[value.toLowerCase()]
    }
  
    getLabels() {
      return this.data.map(country => country.label)
    }
  
    getValues() {
      return this.data.map(country => country.code)
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
      this.data.forEach(country => {
        if (country.code === value) {
          country.label = label
          this.valueMap[country.code.toLowerCase()] = country.label
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
  
  const countryList = () => {
    if (!(this instanceof CountrySelect)) return new CountrySelect()
  }
  
  module.exports = countryList