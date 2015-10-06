/**
 * Contem todos as funcoes que testam se e possivel
 * adicionar/remover um elemento na arvore.
 */

/**
 * Testa se um no pode ser adicionado em relacao a outro no. Exibe
 * uma mensagem de erro se nao puder.
 * 
 * @param rule
 *  A regra do no a ser adicionado.
 *  
 * @param nextTo
 *  (opcional) O ID do outro no. Utiliza o no selecionado ou a raiz por padrao.
 *  
 * @param text
 *  (opcional) O texto digitado pelo usuario para este no. Aplicavel
 *  para testar se um no CHARACTERS pode ser adcionado.
 *  
 * @returns {Boolean}
 */
function canAddNode( rule, nextTo, text ) {
	
	var resultado = canAddNodeTest( rule, nextTo, text );
	
	if (!resultado){
		alert("Nao pode adicionar esse elemento aqui!");
	}
	
	return resultado;
}

/**
 * Testa se um no pode ser adicionado em relacao a outro no.
 * 
 * @param rule
 *  A regra do no a ser adicionado.
 *  
 * @param nextTo
 *  (opcional) O ID do outro no. Utiliza o no selecionado ou a raiz por padrao.
 *  
 * @param text
 *  (opcional) O texto digitado pelo usuario para este no. Aplicavel
 *  para testar se um no CHARACTERS pode ser adcionado.
 *  
 * @returns {Boolean}
 */
function canAddNodeTest( rule, nextTo ) {

	//Se nao foi passado o parametro nextTo,
	//assume o elemento atualmente selecionado.
	if( typeof nextTo === 'undefined' ) nextTo = getCurrentSelectedNode();

	//Se o no selecionado nao for terminal, utiliza o ID dele
	//Se for terminal, utiliza do ID do pai dele.
	var parentID = getNonTerminalID( nextTo );

	//Recupera a regra do no pai
	var parentRule = getRule( parentID );

	
	/** INICIO DOS TESTES */

	//Apenas "SUB_EXPRESSION" pode ser filho direto de "MULTIPLE"
	if( rule != "SUB_EXPRESSION" && parentRule == "MULTIPLE" )
		return false;

	if( rule == "SUB_EXPRESSION" && parentRule != "MULTIPLE" )
		return false;

	//MULTIPLE nao pode ser filho direto de SUB_EXPRESSION
	if( rule == "MULTIPLE" && parentRule == "SUB_EXPRESSION" )
		return false;

	//Verifica se a regra do no e do tipo que
	//deve existir apenas dentro de uma lista
	var listOnly = false;
	
	switch( rule ) {
		case "ALNUM":
		case "ALPHA":
		case "BLANK":
		case "CNTRL":
		case "DIGIT_CLASS":
		case "GRAPH":
		case "LOWER":
		case "PRINT":
		case "PUNCT":
		case "SPACE_CLASS":
		case "UPPER":
		case "X_DIGIT":
		case "RANGE":
			listOnly = true;
			break;
	
		default:
			break;
	}

	//Verifica se o pai tem uma regra de lista
	var parentIsList = ( parentRule == "POSITIVE_LIST" ) ||
		( parentRule == "NEGATIVE_LIST" );

	//Apenas elementos de lista podem ser adicionados em uma lista
	if( listOnly && !parentIsList )
		return false;

	//Se nao for um elemento exclusivo de lista ou caracteres, e o pai for
	//uma lista, nao pode adicionar
	if( ( !listOnly && parentIsList ) && ( rule != "CHARACTERS" && rule != "CHARACTER" ) )
		return false;

	//Verifica se a regra do pai e condicioal
	var parentIsQuantifier = false;
	
	switch( parentRule ) {
		case "ONE_OR_MORE":
		case "ZERO_OR_MORE":
		case "CONDITIONAL":
		case "EXACT":
		case "BETWEEN":
		case "AT_LEAST":
			parentIsQuantifier = true;
			break;
	
		default:
			break;
	}

	//Se o (futuro) pai deste no ja tem outros filhos
	var parentHasChildren = ( tree.getSubItems( parentID ).length >= 1 );

	//Se o pai tiver regra condicional e ja tiver filhos,
	//nao pode adicionar. Uma regra condiciona so pode
	//ter um filho.
	if( parentHasChildren && parentIsQuantifier )
		return false;

	//Verifica se a regra do elemento a ser adicionado e condicioal
	var childIsQuantifier = false;
	
	switch( rule ) {
		case "ONE_OR_MORE":
		case "ZERO_OR_MORE":
		case "CONDITIONAL":
		case "EXACT":
		case "BETWEEN":
			childIsQuantifier = true;
			break;
	
		default:
			break;
	}
	
	//Quantificadores nao podem quantificar outros quantificadores
	if( parentIsQuantifier && childIsQuantifier )
		return false;
	
	//Quantificadores so podem quantificar 1 caractere por vez
	if (rule == "CHARACTERS" && parentIsQuantifier){
		return false;
	}

	return true;
}

/**
 * Testa se um no pode ser removido. Exibe um alerta 
 * se nao puder.
 * 
 * @param currentSelected
 *  O ID do no a ser removido.
 * 
 * @returns {Boolean}
 */
function canRemoveNode( currentSelected ) {
	
	var resultado = canRemoveNodeTest( currentSelected );
	
	if (!resultado){
		alert("Nao pode remover este no!");
	}
	
	return resultado;
}

/**
 * Testa se um no pode ser removido.
 * 
 * @param currentSelected
 *  O ID do no a ser removido.
 * 
 * @returns {Boolean}
 */
function canRemoveNodeTest( currentSelected ) {

	//Recupera a regra do elemento selecionado
	var rule = getRule( currentSelected );

	//Recupera o ID do pai 
	var parentID = tree.getParentId( currentSelected );

	//Recupera a regra do pai
	var parentRule = getRule( parentID );

	//Se uma opcao esta sendo removida de uma regra de multiplas opcoes,
	//verificar se vao existir pelo menos duas no final.
	if( parentRule == "MULTIPLE" && rule == "SUB_EXPRESSION" ) {

		//Recupera uma String com todos os IDs de todos os filhos
		//do pai
		var parentChildrenString = tree.getSubItems( parentID );

		//Cria um array de IDs a partir de uma string, usando virgula
		//como separador de elementos
		var parentChildren = parentChildrenString.split( "," );

		//Se tem mais de duas opcoes, pode remover
		if( parentChildren.length > 2 )
			return true;

		else
			return false;
	}

	return true;
}
