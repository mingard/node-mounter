var commandLineArgs = require('command-line-args');
var shelljs = require('shelljs/global');
var fs = require('fs');
var config;

var args = [
	{ name: 'mount', alias: 'I', type: Boolean, required: ['mountName'] },
	{ name: 'connect', alias: 'C', type: Boolean, required: ['mountName'] },
	{ name: 'setGlobal', alias: 'g', type: Boolean, optional: ['defaultMountDir', 'defaultRemoteDir', 'defaultUsername', 'defaultPemDir'] },
	{ name: 'add', alias: 'a', type: Boolean, required: ['mountName', 'host', 'pemFile'], optional: ['mountDir', 'remoteDir', 'username', 'pemDir'] },
	{ name: 'defaultMountDir', alias: 'M', type: String },
	{ name: 'defaultRemoteDir', alias: 'R', type: String },
	{ name: 'defaultUsername', alias: 'U', type: String },
	{ name: 'defaultPemDir', alias: 'P', type: String },
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
	getConfig(optionsSwitch);
}

var optionsSwitch = function(configResult) {
	config = configResult;
	var options = cli.parse();
	if (options.getGlobalConfig) {console.log(config); };
	if (options.help) { help(); }
	if (options.add) { add(options); }
	if (options.setGlobal) { setGlobalConfig(options); }
	if (options.mount) { mount(options); }
	if (options.connect) { connect(options); }
}

var checkRequired = function(name, options) {
	var pass = true;
	args.forEach(function(arg) {
		if (arg.name === name) {
			var required = arg.required;

			if (required) {
				required.map(function(required) {
					if (options[required]) {
						return required;
					} else {
						pass = false;
						console.error(required, "is required. for help type -h");
					}
				})
			}
		}
	});
	return pass;
}

var getConfig = function(callback, mountName) {
	var filename = (!mountName ? "config" : "config/" + mountName) + ".json";
	fs.readFile(filename, 'utf8', (err, src) => {
		if (err) console.error(err);
		else {
			try {
				callback(JSON.parse(src));
			} catch(e) {
				console.error(e);
				callback();
			}
		}
	})
}

var setGlobalConfig = function(options) {
	if (!checkRequired('setGlobal', options)) return;
	var configOptions = {
		defaultMountDir : options.defaultMountDir || config.defaultMountDir,
		defaultRemoteDir : options.defaultRemoteDir || config.defaultRemoteDir,
		defaultPemDir: options.defaultPemDir || config.defaultPemDir,
		defaultUsername: options.defaultUsername || config.defaultUsername

	};
	createConfig(configOptions, true);
}

var add = function(options) {
	if (!checkRequired('add', options)) return;
	var configOptions = {
		mountName: options.mountName,
		host: options.host,
		mountDir : options.mountDir || config.defaultMountDir,
		remoteDir : options.remoteDir || config.defaultRemoteDir,
		pemDir: (options.pemDir || config.defaultPemDir) + options.pemFile,
		username: options.username || config.defaultUsername

	};
	createConfig(configOptions);
}

var createConfig = function(config, isGlobal) {
	if (!isGlobal ) {
		try {
			var stats = fs.lstatSync('./config');
			if (!stats.isDirectory()) {
				fs.mkdirSync('./config');
			}
		}
		catch (e) {
		    fs.mkdirSync('./config');
		}
	}
	var filename = (isGlobal ? "config" : "config/" + config.mountName) + ".json";
	fs.writeFile(filename, JSON.stringify(config, null, 4), 'utf-8', (err) => {
	  	if (err) throw err;
	  	console.log(isGlobal ? 'Global' : 'Project',  'config saved');
	});
}

var mount = function(options) {
	if (!checkRequired('mount', options)) return;
	getConfig(function(conf) {
		var command = ['sshfs -o reconnect ', conf.username,  "@", conf.host , ':', conf.remoteDir, ' ', conf.mountDir, '/', conf.mountName,  ' -oauto_cache,reconnect,defer_permissions,negative_vncache,noappledouble,volname="', conf.mountName, '"' ].join("");
		execCommand(command);
	}, options.mountName)
}

var connect = function(options) {
	if (!checkRequired('connect', options)) return;
	getConfig(function(conf) {
		var command = ['ssh -tt ', conf.username,  "@", conf.host].join("");
		execCommand(command);
	}, options.mountName)
}

var execCommand = function(command) {
	console.log(command)
	if (exec(command).code !== 0) {
		
	}
}

var help = function() {
	console.log(cli.getUsage());
}

exports.init = init();