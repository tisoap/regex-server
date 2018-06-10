FROM tomcat:7.0-jre8

RUN rm -rf /usr/local/tomcat/webapps/ROOT

COPY ./app /usr/local/tomcat/webapps/ROOT
