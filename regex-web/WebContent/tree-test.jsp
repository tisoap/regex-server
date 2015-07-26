<!DOCTYPE html>
<html>
<head>
	
	<meta charset="UTF-8">
	<title>Teste</title>
	
	<!-- JQuery 2.1.3 -->
	<script src="ferramentas/jquery-2.1.3.min.js"></script>
	
	<!-- CSS da biblioteca dhtmlxTree -->
	<link rel="stylesheet" type="text/css" href="ferramentas/dhtmlxtree/dhtmlxtree.css">
	
	<!-- Sripts da biblioteca dhtmlxTree -->
	<script src="ferramentas/dhtmlxtree/dhtmlxcommon.js"></script>
	<script src="ferramentas/dhtmlxtree/dhtmlxtree.js"></script>
	
	<script>var jsonString;</script>
	
	<!-- Script principal da pagina -->
	<script src="js/main.js"></script>
</head>
<body>
	
	<h2>Teste</h2>
	
	<button onclick="addOneOrMore()">Um ou Mais</button>
	<button onclick="addZeroOrMore()">Zero ou Mais</button>
	<button onclick="addConditional()">Pode ou nao ter</button>
	<button onclick="addExact()">Exatamente</button>
	<button onclick="addAtLeast()">Pelo menos</button>
	<button onclick="addBetween()">Entre</button>
	<br>
	<button onclick="addList()">Lista</button>
	<button onclick="addNegativeList()">Lista Negada</button>
	<button onclick="addGroup()">Grupo</button>
	<button onclick="addMultiple()">Multiplas Opcoes</button>
	<button onclick="addOption()">Opcao</button>
	<br>
	<button onclick="addStart()">Inicio</button>
	<button onclick="addEnd()">Fim</button>
	<button onclick="addAnyChar()">Qualquer caractere</button>
	<button onclick="addRange()">Serie</button>
	<br>
	<button onclick="addCharacters()">Texto</button>
	
	<div id="regex-tree" style="width:500px;height:400px;overflow:auto;"></div>
	
	<form id="tree-form" method="post" action="Regex">
		<input type="text" name="regex" id="regexInput">
		<input type="hidden" name="jsonTree" id="serializedInput">
		<button onclick="serializeAndSubmit()">Traduzir</button>
	</form>	
</body>
</html>
