const Order = require('../models/orderModel');
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
exports.placeOrder = (request,response) =>{
    Order.create({
        userId:request.body.userId,
        address:request.body.address,
        mobile:request.body.mobile,
        packages:request.body.packages,
        items:request.body.items
    })
    
    .then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({err : "OOPS SOMETHING WENT WRONG"});
    });
}

exports.viewOrder = (request,response) =>{
    Order.find({userId : request.params.uid})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}


exports.orderHistory = (request,response) =>{
    Order.find()
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}

exports.sendReceipt =(request,response)=>{
    let total = request.body.total;
    User.findOne({email: request.body.email})
    .then(result => {
        // console.log(result)
        if (result) {
            // if (result.isBlocked == false) {
                if (result.isVerified)
                    return response.status(200).json(result);
                else {
                    let sender = "mohit.ibfoundation@gmail.com";
                    let reciever = result.email;
                    let subject = "Receive order Receipt";
                    let message = "totel amount = " + total;

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
}