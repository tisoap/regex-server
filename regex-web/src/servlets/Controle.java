package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import regex.Regex;
import regex.Traducao;


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
		
		//Traduz a expressao inserida, 
		//gerando um objeto Traducao.
		Traducao traducao = regex.traduzir();
		
		//Gera uma lista nao ordenada HTML a partir da traducao
		String texto = traducao.getTextHTML();
		
		//Adiciona esta lista em um parametro do request
		request.setAttribute("traducao", texto);
		
		//TODO Adicionar biblioteca JS de arvore
		
		//Cria um novo "pedido de despache", apontando para a pagina inicial
        RequestDispatcher dispatcher = request.getRequestDispatcher("teste.jsp");
        
        //Encaminha o pedido para a pagina inicial
        dispatcher.forward(request, response);
	}

}
