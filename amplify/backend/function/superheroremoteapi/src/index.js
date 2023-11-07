exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const baseURL = "https://superheroapi.com/api/122136422408017955/search";
  const searchKey = event.arguments.name;
  console.log(`finding super heros by name: ${searchKey}`);

  try {
    const response = await fetch(`${baseURL}/${searchKey}`);
    const body = await response.json();
    console.log(`found super heros: ${JSON.stringify(body.results)}`);

    if (!body.results) {
      console.log(`no super heros match the search: ${searchKey}`);
      return [];
    }

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
    return [];
  }
};

const nullOr = (value, defaultValue) => {
  return value !== "null" ? value : defaultValue;
};
