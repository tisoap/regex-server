/**
 * Contem todos as funcoes que removem elementos da arvore.
 * 
 * @author Tiso
 *
 */

/**
 * Remove o elemento atualmente selecionado.
 * Se nenhum elemento estiver selecionado,
 * esta funcao nao faz nada.
 */
function removeNode() {

	//Recupera o ID do elemento atualmente selecionado na arvore
	var currentSelected = getCurrentSelectedNode();

	//Se nenhum elemento estiver selecionado, nao faz nada.
	if( currentSelected == "0" ) return;

	if( canRemoveNode( currentSelected ) ) {

		//Deleta o item selecionado da arvore, sem selecionar um novo.
		//http://docs.dhtmlx.com/api__dhtmlxtree_deleteitem.html
		tree.deleteItem( currentSelected, false );
	}
}
