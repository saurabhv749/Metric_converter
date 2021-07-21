function ConvertHandler() {
  this.getData = function getData(input) {
    let noSpace = false,
      unit,
      number,
      error

    if (input) {
      input = input.toLowerCase()

      const numberParser = (str) => {
        if (str === '') return 1
        const arr = str.split(/[/]/)
        if (arr.length === 2) return +(arr[0] / arr[1]).toPrecision(6)
        else return parseFloat(str)
      }
      const spaceLen = input.split(' ').length
      if (spaceLen === 1) noSpace = true

      const validUnits = ['lbs', 'gal', 'l', 'mi', 'km', 'kg']
      const noOfFSlash = input.split('/').length
      const noOfDots = input.split('.').length

      ///unit check
      const u = input.split(/[^a-z]/)
      for (const el of validUnits) if (u[u.length - 1] === el) unit = el
      ////  number check
      if (noOfFSlash < 3 && noOfDots < 4 && noSpace) {
        const index = input.match(/[a-z]/) && input.match(/[a-z]/).index
        const num = input.slice(0, index)
        if (noOfFSlash < 3 && noOfDots < 3 && index !== null)
          number = numberParser(num)
      }
      //// error check
      if (unit === undefined && (noOfDots >= 3 || noOfFSlash >= 3)) {
        error = new Error('invalid number and unit')
      } else if (unit === undefined || !unit) {
        error = new Error('invalid unit')
      } else if (noOfDots >= 3 || noOfFSlash >= 3) {
        error = new Error('invalid number')
      }
      /// l to L
      if (unit === 'l') unit = 'L'
      const info = {
        number,
        unit,
        error,
      }

      return info
    } else {
      if (unit === 'l') unit = 'L'
      return {
        number: 1,
        unit,

        error,
      }
    }
  }
  this.getNum = function (input) {
    const obj = this.getData(input)
    if (obj.error) throw obj.error
    else return obj.number
  }

  this.getUnit = function (input) {
    let result = this.getData(input)
    if (result.error) throw result.error
    return result.unit
  }

  this.getReturnUnit = function (initUnit) {
    initUnit.toLowerCase()
    switch (initUnit) {
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      case 'gal':
        return 'L'
      case 'l':
        return 'gal'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
      default:
        throw new Error('invalid unit')
    }
  }

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'l':
      case 'L':
        return 'liters'
      case 'gal':
        return 'gallons'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
    }
  }

  this.convert = function (initNum, initUnit) {
    let rNum,
      rUnit = this.getReturnUnit(initUnit.toLowerCase())
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    if (rUnit == 'L') rNum = galToL * initNum
    else if (rUnit == 'gal') rNum = initNum / galToL
    else if (rUnit == 'km') rNum = miToKm * initNum
    else if (rUnit == 'mi') rNum = initNum / miToKm
    else if (rUnit == 'kg') rNum = lbsToKg * initNum
    else if ((rUnit = 'lbs')) rNum = initNum / lbsToKg
    return [+rNum.toFixed(5), rUnit]
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }
}

module.exports = ConvertHandler