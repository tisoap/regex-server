package servlets;

import static helper.EscapeHelper.encodeHtmlString;

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
 * Servlet que age como mediador entre a pagina JSP e o algoritimo de traducao.
 *
 * @author Tiso
 *
 */
@WebServlet("/Traducao")
public class ControleTradutor extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private RequestDispatcher dispatcher;
	private Regex             regex;
	private Traducao          traducao;
	private String            input, jsonString, texto;

	/**
	 * Se invocado, o metodo doGet chama o metodo doPost.
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/** DS1 02-61 */

	/**
	 * Recebe a expressao digitada pelo usuario no
	 * formulario e retorna uma pagina com a traducao como resposta.
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		//Recupera o valor digitado pelo usuario
		input = request.getParameter("regex");

		//Se o valor recuperado for vazio, envia uma redirecionamento
		//para a pagina inicial como resposta
		if ((input==null) || input.isEmpty()){
			response.sendRedirect("index.jsp");
			return;
		}

		//Se o valor recuperado for muito grande, retorna uma mensagem de erro
		if (input.length() >= 512){
			request.setAttribute("error", "Tamanho da expressao maior do que o permitido.");
			RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
			dispatcher.forward(request, response);
			return;
		}

		//Instancia a classe responsavel em fazer a traducao, passando
		//para ela o valor recebido do formulario
		regex = new Regex(input);

		//Traduz a expressao inserida,
		//gerando um objeto Traducao.
		traducao = regex.traduzir();

		//Se nao ocorreu erro na analise
		if (traducao.ocorreuErro())
			request.setAttribute("error", encodeHtmlString(traducao.getMensagemErro()) );


		/** ----- DS1 36-56 ----- **/
		//Gera um objeto JSON em formato String a partir da traducao
		jsonString = traducao.getEscapedJSONString();

		/** DS1 57-58 */
		//Gera um texto puro a partir da traducao, com
		//caracteres especiais convertidos para entidades HTML
		texto = traducao.getTextHtml();

		/** DS1 59-60 */
		//Converte os caracteres especiais do input pra entidades HTML
		input = encodeHtmlString(input);

		//Adiciona os parametros do request
		request.setAttribute("jsonString", jsonString);
		request.setAttribute("regex", input);
		request.setAttribute("traducao", texto);

		dispatcher = request.getRequestDispatcher("index.jsp");

		//Encaminha o pedido para a pagina inicial
		/** ----- DS 61 ----- **/
		dispatcher.forward(request, response);
	}

}
