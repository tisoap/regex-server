package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import exception.MalformedJson;
import helper.EscapeHelper;
import regex.Construtor;
import regex.Regex;

/**
 * Servlet que age como mediador entre a pagina JSP e o algoritimo
 * de montagem de expressoes regulares.
 *
 * @author Tiso
 *
 */
@WebServlet("/Regex")
public class ControleConstrutor extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	private Regex       regex;
	private Construtor  construtor;
	private String      json, errorMessage = null;

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

		//Recupera o objeto JSON em formato String
		json = request.getParameter("jsonTree");

		//Se o valor recuperado nao for vazio...
		if (json!=null && !json.isEmpty()) {

			//Instancia a classe responsavel por construir o regex
			construtor = new Construtor();

			//Tenta construir a expressao regular a partir do objeto JSON
			try {
				regex = construtor.construir(json);
			}
			catch (MalformedJson e) {
				errorMessage = e.getMessage();
				System.err.println(errorMessage);
				e.printStackTrace();
			}
			catch (IOException e){
				errorMessage = "Erro de IO.";
				e.printStackTrace();
			}
			catch (Exception e){
				errorMessage = "Erro desconhecido.";
				e.printStackTrace();
			}

			//Se conseguiu construir construir a expressao regular...
			if (regex != null){
				
				if (regex.isExpressaoValida()){
					
					//Adiciona a regex construida em um parametro do request
					request.setAttribute("regex", regex.getRegularExpresion());
				}
				else{
					//Adiciona uma mensagem de erro em um parametro do request
					request.setAttribute("error", regex.getErrorMessage());
				}

			}

			//Se nao conseguiu construir a expressao regular...
			else {
				//Adiciona uma mensagem de erro em um parametro do request
				request.setAttribute("error", errorMessage);
			}

			//Adiciona o proprio JSON recebido em um parametro do request
			request.setAttribute("jsonString", EscapeHelper.escapeString(json) );
			
			//Cria um novo "pedido de despache", apontando para a pagina inicial
			RequestDispatcher dispatcher = request.getRequestDispatcher("tree-test.jsp");

			//Encaminha o pedido para a pagina inicial
			dispatcher.forward(request, response);
		}
		
		//Se o valor for vazio...
		else {
			//Envia uma redirecionamento para a pagina inicial como resposta
			response.sendRedirect("tree-test.jsp");
		}
	}

}
