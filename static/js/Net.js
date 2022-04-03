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

    checkStatus() {

        const options = {
            method: "POST",
            body: ""
        };

        fetch("/CHECK_STATUS", options)
            .then(response => response.json())
            .then(users => ui.status(users))
            .catch(error => console.log(error));
    }

}