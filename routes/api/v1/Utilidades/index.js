const validId = (id) => {
    if (!(/^(\d+)|([\da-f]{24})$/.test(id))) {
        return false;
    }
    else {
        return true;
    }
}

const isEmpty = (value) => {
    if (/^\s*$/.test(value)) {
        return true;
    }
    else {
        return false;
    }
}


const validPassword = (password) => {
    if (!(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/.test(password))) {
        return false;
    }
    else {
        return true;
    }
}

const isEquals = (value, compare) => {
    if (value === compare) {
        return true;
    }
    else {
        return false;
    }
}

const mergeToArray = (element, index, array) => {
    console.log("a[" + index + "] = " + element);
}


module.exports = { validId, isEmpty, validPassword, isEquals,mergeToArray };