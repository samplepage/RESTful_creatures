const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware (it makes req.body work)
app.use(express.urlencoded({extended: false}))
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))








app.listen(4000); 