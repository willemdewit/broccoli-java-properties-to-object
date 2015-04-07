var Filter = require('broccoli-filter');
var propertiesToObject = require('java.properties.js').default;

module.exports = PropertiesFilter;
PropertiesFilter.prototype = Object.create(Filter.prototype);
PropertiesFilter.prototype.constructor = PropertiesFilter;

function PropertiesFilter (inputTree, options) {
  if (!(this instanceof PropertiesFilter)) {
	  return new PropertiesFilter(inputTree, options);
  }
  Filter.call(this, inputTree, options);
  options = options || {};
};

PropertiesFilter.prototype.extensions = ['properties'];
PropertiesFilter.prototype.targetExtension = 'js';

PropertiesFilter.prototype.processString = function (string, srcFile) {
    return 'export default ' + JSON.stringify(propertiesToObject(string));
};