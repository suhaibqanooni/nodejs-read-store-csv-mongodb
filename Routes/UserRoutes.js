const express = require('express')
const router = express.Router()

const controller = require('../Controller').userController;
const { validateFile } = require('../MiddleWare/Validator');


router.post("/upload", [validateFile], controller.uploadFile);

module.exports = router;