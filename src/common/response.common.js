
function successResponse(data, code, message) {
    return {
        data: data,
        status: {
            code: code,
            success: true,
            message: message
        }
    }
}


function faildResponse(code, message) {
    return {
        status: {
            code: code,
            success: false,
            message: message
        }
    }
}

module.exports = {
    successResponse,
    faildResponse
}