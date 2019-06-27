# Task1

Making the first user who registers, as Admin. There should be two models Users and User_Roles. First time when a user registers, the User_Roles table should contain value as admin for that user and for the rest of them it should be different.

The task is to create two tables/collections Users and User_roles.<br />
The user who tries to register first will be given as an "Admin" role.<br />
And for the rest of the other users who registers later will be given some other roles, i used 'datawriter' , 'datareader' , 'guest' as their other roles.<br />

<h2>How to start server</h2>
 <h4>1.npm install</h4>
  &nbsp;&nbsp;&nbsp;&nbsp;To install all the dependencies 
 <h4>2.npm start</h4> 
  &nbsp;&nbsp;&nbsp;&nbsp;to start the server using nodemon

<h2> How to run the code</h2>

<h4> Use postman to make http requests to register user  - http://localhost:4000/register &nbsp;&nbsp;&nbsp;&nbsp;  Method: POST </h4>
  <h6> Required to pass in the body</h6>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ 
  &nbsp;&nbsp;"firstName":"xxxxxxx",
  &nbsp;&nbsp;"lastName":"xxxxxxx",
  &nbsp;&nbsp;"email":"xxxxxx@xxx.xx" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
  <h6> Possibilities of the response from the server </h6>
  &nbsp;&nbsp;&nbsp;&nbsp;1) If you miss to pass any property, it will shows an error saying that this field is required or <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;2) If you have given any invalid input then it will shows an error response <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;3) If the entered email is already registered earlier then it will shows that the user is already exists <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;4) If everything is fine then it shows User registered successfully<br/>
  
  <h4> To get the user datails along with the roles - http://localhost:4000/getall &nbsp;&nbsp;&nbsp;&nbsp; Method: GET </h4>
     <h6> Possibilities of the response from the server </h6>
     &nbsp;&nbsp;&nbsp;&nbsp;1) If there exists no user in the database, then it returs the response as "No users to display"<br/>
     &nbsp;&nbsp;&nbsp;&nbsp;2) If there exists users, then it displays the users full name and their role<br/>
