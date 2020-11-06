Hello!
# MERN_OAUTH
MERN_AUTHENTICATION V2.0 with Google and Facebook OAuth
<img src="https://i.imgur.com/Js1KHHV.gif" width="560" height="315" />

In this project, I will attempt to show you how to create a basic MERN (MongoDB/Express/React/Node.js) Stack application. In order to run the project download it and open with any code editor(my preference is Visual Studio)
Then run the below command in sequence.

1. git clone https://github.com/santos-parajuli/MERN_Authentication // download git repository
2. npm install // Install dependencies for REACT
3. npm start // run REACT
4. cd backend && npm install // Go to backend folder and install dependencies
5. npm start // run express

  #NOTE
 Before you test this out make sure to change all VARIABLE in backend/config/keys.js file.
 
 In this project,
 
 For Node i have used dependencies :
 1. bcrypy                     // for password hashing
 2. cors                       // to allow communicartion betweeen client and server
 3. jsonwebtokens              // for session management
 4. mongoose                   // to connect to MongoDB
 5. nodemon                    // helps to automatically restart node after changing some program and saving it
 6. passport and passport-local pasport-facebook passport-google-oauth20 // for authentication
  
In REACT, I used MaterialUI for building components, Redux for state management and Axios to fetch data from our NODE server.


I haven't used any validations in node since all basic validations are done in REACT (client side). Although node sends use 404 status with when logging with wrong email or password and it is rendered in textfields components.And since i have used redux in this project the code seems to be alot more complex but if you have knowledge of redux it's kind of simple and easy.

I will also be deploying this project live on my website www.siwani.com.np so you can check it out there.
HAPPY HACKING !!!
