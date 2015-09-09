package helper;

public class JsonHelper {
	
	public static String getEscapedJSONString(String jsonString){

		String quote = "\"";
		String escape = "\\";
		String escapedQuote = escape+escape+quote;

		//Escapa todas as aspas duplas com uma barra invertida
		jsonString = jsonString.replaceAll(quote,escapedQuote);
		
		//Remove todas as quebras de linha
		jsonString = jsonString.replaceAll("\r?\n", "");

		return jsonString;
	}
	
}
