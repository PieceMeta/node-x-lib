const chai = require('chai');
chai.should();

import { filesystem } from '../fixtures'
import Formatters from '../../dist/shared/formatters'

describe('shared.Formatters', () => {
  it('formats an input byte value as fixed precision string with unit', () => {
    const testValues = [512, 1024, 512 * 1024, 1024 * 1024],
      resultValues = ['512.00 B', '1.00 kB', '512.00 kB', '1.00 MB']
    testValues.forEach((value, i) => {
      Formatters.fileSize(value, filesystem.entries.file).should.equal(resultValues[i])
    })
  })
})
