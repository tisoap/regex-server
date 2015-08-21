/**
 * Contem todos as funcoes genericas de adicao
 * de elementos.
 *
 * @author Tiso
 *
 */

/**
 * Adciona um no nao terminal na arvore em relacao a um outro no.
 *
 * Este novo no pode ser posiciona do logo abaixo de um elemento,
 * ou como filho dele.Isto ira depender se este elemento e * terminal ou nao.
 *
 * @param nonTerminalText	O texto do novo no.
 * @param rule				A regra na qual o no pertence.
 * @param nextTo			(opcional) O ID do no onde o novo no ficara abaixo
 * 							ou sera filho de. Utiliza o no atualmente selecionado ou
 * 							a raiz por padrao.
 */
function addTerminal( terminalText, rule, nextTo ) {

	//Se nao foi passado o parametro nextTo,
	//assume o elemento atualmente selecionado.
	if( typeof nextTo === 'undefined' ) nextTo = getCurrentSelectedNode();

	//Incrementa o contador de IDs
	lastID++;

	//Se o elemento selecionado for terminal
	if( isTerminal( nextTo ) ) {
		//Adciona o novo no abaixo dele
		addTerminalNext( nextTo, lastID, terminalText );
	}

	//Se o elemento selecionado nao for terminal
	else {
		//Adciona como filho do elemento
		addTerminalChild( nextTo, lastID, terminalText );
	}

	//Adiciona a regra recebida nos metadados do elemento
	tree.setUserData( lastID, "regra", rule );
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
 * @param nextTo			(opcional) O ID do no onde o novo no ficara abaixo
 * 							ou sera filho de. Utiliza o no atualmente selecionado ou
 * 							a raiz por padrao.
 */
function addNonTerminal( nonTerminalText, rule, nextTo ) {

	//Se nao foi passado o parametro nextTo,
	//assume o elemento atualmente selecionado.
	if( typeof nextTo === 'undefined' ) nextTo = getCurrentSelectedNode();


	//Incrementa o contador de IDs
	lastID++;

	//Se o elemento selecionado for terminal
	if( isTerminal( nextTo ) ) {

		//Adiciona o no abaixo dele
		addNonTerminalNext( nextTo, lastID, nonTerminalText );
	}

	//Se o elemento selecionado nao for terminal
	else {

		//Adiciona o no como filho do elemento
		addNonTerminalChild( nextTo, lastID, nonTerminalText );
	}

	//Adiciona a regra recebida nos metadados do elemento
	tree.setUserData( lastID, "regra", rule );
}

/**
 * Adciona um no nao terminal como filho de outro no.
 *
 * @param parent	O ID do no pai.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addNonTerminalChild( parent, newID, label ) {

	//Adciona como filho do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewchild.html
	tree.insertNewChild( parent, newID, label, 0, 0, 0, 0, "CHILD" );

	//Marca o no como nao terminal nos metadados
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData( newID, "terminal", false );

	//Adciona o nivel de profundidade do no nos metadados
	tree.setUserData( newID, "nivel", getNodeLevel( lastID ) );
}

/**
 * Adciona um no terminal como filho de outro no.
 *
 * @param parent	O ID do no pai.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addTerminalChild( parent, newID, label ) {

	//Adciona como filho do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewchild.html
	tree.insertNewChild( parent, newID, label, 0, 0, 0, 0 );

	//Marca o no como terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData( newID, "terminal", true );

	//Adciona o nivel de profundidade do no
	tree.setUserData( newID, "nivel", getNodeLevel( lastID ) );
}

/**
 *  Adciona um no nao terminal abaixo de outro no.
 *
 * @param previous	O ID do no anterior.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addNonTerminalNext( previous, newID, label ) {

	//Adciona abaixo do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewnext.html
	tree.insertNewNext( previous, newID, label, 0, 0, 0, 0, "CHILD" );

	//Marca o no como nao terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData( newID, "terminal", false );

	//Adciona o nivel de profundidade do no
	tree.setUserData( newID, "nivel", getNodeLevel( lastID ) );
}

/**
 * Adciona um no terminal abaixo de outro no.
 *
 * @param previous	O ID do no anterior.
 * @param newID		O ID do novo no.
 * @param label		O texto do novo no.
 */
function addTerminalNext( previous, newID, label ) {

	//Adciona abaixo do no selecionado
	//http://docs.dhtmlx.com/api__dhtmlxtree_insertnewnext.html
	tree.insertNewNext( previous, newID, label, 0, 0, 0, 0 );

	//Marca o no como terminal
	//http://docs.dhtmlx.com/api__dhtmlxtree_setuserdata.html
	tree.setUserData( newID, "terminal", true );

	//Adciona o nivel de profundidade do no
	tree.setUserData( newID, "nivel", getNodeLevel( lastID ) );
}
