exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const baseURL = "https://superheroapi.com/api/122136422408017955/search";
  console.log(`finding super heros by name: ${event.arguments.name}`);

  try {
    const response = await fetch(`${baseURL}/${event.arguments.name}`);
    const body = await response.json();
    console.log(`found super heros: ${JSON.stringify(body.results)}`);
    const superHeros = body.results.map(r => {
      const { powerstats } = { ...r };
      return {
        ...r,
        powerstats: {
          intelligence: nullOr(powerstats.intelligence, "0"),
          strength: nullOr(powerstats.strength, "0"),
          speed: nullOr(powerstats.speed, "0"),
          durability: nullOr(powerstats.durability, "0"),
          power: nullOr(powerstats.power, "0"),
          combat: nullOr(powerstats.combat, "0"),
        },
      };
    });
    return superHeros;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: "error occurred while fetching super hero by name",
    };
  }
};

const nullOr = (value, defaultValue) => {
  return value !== "null" ? value : defaultValue;
};
