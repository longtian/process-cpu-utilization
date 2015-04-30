/**
 * Created by yan on 15-4-29.
 */
/**
 * Created by wyvernnot on 15-4-29.
 */
var pcu = require('../');

pcu.ready(function(){
    Object.keys(pcu.ps.SPECIFIERS).forEach(function(item){
        pcu.get([item],function(err,data){
            console.log(item,data);
        })
    })
})