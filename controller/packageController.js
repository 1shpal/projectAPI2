const Package = require('../models/packageModel');
const port = process.env.PORT || 3000;


exports.addPackage=(request,response)=>{
    console.log(request.body)
    Package.create({
        packageName:request.body.packageName,
        packagePrice:request.body.packagePrice,
        packageQty:request.body.packageQty,
        packageDesc:request.body.packageDesc,
        packageImage:"https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal",
        packageDay: request.body.packageDay,
        packageCategoryId:request.body.packageCategoryId
    })
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
};


exports.viewPackage =(request,response)=>{
    Package.find()
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
};

exports.availablePackages = (request, response) => {
    Package.find({ quantity: { $gt: 0 } })
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}


exports.todayMealOption = (request, response) => {
    var date = new Date();
    var day;
    if (date.getDay() == 0)
        day = "sunday";
    else if (date.getDay() == 1)
        day = "monday";
    else if (date.getDay() == 2)
        day = "tuesday";
    else if (date.getDay() == 3)
        day = "wednesday";
    else if (date.getDay() == 4)
        day = "thursday";
    else if (date.getDay() == 5)
        day = "friday";
    else if (date.getDay() == 6)
        day = "saturday";

    Package.find({packageDay: request.body.day})
    .then(result=>{
        response.status(200).json(result);
    })
    .catch(err=>{
        response.status(500).json(err);
    });

}




exports.packageUpdate=(request,response)=>{
    Package.updateOne({_id:request.body.pId},
        {$set:{
            packageName:request.body.packageName,
            packagePrice:request.body.packagePrice,
            packageQty:request.body.packageQty,
            packageDesc:request.body.packageDesc,
            packageDay:request.body.packageDay,
            packageImage:"https://firebasestorage.googleapis.com/v0/b/imageupload-783bb.appspot.com/o/"+request.file.filename+"?alt=media&token=vanshpal",
            packageCategoryId:request.body.packageCategoryId
        }})
        .then(result=>{
            if(result.modifiedCount)
             return response.status(200).json({message: 'success'});
            else
             return response.status(404).json({message: 'record not found'})
       }).catch(err=>{
         return response.status(500).json({message: 'Something went wrong..'});
       });
    };

exports.packageDelete=(request,response)=>{
    Package.deleteOne({_id:request.body.pId})
    .then(result=>{
        if(result.deletedCount)
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(200).json(err);
    });
};

