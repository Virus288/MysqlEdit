const {con} = require("./DBConnect")

const addData = async (data) => {
    // Error handler
    const ErrorHandler = (err) => {
        console.log(err.errno)
        if(err.errno == "1062"){
            return(`Item that you are trying to register, already exists in database. If you are trying to edit that item, go to "edit items in stock"`)
        } else {
            return(`Seems like we have an error. Developer information ${err.errno}`)
        }
    }

    let query;

    if(data.database === "Test"){
        query = `INSERT INTO ${data.database} VALUES (null, '${data.code}', '${data.name}' )`
    } else {
        query = `INSERT INTO ${data.database} VALUES (null, '${data.code}', '${data.price}' )`
    }
    // Get request from database
    const AddReq = async () => {
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
    await AddReq().then(data => Data=data);
    return Data
}

module.exports = {
    addData
}
