/**
 * Contem todos as funcoes para adicionar elementos na
 * arvore. Estas funcoes sao implementados pelos botoes
 * atraves de eventos "onClick()".
 * 
 * @author Tiso
 *
 */

//TODO Recuperar texto do usuario de outra forma que nao sejam prompts
function addOneOrMore(){
	
	if (canAddNode("ONE_OR_MORE")){
		addNonTerminal("Um ou mais:","ONE_OR_MORE");
	}
}

function addZeroOrMore(){
	
	if (canAddNode("ZERO_OR_MORE")){
		addNonTerminal("Zero ou mais:","ZERO_OR_MORE");
	}
}

function addConditional(){
	
	if (canAddNode("CONDITIONAL")){
		addNonTerminal("Pode ou nao ter:","CONDITIONAL");
	}
}

function addExact(){
	
	if (canAddNode("EXACT")){
		
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
}

function addAtLeast(){
	
	if (canAddNode("AT_LEAST")){
	
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
}

function addBetween(){
	
	if (canAddNode("BETWEEN")){
		
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
}

function addList(){
	
	if (canAddNode("POSITIVE_LIST")){
		addNonTerminal("Qualquer um dos caracteres:","POSITIVE_LIST");
	}
}

function addNegativeList(){
	
	if (canAddNode("NEGATIVE_LIST")){
		addNonTerminal("Qualquer caractere que nao seja:","NEGATIVE_LIST");
	}
}

function addGroup(){
	
	if (canAddNode("GROUP")){
		addNonTerminal("Grupo:","GROUP");
	}
}

function addMultiple(){
	
	if (canAddNode("MULTIPLE")){
		
		//Adiciona um elemento MULTIPLE na arvore
		addNonTerminal("Uma das opcoes:","MULTIPLE");
		
		//Recupera o ID do elemento MULTIPLE que acabou de ser adcionado na arvore.
		var multipleID = lastID;
		
		//Adiciona dois elementos SUB_EXPRESSION como filhos do elemento MULTIPLE.
		//E obrigatorio que um elemento MULTIPLE tenha no minino duas opcoes.
		addNonTerminal("Opcao:","SUB_EXPRESSION",multipleID);
		addNonTerminal("Opcao:","SUB_EXPRESSION",multipleID);
	}
}

function addOption(){
	
	if (canAddNode("SUB_EXPRESSION")){
		addNonTerminal("Opcao:","SUB_EXPRESSION");
	}
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
	
	if (canAddNode(regra)){
		//Adiciona a classe escolhida na arvore
		addTerminal(texto, regra);
	}
	
	//Seleciona a primeira opcao do elemento option
	//(Esta deve ser a opcao em branco)
	selectFirstValue("class-select");
}

function addStart(){
	
	if (canAddNode("START_ANCHOR")){
		addTerminal("Inicio", "START_ANCHOR");
	}
}

function addEnd(){
	
	if (canAddNode("END_ANCHOR")){
		addTerminal("Fim", "END_ANCHOR");
	}
}

function addAnyChar(){
	
	if (canAddNode("ANY_CHAR")){
		addTerminal("Qualquer caractere", "ANY_CHAR");
	}
}

function addRange(){
	
	if (canAddNode("RANGE")){
		
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
}

function addCharacters(){
	
	if (canAddNode("CHARACTERS")){
	
		//Exibe um prompt e armazena o que foi digitado nele
		var texto = prompt("Digite seu texto:");
		
		//Se o texto nao for um valor valido, retorna sem fazer nada
		if(isNotValid(texto)) return;
		
		//Checa se e possivel adicionar o no de caracteres em relacao
		//ao elemento selecionado
		if (canAddCharactersNode(texto)){
			
			//Adiciona o elemento na arvore
			addTerminal("Caracteres: " + texto, "CHARACTERS");
			
			//Adiciona o texto digitado pelo usuario nos metadados do elemento
			tree.setUserData(lastID,"texto",texto);
		}
	
	}

}
