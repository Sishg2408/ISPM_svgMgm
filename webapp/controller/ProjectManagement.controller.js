sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.svg.cwispm.controller.ProjectManagement", {
            onInit() {
                this.tableData();
                this.router = this.getOwnerComponent().getRouter();
            },
            tableData:function(){
                var that = this;
                var oTable = this.getOwnerComponent().getModel("oTable"),
                    url = "https://savingsmanagement.cfapps.eu10-004.hana.ondemand.com/getAllProjectHdr";
                jQuery.ajax({
                    method: "GET",
                    url: url,
                    success: function (data) {
                        oTable.setProperty("/tableData", data);
                    },
                    error: function (error) { }
                })
            },
            onPressCreateNewProjectBtn:function(){
                this.router.navTo("ProjectCreation");
            }

        });
    }
);