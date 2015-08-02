/**
 * Contem todos as funcoes que tratam do
 * envio do formulario.
 * 
 * @author Tiso
 *
 */

/**
 * Serializa a arvore e envia para o servidor.
 */
function serializeAndSubmit(){
	
	//Recupera o campo oculto do formulario que vai receber a arvore serializada
	var input = document.getElementById("serializedInput");
	
	//Serializa a arvore para JSON, em formato String
	var serializedTree = tree.serializeTreeToJSON();
	
	//Define o valor do campo como o objeto JSON serializado
	input.value = serializedTree;
	
	//Faz o submit do formulario
	/** ----- DS 2 ----- */
	document.getElementById('tree-form').submit();
}