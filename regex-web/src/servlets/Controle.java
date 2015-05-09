package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import teste.Regex;
import teste.Traducao;

/**
 * Servlet que age como mediador entre a pagina HTML e o algoritimo de traducao.
 * 
 * @author Tiso
 *
 */
@WebServlet("/Traducao")
public class Controle extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	
	/** 
	 * Se invocado, o metodo doGet chama o metodo doPost.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	/**
	 * Recebe a expressao digitada pelo usuario no formulario e retorna uma pagina com a traducao como resposta.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//Recupera o valor digitado pelo usuario
		String input = request.getParameter("regex");
		
		//Instancia a classe responsavel em fazer a traducao, passando
		//para ela o valor recebido do formulario
		Regex regex = new Regex(input);
		
		//Traduz a expressao inserida, gerando um objeto
		//do tipo Traducao.
		Traducao traducao = regex.traduzir();
		
		//Define o tipo de resposta para html
		response.setContentType("text/html");
		
		//Cria um 'escritor' para adcionar conteudo na resposta
		PrintWriter out = response.getWriter();
		
		//TODO Redirecionar para uma pagina JSP
		//TODO Utilizar biblioteca JS de listas na pagina JSP
		
		//Verifica se ocorreram erros
		if (traducao.ocorreuErro()) {
			
			//Coloca uma mensagem de erro na resposta
			out.println("<p>A expressao não está correta</p>");
		}
		
		//Se nao ocorreram erros
		else {
			
			//Recupera a traducao em forma de listas nao ordenadas,
			//utilizando o metodo getTextHTML() do objeto Traducao,
			//e insere estas listas na resposta
			
			//TODO traducao para HTML ainda nao esta completa
			//risco da exibicao nao ser correta
			out.println(traducao.getTextHTML());
		}
	}

}
