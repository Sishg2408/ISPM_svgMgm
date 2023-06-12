jQuery.sap.declare("com.svg.cwispm.model.formatter");
com.svg.cwispm.model.formatter= {
    origMaterialCost: function(priceSuppCurr,quantity){
       
        return priceSuppCurr * quantity;
    },
    newMaterialCost:function(newSupply,quantity){
        return parseInt(newSupply) * parseInt(quantity);
    }
    // totalSavings : function(origMaterialCost,newMaterialCost){
    //     return parseInt(origMaterialCost) - parseInt(newMaterialCost);
    // }
}