class interestSelect {
  constructor() {
    this.data = require('./data/interest.json')
    this.labelMap = {}
    this.valueMap = {}

    this.data.forEach(interest => {
      this.labelMap[interest.label.toLowerCase()] = interest.code
    })
  }

  getValue(label) {
    return this.labelMap[label.toLowerCase()]
  }

  getLabel(value) {
    return this.valueMap[value.toLowerCase()]
  }

  getLabels() {
    return this.data.map(interest => interest.label)
  }

  getValues() {
    return this.data.map(interest => interest.code)
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
    this.data.forEach(interest => {
      if (interest.code === value) {
        interest.label = label
        this.valueMap[interest.code.toLowerCase()] = interest.label
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

const interestList = () => {
  if (!(this instanceof interestSelect)) return new interestSelect()
}

export default interestList