var commandLineArgs = require('command-line-args');
var fs = require('fs');
var config;

var args = [
	{ name: 'setGlobal', alias: 'g', type: Boolean, optional: ['defaultMountDir', 'defaultRemoteDir', 'defaultUsername', 'defaultPemDir'] },
	{ name: 'add', alias: 'a', type: Boolean, required: ['mountName', 'host', 'pemFile'], optional: ['mountDir', 'remoteDir', 'username', 'pemDir'] },
	{ name: 'defaultMountDir', alias: 'M', type: String },
	{ name: 'defaultRemoteDir', alias: 'R', type: String },
	{ name: 'defaultUsername', alias: 'U', type: String },
	{ name: 'defaultPemDir', alias: 'P', type: String },
	{ name: 'setGlobalConfig', alias: 'C', type: String },
	{ name: 'getGlobalConfig', alias: 'c', type: Boolean },
	{ name: 'mountDir', alias: 'm', type: String },
	{ name: 'mountName', alias: 'n', type: String },
	{ name: 'host', alias: 'H', type: String },
	{ name: 'pemDir', alias: 'p', type: String },
	{ name: 'pemFile', alias: 'f', type: String },
	{ name: 'remoteDir', alias: 'r', type: String },
	{ name: 'help', alias: 'h', type: Boolean }
];

var cli = commandLineArgs(args);

var init = function() {
	getGlobalConfig(optionsSwitch);
}

var optionsSwitch = function() {
	var options = cli.parse();
	if (options.getGlobalConfig) {console.log(config); };
	if (options.help) { help(); }
	if (options.add) { add(options); }
	if (options.setGlobal) { setGlobalConfig(options); }
}

var checkRequired = function(name, options) {
	var pass = true;
	args.forEach(function(arg) {
		if (arg.name === name) {
			var required = arg.required;
			required.map(function(required) {
				if (options[required]) {
					return required;
				} else {
					pass = false;
					console.error(required, "is required. for help type -h");
				}
			})
		}
	});
	return pass;
}

var getGlobalConfig = function(callback) {
	fs.readFile('config.json', 'utf8', function(err, src) {
		if (err) console.error(err);
		else {
			try {
				config = JSON.parse(src);
				callback(config);
			} catch(e) {
				console.error(e);
				callback();
			}
		}
	})
}

var setGlobalConfig = function(options) {
	if (!checkRequired('add', options)) return;
	// var config = {
	// 	mountName: options.name,
	// 	host: options.host
	// };
	// createConfig(options);
}

var add = function(options) {
	if (!checkRequired('add', options)) return;
	// var config = {
	// 	mountName: options.name,
	// 	host: options.host
	// };
	// createConfig(options);
}

var help = function() {
	args.forEach(function(arg) {
		console.log("For", arg.name, "(-" + arg.alias, ") followed by", arg.type === Boolean ? "an optional Boolean" : "a String", "value" )
	})
}

exports.init = init();