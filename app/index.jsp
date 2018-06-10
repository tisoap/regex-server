<!DOCTYPE html>
<html>
<head>
	<title>Tradutor de Regex</title>
	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="robots" content="all">
	
	<script type="text/javascript" src="ferramentas/jquery-2.1.3.min.js" ></script>
	<script type="text/javascript" src="ferramentas/dhtmlxtree/dhtmlxcommon.js" ></script>
	<script type="text/javascript" src="ferramentas/dhtmlxtree/dhtmlxtree.js" ></script>

	<script type="text/javascript">
		var jsonString  = "${jsonString}";
		var error = "${error}";
	</script>

	<script type="text/javascript" src="js/01-construtor.js" ></script>
	<script type="text/javascript" src="js/02-addFunctions.js" ></script>
	<script type="text/javascript" src="js/03-auxiliaryAddFunctions.js" ></script>
	<script type="text/javascript" src="js/04-testFunctions.js" ></script>
	<script type="text/javascript" src="js/05-deleteFunctions.js" ></script>
	<script type="text/javascript" src="js/06-generalFunctions.js" ></script>
	<script type="text/javascript" src="js/07-submit.js" ></script>

	<script type="text/javascript" src="ferramentas/bootflat/js/bootstrap.min.js" ></script>

	<link rel="stylesheet" type="text/css" href="ferramentas/bootflat/css/bootstrap.min.css" ></link>
	<link rel="stylesheet" type="text/css" href="ferramentas/dhtmlxtree/dhtmlxtree.css" ></link>
	<link rel="stylesheet" type="text/css" href="css/main.css" ></link>
	
	<style type="text/css">
		.btn.btn-success{
			min-width: 140px;
		}
		.input-group-btn {
			width: 20%;
		}
		.input-group-btn button {
			width: 100%;
			min-width: 100px;
		}
		.input-group-btn:last-child > .btn {
			margin-left: 0;
		}
		#greenBox,
		#blueBox {
			min-height: 450px;
			line-height: 1;
		}
	</style>
</head>

<body>

	<div id="header" class="row1">
		<div id="header-wrapper">
			<ul class="list-unstyled">
				<li>
					<a href="tabela.html" data-toggle="tooltip" data-placement="bottom" title="Tabela de símbolos Regex"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a>
				</li>
				<li>
					<a href="tutorial.html" data-toggle="tooltip" data-placement="bottom" title="Como usar o tradutor?"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a>
				</li>
				<li>
					<a href="regex.html" data-toggle="tooltip" data-placement="bottom" title="O que são expressões regulares?"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></a>
				</li>
				<li class="logo">
					<a href="index.jsp" ><img src="img/no.png" alt="Smiley" /></a>
				</li>
			</ul>
		</div>
	</div>
	<div class="clear"></div>
	
	<!-- Modal para testar condições -->
	<div class="modal fade" id="testModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
	    	<div class="modal-content">
	      		<div class="modal-header">
	      			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        		<h4 class="modal-title" id="myModalLabel">Atenção!</h4>
	      		</div>
	      		<div class="modal-body">
	      			<span id="modalText">Um texto será colocado aqui através do JS</span>
	      		</div>
	      		<div class="modal-footer">
	        		<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
	      		</div>
	    	</div>
	  	</div>
	</div>
	
	<!-- Modal para input de dados -->
	<div class="modal fade" id="inputModal" tabindex="-1" role="dialog" aria-labelledby="inputModalLabel">
		<div class="modal-dialog" role="document">
	    	<div class="modal-content">
	      		<div class="modal-header">
	        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        		<h4 class="modal-title" id="exampleModalLabel">Incluir dados</h4>
	      		</div>
	      		<div class="modal-body">
	      			<form>
		          		<div class="form-group">
		            		<label for="input-name" class="control-label">Este texto será trocado via JS:</label>
		            		<input type="text" autofocus="autofocus" class="form-control" id="inputText1">
		            		<br/>
		            		<label id="alternativeLabel" for="input-name" class="control-label">Este texto será trocado via JS:</label>
		            		<input type="text" class="form-control" id="inputText2">
		          		</div>
	          		</form>
	      		</div>
	      		<div class="modal-footer">
	        		<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
	        		<button id="inputModalButton" type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
	      		</div>
	    	</div>
	  	</div>
	</div>
	
	
	<div id="content-wrapper">
		<div class="col-sm-6" align="center">
			<div id="blueBox" class="alert alert-info" role="alert">
				<!-- DS1 01-62 -->
				<form id="regex-form" method="post" action="Traducao" accept-charset=utf-8>
					<div class="panel panel-primary" >
						<div class="panel-heading">
							<h3 class="panel-title">Regex para Portugu&ecirc;s:</h3>
						</div>
						<div class="input-group">
							<input type="text" name="regex" value="${regex}" placeholder="Ex.: (a|b)*" class="form-control">
						</div>
					</div>
					<div style="margin-top: -10px;">
						<button type="submit" class="btn btn-success" style="border-radius: 2px; background-color: #886EB3; border-color: #886EB3; width: 100%" tabindex="0">Traduzir</button>
					</div>
				</form>
				<p style="height: 65px"></p>
				<div class="panel panel-primary"> 
					<div class="panel-heading">
						<h3 class="panel-title">Resultado em texto:</h3>
					</div>
					<textarea id="textResult" class="form-control" rows="5">${traducao}</textarea>
				</div>
				<div style="margin-top: -15px;">
					<button type="button" onclick="selectAll()" class="btn btn-success" style="border-radius: 2px; background-color: #886EB3; border-color: #886EB3; width: 25%; float: right;" tabindex="0">Selecionar Tudo</button>
				</div>
			</div>	
		</div>
		
		<div class="col-sm-6" align="center">
			<div id="greenBox" class="alert alert-success" role="alert">
				<div class="panel panel-primary" >
					<div class="panel-heading">
						<h3 class="panel-title">Portugu&ecirc;s para Regex:</h3>
					</div>
					<ul class="nav nav-pills nav-justified">
						<!-- Classe -->
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Classe <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li onclick="addAlNum()"><a href="#/" >Caracteres alfanumericos</a></li>
								<li onclick="addAlpha()"><a href="#/" >Caracteres alfabeticos</a></li>
								<li onclick="addBlank()"><a href="#/" >Espacos e tabula&ccedil;oes</a></li>
								<li onclick="addCntrl()"><a href="#/" >Caracteres de controle</a></li>
								<li onclick="addDigitClass()"><a href="#/" >Digitos</a></li>
								<li onclick="addGraph()"><a href="#/" >Caracteres visiveis</a></li>
								<li onclick="addLower()"><a href="#/" >Letras minusculas</a></li>
								<li onclick="addPrint()"><a href="#/" >Caracteres visiveis e espaco</a></li>
								<li onclick="addPunct()"><a href="#/" >Caracteres de pontuacao</a></li>
								<li onclick="addSpaceClass()"><a href="#/" >Caracteres brancos</a></li>
								<li onclick="addUpper()"><a href="#/" >Letras maiusculas</a></li>
								<li onclick="addXDigit()"><a href="#/" >Numeros hexadecimais</a></li>
							</ul>
						</li>
						<!-- Lista -->
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Lista <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#/" onclick="addList()">Lista</a></li>
								<li><a href="#/" onclick="addNegativeList()">Lista negada</a></li>	
								<li><a href="#/" id="buttons" data-toggle="modal" data-target="#inputModal" data-message="Digite o " data-name="serie">S&eacute;rie</a></li>
							</ul>
						</li>
						<!-- Posição -->
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Posi&ccedil;&atilde;o <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#/" onclick="addStart()">In&iacute;cio</a></li>
								<li><a href="#/" onclick="addEnd()">Fim</a></li>									
							</ul>
						</li>
						<!-- Repetição -->
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Repeti&ccedil;&atilde;o <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#/" onclick="addOneOrMore()">Um ou mais</a></li>
								<li><a href="#/" onclick="addZeroOrMore()">Zero ou mais</a></li>	
								<li><a href="#/" onclick="addConditional()">Pode ou n&atilde;o pode ter</a></li>
								<li><a href="#/" id="buttons" data-toggle="modal" data-target="#inputModal" data-message="Digite a quantidade:" data-name="exatamenteN">Exatamente N</a></li>
								<li><a href="#/" id="buttons" data-toggle="modal" data-target="#inputModal" data-message="Digite a quantidade:" data-name="peloMenosN">Pelo menos N</a></li>
								<li><a href="#/" id="buttons" data-toggle="modal" data-target="#inputModal" data-message="Digite o " data-name="entreNeM">Entre N e M</a></li>
							</ul>
						</li>
						<!-- Restante das opções sem dropdown -->
						<li><a href="#/" onclick="addGroup()">Grupo</a></li>
						<li><a href="#/" onclick="addMultiple()">M&uacute;ltiplas Op&ccedil;&otilde;es</a></li>
						<li><a href="#/" onclick="addOption()">Op&ccedil;&atilde;o</a></li>
						<li><a href="#/" onclick="addAnyChar()">Qualquer caractere</a></li>
						<li><a href="#/" id="buttons" data-toggle="modal" data-target="#inputModal" data-message="Digite seu texto:" data-name="texto">Texto</a></li>
						<li><a href="#/" onclick="removeNode()" style="color: red">Excluir</a></li>
					</ul>
				</div>
				<!-- DS2 1-38 -->
				<form id="tree-form" method="post" action="Regex" accept-charset=utf-8>
					<div style="margin-top: -10px;">
						<button type="submit" onclick="serializeAndSubmit()" class="btn btn-success" style="border-radius: 2px; background-color: #886EB3; border-color: #886EB3; width: 100%" tabindex="0">Construir Regex</button>
						<input type="hidden" name="jsonTree" id="serializedInput">
					</div>
				</form>
				<br/>
				<div class="panel panel-primary" id="painel-regex">
					<div class="panel-heading">
						<h3 class="panel-title">Resultado em árvore:</h3>
					</div>
					<div id="regex-tree"></div>
				</div>
			</div>
		</div>
		<div id="errorBox" class="col-sm-12 alert alert-danger alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<b>Oh, deu erro!</b>
			<p>${error}</p>	
		</div>
	</div>
		
	<div id="footer" class="footer well" style="background-color: #5CB85C; border-radius: 0px">
		<div id="footer-wrapper">
			<p>
				<b>RegEx - Padrão POSIX ERE V1</b>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="regex.html" style="color: white">O que são expressões regulares?</a>&nbsp;&bull;&nbsp;
				<a href="tabela.html" style="color: white">Tabela de símbolos Regex</a>&nbsp;&bull;&nbsp;
				<a href="tutorial.html" style="color: white">Como usar o tradutor?</a>
				
			</p>
	
			<p>
				&copy; 2015 
				<a href="index.jsp" target="_blank" style="color: white">
					Tradutor de Regex
				</a>
			</p>
		</div>
	</div>
	
	<script>
		// Armazena o texto traduzido
		var textBox = document.getElementById("textResult");
	    
		// Seleciona o texto armazenado
	    function selectAll(){
	        textBox.select();
	    }
	    
	    $('#inputModal').on('show.bs.modal', function (event) {
		 	var button = $(event.relatedTarget); // Botão que instanciou o modal
		 	var labelText = button.data('message'); // Extrai a informação do atributo data-message
		 	var buttonName = button.data('name'); // Extrai a informação do atributo data-name
		 	
		 	// Limpa o campo de texto
		 	$('#inputText1').val("");
		 	$('#inputText2').val("");
		 	
		 	// Esconde os dois campos extras por padrão
		 	$('#inputText2').hide();
	 		$('#alternativeLabel').hide();
		 	
		 	// Limpa a label e substitui pela nova
		 	var modal = $(this);
		 	modal.find('.modal-body label').empty();
		 	modal.find('.modal-body label').text(labelText);
		 	
		 	// Adiciona a ação javascript referente ao botão clicado
		 	if(buttonName == "texto") {
		 		$("#inputModalButton").attr("onclick", "addCharacters()");	
		 	} else if(buttonName == "exatamenteN") {
		 		$("#inputModalButton").attr("onclick", "addExact()");	
		 	} else if(buttonName == "peloMenosN") {
		 		$("#inputModalButton").attr("onclick", "addAtLeast()");	
		 	} else if(buttonName == "entreNeM") {
		 		modal.find('.modal-body label').text(labelText + "primeiro número:");
		 		$('#alternativeLabel').text(labelText + "segundo número:");
		 		$('#inputText2').show();
		 		$('#alternativeLabel').show();
		 		$("#inputModalButton").attr("onclick", "addBetween()");
		 	} else if(buttonName = "serie") {
		 		modal.find('.modal-body label').text(labelText + "primeiro caractere:");
		 		$('#alternativeLabel').text(labelText + "último caractere:");
		 		$('#inputText2').show();
		 		$('#alternativeLabel').show();
		 		$("#inputModalButton").attr("onclick", "addRange()");
		 	}
	   	});
	    
	    // Coloca o foco no campo de texto
	   	$('#inputModal').on('shown.bs.modal', function (event) {
	   		$('#inputText1').focus();
	   	})
	</script>
</body>
</html>