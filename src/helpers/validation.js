const mongoose = require('mongoose')

const isValidRequest = function (object) {
    return Object.keys(object).length > 0;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidEmail = function (email) {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

const isValidString = function (string) {
    if (typeof value == 'string' && value.trim().length === 0) return false;
    return true;
}

const isValidSpace = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidName = function (name) {
    return /^([A-Za-z]+)$/.test(name)
}

const isValidtypeName = function (product) {
    return /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(product)
}

const isValidImg = (img) => {
    return /image\/png|image\/jpeg|image\/jpg/.test(img)
}

module.exports = { isValidRequest, isValidObjectId, isValidString, isValidSpace, isValidName, isValidtypeName, isValidImg,isValidEmail }
