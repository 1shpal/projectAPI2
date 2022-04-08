const Cart = require('../models/cartModel');
exports.addPackage = async (request,response) =>{
    let cart = await Cart.findOne({userId : request.body.userId})
    if(!cart){
        cart = new Cart();     
        cart.userId  = request.body.userId;
    }

    cart.packages.push(request.body.packageId);
    cart.save().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.viewCart = (request,response) =>{
    Cart.findOne({userId : request.body.userId}).populate("items").populate("packages")
    .then(result=>{
        if(result)
            return response.status(200).json(result);
        else
            return response.status(200).json({message : "No Cart Found"});
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.addItem = async (request,response) =>{
    let cart = await Cart.findOne({userId : request.body.userId})
    if(!cart){
        cart = new Cart(); 
        cart.userId  = request.body.userId;
    }

    cart.items.push(request.body.itemId);
    cart.save().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.removePackage = (request,response) =>{
    Cart.updateOne({userId : request.body.userId},{
        $pullAll : {
            packages : [
                {_id : request.body.packageId}
            ]
        }
    }).then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    })
}

exports.removeItem = (request,response) =>{
    Cart.updateOne({userId : request.body.userId},{
        $pullAll : {
            items : [
                {_id : request.body.itemId}
            ]
        }
    }).then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    })
}
exports.deleteCart = (request,response) =>{
    Cart.deleteOne({userId : request.body.userId})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}