const Client = require('../model/Clients')
const Note = require('../model/Note')
const asyncHandler = require('express-async-handler')

// GET ** Get All Clients
const getAllClients = asyncHandler(async (req,res) => {
    // Get All Clients From DB 
    const clients = await Client.find().lean()

    if(!clients?.length){
        return res.status(400).json({message:'No Clients Found..!'})
    }
        // Confirm Join client order with note 
    
    res.json(clients)
})


// POT ** Create A NEW Client
 const createNewClient = asyncHandler(async (req,res) => {
    const {username,location,phonenumber} = req.body
        // Confirm Data
    if(!username || !location || !phonenumber){
        return res.status(400).json({message:'All Feilds are Required.>.!'})
    }
    const duplicate = await Client.findOne({phonenumber}).lean().exec()

    if(duplicate){
        return res.status(409).json({message:'Duplicate Client.'})
    }

    const clientObject = {username,location,phonenumber}

    const newClient = await Client.create(clientObject)

    if(newClient){
        return res.status(201).json({message:'New Client Adding'})
    }else{
        return res.status(400).json({message:'Invalid client data received'})
    }
 })


//  PATCH ** Update Client
 const updateClient = asyncHandler(async (req,res) => {
    const {username,active,location,phonenumber,id} = req.body
        // Confirm Data
    if(!username  || !location || !phonenumber){
        return res.status(400).json({message:'All Feilds are Required...!'})
    }
        //DUBLICATE CLIENT
        const client = await Client.findOne({_id:id}).exec()

    if(!client) return res.status(400).json({message:'Not Client Found!'})



    client.username = username
    client.active = active
    client.location = location
    client.phonenumber = phonenumber

    const updateClient = await client.save()
    res.json(`'${updateClient.username} updated'`)
 })

//  DELETE ** deleteClient 
const deleteClient = asyncHandler(async (req,res) => {
    const {id} = req.body

    // Confirm Data
    if(!id){
        return res.status(400).json({message:'Id is required to remove this Client!!'})

    }

    const client = await Client.findOne({_id:id}).exec()


    if(!client) {
        return res.status(400).json({message:'this Client is not Found'})
    }

    const result = await client.deleteOne()

    const replay = `this client ${result.username} is Remove`

    res.json(replay)
})


module.exports = {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient
}