const mongoose = require("../config/mongodb")
const errorMessage = require("../utils/errorMessages")

const productsSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true, errorMessage.GENERAL.required_field],
      minLength:3
    },
    price:{
        type:Number,
        required:[true, errorMessage.GENERAL.required_field],
        min:[0,errorMessage.GENERAL.minlength],
        get: function(value){
            //add taxes
            return value * 1.08
        },
        set: function(value){
            //add shipping
            return value + 5.99
        }
    },
    description:{
        type:String,
        required:[false],
        max:[100,errorMessage.GENERAL.maxlength]
    },
    quantity:{
        type:Number,
        required:[true,errorMessage.GENERAL.required_field]
    },
    status:{
        type:String,
        required:[true],
        max:[15,errorMessage.GENERAL.maxlength]
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    destacado:Boolean
})

productsSchema.virtual("price_currency").get(function(){
    return `$ ${this.price}`
})

productsSchema.set("ToJSON",{getters:true,setters:true,virtuals:true})

module.exports = mongoose.model("products", productsSchema)
