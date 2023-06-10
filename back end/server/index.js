require('dotenv').config();
const express = require('express');
const app = express();
const connection= require('./config/db')
const colors=require('colors')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema');
const port = process.env.PORT || 3001;



connection();
app.use( 
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development',
	})
);

app.listen(port, (err) => {
	if (err) {
		console.log('something is wrong');
	}

	console.log('server is running at port ' + port);
});
