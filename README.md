# broccoli-java-properties-to-object
Converts java properties files to modules which return the POJO version

## Installation

`npm install broccoli-java-properties-to-object --save-dev`

## Usage

```js
var filterProperties = require('broccoli-java-properties-to-object');
tree = filterProperties(tree, options);
```

All `.properties` files will be converted to `.js` files which contain an ES6 module which exports the result

```js
export default { "my-key": { ... } };
```
