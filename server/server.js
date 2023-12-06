const express = require('express');
const {resolve, join} = require('path');
const { json, urlencoded } = require('express');
const { initialize } = require('./bazadate');
const router = require('./router')
const PORT = process.env.PORT || 8080;

express()
    .use(express.static(join(resolve('..'), 'client')))
    .use(urlencoded({extended: true}))
    .use(json())
    .use('/api', router)
    .listen(PORT, async() => {
        try{
            await initialize();
            console.log(`Server is running on port ${PORT}.`);
        }catch (error){
            console.error(error);
        }
    });