const User = require('../models/userModel.js');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const tokenVarification = require('../midelware/tokenVarification');


exports.register = (request, response) => {
    User.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        mobile: request.body.mobile
    }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    })
}

exports.login = (request, response) => {
    User.findOne({ email: request.body.email, password: request.body.password })
        .populate("favItems").populate("favPackages")
        .then(result => {
            // console.log(result)
            if (result) {
                // if (result.isBlocked == false) {
                    if (result.isVerified){
                        let payload = {subject:result._id};
                        let token = jwt.sign(payload,"jkfhsdjfskfdsjfsddv");
                        return response.status(200).json({
                            CurrentUser:result,
                            token:token
                           });}
                    else {
                        let sender = "mohit.ibfoundation@gmail.com";
                        let reciever = result.email;
                        let subject = "Mail Verification";
                        let message = "http://localhost:3000/user/verifyByEmail/" + result._id;

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: sender,
                                pass: 'mohit@123!'
                            }
                        });

                        // email options
                        let mailOptions = {
                            from: sender,
                            to: reciever,
                            subject: subject,
                            text: message
                            // html: "<h1>please verify first </h1><center><a href='" + message + "'><button style='background-color: #008CBA;background-color: #4CAF50; /* Green */border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;'>VERIFY</button></a></center>"
                        };

                        transporter.sendMail(mailOptions, (error, res) => {
                            if (error) {
                                console.log(error);
                            }
                            else
                                response.status(200).json({ message: "Verify on email first" });
                        });
                    }
                // }
                // else
                //     return response.status(200).json({ message: "You are blocked by admin" });
            }
            else {
                return response.status(200).json({ message: "invalid email or password" });
            }
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ err: err });
        });
};


exports.viewUser = (request, response) => {
    User.find()
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}


exports.addToFavPackage = (request, response) => {
    User.updateOne({ _id:request.body.userId }, {
        $push: {
            favPackages: request.body.packageId
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.addToFavItem = (request, response) => {
    let userId = request.body.userId;
    User.updateOne({ _id: userId }, {
        $push: {
            favItems: request.body.itemId
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}


exports.verified = (request, response) => {
    let userId = request.params.userId;
    User.updateOne({ _id: userId }, {
        $set: {
            isVerified: true
        }
    }).then((result) => {
        return response.status(200).json({ message: "verification successfull" });
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.viewFavFoods = (request, response) => {
    User.findOne({ _id: request.body.userId }).populate("favItems").populate("favPackages")
        .then(result => {
            return response.status(200).json({ favItems: result.favItems, favPackages: result.favPackages });
        })
        .catch(err => {
            console.log(err);
            return response.status(200).json({ err: err });
        });
}


exports.updateProfile = (request,response)=>{
    User.updateOne({_id: request.body.userId},
        {
            $set:{
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                mobile: request.body.mobile    
            }
        }).then(result=>{
             if(result.modifiedCount)
              return response.status(200).json({message: 'update profile success'});
             else
              return response.status(404).json({message: 'record not found'})
        }).catch(err=>{
          return response.status(500).json({message: 'Something went wrong..'});
        });
}