const express = require("express");
const router = express.Router();
// const conn = require("../db/connection");
const multer = require("multer");
const moment = require("moment");



// img storage confing
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `file-${Date.now()}.${file.originalname}`)
    }
});


// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image/text")) {
        callback(null, true)
    } else {
        callback(null, Error("only image is allowd"))
    }
}

var upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})


// register userdata
router.post("/register", upload.single("photo"), async (req, res) => {
    const { fname } = req.body;
    const { filename } = req.file;
    console.log(req.body.finalTree);
    console.log(fname);
    console.log(filename);
    res.send("wait");
    const response = {
        success: true,
        code: 200,
        message: "User list",
        error: null,
        data: null,
        resource: req.originalUrl,
    }

    if (!fname || !filename) {
        res.status(422).json({ status: 422, message: "fill all the details" })
    }

    try {
        const explorer = await explorerModel.findOne({ _id: data._id });
        if (!explorer) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Invalid request, Explorer does not exist",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }

        // explorer.items = data.items;
        // await explorer.save();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Explorer updated successfully",
            data: { explorer },
            error: null,
            resource: req.originalUrl,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
            data: null,
            error: error,
            resource: req.originalUrl,
        });
    }

    // try {
    //     let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    //     conn.query("INSERT INTO usersdata SET ?", { username: fname, userimg: filename, date: date }, (err, result) => {
    //         if (err) {
    //             response.code = 401;
    //             response.success = false;
    //             response.message = "failed to upload data";
    //             response.error = err;
    //             res.status(401).json(response);
    //         } else {
    //             console.log("data added")
    //             res.status(201).json({ status: 201, data: req.body })
    //         }
    //     })
    // } catch (error) {
    //     res.status(422).json({ status: 422, error })
    // }


});


// get user data
router.get("/getdata", (req, res) => {
    try {
        conn.query("SELECT * FROM usersdata", (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                // console.log(result);
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
});


// delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    try {
        conn.query(`DELETE FROM usersdata WHERE id ='${id}'`, (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data delete")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})


module.exports = router;