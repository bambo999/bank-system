const mongoose = require("mongoose");


const dbConfigConnection = async() => {

	try {

		await mongoose.connect(process.env.MONGODB_CONNECTION, {
			   useNewUrlParser: true,
            useUnifiedTopology: true,
		});

		console.log('Database connected');


	} catch (error) {
		console.log(error);
		throw new Error('Error Connecting to Database');
	}

}

module.exports = dbConfigConnection;