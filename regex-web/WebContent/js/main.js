/**
 * JS para manipulacao da arvore dhtmlxTree.
 * 
 * @author Tiso
 *
 */


/** ----- Inicializacao ----- **/

//JSON com a arvore de traducao em formato string
//var jsonString = "{\"id\":0,\"item\":[{\"id\":1,\"text\":\"Grupo 1:\",\"child\":1,\"userdata\":[{\"name\":\"Nivel\",\"value\":0},{\"name\":\"Original\",\"value\":\"(a)\"},{\"name\":\"TipoRegra\",\"value\":\"GROUP\"},{\"name\":\"isTerminal\",\"value\":false}],\"item\":[{\"id\":2,\"text\":\"Caracteres: a\",\"child\":0,\"userdata\":[{\"name\":\"Nivel\",\"value\":1},{\"name\":\"Original\",\"value\":\"a\"},{\"name\":\"TipoRegra\",\"value\":\"CHARACTERS\"},{\"name\":\"isTerminal\",\"value\":true}]}]}]}"

//Conversao da string para objeto JSON
var json = jQuery.parseJSON(jsonString);

//Inicializa um novo objeto de arvore
var tree = new dhtmlXTreeObject("regex-tree","100%","100%",0);

//Ativa a opcao de clicar e arastar elementos da arvore. 
//enableDragAndDrop(mode, rmode), onde:
//mode  = ativa ou nao o drad-and-drop
//rmode = permite ou nao que um elemento seja arastado para a raiz da arvore
tree.enableDragAndDrop(true, false);

//Define o caminho com as imagens a serem usadas pela arvore
tree.setImagePath("ferramentas/dhtmlxtree/imgs/dhxtree_web/");
//tree.setImagePath("../ferramentas/dhtmlxtree/imgs/dhxtree_web/");

//Carrega os dados do objeto JSON na arvore
tree.loadJSONObject(json);

//Recupera um array com todos os IDs de todos os itens dentro da raiz da arvore
var treeItens = tree.getAllSubItems(0);

//Recupera o ultimo ID do array, convertendo-o para numero inteiro
var lastID = parseInt(treeItens[treeItens.length - 1]);

//Define o no selecionado como o primeiro elemento
var currentSelected;
tree.selectItem(1,false,false);

//Expande a visualizacao da arvore a partir da raiz (id=0)
tree.openAllItems(0);


/** ----- Funcoes Auxiliares ----- **/

function addNonTerminal(label) {
	
	currentSelected = tree.getSelectedItemId();
	lastID++;
	tree.insertNewChild(currentSelected,lastID,label,0,0,0,0,"CHILD");
}

function addTerminal(label) {
	
	currentSelected = tree.getSelectedItemId();
	lastID++;
	tree.insertNewChild(currentSelected,lastID,label,0,0,0,0);
}

/** ----- Funcoes Adcionar Nos ----- **/

/**
 * Insere um no 'Um ou mais' na arvore
 */
function addNodeOneOrMore(){
	addNonTerminal("Um ou mais:");
}

//TODO
function serializeAndSubmit(){
	document.getElementById('tree-form').submit();
}