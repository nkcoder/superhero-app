const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async event => {
  const env = process.env.ENV;
  console.log(`event received: ${JSON.stringify(event)}, env: ${env}`);

  const { username, updateSuperHeroReq } = { ...event.arguments };
  const { id } = { ...updateSuperHeroReq };
  const command = new PutCommand({
    TableName: `superherodb-${env}`,
    Item: {
      ...updateSuperHeroReq,
      id: Number(id),
      username: username,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(`Save super hero for: ${username}, response: ${JSON.stringify(response)}`);
    return true;
  } catch (err) {
    console.error(`Error saving super hero for: ${username}`, err);
    return false;
  }
};
