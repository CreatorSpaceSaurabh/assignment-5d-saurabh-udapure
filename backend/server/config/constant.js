"use strict";

const statusCode = {
  success: 200,
  notFound: 404,
  error: 401,
  warning: 404,
  failed: 1002,
  unauth: 402,
  internalError: 1004,
  failedConnection: 500,
  okList: 201,
  alreadyCreated: 208,
  badRequest: 400,
  passExpired: 532,
  samePass: 406,
  unVerified: 206,
  incorrect_pass: 403,
};

var validFileExt = {
  user_Image: ["jpeg", "jpg", "png", "gif", "JPG", "PNG", "GIF", "JPEG"],
  user_Video: ["wmv", "mov", "mp4", "ogg", "webm"],
  user_File: ["pdf", "xls", "xlxs", "txt", "ppt"],
  user_File_Image: [
    "jpeg",
    "jpg",
    "png",
    "gif",
    "pdf",
    "doc",
    "docx",
    "JPG",
    "PNG",
    "GIF",
    "JPEG",
  ],
};

const messages = {
  somethingWrong: "Something Went Wrong! Please Try Again After Sometime.",
  moment_added: "Moment Created.",
  moment_updated: "Moment Updated.",
  moment_deleted: "Moment Deleted.",
  user_added: "User Created.",
  user_updated: "User Data Updated.",
  success: "Success.",
  incorrectPassword: "Password is Incorrect.",
  userNotFound: "User not found.",
};

const imageSize = {
  size: 5242881,
};
const videoSize = {
  size: 50242881,
};
const fileSize = {
  size: 40242881,
};
const baseUrl = {
  url: "http://localhost:9596", // localhost
};

const expirationDuration = {
  expiry: 60 * 60 * 8 * 1,
  // "expiry": 15,
  mailTokenExpirationTime: 60 * 60 * 24 * 1,
};
const config = {
  cryptoAlgorithm: "aes-256-ctr",
  cryptoPassword: "d6F3Efeq",
};

var obj = {
  statusCode: statusCode,
  messages: messages,
  imageSize: imageSize,
  videoSize: videoSize,
  expirationDuration: expirationDuration,
  config: config,
  baseUrl: baseUrl,
  fileSize: fileSize,
  validFileExt: validFileExt,
};

module.exports = obj;
