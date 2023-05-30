sap.ui.define(
  [
    "sap/ui/core/mvc/Controller"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("com.svg.cwispm.controller.App", {
      onInit() {
        this.router = this.getOwnerComponent().getRouter();
        this.router.navTo("ProjectManagement");
      },
      onItemSelect: function (oEvent) {
        var key = oEvent.getParameter("item").getKey()



        if (key === "ProjectManagement") {

          this.router.navTo("ProjectManagement");
        }
        else if (key === "ProjectCreation") {
          this.router.navTo("ProjectCreation");
        }
      }
    });
  }
);
