const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.getReviews = async (event) => {
  var params = {
    TableName: tableName,
  };
  console.log(tableName);
  try {
    let results = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: results,
    };
  } catch (err) {
    console.log("Error was captured");
    console.error(JSON.stringify(err));
    return err;
  }
};
