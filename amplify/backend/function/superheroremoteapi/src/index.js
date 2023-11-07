/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const baseURL = "https://superheroapi.com/api/122136422408017955/search";
  console.log(`finding super hero by name: ${event.name}`);

  try {
    const response = await fetch(`${baseURL}/${event.name}`);
    const body = await response.json();
    return {
      statusCode: response.status,
      data: body.results,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: "error occurred while fetching super hero by name",
    };
  }
};
