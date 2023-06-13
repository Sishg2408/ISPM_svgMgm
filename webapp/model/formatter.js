jQuery.sap.declare("com.svg.cwispm.model.formatter");
com.svg.cwispm.model.formatter= {
    origMaterialCost: function(priceSuppCurr=0,quantity=0){
       
        return parseFloat(priceSuppCurr) * parseInt(quantity);
    },
    newMaterialCost:function(newSupply=0,quantity=0){
        return parseFloat(newSupply) * parseInt(quantity);
    },
    totalSavings : function(priceSuppCurr=0,quantity=0,newSupply=0){
        return (parseFloat(priceSuppCurr)* parseInt(quantity) - parseFloat(newSupply) * parseInt(quantity));
    },
    profitcolor:function(priceSuppCurr=0,quantity=0,newSupply=0){
        var k = parseFloat(priceSuppCurr)* parseInt(quantity) - parseFloat(newSupply) * parseInt(quantity);
        if (k>0){
            return "Success";
        }
        else {
            return "Error";
        }
    }

}