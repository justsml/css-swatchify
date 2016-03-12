module.exports = Swatchify;
var {hexParse, rgbaParse, rgbToColor, sumOfDelta, colorDelta, parseSwatches} = require('./utils');
var fileProcessor = require('./file-processor');

const colorPattern = /#[a-f\d]{6}|#[a-f\d]{3}|rgb\(\d+[,\s]*\d+[,\s]*\d+[,\s]*\)|rgba\(\d+[,\s]*\d+[,\s]*\d+[,\s]*[\d\.]*\)/ig;

function Swatchify({input, output, swatch, mode}) {
	if (input === '-') { input = process.stdin; }
	var fp = fileProcessor(input, function _onLine(err, line) {
		if ( line ) {
			line = line.replace(colorPattern, function _handleColor(color) {
				console.log('Color Found', color);
			});
		} else if (line === null) {
			console.log('END - FILE PROCESSED!');
		}
	});
}
