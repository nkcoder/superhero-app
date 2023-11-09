const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  const env = process.env.ENV;
  console.log(`Event received: ${JSON.stringify(event)}, env: ${env}`);

  const { username } = { ...event.arguments };
  const scanCommand = new ScanCommand({
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": username,
    },
    ProjectionExpression: "id, #name, image, powerstats, username",
    ExpressionAttributeNames: { "#name": "name" },
    TableName: `superherodb-${env}`,
  });

  try {
    const response = await docClient.send(scanCommand);
    console.log(`Get saved super heroes for: ${username}, response: ${JSON.stringify(response)}`);
    return response.Items;
  } catch (err) {
    console.error(`Error getting saved super heroes for ${username}`, err);
    return [];
  }
};
