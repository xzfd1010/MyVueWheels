import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

import validate from '@/validate'

chai.use(sinonChai)

describe('validate', () => {
  it('存在', () => {
    expect(validate).to.exist
  })

  it('测试必填', () => {
    let data = {
      email: ''
    }
    let rules = [
      { key: 'email', required: true }
    ]
    let errors = validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('测试pattern', () => {
    let data1 = { email: 'nick' }
    let data2 = { email: 'nick@q.com' }
    let rules = [
      { key: 'email', pattern: 'email' }
    ]
    let errors1 = validate(data1, rules)
    let errors2 = validate(data2, rules)
    expect(errors1.email.pattern).to.eq('格式错误')
    expect(errors2.email).to.not.exist
  })

  it('测试最小长度', () => {
    let data = { password: 'gaga' }
    let rules = [{ key: 'password', minLength: 10 }]
    let errors = validate(data, rules)
    expect(errors.password.minLength).to.eq('太短')
  })
  it('测试最小长度', () => {
    let data = { password: 'tinygaga-haha' }
    let rules = [{ key: 'password', maxLength: 10 }]
    let errors = validate(data, rules)
    expect(errors.password.maxLength).to.eq('太长')
  })
  it('不存在的校验器报错', () => {
    let data = { password: 'tinygaga-haha' }
    let rules = [{ key: 'password', hasNumber: true }]
    let fn = () => {
      validate(data, rules)
    }
    expect(fn).to.throw('不存在的校验器：hasNumber')
  })
  it('自己添加校验规则', () => {
    let data = { email: '123123' }
    validate.hasNumber = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let rules = [{ key: 'email', required: true, minLength: 5, maxLength: 10, hasNumber: true }]
    let fn = () => {
      validate(data, rules)
    }
    expect(fn).to.not.throw
  })
})

