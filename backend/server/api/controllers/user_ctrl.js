let mongoose = require("mongoose");
let User = mongoose.model("User");
let Constant = require("../../config/constant");
let commonQuery = require("../lib/commonQuery");
var jwt = require("jsonwebtoken");

module.exports = {
  signup: signup,
  login: login,
  getUser: getUser,
};

function signup(req, res) {
  async function signup() {
    try {
      if (req.body) {
        let userData = {
          first_name: req.body.first_name ? req.body.first_name : "",
          last_name: req.body.last_name ? req.body.last_name : "",
          email: req.body.email ? req.body.email : "",
          password: req.body.password ? req.body.password : "",
          mobile_no: req.body.mobile_no ? req.body.mobile_no : "",
          city: req.body.city ? req.body.city : "",
        };
        let userAdded = await commonQuery.InsertIntoCollection(User, userData);
        if (userAdded) {
          res.json({
            code: Constant.statusCode.success,
            data: userAdded,
            message: Constant.messages.user_added,
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
      console.log("error on signup main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  signup();
}

function login(req, res) {
  async function login() {
    try {
      if (req.body) {
        let findUser = {
          email: req.body.email,
          is_deleted: false,
        };
        let userFound = await commonQuery.findoneData(User, findUser);
        if (userFound) {
          userFound.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              const payload = { id: userFound._id };
              const options = { expiresIn: "8h" };
              const secret = "5dmoment";
              const token = jwt.sign(payload, secret, options);
              delete userFound["password"];
              res.json({
                code: Constant.statusCode.success,
                data: userFound,
                token: "Bearer" + " " + token,
                message: Constant.messages.success,
              });
            } else {
              res.json({
                code: Constant.statusCode.incorrect_pass,
                data: {},
                message: Constant.messages.incorrectPassword,
              });
            }
          });
        } else {
          res.json({
            code: Constant.statusCode.notFound,
            data: {},
            message: Constant.messages.userNotFound,
          });
        }
      }
    } catch (error) {
      console.log("error on login main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  login();
}

function getUser(req, res) {
  async function getUser() {
    try {
      console.log("\n req.swagger.params.user_id.value", req.query.user_id);
      //   if (req.swagger.params.user_id.value) {
      if (req.query.user_id) {
        let userData = await commonQuery.findoneData(User, {
          _id: req.query.user_id,
          is_deleted: false,
        });
        if (userData) {
          res.json({
            code: Constant.statusCode.success,
            data: userData,
            message: Constant.messages.success,
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
    } catch (error) {
      console.log("error on getUser main", error);
      res.json({
        code: Constant.statusCode.error,
        data: {},
        message: Constant.messages.somethingWrong,
      });
    }
  }
  getUser();
}
