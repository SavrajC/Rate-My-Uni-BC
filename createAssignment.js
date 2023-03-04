const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.createAssignment = async (event) => {
  console.log(event);
  event = JSON.parse(event.body);
  let reviewId = AWS.util.uuid.v4();
  let review = event.review;
  let uniId = event.uniId;
  let timeCreated = Date.now();
  console.log(uniId);
  console.log(review);
  var params = {
    TableName: tableName,
    Item: {
      reviewId: reviewId,
      uniId: uniId,
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
