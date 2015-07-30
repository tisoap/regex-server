/**
 * Contem todos as funcoes que testam se e possivel
 * adicionar/remover um elemento na arvore.
 * 
 * @author Tiso
 *
 */

/**
 * Testa se um no pode ser adicionado em relacao a outro no.
 * 
 * @param rule			A regra do no a ser adicionado.
 * @param nextTo		(opcional) O ID do outro no. Utiliza o no selecionado ou a raiz por padrao.
 * @returns {Boolean}	
 */
function canAddNode(rule, nextTo){
	
	//Se nao foi passado o parametro nextTo,
	//assume o elemento atualmente selecionado.
	if (typeof nextTo === 'undefined') nextTo = getCurrentSelectedNode();
	
	var parentID, parentRule;
	
	//Verifica se o elemento selecionado e terminal ou nao
	var terminal = isTerminal(nextTo);
	
	//Se for terminal, o pai do novo elemento sera o pai do
	//elemento selecionado
	if(terminal){
		parentID = tree.getParentId(nextTo);
	}
	//Se nao for terminal, o pai do novo elemento sera o
	//proprio elemento selecionado.
	else {
		parentID = nextTo;
	}
	
	//Se o pai for a raiz da arvore, a regra sera "ROOT"
	if (parentID == "0"){
		parentRule = "ROOT";
	}
	//Se nao, recupera a regra do pai a partir dos metadados dele
	else{
		parentRule = tree.getUserData(parentID,"regra");
	}
	
	//TODO Implementar bloqueio
	switch (rule) {
		case "ONE_OR_MORE":
			
			break;
	
		default:
			break;
	}
	
	return true;
}

/**
 * Testa se um no do tipo CHARACTERS pode ser adicionado
 * em relacao a outro no.
 * 
 * @param text				O texto do no CHARACTERS.
 * @param nextTo			(opcional) O ID do outro no. Utiliza o no selecionado ou a raiz por padrao.
 * @returns {Boolean}
 */
function canAddCharactersNode(text, nextTo){
	
	//Se nao foi passado o parametro nextTo,
	//assume o elemento atualmente selecionado.
	if (typeof nextTo === 'undefined') nextTo = getCurrentSelectedNode();
	
	var parentID, parentRule;
	
	//Verifica se o elemento selecionado e terminal ou nao
	var terminal = isTerminal(nextTo);
	
	//Se for terminal, o pai do novo elemento sera o pai do
	//elemento selecionado
	if(terminal){
		parentID = tree.getParentId(nextTo);
	}
	//Se nao for terminal, o pai do novo elemento sera o
	//proprio elemento selecionado.
	else {
		parentID = nextTo;
	}
	
	//Se o pai for a raiz da arvore, a regra sera "ROOT"
	if (parentID == "0"){
		parentRule = "ROOT";
	}
	//Se nao, recupera a regra do pai a partir dos metadados dele
	else{
		parentRule = tree.getUserData(parentID,"regra");
	}
	
	//Se o pai tiver regra "MULTIPLE", nao pode adicionar.
	//Apenas "SUB_EXPRESSION" pode ser filho de "MULTIPLE"
	//TODO mover este teste para outra funcao
	if (parentRule == "MULTIPLE") return false;
	
	//Se o texto do no tem mais de 1 caractere
	var moreThanOneCharacter = (text.length > 1);
	
	//Se o (futuro) pai deste no ja tem outros filhos
	var parentHasChildren = (tree.getSubItems(parentID).length >= 1);
	
	//Se a regra do pai e do tipo condicional
	var parentIsConditional = false;
	
	//Verifica se a regra do pai e condicioal
	switch (parentRule) {
		case "ONE_OR_MORE":
		case "ZERO_OR_MORE":
		case "CONDITIONAL":
		case "EXACT":
		case "BETWEEN":
			parentIsConditional = true;
			break;
		
		default:
			//nada
			break;
	}
	
	//Se o texto tiver mais de um caractere ou o pai ja possuir filhos,
	//e o pai tiver uma regra condicional, nao pode adicionar o no.
	if ((moreThanOneCharacter && parentIsConditional) || 
		(parentHasChildren && parentIsConditional)){
		
		return false;
	}
	
	return true;
}