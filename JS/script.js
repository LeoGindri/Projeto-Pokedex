const pokemonName   = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage  = document.querySelector('.pokemon_img');
const form          = document.querySelector('.form');
const inputSearch   = document.querySelector('.input_search');
const buttonPrev    = document.querySelector('.btn_prev')
const buttonNext    = document.querySelector('.btn_next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status === 200){
        const data        = await apiResponse.json();
        return data;
    };
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src= data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        searchPokemon = data.id
        inputSearch.vale = ""
    }else{
        pokemonName.innerHTML = "Nao existe.";
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
})


buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -=1
        renderPokemon(searchPokemon)
        };
});

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon)







