const {con} = require("./DBConnect")

const InnerJoin = async () => {
    // Error handler
    const ErrorHandler = (errno) => {
        if(errno.errno === 1054){
            return (`Seems like you are trying to access data by sending wrong type of data. Error code: ${err.errno}`);
        }
        return(`Seems like we have an unknown error.`)
    }

    let query = `SELECT Test.code, Test.name, Test2.code, Test2.price FROM Test INNER JOIN Test2 ON Test.code = Test2.code`

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

module.exports = {
    InnerJoin
}
