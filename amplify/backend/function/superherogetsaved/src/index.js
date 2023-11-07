const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  console.log(`Event received: ${JSON.stringify(event)}`);

  const userId = Number(event.arguments.userId);
  console.log(`userId = ${userId}`);
  const scanCommand = new ScanCommand({
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    ProjectionExpression: "id, #name, image, powerstats, userId",
    ExpressionAttributeNames: { "#name": "name" },
    TableName: "superherodb-dev",
  });

  const response = await docClient.send(scanCommand);
  console.log(`scan response: ${JSON.stringify(response)}`);
  return response.Items;
};
