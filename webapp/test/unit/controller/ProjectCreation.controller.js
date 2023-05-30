/*global QUnit*/

sap.ui.define([
	"comsvg/cw_ispm/controller/ProjectCreation.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ProjectCreation Controller");

	QUnit.test("I should test the ProjectCreation controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
