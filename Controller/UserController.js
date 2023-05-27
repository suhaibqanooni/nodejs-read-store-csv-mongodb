const UserModel = require("../Model/UserModel")
const csv = require("csv-parser")
const fs = require("fs")
const uploadFile = async (req, res) => {
    const file = req.files.csvFile;
    console.log(file)
    //Save File in Folder
    file.mv("./uploads/" + file.name, (err, result) => {
        if (err)
            res.send({ success: false, message: "Error in File Upload" })
        else {
            const fileData = []
            //Read Data from File
            fs.createReadStream("./uploads/" + file.name).pipe(csv({})).on('data', (data) => {
                fileData.push(data)
            }).on('end', () => {
                //Store in MongoDB 
                if (!fileData[0].Name || !fileData[0].Email || !fileData[0].Phone)
                    res.send({ success: false, message: "File Data not align with Fields we require" })
                else {
                    fileData.forEach(async (element) => {
                        const newUser = new UserModel({
                            Name: element.Name,
                            Email: element.Email,
                            Phone: element.Phone
                        });
                        await newUser.save();
                    });
                    res.send({ success: true, message: "File Uploaded Successfuly", data: fileData })
                }
            })
        }
    })
}

module.exports = {
    uploadFile
}