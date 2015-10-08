/**
 * Contem todos as funcoes auxiliares gerais, que
 * sao utilizadas por outras funcoes.
 */

/**
 * Verifica se o no e terminal.
 * 
 * @param nodeID
 *  O id do no.
 *  
 * @returns {boolean}
 *  Verdadeiro se for terminal.
 */
function isTerminal( nodeID ) {

	//Se for passado o ID da raiz, retorna falso.
	//A raiz e considerada nao terminal.
	if( nodeID == 0 ) return false;

	//Recupera o valor boleano dos metadados do no
	var terminal = tree.getUserData( nodeID, "terminal" );

	//Se por algum acaso o metodo retornar uma string
	//em vez de um boolean
	if( typeof ( terminal ) === 'string' ) {
		if( terminal === "true" ) return true;
		else return false;
	}

	return terminal;
}

/**
 * Retorna o nivel de profundidado do no.
 * 
 * @param nodeID
 *  O ID do no.
 * @returns {Number}
 *  O nivel de profundidade.
 */
function getNodeLevel( nodeID ) {

	//Recupera o nivel de profundidade do no
	var level = tree.getLevel( nodeID );

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
 * @param a
 *  A variavel a ser checada
 *  
 * @return
 *  Um valor booleano
 */
function isNotValid( a ) {

	//Se a variavel nao foi definida, retorna verdadeiro
	if( typeof a === 'undefined' ) return true;

	if( a === null || a === "" || a === 0 || Number.isNaN( a ) ) return true;

	return false;
}

/**
 * Funcao de comparacao numerica para ser usada pelo
 * array.sort() do Javascript.
 */
function sortNumber( a, b ) {
	return a - b;
}

/**
 * Retorna o texto da opcao selecionada em
 * um elemento option.
 * 
 * @param elementId
 *  O ID do elemento option.
 *  
 * @returns
 *  O texto puro da opcao selecionada.
 */
function getSelectedText( elementId ) {
	
	var element = document.getElementById( elementId );
	
	if( element.selectedIndex == -1 ) return null;
	
	return element.options[ element.selectedIndex ].text;
}

/**
 * Retorna o valor da opcao selecionada em
 * um elemento option.
 * 
 * @param elementId
 *  O ID do elemento option.
 *  
 * @returns
 *  O valor contido no atributo "value" da opcao selecionada.
 */
function getSelectedValue( elementId ) {
	
	var element = document.getElementById( elementId );
	
	return element.value;
}

/**
 * Seleciona a primeira opcao de um elemento option.
 * 
 * @param elementId
 *  O ID do elemento option.
 */
function selectFirstValue( elementId ) {
	
	var element = document.getElementById( elementId );
	
	element.selectedIndex = "0";
}

/**
 * Retorna uma String com o ID do no atualmente selecionado na arvore.
 * Se nenhum no estiver selecionado, retorna o ID da raiz da arvore,
 * que sera igual a "0".
 * 
 * @returns {String} 
 */
function getCurrentSelectedNode() {

	//Recupera o elemento atualmente selecionado na arvore
	var selected = tree.getSelectedItemId();

	//Se nenhum elemento estiver selecionado, utilize
	//o ID da raiz da arvore.
	if( selected == "" ) selected = "0";

	return selected;
}

/**
 * Testa se o no recebido e terminal. Se for terminal,
 * retorna o ID do pai dele. Se nao for teminal, retorna o 
 * proprio ID do elemento.
 * 
 * @param id
 *  O ID do elemento.
 *  
 * @returns
 *  O ID do elemento nao terminal, que pode ser do
 *  pai ou ele proprio.
 */
function getNonTerminalID( id ) {

	var parentID;

	if( isTerminal( id ) ) {
		parentID = tree.getParentId( id );
	} else {
		parentID = id;
	}

	return id;
}

/**
 * Recupera a regra de um no.
 * 
 * @param id
 *  O ID do no.
 *  
 * @returns
 *  A regra do no.
 */
function getRule( id ) {

	var rule;

	//Se o pai for a raiz da arvore, a regra sera "ROOT"
	if( id == "0" ) {
		rule = "ROOT";
	}
	//Se nao, recupera a regra a partir dos metadados dele
	else {
		rule = tree.getUserData( id, "regra" );
	}

	return rule;
}

/**
 * Faz encode de caracteres para entidades HTML.
 */
function htmlEncode(value){
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/**
 * Faz decode de entidades HTML para caracteres.
 */
function htmlDecode(value){
	return String(value)
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

function escapeString(text){
	
	var escape = "\\";
	var quote = "\"";
	
	text = text.replace(quote,escape+escape+quote);
	
	return text;
}
