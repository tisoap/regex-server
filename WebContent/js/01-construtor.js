/**
 * Inicializa a arvore dhtmlxTree.
 */

/** ---- Variaveis Globais ---- **/

/** Objeto da arvore de visualizacao.**/
var tree;

/** Objeto JSON. **/
var json;

/** Inteiro com o ID do ultimo elemento adcionado na arvore.
 *  Funcoes que adicionam elementos sempre incrementam esta
 *  variavel. */
var lastID;

/** ----- Inicializacao ----- **/

//So executa a inicializacao quando a pagina estiver carregada
$( document ).ready( function () {
	
	console.log( jsonString );
	
	//Testa se foi recebida uma String JSON
	if( isNotValid( jsonString ) ) {
		jsonString = "{\"id\":0, \"item\":[]}";
	};
	
	//Conversao da string para um objeto JSON
	json = jQuery.parseJSON( jsonString );

	//Inicializa um novo objeto da arvore
	//docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html#objectbasedinitialization
	tree = new dhtmlXTreeObject( "regex-tree", "100%", "100%", 0 );

	//Desativa a opcao de clicar e arastar elementos da arvore. 
	//http://docs.dhtmlx.com/api__dhtmlxtree_enabledraganddrop.html
	tree.enableDragAndDrop( false, false );
	
	//Define o caminho com as imagens a serem usadas pela arvore
	//docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html#objectbasedinitialization
	tree.setImagePath( "ferramentas/dhtmlxtree/imgs/dhxtree_web/" );

	//Abilita a serializacao de dados adicionais
	//http://forum.dhtmlx.com/viewtopic.php?f=3&t=23155&p=74442&hilit=json+serialize#p74442
	tree._xuserData = true;

	//Carrega os dados do objeto JSON na arvore
	tree.loadJSONObject( json );

	//Recupera uma String com todos os IDs de todos os itens dentro da raiz da arvore
	//separados por virgula
	var stringTreeItens = tree.getAllSubItems( 0 );

	//Se nao existir nenhum item dentro da arvore, considera o
	//ultimo ID como o da raiz da arvore, que e zero.
	if( stringTreeItens.length == 0 ) {
		lastID = 0;
	}
	//Se existirem itens dentro da arvore, recupera o maior ID
	//dentre eles e o define como o ultimo ID.
	else {

		//Cria um array de IDs a partir de uma string, usando virgula
		//como separador de elementos
		var treeItens = stringTreeItens.split( "," );

		//Converte todos os itens do array de Strings para inteiros
		for( var i = 0; i < treeItens.length; i++ ) {
			treeItens[ i ] = parseInt( treeItens[ i ] );
		}

		//Ordena os itens do array por ordem numerica
		//http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
		treeItens = treeItens.sort( sortNumber );

		//Recupera o ultimo ID do array
		lastID = treeItens[ treeItens.length - 1 ];
	}

	//Expande a visualizacao da arvore a partir da raiz (id=0)
	tree.openAllItems( 0 );

	//Adiciona uma funcao na acao de clique, que
	//limpa a selecao da arvore quando clicado fora dela.
	$( document ).click( function ( e ) {

		//Se foi clicado ou no elemento que contem a arvore,
		//ou em um dos botoes...
		if( $( e.target ).is( '#regex-tree, #regex-tree *, #buttons, #buttons *' ) ) {
			//Nao faz nada
			return;
		}

		//Se foi clicado fora dela...
		else {
			//Recupera o item selecionado e remove a selecao dele.
			tree.clearSelection( tree.getSelectedItemId() );
		}
	} );
} );
