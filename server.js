const app = require('./app.js');
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/comp1537'); //this is local database
    await mongoose.connect('mongodb+srv://comp1537:mD6gk2iCuwB2lrwM@cluster0.ozsghtt.mongodb.net/unicorns?retryWrites=true&w=majority');
}


app.listen(3000, () => {
    console.log("Server running on port 3000")
})