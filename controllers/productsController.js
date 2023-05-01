const productsModel = require("../models/productsModel")

module.exports = {

    getAll: async function(req, res, next) {
        try{
            const docs = await productsModel.paginate({},{
                limit:req.query.limit || 1,
                page:req.quer.page || 1,
                sort:{price:-1},
                select:{destacado:true}
            })
            res.status(200).json(docs)
        } catch(e) {
            console.log(e)
            res.status(400).json({message:e.message})
        }
      },

    getAll: async function(req, res, next) {
        try{
            const documents = await productsModel.find({destacado:false}).populate("category").select("name price").sort({price:-1})
            res.status(200).json(documents)
        } catch(e) {
            console.log(e)
            res.status(400).json({message:e.message})
        }
      },
    
    getById: async function(req, res, next) {
        try{
            const document = await productsModel.findById(req.params.id)
            res.status(200).json(document)
        }catch(e){
            next(e)
        }
      },
    
    create: async function(req, res, next) {
        try{
            console.log(req.body)
            const document = new productsModel({
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                quantity:req.body.quantity,
                category: req.body.category,
                destacado: req.body.destacado || false 
            })
            const product = await document.save()
            res.status(201).json(product)
          } catch(e){
            console.log(e)
            // res.status(400).json({message:e.message})
            e.status=400
            next(e)
          }
        },

    update: async function(req, res, next) {
        try{
            const update = await productsModel.updateOne({_id:req.params.id},req.body)
            res.status(200).json(update)
        } catch(e){
            next(e)
        }
      },

    delete: async function(req, res, next) {
        try{
            const deleteResponse = await productsModel.deleteOne({_id:req.params.id})
            res.status(200).json(deleteResponse)
        } catch(e){
            next(e)
        }
      }  
}