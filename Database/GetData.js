const {con} = require("./DBConnect")

const getData = async (data) => {
    // Error handler
    const ErrorHandler = (errno) => {
        if(errno.errno === 1054){
            return (`Seems like you are trying to access data by sending wrong type of data. Error code: ${err.errno}`);
        }
        return(`Seems like we have an unknown error.`)
    }

    // Get request from database
    const GetReq = async (data, dataType) => {
        if(data === "all"){
            let query = `SELECT * FROM Test`
            return new Promise((resolve, reject) => {
                con.query(query, (err, results) => {
                    if (err){
                        return reject(err.sqlMessage);
                    }else{
                        resolve(results);
                    }
                });
            }).catch((err) => ErrorHandler(err));
        } else {
            let query = `SELECT * FROM Test WHERE ${dataType} = '${data}'`
            return new Promise((resolve, reject) => {
                con.query(query, (err, results) => {
                    if (err){
                        return reject(err.sqlMessage);
                    }else{
                        resolve(results);
                    }
                });
            }).catch((err) => ErrorHandler(err));
        }
    }

    if(data === undefined){
        let Data;
        await GetReq("all", "id").then(data => Data=data);
        return Data
    } else {
        let Data;
        await GetReq(data, "id").then(data => Data=data);
        return Data
    }

}

module.exports = {
    getData
}
