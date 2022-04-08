const express = require("express");
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/images',
    filename:function(request,file,cb){
        cb(null , Date.now()+file.originalname);
    }
});
var upload=multer({storage: storage});
const packageController = require('../controller/packageController');
const adminController = require('../controller/adminController');
const categoryController = require('../controller/categoryController');
const itemController = require('../controller/itemController');
const firebase = require("../midelware/firebase");



router.post('/add-category',upload.single('catImage'),firebase.fileUpload,categoryController.addCategory);
router.post('/update-category',upload.single('catImage'),firebase.fileUpload,categoryController.updateCategory);
router.get('/view-category',categoryController.ViewCategory);
router.delete('/delete-category',categoryController.deleteCategory);


router.post('/add-package',upload.single('packageImage'),firebase.fileUpload,packageController.addPackage);
router.get('/view-package',packageController.viewPackage);
router.post('/update-package',upload.single('packageImage'),firebase.fileUpload,packageController.packageUpdate);
router.delete('/delete-package',packageController.packageDelete);
router.get("/available-package",packageController.availablePackages);
router.get("/today-meal-option",packageController.todayMealOption);

router.post('/add-item',upload.single("itemImage"),firebase.fileUpload,itemController.addItem);
router.get('/view-item',itemController.viewItem);
router.post('/update-item',upload.single("itemImage"),firebase.fileUpload,itemController.updateItem);
router.delete('/delete-item',itemController.deleteItem);



router.post('/login',adminController.login);

module.exports =router;