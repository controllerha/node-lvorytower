
function checkPassword(str) {
    var reg1 = /[!@#$%^&*()_?<>{}]{1}/;
    var reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,18}/;
    var reg3 = /[a-zA-Z]+/;
    var reg4 = /[0-9]+/;
    if (reg1.test(str) && reg2.test(str) && reg3.test(str) && reg4.test(str)) {
        if (str.length > 20) {
            return false;
        } else {
            return true;
        }
    } else if (!reg1.test(str)) {
        return false;
    } else if (!reg2.test(str)) {
        return false;
    } else if (!reg3.test(str)) {
        return false;
    } else if (!reg4.test(str)) {
        return false;
    }
}

function co_option(data_input_clear,myvalue) {
    var reg_email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    var reg_number = new RegExp("^[a-zA-Z0-9]{4,12}$");
    switch (data_input_clear) {
        case "1":
            if (!reg_number.test(myvalue) || myvalue.length > 20) {
                return {
                    err_code: 4,
                    message: '您的输入有误'
                }
            }
            break;
        case "2":
            if (!checkPassword(myvalue)) {
                return {
                    err_code: 4,
                    message: '您的输入有误'
                }
            }
            break;
        case "3":
            if (!reg_email.test(myvalue) || myvalue.length > 30) {
                return {
                    err_code: 4,
                    message: '您的输入有误'
                }
            }
            break;
    }
}


module.exports = co_option;