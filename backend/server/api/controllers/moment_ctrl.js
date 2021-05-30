let mongoose = require("mongoose");
let moment = mongoose.model("moment");
let Constant = require("../../config/constant");
let commonQuery = require("../lib/commonQuery");

module.exports = {
  addMoment: addMoment,
  editMoment: editMoment,
  getAllMoments: getAllMoments,
  getMomentById: getMomentById,
  deleteMoment: deleteMoment,
};

function addMoment(req, res) {
  async function addMoment() {
    try {
      if (req.body) {
        console.log("\n\n req files =", req.files);
        timeStamp = Date.now();
        let dir = "public/upload/moments/";
        orignalImageName = timeStamp + "_" + req.files.file.name;
        let imagePath = dir + orignalImageName;
        let buffer = req.files.file.data;
        let fileUploaded = await commonQuery.fileUpload(imagePath, buffer);
        if (fileUploaded) {
          let momentData = {
            title: req.body.title ? req.body.title : "",
            user_id: req.body.user_id ? req.body.user_id : "",
            imagePath:
              Constant.baseUrl.url + "/moment_image/" + orignalImageName,
            tags: req.body.tags ? JSON.parse(req.body.tags) : [],
          };
          let momentAdded = await commonQuery.InsertIntoCollection(
            moment,
            momentData
          );
          if (momentAdded) {
            res.json({
              code: Constant.statusCode.success,
              data: momentAdded,
              message: Constant.messages.moment_added,
            });
          } else {
            res.json({
              code: Constant.statusCode.error,
              data: {},
              message: Constant.messages.somethingWrong,
            });
          }
        } else {
          res.json({
            code: Constant.statusCode.error,
            data: {},
            message: Constant.messages.somethingWrong,
          });
        }
      }
    } catch (error) {
      console.log("error on addMoment main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  addMoment();
}

function getAllMoments(req, res) {
  async function getAllMoments() {
    try {
      let skip = req.query.page * req.query.limit;
      console.log("\nskip", skip, req.query.limit);
      let total_count = await commonQuery.countData(moment, {
        is_deleted: false,
      });
      let momentData = await commonQuery.findAllWithPopulateSkipLimitSort(
        moment,
        { is_deleted: false, user_id: req.query.user_id },
        "",
        "",
        skip,
        parseInt(req.query.limit),
        { createdAt: -1 }
      );
      if (momentData) {
        res.json({
          code: Constant.statusCode.success,
          data: momentData,
          total_count: total_count,
          message: Constant.messages.success,
        });
      } else {
        res.json({
          code: Constant.statusCode.error,
          data: {},
          message: Constant.messages.somethingWrong,
        });
      }
    } catch (error) {
      console.log("error on getAllMoments main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  getAllMoments();
}

function getMomentById(req, res) {
  async function getMomentById() {
    try {
      if (req.query.moment_id) {
        let momentData = await commonQuery.findById(moment, {
          _id: req.query.moment_id,
          is_deleted: false,
        });
        if (momentData) {
          res.json({
            code: Constant.statusCode.success,
            data: momentData,
            message: Constant.messages.success,
          });
        } else {
          res.json({
            code: Constant.statusCode.error,
            data: {},
            message: Constant.messages.somethingWrong,
          });
        }
      }
    } catch (error) {
      console.log("error on getMomentById main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  getMomentById();
}

function editMoment(req, res) {
  async function editMoment() {
    try {
      if (req.body) {
        let momentData = {};
        if (req.files.file) {
          timeStamp = Date.now();
          let dir = "public/upload/moments/";
          orignalImageName = timeStamp + "_" + req.files.file.name;
          let imagePath = dir + orignalImageName;
          let buffer = req.files.file.data;
          let fileUploaded = await commonQuery.fileUpload(imagePath, buffer);
          if (fileUploaded) {
            momentData = {
              title: req.body.title ? req.body.title : "",
              user_id: req.body.user_id ? req.body.user_id : "",
              imagePath:
                Constant.baseUrl.url + "/moment_image/" + orignalImageName,
              tags: req.body.tags ? JSON.parse(req.body.tags) : [],
            };
          } else {
            res.json({
              code: Constant.statusCode.error,
              data: {},
              message: Constant.messages.somethingWrong,
            });
          }
        } else {
          momentData = {
            title: req.body.title ? req.body.title : "",
            user_id: req.body.user_id ? req.body.user_id : "",
            tags: req.body.tags ? JSON.parse(req.body.tags) : [],
          };
        }
        let momentEdited = await commonQuery.updateOneDocument(
          moment,
          { _id: req.body.moment_id, is_deleted: false },
          momentData
        );
        if (momentEdited) {
          res.json({
            code: Constant.statusCode.success,
            data: momentEdited,
            message: Constant.messages.moment_updated,
          });
        } else {
          res.json({
            code: Constant.statusCode.error,
            data: {},
            message: Constant.messages.somethingWrong,
          });
        }
      }
    } catch (error) {
      console.log("error on editMoment main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  editMoment();
}

function deleteMoment(req, res) {
  async function deleteMoment() {
    try {
      if (req.query.moment_id) {
        let momentDeleted = await commonQuery.updateOneDocument(
          moment,
          { _id: req.query.moment_id, is_deleted: false },
          { is_deleted: true }
        );
        if (momentDeleted) {
          res.json({
            code: Constant.statusCode.success,
            data: momentDeleted,
            message: Constant.messages.moment_deleted,
          });
        } else {
          res.json({
            code: Constant.statusCode.error,
            data: {},
            message: Constant.messages.somethingWrong,
          });
        }
      }
    } catch (error) {
      console.log("error on deleteMoment main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  deleteMoment();
}
