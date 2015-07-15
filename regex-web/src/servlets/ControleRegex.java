package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet que age como mediador entre a pagina JSP e o algoritimo de montagem de expressao.
 * 
 * @author Tiso
 *
 */
@WebServlet("/Regex")
public class ControleRegex extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** 
	 * Se invocado, o metodo doGet chama o metodo doPost.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		doPost(request, response);
	}
	
	/**
	 * Recebe a expressao em linguagem natural montada pelo usuario
	 * e retorna a expressao regular em texto.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		//Recupera o valor digitado pelo usuario
		String input = request.getParameter("jsonTree");
		
		//TODO
		System.out.println();
		System.out.println("JSON recebido:");
		System.out.println(input);
		
		//Cria um novo "pedido de despache", apontando para a pagina inicial
		RequestDispatcher dispatcher = request.getRequestDispatcher("tree-test.html");
		
		//Encaminha o pedido para a pagina inicial
		dispatcher.forward(request, response);
	}

}
