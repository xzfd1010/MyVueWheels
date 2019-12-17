/**
 * @param data
 *  {
 *    email:'nick@163.com',
 *    name: 'nick'
 *  }
 * @param rules
 *  [
 *    {key:'email',required:true,pattern:'email'],
 *    [key:'name',required:true,minLength:10]
 *  ]
 * @returns {errors}
 *  {
 *    email:{
 *      required:'必填',
 *      pattern: '格式错误'
 *    },
 *    name:{
 *      required:'必填',
 *      minLength: '长度错误'
 *    }
 *  }
 *
 */
export default function validate (data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]
    if (rule.required) {
      let error = validate.required(value)
      if (error) {
        ensureObjectExist(errors, rule.key)
        errors[rule.key].required = error
        return
      }
    }
    // 遍历validators并注意调用对应的函数
    let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
    validators.forEach(validatorKey => {
      // key可能是 minLength/maxLength/pattern
      if (validate[validatorKey]) {
        let error = validate[validatorKey](value, rule[validatorKey])
        if (error) {
          ensureObjectExist(errors, rule.key)
          errors[rule.key][validatorKey] = error
        }
      } else {
        throw `不存在的校验器：${validatorKey}`
      }

    })
  })
  return errors
}

validate.required = (value) => {
  if (!value && value !== 0) {
    return '必填'
  }
}

validate.pattern = (value, pattern) => {
  if (pattern === 'email') {
    pattern = /^.+@.+$/
  }
  if (!pattern.test(value)) {
    return '格式错误'
  }
}

validate.minLength = (value, minLength) => {
  if (value.length < minLength) {
    return '太短'
  }
}

validate.maxLength = (value, minLength) => {
  if (value.length > minLength) {
    return '太长'
  }
}

function ensureObjectExist (obj, key) {
  if (!obj[key]) {
    obj[key] = {}
  }
}
