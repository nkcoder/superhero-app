const { handler } = require("./index"); // Import your Lambda function
const AWS = require("aws-sdk-mock");

const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Lambda Tests: get saved super heroes", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should get saved super heros from DynamoDB", async () => {
    const event = {
      arguments: {
        username: "daniel",
      },
    };

    ddbMock.on(ScanCommand).resolves({
      Items: [
        {
          id: "1",
          name: "Bomb Queen",
          powerstats: {
            intelligence: "0",
            strength: "73",
            speed: "0",
            durability: "0",
            power: "0",
            combat: "0",
          },
        },
      ],
    });

    const response = await handler(event);
    expect(response).toEqual([
      {
        id: "1",
        name: "Bomb Queen",
        powerstats: {
          intelligence: "0",
          strength: "73",
          speed: "0",
          durability: "0",
          power: "0",
          combat: "0",
        },
      },
    ]);
  });

  it("should handle errors gracefully", async () => {
    ddbMock.on(ScanCommand).rejects(() => new Error("error"));
    const event = {
      arguments: {
        username: "daniel",
      },
    };

    const response = await handler(event);
    // Depending on your Lambda function's error handling, you can write assertions here
    expect(response).toEqual([]);
  });
});
