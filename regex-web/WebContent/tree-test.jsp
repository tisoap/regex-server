<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Teste</title>
	
	<!-- JQuery 2.1.3 -->
	<script src="ferramentas/jquery-2.1.3.min.js"></script>
	
	<!-- CSS da biblioteca DHTMLX Tree -->
	<link rel="stylesheet" type="text/css" href="ferramentas/dhtmlxtree/dhtmlxtree.css">
	
	<!-- CSS da pagina de teste -->
	<link rel="stylesheet" type="text/css" href="css/tree-test.css">
	
	<!-- DHTMLX Tree -->
	<script src="ferramentas/dhtmlxtree/dhtmlxcommon.js"></script>
	<script src="ferramentas/dhtmlxtree/dhtmlxtree.js"></script>
	
	<!-- cookies.js -->
	<script src="ferramentas/cookies.js"></script>
	
	<!-- Scripts principais da pagina -->
	<script src="js/01-construtor.js"></script>
	<script src="js/02-addFunctions.js"></script>
	<script src="js/03-auxiliaryAddFunctions.js"></script>
	<script src="js/04-testFunctions.js"></script>
	<script src="js/05-deleteFunctions.js"></script>
	<script src="js/06-generalFunctions.js"></script>
	<script src="js/07-submit.js"></script>
	
</head>
<body>

	<div id="content-wrapper">
		
		<h1>Teste</h1>
		
		<form id="regex-form" method="post" action="Traducao">
			<input type="text" name="regex" class="form-control" value="${regex}" placeholder="Ex.: (a|b)*">
			<button type="submit" class="btn btn-default">Traduzir Regex</button>
			<input type="hidden" name="testPage" value="true">
		</form>
		
		<br>
		
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
		
		<br>
		
		<div id="regex-tree"></div>
		
		<form id="tree-form" method="post" action="Regex">
			<button onclick="serializeAndSubmit()">Construir Regex</button>
			<input type="hidden" name="jsonTree" id="serializedInput">
		</form>
		
		<p>${error}</p>
		
	</div>
</body>
</html>
