package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import exception.MalformedJson;
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
public class ControleRegex extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Regex		regex;
	private Construtor	construtor;
	private String		json, stringRegex, errorMessage = null;
	private boolean	regexValida = false;
	
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
			
			//Para testes apenas
			
			System.out.println("JSON recebido:");
			System.out.println(json);
			System.out.println();
			
			//Instancia a classe responsavel por construir o regex
			construtor = new Construtor();
			
			//Tenta construir a expressao regular a partir do objeto JSON
			try {
				stringRegex = construtor.construir(json);
			} catch (MalformedJson e) {
				errorMessage = e.getMessage();
				System.err.println(errorMessage);
				e.printStackTrace();
			}
			
			//Se conseguiu construir construir a expressao regular...
			if (stringRegex != null){
				
				//Instancia a classe responsavel em fazer a validacao
				//da expressao regular
				regex = new Regex(stringRegex);
				
				//Valida a expressao regular
				regexValida = regex.validar();
			
			}
			
			//Se nao conseguiu construir a expressao regular...
			else {
				//Adiciona uma mensagem de erro em um parametro do request
				request.setAttribute("error", "JSON invalido!");
				
				//Adiciona uma mensagem de erro em um cookie
				Cookie cookieError = new Cookie("error","JSON invalido! " + errorMessage);
				cookieError.setMaxAge(60);
				response.addCookie(cookieError);
			}
			
			//Se a expressao regular for valida
			if (regexValida){
				
				//Adiciona a regex construida em um parametro do request
				request.setAttribute("regex", stringRegex);
				
				//Adiciona a regex construida em um cookie
				Cookie cookieRegex = new Cookie("regex",stringRegex);
				cookieRegex.setMaxAge(60);
				response.addCookie(cookieRegex);
			}
			//Se a expressao regular nao for valida e nao ocorreu erro na
			//Leitura do JSON
			else if (stringRegex != null){
				//TODO Melhorar envio de mensagens de erro
				
				//Adiciona uma mensagem de erro em um parametro do request
				request.setAttribute("error", "Regex invalida!");
				
				//Adiciona uma mensagem de erro em um cookie
				Cookie cookieError = new Cookie("error","Regex invalida!");
				cookieError.setMaxAge(60);
				response.addCookie(cookieError);
			}
			
			//Adiciona o proprio JSON recebido em um parametro do request
			request.setAttribute("traducaoJson", json);
			
			//Adiciona o proprio JSON recebido em um cookie
			Cookie cookieJson = new Cookie("traducaoJson",json);
			cookieJson.setMaxAge(60);
			response.addCookie(cookieJson);
			
			//Cria um novo "pedido de despache", apontando para a pagina inicial
			RequestDispatcher dispatcher = request.getRequestDispatcher("tree-test.jsp");
			
			//Encaminha o pedido para a pagina inicial
			dispatcher.forward(request, response);
		}
		
		//Se o valor do JSON recuperdo for vazio
		else {
			//Envia uma redirecionamento para a pagina inicial como resposta
			response.sendRedirect("tree-test.jsp");
		}
	}

}
