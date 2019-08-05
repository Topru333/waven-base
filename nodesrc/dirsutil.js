const fs = require('fs');
const path = require('path');

module.exports.checkCreateDir = function (value) {
  let parts = value.split('/');
  let current;

  if (value.charAt(0)==='/') {
    current = '/';
  } else {
    current = parts[0];
  }

  for (let i = 1; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    if (!fs.existsSync(current)){
      fs.mkdirSync(current);
    }
  }
}
