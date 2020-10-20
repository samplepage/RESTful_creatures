const express = require('express');
const router = express.Router()
const fs = require('fs') 

//------DINO INDEX ROUTE------
//change to router.  
router.get('/index', (req, res)=>{
    let dinosaursList = fs.readFileSync('./dinosaurs.json')
    let dinoData =  JSON.parse(dinosaursList)
    console.log(dinoData)
    
    //handle a query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){ //reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index.ejs', {dinosaurs: dinoData});
})

//------dino new route--------
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new')
})

//-----DINO POST ROUTE---------
router.post('/dinosaurs', (req, res)=>{
    let dinosaursList = fs.readFileSync('./dinosaurs.json')
    let dinoData =  JSON.parse(dinosaursList)
    console.log(req.body.name)
    dinoData.push(req.body)//push the new dino to the array //the body is the entire form //req.body.name
    // save the new dinoData array to the dinosaurs.json file 
    //JSON.stringify does the opposite of JSON.parse 
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))//actually adds to json file 
    //redirect to the GET /dinosaurs route (index)
    res.redirect('dinosaurs')
    console.log(req.body)
})

//-------DINO SHOW ROUTE--------
router.get('/:idx', (req, res)=>{
    let dinosaursList = fs.readFileSync('./dinosaurs.json')
    let dinoData =  JSON.parse(dinosaursList)

    //get array index from url parameter 
    let dinoIndex = req.params.idx
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
}) 






module.exports = router; 