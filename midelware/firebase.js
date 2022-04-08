
const { Storage } = require("@google-cloud/storage");
const path = require("path")
const storage = new Storage({
    projectId: "imageupload-783bb",
    keyFilename: "H:\\book_my_meal\\middleware\\imageupload-783bb-firebase-adminsdk-btpor-f46797e7f3.json"
});
let bucketName = "gs://imageupload-783bb.appspot.com";
exports.fileUpload = async (request, response, next) => {
    try {
        console.log("in fire base");
        await storage.bucket(bucketName).upload(path.join(__dirname, "../", "public/images/") + request.file.filename, {
            gzip: true,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: "vanshpal"
                }
            }
        })
        next();
    }
    catch (err) {
        console.log(err);
    }
}