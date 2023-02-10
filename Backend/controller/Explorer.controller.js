const explorerModel = require("../Module/ExplorerModule");
const data = require("../db/explorer.db.json")

const getAllExplorer = async (req, res) => {
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
}

const getExplorerById = async (req, res) => {
    res.send("In get by id");
}

const setExplorerData = async (req, res) => {
    const data = req.body.finalTree;
    // console.log(data);
    if (!data) {
        return res.status(403).json({
            success: false,
            code: 403,
            message: "Data not updated.",
            data: null,
            error: null,
            resource: req.originalUrl,
        });
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

        explorer.items = data.items;
        await explorer.save();
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


}
const setFileData = async (req, res) => {
    // const { fname } = req.body;
    // const { filename } = req.file;

    console.log(req.body);
    // console.log(filename);
    res.send("success");

}

// const insertExplorer = async () => {
//     try {
//         const doc = await explorerModel.insertMany(data);
//         return Promise.resolve(doc);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

// insertExplorer().then((doc) => console.log(doc)).catch((error) => console.log(error));

module.exports = {
    getAllExplorer,
    getExplorerById,
    setExplorerData,
    setFileData
}