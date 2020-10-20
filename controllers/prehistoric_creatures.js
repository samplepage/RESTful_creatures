const express = require('express');
const router = express.Router()
const fs = require('fs')


//--------prehistoric index route---------
router.get('/index', (req, res)=>{
    let prehistoricList = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData =  JSON.parse(prehistoricList)
    console.log(prehistoricData)
    //handle a query string if there is one
    console.log(req.query.preFilter)
    let preFilter = req.query.type 
    console.log(preFilter);
    if(preFilter){ //reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        prehistoricData = prehistoricData.filter((pre)=>{
            return pre.type.toLowerCase() === preFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index.ejs', {prehistoric_creatures: prehistoricData});
}) 


//--------prehistoric new route---------
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

//-----prehistoric POST ROUTE---------
router.post('/prehistoric_creatures', (req, res)=>{
    let preList = fs.readFileSync('./prehistoric_creatures.json')
    let preData =  JSON.parse(preList)
    console.log(req.body.name)
    preData.push(req.body)//push the new dino to the array //the body is the entire form //req.body.name
    // save the new dinoData array to the dinosaurs.json file 
    //JSON.stringify does the opposite of JSON.parse 
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preData))//actually adds to json file 
    //redirect to the GET /dinosaurs route (index)
    res.redirect('prehistoric_creatures')
    console.log(req.body)
})

//--------prehistoric show route----------
router.get('/:idx', (req, res)=>{
    let preList = fs.readFileSync('./prehistoric_creatures.json')
    let preData =  JSON.parse(preList)
    //get array index from url parameter 
    let preIndex = req.params.idx
    res.render('prehistoric_creatures/show.ejs', {pre: preData[preIndex], preId: preIndex})
})





module.exports = router; 