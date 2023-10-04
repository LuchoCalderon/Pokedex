const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 151; i++) {
    fetch(url + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    document.querySelector("#resultado").innerHTML=""

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    {

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon" >
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["dream_world"].front_default}"  alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h5 class="pokemon-nombre">${poke.name}</h5>
            </div>
            <div class="pokemon-tipos">
                ${tipos}            
            </div>
        </div>
                 
    </div>`;

    
    
    
    div.addEventListener("click",function(evt){
        console.log(evt.currentTarget)
        alert("Peso"+ " " +poke.weight + "   " +
        "Habilidad"+ " " +poke.abilities[0].ability.name
        );
    })

    document.querySelector("#resultado").appendChild(div);
    
    listaPokemon.append(div);
    }

    
    

    


}




botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))

const busqueda = async() => {
    let pokemon = document.getElementById("pokemon").value
    const response = await fetch(`${url}${pokemon}`);
    const result = await response.json();
    console.log(result.pokes)
    console.log(result)
    await dibujar(result);
    /*buscar("Bulbasaur", result)
    console.log(    buscar("Bulbasaur", result)
    )*/

    
}

const dibujar = (pokes) => {
    document.querySelector("#resultado").innerHTML=""

    let tipos = pokes.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = pokes.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    //for(let i in pokes)
    { //while(i<drinks.length)

        let div = document.createElement("div");
        div.classList.add("column","is-3");
        div.setAttribute("data-id",pokes.id)
        div.innerHTML+=`
        <div class="pokemon" >
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${pokes.sprites.other.dream_world.front_default}"  alt="${pokes.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h5 class="pokemon-nombre">${pokes.name}</h5>
                </div>
                <div class="pokemon-tipos">
                    ${tipos} 
                </div>
            </div>
                     
        </div>`
        
    
        div.addEventListener("click",function(evt){
            console.log(evt.currentTarget)
            alert("Peso"+ " " +pokes.weight + "   " +
            "Habilidad"+ " " +pokes.abilities[0].ability.name
            );
        })

        document.querySelector("#resultado").appendChild(div);

    
    }
}

/*function buscar(nombre, pokemones){
    let resultado = pokemones.filter(function(pokemon){
        console.log(pokemon.name)
        return pokemon.name == nombre
    })
    return resultado

}
*/

//let buscar = document.querySelector("#busqueda").value;

let boton = document.querySelector("#busqueda");
boton.addEventListener("click", busqueda);

let input = document.querySelector("#pokemon");
input.addEventListener("keypress",busqueda);

