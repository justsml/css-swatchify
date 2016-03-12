var swatchify = require('./swatchify');
var args = require('yargs')
  .options({
    'f': {
      alias: ['i', 'input', 'file'],
      require : true,
      describe: 'input css/less. E.g. -f ./styles/styles.css',
      type: 'string'
    },
    'o': {
      alias: ['out', 'output'],
      describe: 'output css/less. E.g. --output ./styles/styles.less (use a dash to pipe to stdout, --output - )',
      type: 'string'
    },
    'c': {
      alias: ['color', 'swatch'],
      require : true,
      describe: 'colors to match swatch. E.g. -f ./css/styles.css',
      type: 'array'
    },
    'm': {
      alias: ['mode'],
      require : false,
      default: 'css',
      describe: 'output render mode - `css` swaps the colors in-place, less/scss requires variable names in the `color` param: \n --color warning=FF0000 --color success=00FF00',
      choices: ['less', 'css', 'scss']
    },
  })
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2016 Dan Levy - GPL License')
  .argv;


swatchify(args);

