const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convert = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input.', function () {
    assert.isNumber(convert.getNum('2kg'))
  })

  test('convertHandler should correctly read a decimal number input.', function () {
    assert.isNumber(convert.getNum('2.3lbs'))
  })

  test('convertHandler should correctly read a fractional input.', function () {
    assert.isNumber(convert.getNum('2/3lbs'))
  })

  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.isNumber(convert.getNum('20.4/3lbs'))
  })
  
  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.throw(() => convert.getNum('2/6/3lbs'), Error)
  })
  
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convert.getNum('kg'), 1)
  })
  
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convert.getUnit('5l'), 'L')
  })
  
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.throw(() => convert.getReturnUnit('3s'), Error)
  })
  
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convert.getReturnUnit('gal'), 'L')
  })
  
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convert.spellOutUnit('gal'), 'gallons')
  })
  
  test('convertHandler should correctly convert gal to L', function () {
    assert.equal(convert.convert(5, 'gal')[1], 'L')
  })
  
  test('convertHandler should correctly convert L to gal', function () {
    assert.equal(convert.convert(5, 'L')[1], 'gal')
  })
  
  test('convertHandler should correctly convert mi to km', function () {
    assert.equal(convert.convert(5, 'mi')[1], 'km')
  })
  
  test('convertHandler should correctly convert km to mi', function () {
    assert.equal(convert.convert(5, 'km')[1], 'mi')
  })
  
  test('convertHandler should correctly convert lbs to kg', function () {
    assert.equal(convert.convert(5, 'lbs')[1], 'kg')
  })
  
  test('convertHandler should correctly convert kg to lbs', function () {
    assert.equal(convert.convert(5, 'kg')[1], 'lbs')
  })

});