<!DOCTYPE html>
<!--autora: Cristhiane 
data: 04/15  

 -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>RegEx - Regular Expression Translator</title>   <!-- título da pagina -->

    <!-- Bootstrap core CSS -->
    <link href="Ferramentas/bootstrap-3.3.4-dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="Ferramentas/bootstrap-3.3.4-dist/css/bootstrap-theme.min.css" rel="stylesheet">
	
    <!-- Custom styles for this template -->
    <link href="theme.css" rel="stylesheet">
	
	<!-- CSS de teste-->
    <link href="teste.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
	

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body role="document">

    <!-- BANNER -->
   <div class="header-wrapper">  <!-- classe para navbar no Bootstrap-->
		<header> <!-- header é uma tag para uso no topo-->
			<img src="prot.png" alt="Smiley">  <!-- Colocar imagem de fundo (background image e background-repeat no repeat)-->
		</header>
	</div>
	
     <!--NAVBAR COM LINKS  --> 
	<nav class="navbar navbar-inverse "> <!-- nav bar inverse é de cor preta -->
		<div class="container-fluid"> <!-- padrão para colocar nav bar como cabeçalho --> 
			<div class="navbar-header">  <!-- padrão para colocar nav bar como cabeçalho --> 
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <!-- formula o header para ter vários botões --> 
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#"> <span class="glyphicon glyphicon-home" aria-hidden="true"></span></a> <!-- classe para título à esquerda. Glyphicon coloca símbolos, no caso esse é o de home -->
				
			</div>
			
			<!-- LINKS à DIREITA-->
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">  <!-- classe para colocar os links à direita -->
					<li><a href="#">O que é expressão regular?</a></li>
					<li><a href="#">Saiba Mais</a></li>
				</ul>         
			</div>
		</div>
    </nav>

	 <!-- BODY -->
    <div class="container theme-showcase" role="main"> <!-- para colocar o corpo de texto. Formata o título e as caixas de texto juntos.-->
 		<div class="page-header">  <!-- título da página --> 
			<h1>Tradutor de expressões regulares</h1>
		</div>
        <div class="row">   <!--row é uma classe para colocar a posição dos elementos na página-->
			<form method="post" action="Traducao">
				<div class="col-sm-8">   <!-- coluna para posição-->
				
					<!-- ENTRADA DE TEXTO. Painel de antes de apertar o botão. -->
					<div class="panel panel-default">  <!-- panel coloca a caixa de texto e seu título. Default é do bootstrap como cinzinha/azulzinho. -->
						<div class="panel-heading">  <!-- título do Panel não editável-->
							<h3 class="panel-title">Digite a expressão regular:</h3>
						</div>
						<div class="form-group">
							<input type="text" name="regex" class="form-control" placeholder="${regex}">
							  <!-- Caixa para a inserção de texto, coloquei dentro do Panel, mas não é obrigatório.-->
						</div>
					</div>
				
					<!-- SAÍDA DE TEXTO, após apertar o botão de operação traduzir.-->
					<div class="panel panel-default"> <!-- panel coloca a caixa de texto e seu título. Default é do bootstrap como cinzinha/azulzinho. -->
						<div class="panel-heading"><!-- título do Panel não editável-->
							<h3 class="panel-title">Resultado:</h3>
						</div>
						${traducao}
					</div>
				</div><!-- /.col-sm-4 -->
			
				<div class="col-sm-4">  <!-- Coluna que fica a direita -->
					<button type="submit" class="btn btn-default">Traduzir</button> <!--Botão Traduzir-->   			  
				</div><!-- /.col-sm-4 -->
           </form>
		</div>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript   
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="Ferramentas/jquery-2.1.3.min.js"></script>  <!-- funciona como biblioteca para usar jquery -->
    <script src="Ferramentas/bootstrap-3.3.4-dist/js/bootstrap.min.js"></script> <!-- funciona como biblioteca para usar as funcionalidades do bootstrap-->
    <!-- <script src="../../assets/js/docs.min.js"></script> -->  
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
