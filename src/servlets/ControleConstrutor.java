package servlets;

import static helper.EscapeHelper.encodeHtmlString;
import static helper.EscapeHelper.escapeString;
import static helper.EscapeHelper.removeNewLines;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import exception.MalformedJson;
import regex.Construtor;
import regex.Regex;

/**
 * Servlet que age como mediador entre a pagina JSP e o algoritimo
 * de montagem de expressoes regulares.
 */
@WebServlet("/Regex")
public class ControleConstrutor extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private Regex       regex;
	private Construtor  construtor;
	private String      json, errorMessage, textoRegex = null;

	/**
	 * JSON vazio padrao da biblioteca DHTMLX Tree.
	 */
	private static final String emptyJson = "{\"id\":\"0\", \"item\":[]}";

	/**
	 * Se invocado, o metodo doGet chama o metodo doPost.
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * Recebe a expressao em linguagem natural montada pelo usuario
	 * e retorna a expressao regular em texto.
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		//Recupera o objeto JSON em formato String
		json = request.getParameter("jsonTree");

		//Se o valor recuperado for vazio, envia um redirecionamento
		//para a pagina inicial
		if ((json==null) || json.isEmpty() || json.equals(emptyJson)){
			response.sendRedirect("index.jsp");
			return;
		}

		//Se o valor recuperado for muito grande, retorna uma mensagem de erro
		if (json.length() >= 30000){
			request.setAttribute("error", "Tamanho de arvore maior do que o permitido.");
			RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
			dispatcher.forward(request, response);
			return;
		}

		//Instancia a classe responsavel por construir o regex
		construtor = new Construtor();

		//Remove qualquer quebra de linha no JSON
		json = removeNewLines(json);

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

			//Se a expressao regular for valida
			if (regex.isExpressaoValida()){

				//Recupera o texto da expressao regular
				textoRegex = regex.getRegularExpresion();

				//Adiciona a regex construida
				request.setAttribute("regex", encodeHtmlString(textoRegex) );

			} else
				//Adiciona a mensagem indicando porque a expressao nao e valida
				request.setAttribute("error", encodeHtmlString(regex.getErrorMessage()) );

		} else
			//Adiciona a mensagem indicando porque nao consegui construir a expressao
			request.setAttribute("error", encodeHtmlString(errorMessage) );

		//Adiciona o proprio JSON recebido em um parametro do request
		request.setAttribute("jsonString", escapeString(json) );

		//Cria um novo "pedido de despache", apontando para a pagina inicial
		RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");

		//Encaminha o pedido para a pagina inicial
		dispatcher.forward(request, response);
	}

}
