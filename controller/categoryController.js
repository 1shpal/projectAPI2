const Category = require('../models/categoryModel');
const port = process.env.PORT || 3000;

exports.addCategory=(request,response)=>{
    Category.create({
        catname:request.body.catname,
        catImage: "https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal"
    }).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}

exports.updateCategory = (request,response)=>{
    Category.updateOne({_id: request.body.catId},
        {
            $set:{
                catname: request.body.catname,
                catImage: "https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal"
            }
        }).then(result=>{
             if(result.modifiedCount)
              return response.status(200).json({message: 'success'});
             else
              return response.status(404).json({message: 'record not found'})
        }).catch(err=>{
          return response.status(500).json({message: 'Something went wrong..'});
        });
}

exports.ViewCategory = (request,response)=>{
    Category.find().
    then(results=>{
        return response.status(200).json(results);
    })
    .catch(err=>{
        return response.status(500).json({message: 'Sever Error'});
    });
}

exports.deleteCategory = (request,response)=>{
    console.log(request.body)

    Category.deleteOne({_id: request.body.id})
    .then(result=>{
      if(result.deletedCount)
        return response.status(200).json({message: 'success'});
      else
        return response.status(204).json({message: 'not deleted'});  
    })
    .catch(err=>{
      return response.status(500).json({message: 'Something went wrong'});
    });
}