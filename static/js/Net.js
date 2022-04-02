class Net {
 
    send(login) {

        console.log(login)

        const options = {
            method: "POST",
            body: login
        };

        fetch("/ADD_USER", options)
            .then(response => response.json())
            .then(loged => ui.logMe(loged))
            .catch(error => console.log(error));
    }

}