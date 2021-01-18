const {con} = require("./DBConnect")

const removeData = async (data) => {
    // Error handler
    const ErrorHandler = (err) => {
        console.log(err.errno)
        return(`Seems like we have an error. Developer information ${err.errno}`)
    }

    let query = `DELETE FROM Test WHERE id = ${data}`

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
    await AddReq(data).then(data => Data=data);
    return Data
}

module.exports = {
    removeData
}
