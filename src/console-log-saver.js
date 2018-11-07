"use strict";

(function() {
	console.saver = (function() {
		var logs = [];
		
		window.addEventListener('load', function getLogs() {
			var storedLogs = sessionStorage.getItem('console-log-saver-logs');
			if(storedLogs) {
				logs = JSON.parse(storedLogs);
			}
		});		
		window.addEventListener('unload', function saveLogs() {
			try {
				sessionStorage.setItem('console-log-saver-logs', JSON.stringify(logs));
			} catch(err) {
				if(err.code === 22) {
					var arrayLength = logs.length;
					logs = logs.splice(~~(arrayLength/2), arrayLength);
					saveLogs();
				}
			}
		});
		
		return {
			add: function(type, log) {
				logs.push(type + "\t" + log);
			},
			save: function(filename) {			
				var blob = new Blob([logs.join('\r\n')], {type: 'text/json'});
				
				var a = document.createElement('a');			
				a.download = filename || "console-logs.txt";
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
				
				var e = new MouseEvent('click');
				a.dispatchEvent(e);
			}
		}
	})();
	
	var logTypes = ['log', 'info', 'warn', 'error', 'debug'];
	var logFn;
	
	function extendLogging(logType) {
		logFn = console[logType];
		console[logType] = function(msg) {
			console.saver.add(logType, msg);
			logFn.apply(console, arguments);
		};
	}
	for(var i = 0 ; i < logTypes.length ; i++) {
		extendLogging(logTypes[i]);
	}
})();