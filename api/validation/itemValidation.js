const _ = require('lodash');

module.exports = data => {
  let errors = {};
  console.log('NAME SIZE:', data.name);
  if(!data.name || !(_.size(data.name) > 2 && (_.size(data.name) <= 30))) {
    errors.name = 'Name field is required and must be between 3 and 30 characters';
  }

  if(!data.unitsOfMeasure || _.isEmpty(data.unitsOfMeasure)) {
    errors.unitsOfMeasure = 'Unist of measure field is required';
  }

  return errors;
} 

