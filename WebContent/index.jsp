<!DOCTYPE html>
<html>
<head>
	<title>Tradutor de Regex</title>

	<meta charset="utf-8">

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

	<style type="text/css">
		#painel-regex{
			min-height: 170px;
		}
		.well {
			margin: 0;
			border: none;
		}
		input.form-control {
			border: none;
		}
		.input-group {
			width: 100%;
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
		.nav-justified > li {
			float: left;
			width: auto;
		}
		.header{
			margin-top: 3em;
		}
		.footer {
			text-align: center;
		}
		.conteudo {
			min-height: 600px;
		}
	</style>

</head>

<body>

	<div class="row1 header">  
		<p align="center"><img src="img/no.png" alt="Smiley" /></p>
	</div>
	
	<div class="well conteudo">
		<div role="main">

			<div class="row">
			
				<div class="col-sm-1"></div>

				<div class="col-sm-4">
				
					<div class="panel panel-primary" >
						<div class="panel-heading">
							<h3 class="panel-title">Regex para Portugu&ecirc;s:</h3>
						</div>

						<form id="regex-form" method="post" action="Traducao" accept-charset=utf-8>
							<div class="input-group">
								<input type="text" name="regex" value="${regex}" placeholder="Ex.: (a|b)*" class="form-control">
								<div class="input-group-btn">
									<button type="submit" class="btn btn-success" style="border-radius: 2px; background-color: #886EB3; border-color: #886EB3" tabindex="0">Traduzir</button>
								</div>
							</div>
						</form>

					</div>
				</div>
				
				<div class="col-sm-6">
				
					<div class="portuguesParaRegex" role="main">

							<div class="panel panel-primary">

								<div class="panel-heading">
									<h3 class="panel-title">Portugu&ecirc;s para Regex:</h3>
								</div>

								<ul class="nav nav-pills nav-justified">

									<li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">Classe <b class="caret"></b></a>
										<ul class="dropdown-menu">
											<li onclick="addAlNum()"><a>Caracteres alfanumericos</a></li>
											<li onclick="addAlpha()"><a>Caracteres alfabeticos</a></li>
											<li onclick="addBlank()"><a>Espacos e tabula&ccedil;oes</a></li>
											<li onclick="addCntrl()"><a>Caracteres de controle</a></li>
											<li onclick="addDigitClass()"><a>Digitos</a></li>
											<li onclick="addGraph()"><a>Caracteres visiveis</a></li>
											<li onclick="addLower()"><a>Letras minusculas</a></li>
											<li onclick="addPrint()"><a>Caracteres visiveis e espaco</a></li>
											<li onclick="addPunct()"><a>Caracteres de pontuacao</a></li>
											<li onclick="addSpaceClass()"><a>Caracteres brancos</a></li>
											<li onclick="addUpper()"><a>Letras maiusculas</a></li>
											<li onclick="addXDigit()"><a>Numeros hexadecimais</a></li>
										</ul>
									</li>	

									<li><a onclick="addGroup()">Grupo</a></li>
									<li><a onclick="addOption()">Op&ccedil;&atilde;o</a></li>
									<li><a onclick="addMultiple()">M&uacute;ltiplas Op&ccedil;&otilde;es</a></li>

									<li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">Posi&ccedil;&atilde;o <b class="caret"></b></a>
										<ul class="dropdown-menu">
											<li><a onclick="addStart()">In&iacute;cio</a></li>
											<li><a onclick="addEnd()">Fim</a></li>									
										</ul>
									</li>

									<li class="dropdown">
										<a class="dropdown-toggle" data-toggle="dropdown">Repeti&ccedil;&atilde;o <b class="caret"></b></a>
										<ul class="dropdown-menu">
											<li><a onclick="addOneOrMore()">Um ou mais</a></li>
											<li><a onclick="addZeroOrMore()">Zero ou mais</a></li>	
											<li><a onclick="addConditional()">Pode ou n&atilde;o pode ter</a></li>
											<li><a onclick="addExact()">Exatamente N</a></li>
											<li><a onclick="addAtLeast()">Pelo menos N</a></li>
											<li><a onclick="addBetween()">Entre N e M</a></li>
										</ul>
									</li>

									<li class="dropdown">
										<a class="dropdown-toggle" data-toggle="dropdown">Lista <b class="caret"></b></a>
										<ul class="dropdown-menu">
											<li><a onclick="addList()">Lista</a></li>
											<li><a onclick="addNegativeList()">Lista negada</a></li>	
											<li><a onclick="addRange()">S&eacute;rie</a></li>
										</ul>
									</li>

									<li><a onclick="addAnyChar()">Qualquer caractere</a></li>
									<li><a onclick="addCharacters()">Texto</a></li>
									<li><a onclick="removeNode()">Excluir</a></li>
									
									<li>
										<!-- Contrucao DS 1 -->
										<form id="tree-form" method="post" action="Regex" accept-charset=utf-8>
											<button type="submit" onclick="serializeAndSubmit()" class="btn btn-success" style="float: left; border-radius: 2px; background-color: #886EB3; border-color: #886EB3" tabindex="0">
												Construir Regex
											</button>
											<input type="hidden" name="jsonTree" id="serializedInput">
										</form>
									</li>

								</ul>
							</div>
						
					</div>
					
				</div>
			</div>

			<div class="row">

				<div class="col-sm-1"></div>

				<div class="col-sm-4">
					<div class="panel panel-primary"> 
						<div class="panel-heading">
							<h3 class="panel-title">Resultado:</h3>
						</div>

						<textarea class="form-control" rows="5">${traducao}</textarea>

					</div>
				</div>

				<div class="col-sm-6">
						<div style="padding-left: 0px">
							<div class="panel panel-primary" id="painel-regex">
								<div class="panel-heading">
									<h3 class="panel-title">Resultado:</h3>
								</div>
								<div id="regex-tree"></div>
							</div>
						</div>
				</div>
			</div>

			<div class="row">		

				<div class="col-sm-1"></div>

				<div id="errorBox" class="col-sm-10 alert alert-danger alert-dismissible" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<p>${error}</p>	
				</div>
				
			</div>

		</div>  
	</div>

	<div class="well footer" style="background-color: #5CB85C; border-radius: 0px">
		<p>
			<b>RegEx</b>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="getting-started.html" style="color: white">O que &eacute; Regex?</a>&nbsp;&bull;&nbsp;
			<a href="documentation.html" style="color: white">Tutorial Regex</a>&nbsp;&bull;&nbsp;
			<a href="free-psd.html" style="color: white">Como usar o tradutor?</a>
		</p>

		<p>
			&copy; 2015 
			<a href="http://www.flathemes.com" target="_blank" style="color: white">
				REGEX TRANSLATOR
			</a>
			, Inc. All rights reserved. &nbsp;&nbsp;
		</p>
	</div>

</body>
</html>