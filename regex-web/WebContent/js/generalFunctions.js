/**
 * Contem todos as funcoes auxiliares gerais, que
 * sao utilizadas por outras funcoes.
 * 
 * @author Tiso
 *
 */


/**
 * Verifica se o no e terminal.
 * 
 * @param nodeID		O id do no.
 * @returns {boolean}	Verdadeiro se for terminal.
 */
function isTerminal(nodeID){
	
	//Se for passado o ID da raiz, retorna falso.
	//A raiz e considerada nao terminal.
	if (nodeID == 0) return false;
	
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
	
	//Compensacao para que a profundidade inicie em zero
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
    if (element.selectedIndex == -1) return null;
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

/**
 * Retorna uma String com o ID do no atualmente selecionado na arvore.
 * Se nenhum no estiver selecionado, retorna o ID da raiz da arvore,
 * que sera igual a "0".
 * 
 * @returns {String} 
 */
function getCurrentSelectedNode(){
	
	//Recupera o elemento atualmente selecionado na arvore
	var selected = tree.getSelectedItemId();
	
	//Se nenhum elemento estiver selecionado, utilize
	//o ID da raiz da arvore.
	if (selected == "") selected = "0";
	
	return selected;
}