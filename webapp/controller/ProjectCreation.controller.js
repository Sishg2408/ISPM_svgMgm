sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel,Fragment) {
        "use strict";

        return Controller.extend("com.svg.cwispm.controller.ProjectCreation", {
            onInit: function () {
                this.getOwnerComponent().getModel("oLookUpModel");
                this.router = this.getOwnerComponent().getRouter();
                var data = this.getOwnerComponent().getModel("oLookUpModel").getData()["reasonCodeDesc"];
                this.getOwnerComponent().getModel("Milestone").setProperty("/reasonCodeDesc", data);
                this.oPartSummary();


            },
            onCreateNewProj: function (oEvent) {
                //validation
                var requiredInputs = ['idProjectOwner', 'idProjectName', 'idCnfFact','idPPVgen','idInBudget','idProjectCreator', 'idQualitylead', 'idPCOlead', 'idCommoditylead', 'idEnglead'];
                var passedValidation = this.validateForm(requiredInputs);
                if (passedValidation === false) {
                    MessageBox.error("Please fill all fields")
                    return false;
                }
                var url = "https://savingsmanagement.cfapps.eu10-004.hana.ondemand.com/saveProjectHeader",
                    that = this,
                    oView = this.getView(),
                    // oProjectHeaderModel = this.getOwnerComponent().getModel("ProjectHeader"),
                    // oProjHeadData = oProjectHeaderModel.getData(),
                    // oCreateProjectIconTab = oView.byId("CreateProjectIconTab"),
                    // oAppModel = this.oComponent.getModel("oAppModel"),
                    // inputValidateArray,
                    createProjPayload;
                oView.setBusy(true);

                createProjPayload = {
                    "acreIdea": "Yes",
                    "acreSupplierNum": null,
                    "countryCode": null,
                    "dualSrcng": oView.byId("idDualSrcng").getSelectedKey(),
                    "engLead": oView.byId("idEnglead").getValue(),
                    "isBcc": "NO",
                    "isGenppv": oView.byId("idPPVgen").getSelectedKey(),
                    "isPrmntsav": oView.byId("idPrmntsave").getSelectedKey(),
                    "noMntRec": oView.byId("idTextField").getValue(),
                    "pplvCalcPrtlvl": "YES",
                    "projectName": oView.byId("idProjectName").getValue(),
                    "projectOwner": oView.byId("idProjectOwner").getValue(),
                    "projectStatus": "In Progress",
                    "reasonCode": "NBCR",
                    "dunsNum": "529302502",
                    "fiscImpFc": 0.0,
                    "fiscImpGc": 0.0,
                    "anImpFc": 0.0,
                    "anImpGc": 0.0,
                    "cnfFact": oView.byId("idCnfFact").getValue(),
                    "newParentSupNum": "999988253",
                    "erpPrcUpdt": 0,
                    "ideaNum": null,
                    "comments": null,
                    "changeInLandedCostPrctg": null,
                    "sboInitiative": "NO",
                    "capex": 0,
                    "opex": 0,
                    "includedInBudget": oView.byId("idInBudget").getSelectedKey(),
                    "moduleId": oView.byId("idModuleName").getSelectedKey(),
                    "createdDate": oView.byId("idCreatedDate").getDateValue(),
                    "lastEditedUser": "test",
                    "qualityLead": oView.byId("idQualitylead").getValue(),
                    "projectCreator": oView.byId("idProjectCreator").getValue(),
                    "pcoLead": oView.byId("idPCOlead").getValue(),
                    "commodityLead": oView.byId("idCommoditylead").getValue(),
                    "newlandedCostPrctg": null,
                    "currentLandedCostPrctg": null,
                    "initiativeType": oView.byId("idInitiativeType").getSelectedKey(),
                    "lastEditedDate": "0001-12-20 00:00:00.0",
                    "isIncludedInPurKpi": true,
                    "initiativeTag": oView.byId("idInitiativeTag").getSelectedKey(),
                    "isThingworxProject": null
                };
                $.ajax({
                    method: "POST",
                    traditional: true,
                    data: JSON.stringify(createProjPayload),
                    contentType: "application/json; charset=UTF-8",
                    url: url,
                    success: function (data) {
                        var msg = "Project " + " has been created Successfully";
                        // oProjectHeaderModel.setProperty("/projectID", data.mdmProjectId);
                        // oCreateProjectIconTab.setSelectedKey("MatList");
                        // oAppModel.setProperty("/CreateProjSelectedTab", "MatList");
                        oView.setBusy(false);
                        MessageBox.success(msg, {
                            title: "Project Creation"
                        });
                    },
                    error: function (error) {
                        oView.setBusy(false);
                        MessageBox.error("Project has not been created", {
                            title: "Project Creation"
                        });
                    }
                });


            },
            validateForm: function (requiredInputs) {
                var _self = this;
                var valid = true;
                requiredInputs.forEach(function (input) {
                    var sInput = _self.getView().byId(input);
                    if (sInput.getValue() == "" || sInput.getValue() == undefined) {
                        valid = false;
                        sInput.setValueState("Error");
                    }
                    else {
                        sInput.setValueState("None");
                    }
                });
                return valid;

            },
            onComboBoxChange: function (oEvent) {
                var sSelectedKey = oEvent.getSource().getSelectedKey();
                var oTextField = this.getView().byId("idTextField");

                // set the editable property of the Input control based on the selected key
                if (sSelectedKey === "yes") {
                    oTextField.setEditable(false);
                } else {
                    oTextField.setEditable(true);
                }
            },
            _loadData: function () {
                // Load data based on current selection in dropdown
                var oselectedKey = this.byId("idDropdown").getSelectedKey();
                if (oselectedKey === "1") {
                    var data = this.getOwnerComponent().getModel("oLookUpModel").getData()["reasonCodeDesc"];
                    this.getOwnerComponent().getModel("Milestone").setProperty("/reasonCodeDesc", data);
                    // this.getView().byId("idTable").setModel(oLookUpModel);
                }
                else {
                    this.getOwnerComponent().getModel("Milestone").setProperty("/reasonCodeDesc", null);
                }
            },

            onChange: function (oEvent) {
                this._loadData();
            },
            onDateChange: function (oEvent) {
                var odate = this.getOwnerComponent().getModel("Milestone").getData();

                var dateValue = odate.reasonCodeDesc[0].date;
                var ms1 = new Date(dateValue).getTime() + (86400000 * 4);
                var ms2 = new Date(dateValue).getTime() + (86400000 * 8);
                var ms3 = new Date(dateValue).getTime() + (86400000 * 12);
                var ms4 = new Date(dateValue).getTime() + (86400000 * 16);
                var ms5 = new Date(dateValue).getTime() + (86400000 * 20);
                odate.reasonCodeDesc[1].date = new Date(ms1).toDateString();
                odate.reasonCodeDesc[2].date = new Date(ms2).toDateString();
                odate.reasonCodeDesc[3].date = new Date(ms3).toDateString();
                odate.reasonCodeDesc[4].date = new Date(ms4).toDateString();
                odate.reasonCodeDesc[5].date = new Date(ms5).toDateString();


            },
            onCancelProjectSave:function(){
                
            },
            onAddMaterial: function () {

                materialListData = {
                    "Line": "",
                    "RequestType": "",
                    "MaterialNumber": "",
                    "MateialDescription": "",
                    "MaterialStatus": "DRAFT",
                    "deleteBtnMaterialVisible": true
                };
                this.getOwnerComponent().getModel("MaterialList").setProperty("/Materials", materialListTableData);
            },

            oPartSummary: function(oEvent){
                var that = this,
                //var oTableModel = this.oTableModel;
                    oTableModel = this.getOwnerComponent().getModel("oTable"),
                    url = "https://savingsmanagement.cfapps.eu10-004.hana.ondemand.com/getPartsDataBySupplierNumber?supplierNum=TA0017";
              

                jQuery.ajax({
                    url: url,
                    method: "GET",
                    success: function (data) {
                        oTableModel.setProperty("/getPartsDataBySupplierNumber", data);
                        // oTableModel.refresh();
                    },
                    error: function (error) { }
                });

            }



        });
    }
);