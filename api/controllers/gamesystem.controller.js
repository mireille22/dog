'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { dog2 } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getDog2byId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("gamesystem by id..." + id);
    //console.log(gamesystems);

    dog2.findByPk(id)
    .then(mydog2 => {
    console.log(mydog2);
    res.status(200).send(mydog2);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getDog2byId.name, error, res);
  }
}

function getDog2(req, res) {

  try {
        
   console.log("dog2...");
   console.log(dog2);
   dog2.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((mydog2) => {
     console.log(mydog2);
     res.status(200).send(mydog2);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getDog2.name, error, res);
  }
}

function updateDog2(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatedog2 = req.body;
    console.log("update gamesystems ... " + myupdatedog2.name + " " + myupdatedog2.descripcion);
 

    dog2.findByPk(id)
      .then(mydog2 => {
        console.log("Result of findById: " + mydog2);
        if (!mydog2) {
          res.status(401).send(({}));
        
        }
        return mydog2
          .update({ 
            name: myupdatedog2.name, 
            description: myupdatedog2.description 
           })
          .then(() => res.status(200).send(mydog2) )
          .catch(error => res.status(403).send(mydog2));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateDog2.name, error, res);
  }

}

function addDog2(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var mydog2 = req.body;
    console.log("gamesystems ... " + mydog2);
 
      return dog2
        .create({
          name: mydog2.name,
          size: mydog2.size,
          weight: mydog2.weight,
          origin: mydog2.origin,
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((mydog2) => {
          res.status(201).send(mydog2);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addDog2.name, error, res);
  }
}


function deleteDog2(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  dog2.findByPk(id)
    .then(mydog2 => {
      console.log("Result of findById: " + mydog2);
      if (!mydog2) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return mydog2
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getDog2byId,
  getDog2,
  updateDog2,
  addDog2,
  deleteDog2,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}