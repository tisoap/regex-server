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
 * Servlet que age como mediador entre a pagina JSP e o algoritimo de traducao.
 *
 * @author Tiso
 *
 */
@WebServlet("/Traducao")
public class ControleTraducao extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	private RequestDispatcher dispatcher;
	private Regex             regex;
	private Traducao          traducao;
	private String            input, jsonString, texto;

	/**
	 * Se invocado, o metodo doGet chama o metodo doPost.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * Recebe a expressao digitada pelo usuario no
	 * formulario e retorna uma pagina com a traducao como resposta.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		//Recupera o valor digitado pelo usuario
		input = request.getParameter("regex");

		//Se o valor recuperado nao for vazio...
		if (input!=null && !input.isEmpty()){

			//Instancia a classe responsavel em fazer a traducao, passando
			//para ela o valor recebido do formulario
			/** ----- DS 3-16 ----- **/
			regex = new Regex(input);

			//Traduz a expressao inserida,
			//gerando um objeto Traducao.
			/** ----- DS 17-36 ----- **/
			traducao = regex.traduzir();

			//Se nao ocorreu erro na analise
			if (traducao.ocorreuErro()){
				request.setAttribute("error", traducao.getMensagemErro());
			}

			//Gera um objeto JSON em formato String a partir da traducao
			/** ----- DS 37-38 ----- **/
			jsonString = traducao.getEscapedJSONString();
			texto = traducao.getText();
			
			//Adiciona os parametros do request
			request.setAttribute("jsonString", jsonString);
			request.setAttribute("traducao", texto);
			request.setAttribute("regex", input);

			dispatcher = request.getRequestDispatcher("tree-test.jsp");
			
			//Encaminha o pedido para a pagina inicial
			/** ----- DS 39 ----- **/
			dispatcher.forward(request, response);
		}

		//Se o valor for vazio...
		else {
			//Envia uma redirecionamento para a pagina inicial como resposta
			response.sendRedirect("tree-test.jsp");
		}
	}

}
