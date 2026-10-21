const mongoose = require("mongoose")


const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.error("failed connection to DB\n" + err)
    }
}
module.exports = DBconnect