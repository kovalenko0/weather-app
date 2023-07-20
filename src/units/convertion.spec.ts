import {kelvinToC, kelvinToF} from './convertion'

describe('temp conversion', () => {
  describe(kelvinToC, () => {
    it('converts to C', () => {
      expect(kelvinToC(100)).toBeCloseTo(-173.15)
    })
  })
  describe(kelvinToF, () => {
    it('converts to F', () => {
      expect(kelvinToF(100)).toBeCloseTo(-279.67)
    })
  })
})