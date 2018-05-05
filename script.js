var program = require("commander");
var fs = require('fs');
var balance = require('./js/balance');


/* ************************************************************************* */
/* TOOLBOX ***************************************************************** */
var returnInputPath = function() { return (program.directory + program.input ).replace('//','/') || './input.json'; },
    returnOutputPath= function() { return (program.directory + program.output).replace('//','/') || './output.json'; },
    returnInputData = function(inputPath) { return JSON.parse(fs.readFileSync(inputPath, 'utf8')); }
var convertToValidJson = function(inputData){
  var output =[];
  for (var i=0;i<inputData.length;i++) {
    var item = inputData[i],
    codepoint= item[program.toCodepoint] || item[program.toGlyph],
    glyph    = item[program.toGlyph],
    ruby     = item[program.toRuby];
    output.push({ "codepoint": codepoint, "glyph": glyph, "ruby": ruby })
  } return output
}
var writeNewDataToFile = function(jsonDataArray,outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(jsonDataArray), 'utf8', function(err) {  // synch so no fallback
      if(err) { return console.log(err); }
      console.log("2. Output has been saved in ", outputPath);
  });
}

/* ************************************************************************* */
/* SHEEL PROGRAM *********************************************************** */
program
  .version('0.0.1', '-v, --version')
  .description("Shell tool to filter rich input.json file and reassign values to valid keys in ouput.json, potentially with modifications.");

program
  .option("-d, --directory <dirpath>", "working directory, default: ./ .")
  .option("-i, --input <filename>", "ínput json, overly rich and/or with non valid keys names, default: ./input.json.")
  .option("-o, --output <filename>", "output json with valid keys, default: ./rfc-data.json.")
  .option("-g, --toGlyph <json-key-name>","reassign input value such ´<json-key-name>:α´ into valid output's key ´glyph:α´")
  .option("-r, --toRuby <json-key-name>","reassign input value such ´<json-key-name>:alpha´ into valid output's key ´ruby:alpha´")
  .option("-c, --toCodepoint [json-key-name]","reassign input value such ´[json-key-name]:U+03B1´ into valid output's key ´codepoint:U+03B1´, default: value of --glyph.")
  .option("-m, --rubyModifier <function>","javascript coded function processing value in --toRuby so to transform it")
  .action(function(options){
    var inputPath = returnInputPath(),
        outputPath= returnOutputPath(),
        inputData = returnInputData(inputPath),
        tempData = [];
    tempData = convertToValidJson(inputData);
    writeNewDataToFile(tempData,outputPath);
  });

program
  .on("--help", function() {
    console.log("  Examples:");
    console.log();
    console.log("    $ node ./script.js -d './test/' -i 'input.json' -o 'output.json' -c 'keyA' -g 'keyB' -r 'keyD'");
    console.log();
  });


program
  .command("exec <cmd>")
  .description("execute the given remote cmd")
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log("exec ´%s´ using %s mode", cmd, options.exec_mode);
  })

program.parse(process.argv);

/* ************************************************************************* */
/* program ***************************************************************** */
console.log('/* ************************************************************************* */')
// console.log('program:', program);
console.log('/* ************************************************************************* */')
