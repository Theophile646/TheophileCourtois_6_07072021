# So Pekocko

So Pekocko is the sixth project of my Web Developper formation with Openclassrooms. I had to create an API to connect with the frontend which was provided.
The website must have different fonctionnality :
- Signup
- Login
- Create Sauce from a form (image included)
- Modify Sauce
- Delete Sauce
- Display Sauce(s)
- Every Sauce can be liked or disliked

The application must respect OWASP and GDPR norms.


## Built with

- JS
- Framework : Express
- Server : NodeJS
- DataBase : MongoDB
- VSCode
- GitHub

## Built in

Github repo : TheophileCourtois_6_07072021


## Make it works

After cloning the repository: 

- Front-end :
```
cd front-end
npm install
npm start

```
Make sure you have `node-sass` installed globally

- Back-end :

In app.js, line 16, you have to change <username>, <password> and myFirstDatabase by the ones from your MongoDB Cluster.

```
cd back-end
npm install
nodemon server

```

You can now visit http://localhost:4000 and test the app.

## Author

[Théophile Courtois](https://www.linkedin.com/in/th%C3%A9ophile-courtois-595a9b136/)