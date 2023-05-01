const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    getAll: async function(req, res, next) {
        try{
            const products = await usersModel.find()
            res.json(products)
        } catch(e) {
            next(e)
        }
      },


    validate: async function(req, res, next) {
        try{
            console.log("validate", req.body);
            const users = await usersModel.findOne({email:req.body.email})
            console.log("validate", users);
            if(!users){
                res.json({message:"The email and/or password are incorrect"})
                return
            }
            const isCorrectPw = await bcrypt.compare(req.body.password, users.password);
            if(isCorrectPw){
                const token = jwt.sign({userId:users._id},req.app.get("secretKey"),{expiresIn:'1h'})
                res.json(token)
            } else{
                res.json({message:"The email and/or password are incorrect"})
                return
            }
        } catch(e) {
            console.log("validate exception", e, req.body)
            next(e)
        }
      },
    
    create: async function(req, res, next) {
        try{
            console.log("request body", req.body)

            const document = new usersModel({
                name:req.body.name,
                email:req.body.email,
                password: req.body.password
            })

            const response = await document.save()
            res.json(response)
          } catch(e){
            console.log("create exception", e)
                next(e)
          }
        },

 
}