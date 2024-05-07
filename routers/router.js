const express = require("express");
const router = require("express").Router();
const idcodeController = require("../controller/idcode_controller");

router.post("/idcode", idcodeController.idcode);

module.exports = router;