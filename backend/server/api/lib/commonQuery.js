'use strict';

var constant = require('../../config/constant');
var crypto = require('crypto'),
    algorithm = constant.config.cryptoAlgorithm,
    password = constant.config.cryptoPassword;
var fs = require("fs");
var path = require('path');
var commonQuery = {};

commonQuery.makeRandomString = function makeRandomString(length) {
    return new Promise(function (resolve, reject) {
        try {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            resolve(text);
        } catch (e) {
            reject(e);
        }
    })
}

commonQuery.encrypt = function encrypt(encText) {
    return new Promise(function (resolve, reject) {
        try {
            var cipher = crypto.createCipher(algorithm, password)
            encText = cipher.update(encText, 'utf8', 'hex')
            encText += cipher.final('hex');
            resolve(encText);
        } catch (e) {
            reject(e);
        }
    })
}

commonQuery.decrypt = function decrypt(decText) {
    return new Promise(function (resolve, reject) {
        try {
            var decipher = crypto.createDecipher(algorithm, password)
            decText = decipher.update(decText, 'hex', 'utf8')
            decText += decipher.final('utf8');
            resolve(decText);
        } catch (e) {
            reject(e);
        }
    })
}

commonQuery.decrypt1 = function decrypt1(decText) {
    var decipher = crypto.createDecipher(algorithm, password)
    decText = decipher.update(decText, 'hex', 'utf8')
    decText += decipher.final('utf8');
    return decText;
}

commonQuery.findoneData = function findoneData(model, cond, fetchVal) {
    return new Promise(function (resolve, reject) {
        model.findOne(cond, fetchVal, (err, userData) => {
            if (err) {
                console.log('err on findOne', err)
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findData = function findData(model, cond, fetchVal) {
    return new Promise(function (resolve, reject) {
        model.find(cond, fetchVal, function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findoneDataWithPopulate = function findoneDataWithPopulate(model, cond, fetchVal, populate) {
    return new Promise(function (resolve, reject) {
        try {
            model.findOne(cond, fetchVal).populate(populate).exec(function (err, userData) {
                if (err) {
                    console.log('error findOneWithPopulate', err)
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
        } catch (error) {
            console.log('error on findoneDataWithPopulate', error)
            reject(error);
        }
    })
}

commonQuery.findAllDataWithPopulate = function findAllDataWithPopulate(model, cond, fetchVal, populate) {
    return new Promise(function (resolve, reject) {
        model.find(cond, fetchVal).populate(populate).exec(function (err, userData) {
            if (err) {
                console.log('error findOneWithPopulate', err)
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findById = function findById(model, cond) {
    return new Promise(function (resolve, reject) {
        model.findById(cond, function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.updatedById = function updatedById(model) {
    return new Promise(function (resolve, reject) {
        model.save(function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.lastInsertedId = function lastInsertedId(model) {
    return new Promise(function (resolve, reject) {
        model.findOne().sort({
            id: -1
        }).exec(function (err, data) {
            if (err) {
                resolve(0);
            } else {
                if (data) {
                    var id = data.id + 1;
                } else {
                    var id = 1;
                }
            }
            resolve(id);
        });
    })
}

commonQuery.InsertIntoCollection = function InsertIntoCollection(model, obj) {
    // console.log("\n\n obj fsdfsdfsd",obj);
    
    return new Promise(function (resolve, reject) {
        new model(obj).save(function (err, userInfo) {
            if (err) {
                console.log('err on InsertIntoCollection', JSON.stringify(err));
                reject(err);
            } else {
                resolve(userInfo);
            }
        });
    })
}

commonQuery.fileUpload = function fileUpload(imagePath, buffer) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path.resolve(imagePath), buffer, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve('uploaded');
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

commonQuery.deleteFile = function deleteFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.unlink(filePath, function (err) {
            if (err) {
                reject(err);
            } else {
                console.log("Success fully Deleted ");
                resolve("success");
            }
        });
    })
}

commonQuery.updateOneDocument = function updateOneDocument(model, updateCond, userUpdateData) {
    return new Promise((resolve, reject) => {
        if (userUpdateData.user) {
            commonQuery.saveLogs(model, updateCond, userUpdateData);
        }
        model.findOneAndUpdate(updateCond, {
            $set: userUpdateData
        }, {
                new: true,
                multi:true,
                upsert: true
            })
            .lean().exec(function (err, userInfoData) {
                if (err) {
                    console.log('err', err);
                    resolve(0);
                } else {
                    resolve(userInfoData);
                }
            });
    })
}

commonQuery.updateAllDocument = function updateAllDocument(model, updateCond, userUpdateData) {
    return new Promise(function (resolve, reject) {
        model.update(updateCond, {
            $set: userUpdateData
        }, {
                multi: true
            })
            .lean().exec(function (err, userInfoData) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(userInfoData);
                }
            });
    })
}

commonQuery.fetch_all = function fetch_all(model, cond, fetchd) {
    return new Promise(function (resolve, reject) {
        model.find(cond, fetchd).exec(function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }

        });
    })
}

commonQuery.countData = function countData(model, cond) {
    return new Promise(function (resolve, reject) {
        model.count(cond).exec(function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }

        });
    })
}

commonQuery.fetchAllLimit = function fetchAllLimit(query) {
    return new Promise(function (resolve, reject) {
        query.exec(function (err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.deleteOneDocument = function deleteOneDocument(model, cond) {
    return new Promise(function (resolve, reject) {
        model.remove(cond).exec(function (err, userData) {
            if (err) {
                console.log(err);
                resolve(0);
            } else {
                resolve(1);
            }

        });
    })
}

commonQuery.InsertManyIntoCollection = function InsertManyIntoCollection(model, obj) {
    return new Promise(function (resolve, reject) {
        model.insertMany(obj, function (error, inserted) {
            if (error) {
                console.log('error on InsertManyIntoCollection', error)
                resolve(0);
            } else {
                resolve(1);
            }

        });
    })
}

commonQuery.deleteManyfromCollection = function deleteManyfromCollection(model, obj) {
    return new Promise(function (resolve, reject) {
        model.remove(obj, function (error, inserted) {
            if (error) {
                resolve(0);
            } else {
                resolve(1);
            }

        });
    })
}

commonQuery.UnsetRecordOnUpdate = function UnsetRecordOnUpdate(model, condition, data) {
    return new Promise((resolve, reject) => {
        try {
            model.update(condition, data, {
                new: true
            }).lean().exec((err, success) => {
                if (err) {
                    console.log('error on unsetting a record', err)
                    reject(err)
                }
                else {
                    resolve(success)
                }
            })

        } catch (error) {
            console.log('error on UnsetRecordOnUpdate main', error)
            reject(error);
        }
    })
}

commonQuery.findAllWithSorting = function findAllWithSorting(model, condition, fetchVal, sortKey) {
    return new Promise((resolve, reject) => {
        try {
            model.find(condition, fetchVal).sort(sortKey).lean().exec((err, result) => {
                if(err) {
                    console.log('err on fetching findAllWithSorting', err)
                    reject([]);
                }
                else {
                    console.log('result', result)
                    resolve(result);
                }
            })
        } catch (error) {
            console.log('error on findAllWithSorting', error)
            reject([]);
        }
    })
}

commonQuery.findOneAndPushIntoArray = function findOneAndPushIntoArray(model, condition, data) {
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(condition, data, {
            new: true
        }).lean().exec((err, success) => {
            console.log('successCommonquery', success)
            if(err) {
                console.log('error on findOneAndPushIntoArray', err)
                console.log('stringify error on findOneAndPushIntoArray', JSON.stringify(err))
                reject({});
            }
            else {
                console.log("hatim success",success);
                resolve(success);
            }
        })
    })
}

commonQuery.findOneAndAddToSetInArray = function findOneAndAddToSetInArray(model, condition, data) {
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(condition, data, {
            new: true
        }).lean().exec((err, success) => {
            console.log('success', success)
            if(err) {
                console.log('error on findOneAndAddToSetInArray', err)
                console.log('stringify error on findOneAndAddToSetInArray', JSON.stringify(err))
                reject({});
            }
            else if(success === null) {
                resolve({message: 'La farmacia ya se ha añadido a tu perfil'})
            }
            else {
                resolve(success);
            }
        })
    })
}

commonQuery.findOneAndPullElementFromArray = function findOneAndPullElementFromArray(model, condition, data) {
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate(condition, data, {
            new: true
        }).lean().exec((err, success) => {
            if(err) {
                console.log('error on findOneAndPullElementFromArray', err)
                reject({});
            }
            else {
                resolve(success);
            }
        })
    })
}

commonQuery.findDataWithLimit = function findDataWithLimit(model, cond, fetchVal, limit) {
    return new Promise(function (resolve, reject) {
        model.find(cond, fetchVal).limit(limit ? limit: 50).sort({_id : -1}).lean().exec((err, userData) => { 
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // console.log(userData)
                resolve(userData);
            }
        });
    })
}


commonQuery.UpdateManyIntoCollection = function UpdateManyIntoCollection(model, updateCond, userUpdateData) {
    return new Promise(function (resolve, reject) {
        model.update(updateCond, {
            $set: userUpdateData
        }, {
                multi: true,
                upsert: true,
                setDefaultsOnInsert: true
            })
            .lean().exec(function (err, userInfoData) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(userInfoData);
                }
            });
    })
}

commonQuery.findoneDataWithPopulateAndLimit = function findoneDataWithPopulateAndLimit(model, cond, fetchVal, populate) {
    return new Promise((resolve, reject) => {
        model.findOne(cond, fetchVal).populate(populate).exec(function (err, userData) {
            if (err) {
                console.log('error findOneWithPopulate', err)
                reject(err);
            } else {
                console.log("userdata",userData)
                resolve(userData);
            }
        });
    })
}

commonQuery.findAllDataWithPopulateAndLimit = function findoneDataWithPopulateAndLimit(model, cond, fetchVal, populate, limit) {
    return new Promise((resolve, reject) => {
        model.find(cond, fetchVal).populate(populate).limit(limit).exec(function (err, userData) {
            if (err) {
                console.log('error findAllDataWithPopulateAndLimit', err)
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findAllDataWithPopulateAndLimitAndSort = function findAllDataWithPopulateAndLimitAndSort(model, cond, fetchVal, populate, limit, sort) {
    return new Promise((resolve, reject) => {
        model.find(cond, fetchVal).populate(populate).limit(limit).sort(sort).exec(function (err, userData) {
            if (err) {
                console.log('error findAllDataWithPopulateAndLimit', err)
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findAllDataWithLimitAndSort = function findAllDataWithPopulateAndLimitAndSort(model, cond, fetchVal, limit, sort) {
    return new Promise((resolve, reject) => {
        model.find(cond, fetchVal).limit(limit).sort(sort).exec(function (err, userData) {
            if (err) {
                console.log('error findAllDataWithPopulateAndLimit', err)
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.updateAllDocumentOrCreateNew = function updateAllDocumentOrCreateNew(model, updateCond, userUpdateData) {
    return new Promise(function (resolve, reject) {
        model.update(updateCond, {
            $set: userUpdateData
        }, {
            multi: true,
            upsert:true
        })
        .lean().exec(function (err, userInfoData) {
            if (err) {
                resolve(0);
            } else {
                resolve(userInfoData);
            }
        });
    })
}

commonQuery.findAllWithCountAndPopulateWithLimitAndSort = function findAllWithCountAndPopulateWithLimitAndSort(model, cond, fetchVal, populateId, limit, sortKey) {
    return new Promise(function (resolve, reject) {
        model.find(cond, fetchVal).populate(populateId).limit(limit).sort(sortKey).exec((err, userData) => {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    })
}

commonQuery.findAllWithPopulateSkipLimitSort = function findAllWithPopulateSkipLimitSort
    (
        model, condition, fetchVal, populateItem, skip, limit, sortKey
    ) 
{
    return new Promise((resolve, reject) => {
        try {
            model.find(condition, fetchVal).populate(populateItem).skip(skip).limit(limit).sort(sortKey).exec((err, data) => {
                if(err) {
                    console.log('err on findAllWithPopulateSkipLimitSort query', err)
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        } catch (error) {
            console.log('error on findAllWithPopulateSkipLimitSort main', error)
            reject(error)
        }
    })
}

commonQuery.countAll = function countAll(model, cond) {
    return new Promise((resolve, reject) => {
        model.count(cond).exec((err, count) => {
            if(err) {
                console.log('error on counting the data', err)
                reject(err);
            } else {
                resolve(count);
            }
        })
    })
}

commonQuery.findOneWithSort = function findOneWithSort(model, cond, sort) {
    return new Promise((resolve, reject) => {
        model.findOne(cond).sort(sort).exec((err, data) => {
            if(err) {
                console.log('error on counting the data', err)
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

commonQuery.incAndAddToSet = function incAndAddToSet(model, cond, dataSet) {
    return new Promise((resolve, reject) => {
        try {
            model.findOneAndUpdate(cond, dataSet, { new: true }).lean()
            .exec((err, success) => {
                if(err) {
                    console.log('err on incAndAddToSet main', err)
                    reject(err)
                } else {
                    resolve(success);
                }
            })
        } catch (error) {
            console.log('error on incAndAddToSet main', error)
            reject(error);
        }
    })
}

module.exports = commonQuery;