sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "com/svg/cwispm/model/formatter",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel, Fragment, formatter, Filter) {
        "use strict";

        return Controller.extend("com.svg.cwispm.controller.ProjectCreation", {
            formatter: formatter,
            onInit: function () {
                this.getOwnerComponent().getModel("oLookUpModel");
                this.router = this.getOwnerComponent().getRouter();
                var data = this.getOwnerComponent().getModel("oLookUpModel").getData()["reasonCodeDesc"];
                this.getOwnerComponent().getModel("Milestone").setProperty("/reasonCodeDesc", data);
                this.getOwnerComponent().getModel("PartSummary");
                this.oPartSummary();


            },
            onCreateNewProj: function (oEvent) {
                
                var url = "https://savingsmanagement.cfapps.eu10-004.hana.ondemand.com/saveAllProjectDetails",
                    that = this,
                    oView = this.getView(),
                    // oPartSummaryModel = oView.getModel("PartSummary"),
                    // sPropertyValue = oPartSummaryModel.getProperty("/property1"),
                    // oCreateProjectIconTab = oView.byId("CreateProjectIconTab"),
                    // oAppModel = this.oComponent.getModel("oAppModel"),
                    // inputValidateArray,
                    createProjPayload;
                oView.setBusy(true);

                createProjPayload = {
                    "projectHdrDto": {
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
                        "dunsNum": oView.byId("idSuppName").getSelectedItem().getKey(),
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
                        "lastEditedDate": "2019-06-04T18:30:00.000Z",
                        "isIncludedInPurKpi": true,
                        "initiativeTag": oView.byId("idInitiativeTag").getSelectedKey(),
                        "isThingworxProject": null
                    },
                    "projectItmDtoList": [
                        {
                            "partNum": "2801403M8-198",
                            "factoryCode": "CAN",
                            "origSupplierNum": "TEST",
                            "partDescription": "ADAPTADOR PESOS RODA TRAS",
                            "currSupplierPriceSupplierCurrency": 37.6,
                            "currencyCode": "USD",
                            "supCurrency": "USD",
                            "newSupplierPriceSupplierCurrency": 112.5,
                            "uomCode": "EA",
                            "pricingUnit": 1,
                            "quantityRecieved": 10,
                            "total": 22.0
                        }

                    ],
                    "projectPartMilestoneDtoList": [
                        {
                            "actualCompDate": "2019-06-04T18:30:00.000Z",
                            "comments": "string",
                            "compStatus": 0,
                            "factoryCode": "GEC2",
                            "identifier": "string",
                            "milestoneCode": 2,
                            "milestoneDayRule": 0,
                            "milestoneSeq": 0,
                            "optMilestone": 0,
                            "partNum": "test",
                            "plannedCompDate": "2019-06-04T18:30:00.000Z",
                            "milestoneDesc": "TEST"
                        }
                    ]

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
                var oselectedKey = this.byId("idReasonCode").getSelectedKey();
                if (oselectedKey === "Incumbent Negotiation") {
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
            
            
            onSelectSuppName: function (oEvent) {
                var oView = this.getView();
                var selectedKey = oView.byId("idSuppName").getSelectedItem().getKey();

                // Call the API with the selected key
                this.oPartSummary(selectedKey);
                
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
            onCancelProject: function () {

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

            oPartSummary: function (selectedKey) {
                var that = this,
                    //var oTableModel = this.oTableModel;
                    supName=selectedKey,
                    oTableModel = this.getOwnerComponent().getModel("oTable"),
                    
                    url = "https://savingsmanagement.cfapps.eu10-004.hana.ondemand.com/getPartsDataBySupplierNumber?supplierNum=" + supName;
                jQuery.ajax({
                    url: url,
                    method: "GET",
                    success: function (data) {
                        oTableModel.setProperty("/getPartsDataBySupplierNumber", data);
                        // oTableModel.refresh();
                        
                    },
                    error: function (error) { }
                });

            },
            onNEXT: function() {
                //validation
                var requiredInputs = ['idProjectOwner', 'idProjectName', 'idCnfFact', 'idPPVgen', 'idInBudget', 'idProjectCreator', 'idQualitylead', 'idPCOlead', 'idCommoditylead', 'idEnglead'];
                var passedValidation = this.validateForm(requiredInputs);
                if (passedValidation === false) {
                    MessageBox.error("Please fill all fields")
                    return false;
                }
                var oIconTabBar = this.byId("CreateProjectIconTab"); 
                var aItems = oIconTabBar.getItems(); 
                var selectedKey = oIconTabBar.getSelectedKey(); 
                var selectedIndex = aItems.findIndex(function(item) {
                  return item.getKey() === selectedKey;
                });
              
                if (selectedIndex !== -1 && selectedIndex < aItems.length - 1) {
                  var nextItem = aItems[selectedIndex + 1]; 
                  oIconTabBar.setSelectedKey(nextItem.getKey()); 
                }
                if (selectedIndex == aItems.length -2){
                    var oButtonmodel = this.getOwnerComponent().getModel("oButtonmodel");
                    this.oButtonmodel = oButtonmodel;
                    oButtonmodel.setProperty("/nextButtonVisible", false);
                }
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

            }
            //   onCreateProjTabSelect: function(oEvent){
            //     var sKey = oEvent.getSource().getSelectedKey();

            //     var projectHeader = this.getView().byId("projectHeader");
            //     var milestone = this.getView().byId("milesStone");

            //     if(sKey === "tab1")
            //     {

            //     }
            //   }



        });
    }
);