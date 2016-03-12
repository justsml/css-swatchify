
/* Public utility methods */
module.exports = {
  hexParse:       hexParse,
  rgbaParse:      rgbaParse,
  rgbToColor:     rgbToColor,
  sumOfDelta:     sumOfDelta,
  colorDelta:     colorDelta,
  parseSwatches:  parseSwatches,
};

/* 
Expand shorthand form (e.g. '#DFE') to full form (e.g. '#DDEEFF')
*/
function hexParse(hex) {
  var regexHex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(regexHex, function(x, r, g, b) { return r + r + g + g + b + b; });
  var parts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return parts ? [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)] : null;
}
function rgbToColor(r, g, b, a) {
  if ( !a ) {
    return '#' + [r, g, b].map(_intToHex).join('');
  } else {
    return 'rgba('.concat([r, g, b, a].join(', '), ')');
  }
}
function rgbaParse(str) {
  var parts,
    rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/i,
    rgbPattern  = /^rgba?\((\d+),\s*(\d+),\s*(\d+)\)$/i;
  if ( rgbaPattern.test(str) ) { 
    parts = rgbaPattern.exec(str);
    return parts ? [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16), parseInt(parts[4], 16)] : null;
  } else if ( rgbPattern.test(str) ) { 
    parts = rgbPattern.exec(str);
    return parts ? [parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)] : null;
  }
  return false;
}
/* Private Internal */
function _intToHex(int) {
  var h = int.toString(16);
  return h.length === 1 ? '0' + h : h;
}

function parseSwatches(swatches) {
  return swatches.reduce(function(colorMap, item) {
    var keyVal = item.split(/=|:/);
    colorMap[keyVal[0]] = keyVal[1] || keyVal[0];
    colorMap[keyVal[0]] = hexParse(colorMap[keyVal[0]]) || rgbaParse(colorMap[keyVal[0]]);
    return colorMap;
  }, {});
}

function colorDelta(c1, c2) {
  return c1.slice(0, 3).map(function _getColorDiff(channel, index) {
    return Math.abs(channel - (c2[index] || 0));
  });
}

function sumOfDelta(deltaArray) {
  return Math.sum(deltaArray);
}
