/**
 * JS com as funcoes de manipulacao da arvore dhtmlxTree.
 * 
 * @author Tiso
 *
 */

//Inicializacao da arvore via script
var myTree = dhtmlXTreeFromHTML("regex-tree");

/**
 * Insere um no 'Um ou mais' na arvore
 */
function addNodeOneOrMore(){
	
	//TODO
	myTree.insertNewNext(1,2,"Um ou mais:",0,0,0,0,"CHILD");
	
}

//TODO
function serializeAndSubmit(){
	document.getElementById('tree-form').submit();
}