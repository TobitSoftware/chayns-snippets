
//Create stylesheets for each script in the same folder with the same naming (if necessary) and import it.
import "./index.css";

/**
 * chayns ready promise
 */
chayns.ready.then(function resolved() {
    init();
}).catch(function rejected() {
    console.error("no chayns environment found. you need to implement this website in your chayns-website");
}).then(function always() {
    //Will always be executed
});


/**
 * Will be executed when the chayns-API is loaded
 */
const init = () => {

    "use strict";

    /**
     * You can get the basic information about the logged in user by using the chayns variables "chayns.env.user"
     * @type {string}
     */
    document.querySelector('#headline').innerHTML = `Hello ${chayns.env.user.name}!`; //If no user is logged in an empty string will be returned by the user object

    if(chayns.env.user.isAuthenticated){ //checks if a valid user is logged in

    }

    /**
     * The webpack files use the webpack-replace loader for replacing the "server_url"
     * @type {string}
     */
    console.log('########################################################');
    console.log(`You are running the ##server_url##-Version of your Tapp`);
    console.log('########################################################');
};