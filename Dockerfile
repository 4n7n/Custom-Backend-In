FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=Proyecto_Reservas

EXPOSE 3306

CMD ["npm","start"]
