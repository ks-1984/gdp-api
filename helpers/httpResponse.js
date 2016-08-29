module.exports = {
    resp404: resp404,
    resp401: resp401
}

function resp404(res, next, message){
    res.statusCode = 404;

    if(message != undefined){
        res.end(message);
    }
    else{
        res.end("Not Found");
    }

    next(res);
}

function resp401(res, next, message){
    res.statusCode = 401;

    if(message != undefined){
        res.end(message);
    }
    else{
        res.end("Unauthorized Access");
    }

    next(res);
}

function resp500(res, next, message){
    res.statusCode = 500;

    if(message != undefined){
        res.end(message);
    }
    else{
        res.end("System Error");
    }

    next(res);
}