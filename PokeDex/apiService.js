export const fetchPokemonsList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=964');
    const data = await response.json();
    return data;
}

export const fetchPokemonsDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// export const fetchPokemonsDetails = async (url, signal) => {
//     const response = await fetch(url, { method: "get", signal });
//     const data = await response.json();
//     return data;
// };

