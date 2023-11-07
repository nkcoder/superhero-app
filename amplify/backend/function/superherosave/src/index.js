import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const command = new PutCommand({
    TableName: "superherodb-dev",
    Item: {
      id: { N: "1" },
      name: { S: "A-Bomb" },
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};
