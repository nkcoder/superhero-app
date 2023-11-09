const { handler } = require("./index"); // Import your Lambda function

const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Lambda Tests: update and super here", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should update a superhero in DynamoDB", async () => {
    const event = {
      arguments: {
        username: "daniel",
        updateSuperHeroReq: {
          id: "456",
          image: "superman.jpg",
          name: "Superman",
          powerstats: {
            intelligence: 100,
            strength: 100,
            speed: 100,
            durability: 100,
            power: 100,
            combat: 100,
          },
        },
      },
    };

    ddbMock.on(PutCommand).resolves(1);

    const response = await handler(event);
    expect(response).toEqual(true);
  });

  it("should handle errors gracefully", async () => {
    ddbMock.on(PutCommand).rejects(() => new Error("error"));
    const event = {
      arguments: {
        username: "daniel",
        updateSuperHeroReq: {
          id: "456",
          image: "superman.jpg",
          name: "Superman",
          powerstats: {
            intelligence: 100,
            strength: 100,
            speed: 100,
            durability: 100,
            power: 100,
            combat: 100,
          },
        },
      },
    };

    const response = await handler(event);
    expect(response).toEqual(false);
  });
});
