const mongoose = require('mongoose');

const dbConnect = async (DataBase)=>{
    try {
        await mongoose.connect(DataBase, {useNewUrlParser: true});
        return true;    
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = dbConnect;