const validateFile = (req, res, next) => {
    const fileTypes = ["csv", "xlsx"]
    if (!req.files)
        return res.send({ success: false, message: "Please Select a file" })
    const fileExt = req.files.csvFile.mimetype.split("/").pop();
    if (!fileTypes.includes(fileExt)) {
        return res.send({ success: false, message: "Invalid File Type" })
    }
    next();
}

module.exports = {
    validateFile
}