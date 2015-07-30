/**
 * Inicializa a arvore dhtmlxTree.
 * 
 * @author Tiso
 *
 */

/** ---- Variaveis Globais ---- **/

/** Objeto da arvore de visualizacao.**/
var tree;

/** Objeto JSON no formato String.**/
var json;

/** Inteiro com o ID do ultimo elemento adcionado na arvore.
 *  Funcoes que adicionam elementos sempre incrementam esta
 *  variavel. */
var lastID;

/** ----- Inicializacao ----- **/

//So executa a inicializacao quando a pagina estiver carregada
$(document).ready(function(){
	
	//TODO Remover teste
	//Testa se foi recebida uma String JSON
	if(isNotValid(jsonString)){
		//String JSON para testes
		//jsonString = "{\"id\":0,\"item\":[{\"id\":1,\"text\":\"Caracteres: a\",\"child\":0,\"userdata\":[{\"name\":\"nivel\",\"content\":0},{\"name\":\"original\",\"content\":\"a\"},{\"name\":\"regra\",\"content\":\"CHARACTERS\"},{\"name\":\"terminal\",\"content\":true},{\"name\":\"texto\",\"content\":\"a\"}]}]}";
		//jsonString = "{\"id\":\"0\", \"item\":[{ \"id\":\"1\", \"text\":\"Caracteres: a\", \"userdata\":[{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"original\" , \"content\":\"a\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"texto\" , \"content\":\"a\" }]}\n,{ \"id\":\"12\", \"open\":\"1\", \"select\":\"1\", \"text\":\"Um ou mais:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"ONE_OR_MORE\" }], \"item\":[{ \"id\":\"13\", \"text\":\"Caracteres: bla\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"bla\" }]}\n]\n}\n,{ \"id\":\"10\", \"open\":\"1\", \"text\":\"Zero ou mais:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"ZERO_OR_MORE\" }], \"item\":[{ \"id\":\"11\", \"text\":\"Caracteres: nothing\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"nothing\" }]}\n]\n}\n,{ \"id\":\"8\", \"open\":\"1\", \"text\":\"Pelo menos 9 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"AT_LEAST\" },{ \"name\":\"numero1\" , \"content\":\"9\" }], \"item\":[{ \"id\":\"9\", \"text\":\"Caracteres: sdhaksfdh\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"sdhaksfdh\" }]}\n]\n}\n,{ \"id\":\"6\", \"open\":\"1\", \"text\":\"Entre 5 e 9 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"BETWEEN\" },{ \"name\":\"numero1\" , \"content\":\"5\" },{ \"name\":\"numero2\" , \"content\":\"9\" }], \"item\":[{ \"id\":\"7\", \"text\":\"Caracteres: teste\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"teste\" }]}\n]\n}\n,{ \"id\":\"2\", \"open\":\"1\", \"text\":\"Pode ou nao ter:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"0\" },{ \"name\":\"regra\" , \"content\":\"CONDITIONAL\" }], \"item\":[{ \"id\":\"3\", \"text\":\"Caracteres: b\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"b\" }]}\n,{ \"id\":\"4\", \"open\":\"1\", \"text\":\"Exatamente 5 repeticoes de:\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"false\" },{ \"name\":\"nivel\" , \"content\":\"1\" },{ \"name\":\"regra\" , \"content\":\"EXACT\" },{ \"name\":\"numero1\" , \"content\":\"5\" }], \"item\":[{ \"id\":\"5\", \"text\":\"Caracteres: c\", \"userdata\":[{ \"name\":\"terminal\" , \"content\":\"true\" },{ \"name\":\"nivel\" , \"content\":\"2\" },{ \"name\":\"regra\" , \"content\":\"CHARACTERS\" },{ \"name\":\"texto\" , \"content\":\"c\" }]}\n]\n}\n]\n}\n]}";
		jsonString = "{\"id\":0, \"item\":[]}";
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
	var stringTreeItens = tree.getAllSubItems(0);
	
	//Se nao existir nenhum item dentro da arvore, considera o
	//ultimo ID como o da raiz da arvore, que e zero.
	if (stringTreeItens.length == 0){
		lastID = 0;
	}
	//Se existirem itens dentro da arvore, recupera o maior ID
	//dentre eles e o define como o ultimo ID.
	else{
	
		//Cria um array de IDs a partir de uma string, usando virgula
		//como separador de elementos
		var treeItens = stringTreeItens.split(",");
		
		//Converte todos os itens do array de Strings para inteiros
		for (var i=0; i<treeItens.length; i++){
			treeItens[i] = parseInt(treeItens[i]);
		}
		
		//Ordena os itens do array por ordem numerica
		//http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
		treeItens = treeItens.sort(sortNumber);
		
		//Recupera o ultimo ID do array
		lastID = treeItens[treeItens.length - 1];
	}
	
	//Expande a visualizacao da arvore a partir da raiz (id=0)
	tree.openAllItems(0);
	
	//Adiciona uma funcao na acao de clique, que
	//limpa a selecao da arvore quando clicado fora dela.
    $(document).click(function(e){
    	
    	//Se foi clicado ou no elemento que contem a arvore,
    	//ou em um dos botoes...
        if ($(e.target).is('#regex-tree, #regex-tree *, #buttons, #buttons *')) {
        	//Nao faz nada
            return;
        }
        
        //Se foi clicado fora dela...
        else {
        	//Recupera o item selecionado e remove a selecao dele.
        	tree.clearSelection(tree.getSelectedItemId());
        }
    });
	
});