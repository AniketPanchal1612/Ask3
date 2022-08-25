//Error Handler Class
//Error is parent class of errorhandler
class ErrorHandler extends Error{
     constructor(message,statusCode){
        super(message) //parent class constructor
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)  //create .stack property

     }
}

module.exports = ErrorHandler