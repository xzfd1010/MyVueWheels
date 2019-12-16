import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {mount} from '@vue/test-utils'

import validate from '@/validate'

chai.use(sinonChai)


describe('validate',()=>{
  it('存在',()=>{
    expect(validate).to.exist
  })

  it('test 1',()=>{
    let data = {
      email:''
    }
    let rules = [
      {key:'email',required:true}
    ]
    let errors = validate(data,rules)
    expect()
  })
})

