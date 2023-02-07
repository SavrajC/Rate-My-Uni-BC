const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.createAssignment = async (event) => {
  console.log(event);
  let reviewId = AWS.util.uuid.v4();
  let review = event.review;
  let timeCreated = Date.now();
  var params = {
    TableName: tableName,
    Item: {
      reviewId: reviewId,
      review: review,
      timeCreated: timeCreated,
    },
  };
  const result = await dynamoDb.put(params).promise();
  console.log(review);
  console.log(reviewId);
  console.log(timeCreated);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Succesful Review Created",
        input: event,
        result: result,
      },
      null,
      2
    ),
  };
};
