const mongoose = require('mongoose');

const drSoftware = mongoose.createConnection("mongodb://127.0.0.1:27017/drSoftware");
drSoftware.on("connected", ()=>{
    console.log('connected to drSoftwareDB ');
});
drSoftware.on("error", ()=>{
    console.log('failed to connect to  drSoftwareDB ');
});

module.exports=
{   
    drSoftware
    
};
