const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var{ Employee } = require('../models/employee');

//Get All Employees list/ => localhost:3000/employees/
router.get('/', (req,res) =>{
    Employee.find((err,docs) => {
       if(!err)
       {res.send(docs);}
       else{ console.log('Error in retriving Employees:' +JSON.stringify(err, undefined, 2));}
    });
}); 

//Get an Employee details with ID/ => localhost:3000/employees/id
router.get('/:id', (req,res) =>{
          if(!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record with given id: ${req.params.id}`);

        Employee.findById(req.params.id,(err,doc) =>{
            if(!err){res.send(doc);}
            else{console.log('Error in retrieving Employee :' +JSON.stringify(err, undefined, 2));}   
        });
});


//Create new Employee/ => localhost:3000/employees/create 
router.post('/create',(req,res) =>{
       var emp = new Employee({
           name: req.body.name,
           position:req.body.position,
           office:req.body.office,
           salary:req.body.salary,
       });
       console.log(emp);
       emp.save((err,doc) =>{
        if(!err)
        {res.send(doc);}
        else{ console.log('Error while creating Employee:' +JSON.stringify(err, undefined, 2));}
       });
});

//Update Employee details/ => localhost:3000/employees/update/id
router.put('/update/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var emp = {
        name: req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary,
    };

    Employee.findByIdAndUpdate(req.params.id, { $set:emp }, {new :true},(err, doc) =>{
        if(!err){res.send(doc);}
        else{ console.log('Error while updating Employee details:' +JSON.stringify(err, undefined, 2));}
    });
});

//Delete Employee details/ => localhost:3000/employees/delete/id  
router.delete('/delete/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){res.send('Given ID has been deleted');}
        else{ console.log('Error while deleting Employee:' +JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;