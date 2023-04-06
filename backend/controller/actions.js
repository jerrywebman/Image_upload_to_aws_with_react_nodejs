var Profile = require("../models/Profile");
const AWS = require("aws-sdk");



const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});


var functions = {
    upload: async function (req, res) {
        try {
            console.log(req.body)
            console.log(req.file)
            if (!req.body && !req.file) {
                res.status(403).send({
                    success: false,
                    msg: "Please provide all required information",
                });
            } else {
                const file = req.file;
                const params = {
                    Bucket: "nodedemo", // pass your bucket name
                    Key: `applications/${file.originalname}`, // file location in your bucket 
                    Body: file.buffer,
                };
                s3.upload(params, async function (s3Err, s3data) {
                    if (s3Err) throw s3Err;
                    console.log(s3data);
                    const addProfile = Profile({
                        fullname: req.body.fullname,
                        imageUrl: s3data.Location,
                    })
                    addProfile.save()
                    res.send(s3data.Location)
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({
                success: false,
                message: `Internal Server Error - ${e.message}`,
            });
        }
    },
}

module.exports = functions;