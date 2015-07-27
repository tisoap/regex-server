/**
 * JS para manipulacao da arvore dhtmlxTree.
 * 
 * @author Tiso
 *
 */

/** ---- Variaveis Globais ---- **/

/** Objeto da arvore de visualizacao.**/
var tree;

/** Objeto JSON no formato String.**/
var json;

/** Array de inteiros com os IDs da arvore.**/
var treeItens;

/** Inteiro com o ID do ultimo elemento adcionado na arvore.
 *  Funcoes que adicionam elementos sempre incrementam esta
 *  variavel. */
var lastID;

/** Inteiro com o ID do elemento atualmente selecionado do arvore.**/
var currentSelected;

/** ----- Inicializacao ----- **/

//So executa a inicializacao quando a pagina estiver carregada
$(document).ready(function(){
	
	//TODO Remover teste
	//Testa se foi recebida uma String JSON
	if(isNotValid(jsonString)){
		//String JSON Padrao para testes
		//jsonString = "{\"id\":0,\"item\":[{\"id\":1,\"text\":\"Caracteres: a\",\"child\":0,\"userdata\":[{\"name\":\"nivel\",\"content\":0},{\"name\":\"original\",\"content\":\"a\"},{\"name\":\"regra\",\"content\":\"CHARACTERS\"},{\"name\":\"terminal\",\"content\":true},{\"name\":\"texto\",\"content\":\"a\"}]}]}";
		jsonString = "{\"id\":\"0\", \"item\":[{ \"id\":\"1\", \"text\":\"Caracteres: a\", \"userdata\":[{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"original\" , \"content\":\"a\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"texto\" , \"content\":\"a\" }]}\n,{ \"id\":\"12\", \"open\":\"1\", \"select\":\"1\", \"text\":\"Um ou mais:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"ONE_OR_MORE\" }], \"item\":[{ \"id\":\"13\", \"text\":\"Caracteres: bla\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"bla\" }]}\n]\n}\n,{ \"id\":\"10\", \"open\":\"1\", \"text\":\"Zero ou mais:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"ZERO_OR_MORE\" }], \"item\":[{ \"id\":\"11\", \"text\":\"Caracteres: nothing\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"nothing\" }]}\n]\n}\n,{ \"id\":\"8\", \"open\":\"1\", \"text\":\"Pelo menos 9 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"AT_LEAST\" },{ \"name\":\"numero1\" , \"content\":\"9\" }], \"item\":[{ \"id\":\"9\", \"text\":\"Caracteres: sdhaksfdh\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"sdhaksfdh\" }]}\n]\n}\n,{ \"id\":\"6\", \"open\":\"1\", \"text\":\"Entre 5 e 9 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"BETWEEN\" },{ \"name\":\"numero1\" , \"content\":\"5\" },{ \"name\":\"numero2\" , \"content\":\"9\" }], \"item\":[{ \"id\":\"7\", \"text\":\"Caracteres: teste\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"teste\" }]}\n]\n}\n,{ \"id\":\"2\", \"open\":\"1\", \"text\":\"Pode ou nao ter:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"CONDITIONAL\" }], \"item\":[{ \"id\":\"3\", \"text\":\"Caracteres: b\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"b\" }]}\n,{ \"id\":\"4\", \"open\":\"1\", \"text\":\"Exatamente 5 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"EXACT\" },{ \"name\":\"numero1\" , \"content\":\"5\" }], \"item\":[{ \"id\":\"5\", \"text\":\"Caracteres: c\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"2\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"c\" }]}\n]\n}\n]\n}\n]}";
	};
	
	//Conversao da string para um objeto JSON
	json = jQuery.parseJSON(jsonString);
	
	//Inicializa um novo objeto da arvore
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
	
	//Recupera uma String com todos os IDs de todos os itens dentro da raiz da arvore
	//separados por virgula
	stringTreeItens = tree.getAllSubItems(0);
	
	//Cria um array de IDs a partir de uma string, usando virgula
	//como separador de elementos
	treeItens = stringTreeItens.split(",");
	
	//Converte todos os itens do array de Strings para inteiros
	for (var i=0; i<treeItens.length; i++){
		treeItens[i] = parseInt(treeItens[i]);
	}
	
	//Ordena os itens do array por ordem numerica
	//http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
	treeItens = treeItens.sort(sortNumber);
	
	//Recupera o ultimo ID do array
	lastID = treeItens[treeItens.length - 1];
	
	//Seleciona o primeiro elemento
	//http://docs.dhtmlx.com/api__dhtmlxtree_selectitem.html
	tree.selectItem(1,false,false);
	currentSelected = tree.getSelectedItemId();
	
	//Expande a visualizacao da arvore a partir da raiz (id=0)
	tree.openAllItems(0);
	
});

/** ----- Funcoes Adcionar Nos ----- **/

//TODO Criar funcoes restantes
//TODO Recuperar texto do usuario de outra forma que nao sejam prompts
//TODO Bloquear adicao de nos em certas situacoes
function addOneOrMore(){
	addNonTerminal("Um ou mais:","ONE_OR_MORE");
}
function addZeroOrMore(){
	addNonTerminal("Zero ou mais:","ZERO_OR_MORE");
}
function addConditional(){
	addNonTerminal("Pode ou nao ter:","CONDITIONAL");
}
function addExact(){
	//Exibe um prompt e armazena o que foi digitado nele
	var texto = prompt("Digite a quantidade:");
	
	//Converte o texto para um numero inteiro
	var numero = parseInt(texto);
	
	//So adiciona se o numero for maior ou igual a zero
	if(numero < 0) return;
	
	addNonTerminal("Exatamente " + numero + " repeticoes de:","EXACT");

	//Adiciona o numero digitado pelo usuario nos metadados do elemento
	tree.setUserData(lastID,"numero1",numero);
}
function addAtLeast(){
	//Exibe um prompt e armazena o que foi digitado nele
	var texto = prompt("Digite a quantidade:");
	
	//Converte o texto para um numero inteiro
	var numero = parseInt(texto);
	
	//So adiciona se o numero for maior ou igual a zero
	if(numero < 0) return;
		
	addNonTerminal("Pelo menos " + numero + " repeticoes de:","AT_LEAST");

	//Adiciona o numero digitado pelo usuario nos metadados do elemento
	tree.setUserData(lastID,"numero1",numero);
}
function addBetween(){
	//Exibe um prompt e armazena o que foi digitado nele
	var texto1 = prompt("Digite o primeiro numero:");
	var texto2 = prompt("Digite o segundo numero:");
	
	//Converte o texto para um numero inteiro
	var numero1 = parseInt(texto1);
	var numero2 = parseInt(texto2);
	
	//So adiciona se o primeiro numero for maior ou igual a zero
	//e menor que o segundo numero
	if(numero1 < 0 || numero2 < numero1) return;
		
	addNonTerminal("Entre " + numero1 + " e " + numero2 + " repeticoes de:","BETWEEN");
	
	//Adiciona os numeros digitados pelo usuario nos metadados do elemento
	tree.setUserData(lastID,"numero1",numero1);
	tree.setUserData(lastID,"numero2",numero2);
}
function addList(){
	addNonTerminal("Qualquer um dos caracteres:","POSITIVE_LIST");
}
function addNegativeList(){
	addNonTerminal("Qualquer caractere que nao seja:","NEGATIVE_LIST");
}
function addGroup(){
	addNonTerminal("Grupo:","GROUP");
}
function addMultiple(){
	//Adiciona um elemento MULTIPLE na arvore
	addNonTerminal("Uma das opcoes:","MULTIPLE");
	
	//Recupera o ID do elemento MULTIPLE que acabou de ser adcionado na arvore.
	var multipleID = lastID;
	
	//Adiciona dois elementos SUB_EXPRESSION como filhos do elemento MULTIPLE.
	//E obrigatorio que um elemento MULTIPLE tenha no minino duas opcoes.
	addNonTerminalNextTo("Opcao:","SUB_EXPRESSION",multipleID);
	addNonTerminalNextTo("Opcao:","SUB_EXPRESSION",multipleID);
}
function addOption(){
	addNonTerminal("Opcao:","SUB_EXPRESSION");
}
/**
 * Funcao que e executada no "onchange" do seletor de classes
 * (elemento HTML option de ID "class-select").
 */
function addClass(){
	
	//Recupera o valor da opcao selecionada
	//Sera colocado nos metadados do no como o valor da regra
	var regra = getSelectedValue("class-select")
	
	//Se a opcao escolhida for uma em branco, retorna sem fazer nada
	if (regra == "none") return;
	
	//Recupera o texto da opcao selecionada
	//Sera utilizado no texto do no
	var texto = getSelectedText("class-select");
	
	//Adiciona a classe escolhida na arvore
	addTerminal(texto, regra);
	
	//Seleciona a primeira opcao do elemento option
	//(Esta deve ser a opcao em branco)
	selectFirstValue("class-select");
}
function addStart(){
	addTerminal("Inicio", "START_ANCHOR");
}
function addEnd(){
	addTerminal("Fim", "END_ANCHOR");
}
function addAnyChar(){
	addTerminal("Qualquer caractere", "ANY_CHAR");
}
function addRange(){
	//Exibe um prompt e armazena o que foi digitado nele
	var texto1 = prompt("Digite o primeiro caractere:");
	var texto2 = prompt("Digite o ultimo caractere:");
	
	//Se foi digitado mais de um caractere ou nenhum caractere,
	//retorna sem fazer nada
	if (texto1.length != 1 || texto2.length != 1) return;
	
	//Adiciona o elemento na arvore
	addTerminal("Todos os caracteres entre " + texto1 + " e " + texto2, "RANGE");
	
	//Adiciona o texto digitado pelo usuario nos metadados do elemento
	tree.setUserData(lastID,"caractere1",texto1);
	tree.setUserData(lastID,"caractere2",texto2);
}
function addCharacters(){
	//Exibe um prompt e armazena o que foi digitado nele
	var texto = prompt("Digite seu texto:");
	
	//Se o texto nao for um valor valido, retorna sem fazer nada
	if(isNotValid(texto)) return;
	
	//Adiciona o elemento na arvore
	addTerminal("Caracteres: " + texto, "CHARACTERS");
	
	//Adiciona o texto digitado pelo usuario nos metadados do elemento
	tree.setUserData(lastID,"texto",texto);
}

/** ----- Funcoes Adcionar Nos Auxiliares ----- **/

/**
 * Adciona um no terminal na arvore em relacao ao no atualmente
 * selecionado.
 * 
 * Este novo no pode ser posiciona do logo abaixo do no selecionado,
 * ou como filho dele. Isto ira depender se o no selecionado e
 * terminal ou nao.
 * 
 * @param nonTerminalText	O texto do novo no.
 * @param rule				A regra na qual o no pertence.
 */
function addTerminal(terminalText, rule){
	
	//Recupera o elemento atualmente selecionado na arvore
	currentSelected = tree.getSelectedItemId();
	
	//Adiciona o novo elemento em relacao ao elemento selecionado 
	addTerminalNextTo(terminalText, rule, currentSelected);
}

/**
 * Adciona um no nao terminal na arvore em relacao a um outro no.
 * 
 * Este novo no pode ser posiciona do logo abaixo de um elemento,
 * ou como filho dele. Isto ira depender se este elemento e 
 * terminal ou nao.
 * 
 * @param nonTerminalText	O texto do novo no.
 * @param rule				A regra na qual o no pertence.
 * @param nextTo			O ID do no onde o novo elemento ficara abaixo 
 * 							ou sera filho de.
 */
function addTerminalNextTo(terminalText, rule, nextTo){
	
	//Incrementa o contador de IDs
	lastID++;
	
	//Se o elemento selecionado for terminal
	if (isTerminal(nextTo))
		//Adciona o novo no abaixo dele
		addTerminalNext(nextTo, lastID, terminalText);
	else
		//Se nao, adciona como filho do elemento
		addTerminalChild(nextTo, lastID, terminalText);
	
	//Adiciona a regra recebida nos metadados do elemento
	tree.setUserData(lastID,"regra",rule);
}

/**
 * Adciona um no nao terminal na arvore em relacao ao no atualmente
 * selecionado.
 * 
 * Este novo no pode ser posiciona do logo abaixo do no selecionado,
 * ou como filho dele. Isto ira depender se o no selecionado e
 * terminal ou nao.
 * 
 * @param nonTerminalText	O texto do novo no.
 * @param rule				A regra na qual o no pertence.
 */
function addNonTerminal(nonTerminalText, rule){
	
	//Recupera o elemento atualmente selecionado na arvore
	currentSelected = tree.getSelectedItemId();
	
	//Adiciona o novo elemento em relacao ao elemento selecionado 
	addNonTerminalNextTo(nonTerminalText, rule, currentSelected);
}

/**
 * Adciona um no nao terminal na arvore em relacao a um outro no.
 * 
 * Este novo no pode ser posiciona do logo abaixo de um elemento,
 * ou como filho dele. Isto ira depender se este elemento e 
 * terminal ou nao.
 * 
 * @param nonTerminalText	O texto do novo no.
 * @param rule				A regra na qual o no pertence.
 * @param nextTo			O ID do no onde o novo elemento ficara abaixo 
 * 							ou sera filho de.
 */
function addNonTerminalNextTo(nonTerminalText, rule, nextTo){
	
	//Incrementa o contador de IDs
	lastID++;
	
	//Se o elemento selecionado for terminal
	if (isTerminal(nextTo)){
		
		//Adiciona o no abaixo dele
		addNonTerminalNext(nextTo, lastID, nonTerminalText);
	}
	
	//Se o elemento selecionado nao for terminal
	else {
		
		//Adiciona o no como filho do elemento
		addNonTerminalChild(nextTo, lastID, nonTerminalText);
	}
	
	//Adiciona a regra recebida nos metadados do elemento
	tree.setUserData(lastID,"regra",rule);
}

/**
 * Adciona um no nao terminal como filho de outro no.
 * 
 * @param parent	O ID do no pai.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addNonTerminalChild(parent, newID, label){
	
	//Adciona como filho do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewchild.html
	tree.insertNewChild(parent,newID,label,0,0,0,0,"CHILD");
	
	//Marca o no como nao terminal nos metadados
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",false);
	
	//Adciona o nivel de profundidade do no nos metadados
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));
}

/**
 * Adciona um no terminal como filho de outro no.
 * 
 * @param parent	O ID do no pai.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addTerminalChild(parent, newID, label){
	
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
 *  Adciona um no nao terminal abaixo de outro no.
 *  
 * @param previous	O ID do no anterior.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addNonTerminalNext(previous, newID, label){
	
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
 * Adciona um no terminal abaixo de outro no.
 * 
 * @param previous	O ID do no anterior.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addTerminalNext(previous, newID, label){
	
	//Adciona abaixo do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewnext.html
	tree.insertNewNext(previous,newID,label,0,0,0,0);
	
	//Marca o no como terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData(newID,"terminal",true);
	
	//Adciona o nivel de profundidade do no
	tree.setUserData(newID,"nivel",getNodeLevel(lastID));
}

/** ----- Funcoes Auxiliares Gerais ----- **/

/**
 * Verifica se o no e terminal.
 * 
 * @param nodeID		O id do no.
 * @returns {boolean}	Verdadeiro se for terminal.
 */
function isTerminal(nodeID){
	
	//Recupera o valor boleano dos metadados do no
	var terminal = tree.getUserData(nodeID,"terminal");
	
	return terminal;
}

/**
 * Retorna o nivel de profundidado do no.
 * 
 * @param nodeID		O ID do no.
 * @returns {Number}	O nivel de profundidade.
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
 * @param a		A variavel a ser checada
 * @return		Um valor booleano
 */
function isNotValid(a){
	
	//Se a variavel nao foi definida, retorna verdadeiro
	if(typeof a === 'undefined') return true;
	
	if ( a === null || a === "" || a === 0 || Number.isNaN(a) ) return true;
	
	return false;
}

/**
 * Funcao de comparacao numerica para ser usada pelo
 * array.sort() do Javascript.
 */
function sortNumber(a,b) {
    return a - b;
}

/**
 * Retorna o texto da opcao selecionada em
 * um elemento option.
 * 
 * @param elementId		O ID do elemento option.
 * @returns				O texto puro da opcao selecionada.
 */
function getSelectedText(elementId) {
    var element = document.getElementById(elementId);

    if (element.selectedIndex == -1)
        return null;

    return element.options[element.selectedIndex].text;
}

/**
 * Retorna o valor da opcao selecionada em
 * um elemento option.
 * 
 * @param elementId		O ID do elemento option.
 * @returns				O valor contido no atributo "value" da opcao selecionada.
 */
function getSelectedValue(elementId){
	var element = document.getElementById(elementId);
	
	return element.value;
}

/**
 * Seleciona a primeira opcao de um elemento option.
 * 
 * @param elementId		O ID do elemento option.
 */
function selectFirstValue(elementId){
	var element = document.getElementById(elementId);
	
	element.selectedIndex = "0";
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
	
	//Define o valor do campo como o objeto JSON serializado
	input.value = serializedTree;
	
	//Faz o submit do formulario
	/** ----- DS 2 ----- */
	document.getElementById('tree-form').submit();
}
