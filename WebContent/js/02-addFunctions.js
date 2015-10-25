/**
 * Contem todos as funcoes para adicionar elementos na
 * arvore. Estas funcoes sao implementados pelos botoes
 * atraves de eventos "onClick()".
 */


function addAlNum() {
	if( canAddNode( "ALNUM" ) ) {
		addTerminal( "Caracteres alfanumericos", "ALNUM" );
	}
}

function addAlpha(){
	if( canAddNode( "ALPHA" ) ) {
		addTerminal( "Caracteres alfabeticos", "ALPHA" );
	}
}

function addBlank() {
	if( canAddNode( "BLANK" ) ) {
		addTerminal( "Espacos e tabulacoes", "BLANK" );
	}
}

function addCntrl(){
	if( canAddNode( "CNTRL" ) ) {
		addTerminal( "Caracteres de controle", "CNTRL" );
	}	
}

function addDigitClass(){
	if( canAddNode( "DIGIT_CLASS" ) ) {
		addTerminal( "Digitos", "DIGIT_CLASS" );
	}	
}

function addGraph(){
	if( canAddNode( "GRAPH" ) ) {
		addTerminal( "Caracteres visiveis", "GRAPH" );
	}	
}

function addLower(){
	if( canAddNode( "LOWER" ) ) {
		addTerminal( "Letras minusculas", "LOWER" );
	}	
}

function addPrint(){
	if( canAddNode( "PRINT" ) ) {
		addTerminal( "Caracteres visiveis e espaco", "PRINT" );
	}	
}

function addPunct(){
	if( canAddNode( "PUNCT" ) ) {
		addTerminal( "Caracteres de pontuacao", "PUNCT" );
	}	
}

function addSpaceClass(){
	if( canAddNode( "SPACE_CLASS" ) ) {
		addTerminal( "Caracteres brancos", "SPACE_CLASS" );
	}	
}

function addUpper(){
	if( canAddNode( "UPPER" ) ) {
		addTerminal( "Letras maiusculas", "UPPER" );
	}	
}

function addXDigit(){
	if( canAddNode( "X_DIGIT" ) ) {
		addTerminal( "Numeros hexadecimais", "X_DIGIT" );
	}	
}

function addOneOrMore() {

	if( canAddNode( "ONE_OR_MORE" ) ) {
		addNonTerminal( "Um ou mais:", "ONE_OR_MORE" );
	}
}

function addZeroOrMore() {

	if( canAddNode( "ZERO_OR_MORE" ) ) {
		addNonTerminal( "Zero ou mais:", "ZERO_OR_MORE" );
	}
}

function addConditional() {

	if( canAddNode( "CONDITIONAL" ) ) {
		addNonTerminal( "Pode ou nao ter:", "CONDITIONAL" );
	}
}

function addExact() {

	if( canAddNode( "EXACT" ) ) {

		//Exibe um prompt e armazena o que foi digitado nele
		var texto = prompt( "Digite a quantidade:" );

		//Converte o texto para um numero inteiro
		var numero = parseInt( texto );

		//So adiciona se o numero for valido
		if( isNotValid( numero ) ) return;

		addNonTerminal( "Exatamente " + numero + " repeticoes de:", "EXACT" );

		//Adiciona o numero digitado pelo usuario nos metadados do elemento
		tree.setUserData( lastID, "numero1", numero );

	}
}

function addAtLeast() {

	if( canAddNode( "AT_LEAST" ) ) {

		//Exibe um prompt e armazena o que foi digitado nele
		var texto = prompt( "Digite a quantidade:" );

		//Converte o texto para um numero inteiro
		var numero = parseInt( texto );

		//So adiciona se o numero for valido
		if( isNotValid( numero ) ) return;

		addNonTerminal( "Pelo menos " + numero + " repeticoes de:", "AT_LEAST" );

		//Adiciona o numero digitado pelo usuario nos metadados do elemento
		tree.setUserData( lastID, "numero1", numero );

	}
}

function addBetween() {

	if( canAddNode( "BETWEEN" ) ) {

		//Exibe um prompt e armazena o que foi digitado nele
		var texto1 = prompt( "Digite o primeiro numero:" );
		var texto2 = prompt( "Digite o segundo numero:" );

		//Converte o texto para um numero inteiro
		var numero1 = parseInt( texto1 );
		var numero2 = parseInt( texto2 );

		//So adiciona se os numeros forem validos
		if( isNotValid( numero1 ) || isNotValid( numero2 ) ) return;
		
		//So adiciona se o 1o numero for menor que o 2o
		if( numero1 > numero2 ) return;

		addNonTerminal( "Entre " + numero1 + " e " + numero2 + " repeticoes de:", "BETWEEN" );

		//Adiciona os numeros digitados pelo usuario nos metadados do elemento
		tree.setUserData( lastID, "numero1", numero1 );
		tree.setUserData( lastID, "numero2", numero2 );

	}
}

function addList() {

	if( canAddNode( "POSITIVE_LIST" ) ) {
		addNonTerminal( "Qualquer um dos caracteres:", "POSITIVE_LIST" );
	}
}

function addNegativeList() {

	if( canAddNode( "NEGATIVE_LIST" ) ) {
		addNonTerminal( "Qualquer caractere que nao seja:", "NEGATIVE_LIST" );
	}
}

function addGroup() {

	if( canAddNode( "GROUP" ) ) {
		addNonTerminal( "Grupo:", "GROUP" );
	}
}

function addMultiple() {

	if( canAddNode( "MULTIPLE" ) ) {

		//Adiciona um elemento MULTIPLE na arvore
		addNonTerminal( "Uma das opcoes:", "MULTIPLE" );

		//Recupera o ID do elemento MULTIPLE que acabou de ser adcionado na arvore.
		var multipleID = lastID;

		//Adiciona dois elementos SUB_EXPRESSION como filhos do elemento MULTIPLE.
		//E obrigatorio que um elemento MULTIPLE tenha no minino duas opcoes.
		addNonTerminal( "Opcao:", "SUB_EXPRESSION", multipleID );
		addNonTerminal( "Opcao:", "SUB_EXPRESSION", multipleID );
	}
}

function addOption() {

	if( canAddNode( "SUB_EXPRESSION" ) ) {
		addNonTerminal( "Opcao:", "SUB_EXPRESSION" );
	}
}

/**
 * Funcao que e executada no "onchange" do seletor de classes
 * (elemento HTML option de ID "class-select").
 */
function addClass() {

	//Recupera o valor da opcao selecionada
	//Sera colocado nos metadados do no como o valor da regra
	var regra = getSelectedValue( "class-select" )

	//Se a opcao escolhida for uma em branco, retorna sem fazer nada
	if( regra == "none" ) return;

	//Recupera o texto da opcao selecionada
	//Sera utilizado no texto do no
	var texto = getSelectedText( "class-select" );

	if( canAddNode( regra ) ) {
		//Adiciona a classe escolhida na arvore
		addTerminal( texto, regra );
	}

	//Seleciona a primeira opcao do elemento option
	//(Esta deve ser a opcao em branco)
	selectFirstValue( "class-select" );
}

function addStart() {

	if( canAddNode( "START_ANCHOR" ) ) {
		addTerminal( "Inicio", "START_ANCHOR" );
	}
}

function addEnd() {

	if( canAddNode( "END_ANCHOR" ) ) {
		addTerminal( "Fim", "END_ANCHOR" );
	}
}

function addAnyChar() {

	if( canAddNode( "ANY_CHAR" ) ) {
		addTerminal( "Qualquer caractere", "ANY_CHAR" );
	}
}

function addRange() {

	if( canAddNode( "RANGE" ) ) {

		//Exibe um prompt e armazena o que foi digitado nele
		var texto1 = prompt( "Digite o primeiro caractere:" );
		var texto2 = prompt( "Digite o ultimo caractere:" );

		//Se foi digitado mais de um caractere ou nenhum caractere,
		//retorna sem fazer nada
		if( texto1.length != 1 || texto2.length != 1 ){
			alert("So pode ter 1 caractere de cada lado!")
			return;
		}
		
		//Faz o encode do texto digitado para entidades HTML
		texto1 = htmlEncode(texto1);
		texto2 = htmlEncode(texto2);
		
		//Adiciona o elemento na arvore
		addTerminal( "Todos os caracteres entre " + texto1 + " e " + texto2, "RANGE" );

		//Adiciona o texto digitado pelo usuario nos metadados do elemento
		tree.setUserData( lastID, "caractere1", texto1 );
		tree.setUserData( lastID, "caractere2", texto2 );
	}
}

function addCharacters() {
	
	//Exibe um prompt e armazena o que foi digitado nele
	var texto = prompt( "Digite seu texto:" );

	//Se o texto nao for um valor valido, retorna sem fazer nada
	if( isNotValid( texto ) ) return;
	
	//Faz o encode dos caracteres para entidades HTML
	var textoHtml = htmlEncode(texto);
	
	//Recupera a regra do no pai 
	var pai = getParentRule();
	
	//Se o pai for uma lista
	if (pai == "POSITIVE_LIST" || pai == "NEGATIVE_LIST"){
		
		//Se o texto tiver apenas 1 caractere
		if (texto.length == 1){
			
			//Se pode adicionar o no nas circunstancias atuais
			if( canAddNode( "LIST_CHARACTER" ) ) {
				addTerminal( "Caractere: " + textoHtml, "LIST_CHARACTER" );
				tree.setUserData( lastID, "texto", texto );
			}
			
		}
		
		//Se o texto tiver mais de um caractere
		else{			
			
			if ( canAddNode( "LIST_CHARACTERS" ) ) {
				addTerminal( "Caracteres: " + textoHtml, "LIST_CHARACTERS" );
				tree.setUserData( lastID, "texto", texto );
			}
		}
	}
	
	else{
	
		//Faz o escape de barras invertidas e aspas duplas
		//var textoEscapado = texto.replace(/\\/g, '\\\\');
		//textoEscapado = textoEscapado.replace(/\"/g, '\\"');
		
		if (texto.length == 1){
		
			if( canAddNode( "CHARACTER" ) ) {
				
				//Adiciona o elemento na arvore
				addTerminal( "Caractere: " + textoHtml, "CHARACTER" );
				
				//Adiciona o texto digitado pelo usuario nos metadados do elemento
				tree.setUserData( lastID, "texto", texto );
				
			}
		
		}
		
		else {
			
			if( canAddNode( "CHARACTERS" ) ) {
				
				//Adiciona o elemento na arvore
				addTerminal( "Caracteres: " + textoHtml, "CHARACTERS" );
				
				//Adiciona o texto digitado pelo usuario nos metadados do elemento
				tree.setUserData( lastID, "texto", texto );
				
			}
			
		}
	
	}

}
