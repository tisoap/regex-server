/**
 * JS para manipulacao da arvore dhtmlxTree.
 * 
 * @author Tiso
 *
 */

/** ---- Variaveis Globais ---- **/

/**Objeto da arvore de visualizacao.**/
var tree;

/**Objeto JSON no formato String.**/
var json;

/**Array de inteiros com os IDs da arvore.**/
var treeItens

/**Inteiro com o ultimo ID da arvore.**/
var lastID;

/**Inteiro com o ID do elemento atualmente selecionado do arvore.**/
var currentSelected;

/** ----- Inicializacao ----- **/

//So executa a inicializacao quando a pagina estiver carregada
$(document).ready(function() {
	
	//TODO
	//Testa se foi recebida uma String JSON
	if(isFalse(jsonString)){
		//String JSON Padrao para testes
		jsonString = "{\"id\":0,\"item\":[{\"id\":1,\"text\":\"Caracteres: a\",\"child\":0,\"userdata\":[{\"name\":\"nivel\",\"content\":0},{\"name\":\"original\",\"content\":\"a\"},{\"name\":\"regra\",\"content\":\"CHARACTERS\"},{\"name\":\"terminal\",\"content\":true}]}]}";
	}
	
	//Conversao da string para objeto JSON
	json = jQuery.parseJSON(jsonString);
	
	//Inicializa um novo objeto de arvore
	//docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html#objectbasedinitialization
	tree = new dhtmlXTreeObject("regex-tree","100%","100%",0);
	
	//Desativa a opcao de clicar e arastar elementos da arvore. 
	//http://docs.dhtmlx.com/api__dhtmlxtree_enabledraganddrop.html
	tree.enableDragAndDrop(false, false);
	
	//Define o caminho com as imagens a serem usadas pela arvore
	//docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html#objectbasedinitialization
	tree.setImagePath("ferramentas/dhtmlxtree/imgs/dhxtree_web/");
	
	//Abilita a serializacao de dados adicionais
	//http://forum.dhtmlx.com/viewtopic.php?f=3&t=23155&p=74442&hilit=json+serialize#p74442
	tree._xuserData = true;
	
	//Carrega os dados do objeto JSON na arvore
	tree.loadJSONObject(json);
	
	//Recupera um array com todos os IDs de todos os itens dentro da raiz da arvore
	treeItens = tree.getAllSubItems(0);
	
	//Recupera o ultimo ID do array, convertendo-o para numero inteiro
	lastID = parseInt(treeItens[treeItens.length - 1]);
	
	//Seleciona o primeiro elemento
	//http://docs.dhtmlx.com/api__dhtmlxtree_selectitem.html
	tree.selectItem(1,false,false);
	currentSelected = tree.getSelectedItemId();
	
	//Expande a visualizacao da arvore a partir da raiz (id=0)
	tree.openAllItems(0);
	
});

/** ----- Funcoes Adcionar Nos ----- **/

/**
 * Insere 'Um ou mais' na arvore.
 */
function addOneOrMore(){
	
	//Recupera o elemento selecionado atual
	currentSelected = tree.getSelectedItemId();
	
	//Incrementa o contador de IDs
	lastID++;
	
	//Se o elemento selecionado for terminal
	if (isTerminal(currentSelected))
		//Adciona o novo no abaixo dele
		addNonTerminalNext(currentSelected, lastID, "Um ou mais:");
	
	else
		//Se nao, adciona como filho do elemento
		addNonTerminalChild(currentSelected, lastID, "Um ou mais:");
	
	//Adciona o nome da regra do elemento
	tree.setUserData(lastID,"regra","ONE_OR_MORE");
}

/**
 * Insere um texto qualquer digitado pelo usuario como 'caracteres'.
 */
function addCharacters(){
	
	var texto;
	
	//Continua exibindo o prompt ate que seja digitado um texto
	while (isFalse(texto))
		texto = prompt("Digite seu texto:");
	
	//Recupera o elemento selecionado atual
	currentSelected = tree.getSelectedItemId();
	
	//Incrementa o contador de IDs
	lastID++;
	
	//Se o elemento selecionado for terminal
	if (isTerminal(currentSelected))
		//Adciona o novo no abaixo dele
		addTerminalNext(currentSelected, lastID, "Caracteres: " + texto);
	else
		//Se nao, adciona como filho do elemento
		addTerminalChild(currentSelected, lastID, "Caracteres: " + texto);
	
	//Adciona o nome da regra do elemento
	tree.setUserData(lastID,"regra","CHARACTERS");
}

/**
 * Adciona um no nao terminal como filho do no atualmente selecionado.
 * 
 * @param label O texto do no.
 */
function addNonTerminalChild(parent, newID, label) {
	
	//Adciona como filho do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewchild.html
	tree.insertNewChild(parent,newID,label,0,0,0,0,"CHILD");
	
	//Marca o no como nao terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",false);
	
	//Adciona o nivel de profundidade do no
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));
}

/**
 * Adciona um no terminal como filho do no atualmente selecionado.
 * 
 * @param label O texto do no.
 */
function addTerminalChild(parent, newID, label) {
	
	//Adciona como filho do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewchild.html
	tree.insertNewChild(parent,newID,label,0,0,0,0);
	
	//Marca o no como terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",true);
	
	//Adciona o nivel de profundidade do no
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));
}


/**
 * Adciona um no nao terminal abaixo do no atualmente selecionado.
 * 
 * @param label O texto do no.
 */
function addNonTerminalNext(previous, newID, label) {
	
	//Adciona abaixo do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewnext.html
	tree.insertNewNext(previous,newID,label,0,0,0,0,"CHILD");
	
	//Marca o no como nao terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",false);
	
	//Adciona o nivel de profundidade do no
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));	
}


/**
 * Adciona um no terminal abaixo do no atualmente selecionado.
 * 
 * @param label O texto do no.
 */
function addTerminalNext(previous, newID, label) {
	
	//Adciona abaixo do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewnext.html
	tree.insertNewNext(previous,newID,label,0,0,0,0);
	
	//Marca o no como terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",true);
	
	//Adciona o nivel de profundidade do no
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));
}

/** ----- Funcoes Auxiliares ----- **/

/**
 * Verifica se o no e terminal.
 * 
 * @param nodeID O id do no.
 * @returns {boolean} Verdadeiro se for terminal.
 */
function isTerminal(nodeID){
	
	var terminal = tree.getUserData(nodeID,"terminal");
	
	return terminal;
	
}

/**
 * Retorna o nivel de profundidado do no.
 * 
 * @param nodeID O id do no
 * @returns {Number} O nivel de profundidade
 */
function getNodeLevel(nodeID){
	
	//Recupera o nivel de profundidade do no
	var level = tree.getLevel(nodeID);
	
	//Compensacao para que a profundidade da raiz inicie em zero
	level = level - 1;
	
	return level;
}

/**
 * Retorna verdadeiro se a variavel passada for:
 * 
 * - Do tipo 'undefined';
 * - Nula;
 * - Uma String vazia;
 * - Igual a zero;
 * - Do tipo NaN;
 * 
 * @param a A variavel a ser checada
 * @return Um valor booleano
 */
function isFalse(a) {
	
	//Se a variavel nao foi definida, retorna verdadeiro
	if(typeof a === 'undefined') return true;
	
	if ( a === null || a === "" || a === 0 || Number.isNaN(a) ) return true;
	
	return false;
}

/** ---- Submit ---- **/


/**
 * Serializa a arvore e envia para o servidor.
 */
function serializeAndSubmit(){
	
	//Recupera o campo oculto do formulario que vai receber a arvore serializada
	var input = document.getElementById("serializedInput");
	
	//Serializa a arvore para JSON, em formato String
	var serializedTree = tree.serializeTreeToJSON();
	
	//Define o valor do campo como o objeto JSON
	input.value = serializedTree;
	
	//Faz o submit do formulario
	document.getElementById('tree-form').submit();
}
