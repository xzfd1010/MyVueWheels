import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

import Validator from '@/validate'

chai.use(sinonChai)

describe('validate', () => {
  it('存在', () => {
    expect(Validator).to.exist
  })

  it('测试必填', () => {
    let data = {
      email: ''
    }
    let rules = [
      { key: 'email', required: true }
    ]
    const validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('测试pattern', () => {
    let data1 = { email: 'nick' }
    let data2 = { email: 'nick@q.com' }
    let rules = [
      { key: 'email', pattern: 'email' }
    ]
    const validator = new Validator()
    let errors1 = validator.validate(data1, rules)
    let errors2 = validator.validate(data2, rules)
    expect(errors1.email.pattern).to.eq('格式错误')
    expect(errors2.email).to.not.exist
  })

  it('测试最小长度', () => {
    let data = { password: 'gaga' }
    let rules = [{ key: 'password', minLength: 10 }]
    const validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.password.minLength).to.eq('太短')
  })
  it('测试最小长度', () => {
    let data = { password: 'tinygaga-haha' }
    let rules = [{ key: 'password', maxLength: 10 }]
    const validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.password.maxLength).to.eq('太长')
  })
  it('不存在的校验器报错', () => {
    let data = { password: 'tinygaga-haha' }
    let rules = [{ key: 'password', hasNumber: true }]
    let fn = () => {
      const validator = new Validator()
      validator.validate(data, rules)
    }
    expect(fn).to.throw('不存在的校验器：hasNumber')
  })
  it('自己添加校验规则', () => {
    let data = { email: '123123' }
    const validator = new Validator()
    validator.hasNumber = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let rules = [{ key: 'email', required: true, minLength: 5, maxLength: 10, hasNumber: true }]
    let fn = () => {
      validator.validate(data, rules)
    }
    expect(fn).to.not.throw
  })
  it('两个validator互不影响', () => {
    let data = { email: '123123' }
    const validator1 = new Validator()
    const validator2 = new Validator()
    validator1.hasNumber = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let rules = [{ key: 'email', required: true, minLength: 5, maxLength: 10, hasNumber: true }]
    let fn1 = () => {
      validator1.validate(data, rules)
    }
    let fn2 = () => {
      validator2.validate(data, rules)
    }
    expect(fn1).to.not.throw
    expect(fn2).to.throw
  })
  it('给Validator Class添加校验器', () => {
    let data = { email: '123123' }
    Validator.addRule('hasNumber', () => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    })
    const validator1 = new Validator()
    const validator2 = new Validator()
    let rules = [{ key: 'email', required: true, minLength: 5, maxLength: 10, hasNumber: true }]
    let fn1 = () => {
      validator1.validate(data, rules)
    }
    let fn2 = () => {
      validator2.validate(data, rules)
    }
    expect(fn1).to.not.throw
    expect(fn2).to.not.throw
  })
})

