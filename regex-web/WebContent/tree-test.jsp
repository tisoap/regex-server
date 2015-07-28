<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Teste</title>
	
	<!-- JQuery 2.1.3 -->
	<script src="ferramentas/jquery-2.1.3.min.js"></script>
	
	<!-- CSS da biblioteca dhtmlxTree -->
	<link rel="stylesheet" type="text/css" href="ferramentas/dhtmlxtree/dhtmlxtree.css">
	<link rel="stylesheet" type="text/css" href="css/tree-test.css">
	
	<!-- Sripts da biblioteca dhtmlxTree -->
	<script src="ferramentas/dhtmlxtree/dhtmlxcommon.js"></script>
	<script src="ferramentas/dhtmlxtree/dhtmlxtree.js"></script>
	
	<!-- Script principal da pagina -->
	<script>var jsonString;</script>
	<script src="js/main.js"></script>
</head>
<body>

	<div id="content-wrapper">
		<h1>Teste</h1>
		
		<div id="buttons">
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
			<select id="class-select" onchange="addClass()">
				<option selected="selected" value="none">(Escolha uma classe)</option>
				<option value="ALNUM">Caracteres alfanumericos</option>
				<option value="ALPHA">Caracteres alfabeticos</option>
				<option value="BLANK">Espacos e tabulacoes</option>
				<option value="CNTRL">Caracteres de controle</option>
				<option value="DIGIT_CLASS">Digitos</option>
				<option value="GRAPH">Caracteres visiveis</option>
				<option value="LOWER">Letras minusculas</option>
				<option value="PRINT">Caracteres visiveis e espaco</option>
				<option value="PUNCT">Caracteres de pontuacao</option>
				<option value="SPACE_CLASS">Caracteres brancos</option>
				<option value="UPPER">Letras maiusculas</option>
				<option value="X_DIGIT">Numeros hexadecimais</option>
			</select>
			<br>
			<button onclick="addCharacters()">Texto</button>
			<button onclick="removeNode()">Excluir</button>
			<br>
		</div>
		
		<div id="regex-tree"></div>
		
		<br>
		
		<form id="tree-form" method="post" action="Regex">
			<input type="text" name="regex" id="regexInput">
			<input type="hidden" name="jsonTree" id="serializedInput">
			<button onclick="serializeAndSubmit()">Construir Regex</button>
		</form>
	</div>
</body>
</html>
