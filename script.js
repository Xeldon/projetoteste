// 1 temos que referenciar o input, pois é onde o usuario informa o texto
//vamos fazer isso buscando o nome tarefa que colocamos lá pra rficar facil de referenciar ele

let inputamento = document.querySelector("input[name=tarefa]");



// 2 referenciar o button para colocar um evento

let botaomento = document.querySelector("#botao") //pegando pelo id usa o #


// 3 referenciar a lista para que possa adicionar as tarefas

let listamento = document.querySelector("#lista");

// <li class="list-group-item list-group-item-action">Estudar</li>
//como era a lista

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


let renderizarTarefas = () => { //usar um loop legal de utilizar para quando temos listas
    //precisamos limpar a listagem de itens antes de adicionar o novo, ou repete tudo o array + o item novo
    listamento.innerHTML = '';

    for (tarefa of tarefas) {
        //criar o item da lista
        let itemLista = document.createElement('li'); //ver linha 17

        //adicionar classes no item da lista
        itemLista.setAttribute('class','list-group-item list-group-item-action')

        //preciso adicionar evento para excluir os itens da lista quando clicados
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        //criar um texto node que vai ser filho da lista
        let itemTexto = document.createTextNode(tarefa)

        //adicionar um filho , adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //adicionar o item da lista na lista
        listamento.appendChild(itemLista); //ver linha 15
    }
}

renderizarTarefas();

botaomento.onclick = () => {

    let recuperarInput = inputamento.value //ja recuperei o input la em cima, agora é só buscar

    if(recuperarInput !== ''){
        tarefas.push(recuperarInput); //adiciona na lista

    renderizarTarefas() // executa a funçao pra renderizar a tarefa

    salvarDadosNoStorage();

    inputamento.value = "" // pra esvaziar o input dps de preencher
    } else {
        alert("Erro! Mensagem vazia!")
    }

}

document.addEventListener('keydown', function(e) {
    if(e.key == "Enter"){
      botaomento.click();
    }
});

let deletarTarefa = (tar) => {
    // queremos remover a tarefa do array, assim quando for renderizar a tela com a funcao, ela nao estara mais no array, ver linha 39
    tarefas.splice(tarefas.indexOf(tar.textContent), 1); // o indexof retorna o indice do tar.textcontent, indicando assim qual item eu quero deletar

    //renderiza novamente a tela pra sumir o removido
    renderizarTarefas();

    //salvar os novos dados no banco de dados
    salvarDadosNoStorage();
}

let salvarDadosNoStorage = () => {
    //todo navegador possui capacidade de salvar dados no storage, mas nao posso passar meu array tarefas por ex, tem que ser valores nuemricos, string boolean
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //primeiro é a key, depois o valor em si
    //agora precisamos salvar sempre que for alterado, ou seja, excluido ou adicionado um novo valor (ver linha 66 e 81)
}

// let btn = document.querySelector("button.btn");

// btn.onclick = () => { // criar e adicionar paragrafo como filho da div

//     //declara a variavel de texto que sera adicionada ao paragrafo
//     let textinho = '';

//     // recupera o valor do imput
//     let recuperaInput = document.querySelector("input").value;

//     let paragrafo = document.createElement('p') // cria um paragrafo <p></p>

//     paragrafo.setAttribute('class', 'classeppp'); //colocando o atributo class de nome classeppp, funciona sem isso

//     //fazer verificacao pra saber se o usuario preencheu o input ou nao

//     if(recuperaInput !== ''){
//         textinho = document.createTextNode(recuperaInput);
//     }else{
//         textinho = document.createTextNode("Vazio");
//     }

//     paragrafo.appendChild(textinho); //colocar como filho

//     //agora onde eu quero inserir o paragrafo?

//     let divv = document.querySelector('#app'); //# para indicar que é o div com id app

//     divv.appendChild(paragrafo); // adiciona o paragrafo como filho da div

//     document.querySelector('input').value = ""; // para limpar o input apos usar o botao


// }
