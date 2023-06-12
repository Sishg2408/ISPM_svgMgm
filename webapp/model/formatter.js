jQuery.sap.declare("com.svg.cwispm.model.formatter");
com.svg.cwispm.model.formatter= {
    newTotMaterial:function(price=0,quantity=0){
        return parseInt(price)*parseInt(quantity);
    },
    originalMat:function(price=0,quantity=0){
        return parseInt(price)*parseInt(quantity);
    },
    totMat:function(priceN=0,quantityN=0,priceO=0,quantityO=0){
        return (parseInt(priceO)*parseInt(quantityO))-(parseInt(priceN)*parseInt(quantityN));
    },
    profitcolor:function(priceN=0,quantityN=0,priceO=0,quantityO=0){
        var k= (parseInt(priceO)*parseInt(quantityO))-(parseInt(priceN)*parseInt(quantityN));
    }
}