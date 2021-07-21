'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res) {
  const { input } = req.query
  const { number, unit, error } = convertHandler.getData(input)
  if (!error) {
    const returnVal = convertHandler.convert(number, unit)
    const string = convertHandler.getString(
      number,
      unit,
      returnVal[0],
      returnVal[1]
    )
    res.json({
      initNum: number,
      initUnit: unit,
      returnNum: returnVal[0],
      returnUnit: returnVal[1],
      string,
    })
  } else res.send(error.message)
})


};
