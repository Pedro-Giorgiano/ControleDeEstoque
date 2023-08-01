const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']

    //procurando no array se o nome do elemento ja existe
    const existe = itens.find( elemento => elemento.nome === nome.value)



    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    if(existe){
        itemAtual.id = existe.id
        console.log(existe.id)
        //caso o nome seja encontrado, atualiza o elemento
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    }else{
        //caso n exista id passa a ser o tamanho do array dando sequencia a criacao do elem
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0
        //n encontrou cria o elemento
        criaElemento(itemAtual)

        itens.push(itemAtual)
    }



    localStorage.setItem("itens", JSON.stringify(itens))

    //limpando os campos dps de inserido
    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item){

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    //adicionando o id na tag strong
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao

}


function deletaElemento(tag,id) {
    tag.remove()

    console.log(id)

    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    console.log(itens)
    
    localStorage.setItem("itens", JSON.stringify(itens))

}