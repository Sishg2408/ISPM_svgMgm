/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsvg/cw_ispm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
