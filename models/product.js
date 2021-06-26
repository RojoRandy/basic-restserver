const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre el obligatorio'],
        unique: true
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price:{
        type: Number,
        default: 0,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String
    },
    available: {
        type:Boolean, 
        default:true
    }
});

ProductSchema.methods.JSON = function(){
    const {_v,state, ...product} = this.toObject();
    return product;
}

module.exports=model('Product', ProductSchema);