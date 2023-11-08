const { handler } = require("./index.js"); // Import your Lambda function
const fetch = require("node-fetch");

jest.mock("node-fetch");

// // Mock the fetch function to return test data
// const mockFetch = jest.fn();
// fetch.mockImplementation(mockFetch);

describe("Lambda Function Tests", () => {
  it("should return an empty array when searchKey is empty", async () => {
    const event = {
      arguments: { name: "" }, // Empty searchKey
    };

    const result = await handler(event);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no super heroes match the search", async () => {
    const event = {
      arguments: { name: "nonexistenthero" }, // Search with no match
    };

    // Mock the fetch to return no results
    fetch.mockResolvedValue({ json: () => ({ results: null }) });

    const result = await handler(event);
    expect(result).toEqual([]);
  });

  it("should return super heroes with adjusted powerstats", async () => {
    const event = {
      arguments: { name: "superman" }, // Valid searchKey
    };

    // Mock the fetch to return test data with valid results
    mockFetch.mockResolvedValue({
      json: () => ({
        results: [
          {
            name: "Superman",
            powerstats: {
              intelligence: "null",
              strength: "100",
              speed: "null",
              durability: "80",
              power: "null",
              combat: "64",
            },
          },
        ],
      }),
    });

    const result = await handler(event);
    console.log(`result is ${result}`);
    expect(result).toEqual([
      {
        name: "Superman",
        powerstats: {
          intelligence: "0",
          strength: "100",
          speed: "0",
          durability: "80",
          power: "0",
          combat: "64",
        },
      },
    ]);
  });

  it("should handle fetch errors and return an empty array", async () => {
    const event = {
      arguments: { name: "superman" }, // Valid searchKey
    };

    // Mock the fetch to throw an error
    mockFetch.mockRejectedValue(new Error("Fetch Error"));

    const result = await handler(event);
    expect(result).toEqual([]);
  });
});
