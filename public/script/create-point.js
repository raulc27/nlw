function populateUFs(){
    const ufSelect = document
    .querySelector("select[name=uf]")
    
  

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML+=`<option value="${state.id}">${state.nome}</option>`

        }


    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState=event.target.selectedIndex;

    stateInput.value=event.target.options[indexOfSelectedState].text;


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option>Selecione a cidade</option>"
    citySelect.disabled=true;

    fetch(url)
    .then((res)=>{return res.json()})
    .then(cities => {
        
        

        for(const city of cities){
           citySelect.innerHTML+=`<option value="${city.id}">${city.nome}</option>`

        }

            citySelect.disabled=false;

    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

    
    
//items de coleta
// pegar todos os LI's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems =  document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi=event.target;
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;


    //verificar se existe itens selecionados, se sim
// pegar os itens selecionados

const allreadySelected = selectedItems.findIndex(function(item){
    const itemFound = item == itemId
    return itemFound
})

//se já estiver selecionado, tirar da seleção
if(allreadySelected >= 0 ){
    //tirar da seleção
    const filteredItems = selectedItems.filter(item=>{
        const itemIsDifferent = item != itemId //return false
        return itemIsDifferent
    })
    selectedItems = filteredItems
    console.log(selectedItems)
}else{

//se não estiver selecionado, adicionar à seleção

    selectedItems.push(itemId)


}

//atualizar o campo escondido com os itens selecionados
collectedItems.value = selectedItems;
}
