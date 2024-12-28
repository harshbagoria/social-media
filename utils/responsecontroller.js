const sucess =(statuscode , result) =>{
    return {
        status :'ok',
        statuscode ,
        result 
    }
}
const error = (statuscode , message) => {
    return {
        status : 'error',
        statuscode,
        message
    }
}

module.exports = {
    sucess ,
    error
}
