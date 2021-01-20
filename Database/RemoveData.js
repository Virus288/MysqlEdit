const {con} = require("./DBConnect")

const removeData = async (data, database) => {
    console.log(data, database)
    // Error handler
    const ErrorHandler = (err) => {
        console.log(err.errno)
        return(`Seems like we have an error. Developer information ${err.errno}`)
    }

    let query = `DELETE FROM ${database} WHERE id = ${data}`

    // Get request from database
    const AddReq = async (data) => {
        return new Promise((resolve, reject) => {
            con.query(query, (err, results) => {
                if (err){
                    return reject(err);
                }else{
                    resolve("Success");
                }
            });
        }).catch((err) => ErrorHandler(err));
    }

    let Data;
    await AddReq(data, database).then(data => Data=data);
    return Data
}

module.exports = {
    removeData
}
