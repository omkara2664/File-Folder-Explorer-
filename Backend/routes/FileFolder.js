const explorerModel = require("../Module/ExplorerModule");
const data = require("../db/explorer.db.json")

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const response = {
        success: true,
        code: 200,
        message: "Explorer list",
        error: null,
        data: null,
        resource: req.originalUrl,
    };
    try {
        const explorer = await explorerModel.find({});
        if (explorer.length === 0) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "No file Data found.",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }
        response.data = { explorer };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
})
module.exports = router;

// const insertExplorer = async () => {
//     try {
//         const doc = await explorerModel.insertMany(data);
//         return Promise.resolve(doc);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

// insertExplorer().then((doc) => console.log(doc)).catch((error) => console.log(error));