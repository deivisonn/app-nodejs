const express = require('express');
const app = express();

const {
    PORT,

    NODE_ENV
} = process.env



app.listen(PORT,()=>{
    console.log(`Server up at https://localhost:${PORT}`);
    console.log('Press \'ctrl + c\' to shut down')
})