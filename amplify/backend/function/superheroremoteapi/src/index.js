exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const baseURL = "https://superheroapi.com/api/122136422408017955/search";
  console.log(`finding super heros by name: ${event.arguments.name}`);

  try {
    const response = await fetch(`${baseURL}/${event.arguments.name}`);
    const body = await response.json();
    console.log(`found super heros: ${body.results}`);
    return body.results;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: "error occurred while fetching super hero by name",
    };
  }
};
