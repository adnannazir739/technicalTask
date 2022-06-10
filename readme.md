## Project Setup Guide 
>To setup project first we need to install all the npm packages that are included using npm install command in its terminal
>Then we need to generate a database on sql server name "nodedb".
>Include the credentials of "nodedb" in this project file "index.js" which is in "models" folder to connect database with project.
>In this file replace value of according to your database in my case value are database name "nodedb" username "admin" password "admin".
>host: "DESKTOP-NVD89CQ"  port: "1433" dialect: "mssql" .
>Run code once to generate database tables put any dummy value in "logins" table to enter into the project.
>run it on http://localhost:8080/ address we can also change port number from server.js file 