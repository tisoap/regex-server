<!DOCTYPE html>

<!--
Autora: Cristhiane 
Data: 04/15  
-->
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RegEx - Regular Expression Translator</title>
	
    <!-- Bootstrap -->
    <link href="ferramentas/bootstrap-3.3.4-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="ferramentas/bootstrap-3.3.4-dist/css/bootstrap-theme.min.css" rel="stylesheet">
	
    <!-- dhtmlxtree -->
    <link rel="stylesheet" type="text/css" href="ferramentas/dhtmlxtree/dhtmlxtree.css">
	<script src="ferramentas/dhtmlxtree/dhtmlxcommon.js"></script>
	<script src="ferramentas/dhtmlxtree/dhtmlxtree.js"></script>
	<script src="ferramentas/dhtmlxtree/dhtmlxtree_start.js"></script>
    
    <!-- CSS de teste-->
    <link href="css/teste.css" rel="stylesheet">
	
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body role="document">

    <!-- BANNER -->
	
	<!-- classe para navbar no Bootstrap-->
	<div class="header-wrapper">  
	
		<!-- header e uma tag para uso no topo-->
		<header>
		
			<!-- Colocar imagem de fundo (background image e background-repeat no repeat)-->
			<img src="img/prot.png" alt="Smiley">
		</header>
	</div>
	
    <!--NAVBAR COM LINKS  --> 
	
	<!-- nav bar inverse e de cor preta -->
	<nav class="navbar navbar-inverse ">
	
		<!-- padrao para colocar nav bar como cabecalho --> 
		<div class="container-fluid">
		
			<!-- padrao para colocar nav bar como cabecalho --> 
			<div class="navbar-header">
			
				<!-- formula o header para ter varios botoes --> 
				<button 
					type="button" 
					class="navbar-toggle collapsed" 
					data-toggle="collapse" 
					data-target="#navbar" 
					aria-expanded="false" 
					aria-controls="navbar"> 
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
				</button>
				
				<!-- classe para titulo a esquerda. Glyphicon coloca simbolos, no caso esse e o de home -->
				<a class="navbar-brand" href="#">
					<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
				</a> 
				
			</div>
			
			<!-- LINKS A DIREITA-->
			<div id="navbar" class="navbar-collapse collapse">
				<!-- classe para colocar os links a direita -->
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#">O que &eacute; express&atilde;o regular?</a></li>
					<li><a href="#">Saiba Mais</a></li>
				</ul>
			</div>
			
		</div>
    </nav>

	<!-- BODY -->
	
	<!-- para colocar o corpo de texto. Formata o titulo e as caixas de texto juntos.-->
    <div class="container theme-showcase" role="main">
		
		<!-- titulo da pagina --> 
 		<div class="page-header">
			<h1>Tradutor de express&otilde;es regulares</h1>
		</div>
		
		<!--row e uma classe para colocar a posicao dos elementos na pagina-->
        <div class="row">
			
			
			<form method="post" action="Traducao">
			
				<!-- coluna para posição-->
				<div class="col-sm-8">
				
					<!-- ENTRADA DE TEXTO. Painel de antes de apertar o botão. -->
					
					<!-- panel coloca a caixa de texto e seu titulo. Default é do bootstrap como cinzinha/azulzinho. -->
					<div class="panel panel-default">
					
						<!-- titulo do Panel nao editavel-->
						<div class="panel-heading">
							<h3 class="panel-title">Digite a express&atilde;o regular:</h3>
						</div>
						
						<div class="form-group">
							<!-- Caixa para a insercao de texto, coloquei dentro do Panel, mas nao e obrigatorio.-->
							<input type="text" name="regex" class="form-control" value="${regex}" placeholder="(a|b)*">
						</div>
					</div>
					
					<!-- SAIDA DE TEXTO, apos apertar o botao de operação traduzir.-->
					<!-- panel coloca a caixa de texto e seu titulo. Default e do bootstrap como cinzinha/azulzinho. -->
					<div class="panel panel-default">
					
						<!-- titulo do Panel nao editavel-->
						<div class="panel-heading">
							<h3 class="panel-title">Resultado:</h3>
						</div>
                        
                        <!--
                        div que recebe o resultado da traducao, 
                        fazendo uso da biblioteca dhtmlxTree
                        -->
                        <div 
                        class="dhtmlxTree"
                        id="treeboxbox_tree"
                        setImagePath="ferramentas/dhtmlxtree/imgs/dhxtree_skyblue/">
                        	
                            ${traducao}
                            
                        </div>
                        
                        <!--
                        Script inline que inicializa a exibicao da arvore de dados 
                        a partir da lista HTML recebida
                        -->
						<script>
							var myTree = dhtmlXTreeFromHTML("treeboxbox_tree");
						</script>
                        
					</div>
				</div><!-- /.col-sm-8 -->
				
				<!-- Coluna que fica a direita -->
				<div class="col-sm-4">
					<!--Botao Traduzir-->  
					<button type="submit" class="btn btn-default">Traduzir</button> 			  
				</div><!-- /.col-sm-4 -->
				
           </form>
		</div>
    </div>

    <!-- Bootstrap core JavaScript   
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="ferramentas/jquery-2.1.3.min.js"></script>  <!-- funciona como biblioteca para usar jquery -->
    <script src="ferramentas/bootstrap-3.3.4-dist/js/bootstrap.min.js"></script> <!-- funciona como biblioteca para usar as funcionalidades do bootstrap-->
    <!-- <script src="../../assets/js/docs.min.js"></script> -->  
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
