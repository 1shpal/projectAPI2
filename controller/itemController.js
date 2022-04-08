const Item = require('../models/itemModel');
const port = process.env.PORT || 3000;

exports.addItem = (request,response)=>{
    Item.create({
        itemName:request.body.itemName,
        itemQty:request.body.itemQty,
        itemPrice:request.body.itemPrice,
        itemDesc:request.body.itemDesc,
        itemImage:"https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal",
        itemDay: request.body.itemDay,
        itemCategoryId:request.body.itemcategoryId
    }).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
};

exports.viewItem=(request,response)=>{
    Item.find().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(400).json(err);
    });
};

exports.updateItem = (request,response)=>{
    Item.updateOne({_id:request.body.itemID},
        {$set : {
            itemName:request.body.itemName,
            itemQty:request.body.itemQty,
            itemPrice:request.body.itemPrice,
            itemDesc:request.body.itemDesc,
            itemDay:request.body.itemDay,
            itemImage:"https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal",
            itemCategoryId:request.body.itemcategoryId
        }}).then(result=>{
            if(result.modifiedCount)
             return response.status(204).json({message: 'success'});
            else
             return response.status(404).json({message: 'record not found'})
       }).catch(err=>{
         return response.status(500).json({message: 'Something went wrong..'});
       });
};

exports.deleteItem = (request,response)=>{
    Item.deleteOne({_id:request.body.itemID})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(200).json(err);
    });
}

