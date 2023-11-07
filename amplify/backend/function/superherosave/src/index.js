// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  console.log(`event received: ${JSON.stringify(event)}`);

  const { userId, updateSuperHeroReq } = { ...event.arguments };
  const { id, image, name, powerstats } = { ...updateSuperHeroReq };
  const command = new PutCommand({
    TableName: "superherodb-dev",
    Item: {
      id: Number(id),
      name: name,
      powerstats: powerstats,
      image: image,
      userId: userId,
    },
  });

  const response = await docClient.send(command);
  console.log(`put item response: ${response}`);
  return id;
};
