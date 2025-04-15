const Part = require('../model/Parts')
const asyncHandler = require('express-async-handler')

const getAllParts = asyncHandler(async(req,res) => {
    // get all parts from mongoDB
    const parts = await Part.find().lean() 
    // if no psrts 
    if(!parts?.length){
        return res.status(400).json({message:'No Parts Found.'})
    }    
    res.json(parts)

})




const createNewPart = asyncHandler(async(req,res) => {
    const {id,name,desc,productiondate,lifespan,count,buy} = req.body


    // Confirm Data
    if(!id || !name || !desc || !productiondate || !count ) {
        return res.status(400).json({message:'All Fields are Required'})
    }
     // Check for duplicate id
        const duplicate = await Part.findOne({id}).lean().exec()
        if(duplicate){
            return res.status(409).json({message:'Duplicate Part ID'})
        }
    
        const partObject = {id,name,desc,productiondate,lifespan,count,buy}
        const part = await Part.create(partObject)

        if(part) {
        return res.status(200).json({message:'New Part created'})
        }else{
        return res.status(400).json({message:'Invalid pard Data recived'})
        }
})


const updatePart = asyncHandler(async(req,res) => {
    const {id,name,desc,productiondate,lifespan,count,buy} = req.body

    // Confirm Data
    if(!id || !name || !desc || !productiondate ){
        return res.status(400).json({message:'All Fields are required'})
    }

    // Confirm part is exists to update
    const part = await Part.findOne({name}).exec()

    if(!part){
        return res.status(400).json({message:'part is Not Found'})
    }
    // Check for duplicate Id
    const duplicate = await Part.findOne({name}).lean().exec()
2
    if(duplicate && duplicate.name !==name){
        return res.status(409).json({message:'You Can Not Change Id'})
    }
    
    part.id=id
    part.name = name
    part.desc = desc
    part.productiondate = productiondate
    part.lifespan = lifespan
    part.buy =  buy
    part.count = count 

    
    const updatePart = await part.save()
    res.json(`'${updatePart.name}' updated `)
})

const deletePart = asyncHandler(async(req,res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }
    // Confirm Part exists to delete
    const part = await Part.findOne({id}).exec()
    if(!part){
        return re.status(400).json({message:'Part is Not Found'})
    }
    const result = await part.deleteOne()

    const reply = `Part '${result.name}' with ID ${result.id} deleted`
    res.json(reply)
})


module.exports={
    getAllParts,
    createNewPart,
    updatePart,
    deletePart
}