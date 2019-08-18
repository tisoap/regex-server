FROM tomcat:7.0.96-jdk8-openjdk-slim

RUN rm -rf /usr/local/tomcat/webapps/ROOT

COPY ./app /usr/local/tomcat/webapps/ROOT
