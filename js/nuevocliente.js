(function () {
    let DB

    const form = document.querySelector("#formulario")

    document.addEventListener("DOMContentLoaded", () => {

        conectDB()

        form.addEventListener("submit", validateClient)
    })

    function conectDB() {
        const openConexion = window.indexedDB.open("crm", 1)

        openConexion.onerror = function () {
            console.log("There was an error in the conexion with the DB")
        }

        openConexion.onsuccess = function () {
            DB = openConexion.result
        }
    }

    function validateClient(e) {
        e.preventDefault() // It is a submit

        // Read all inputs
        const name = document.querySelector("#nombre").value
        const email = document.querySelector("#email").value
        const phone = document.querySelector("#telefono").value
        const company = document.querySelector("#empresa").value

        if (name === "" || email === "" || phone === "" || company === "") {
            printAlert("All fills are obligatory", "error")

            return
        }

        // Create an object with the client information, we will use the known like OBJECT LITERAL
        const client = {
            name, //name: name, If the key and the value have the same name we can use it once
            email, // email: email,
            phone, // phone: phone,
            company, // company: company
            id: Date.now()
        }

        //or client.id = Date.now()

        createNewClient(client) // Creamos esta función para pasar como un simple parámetro el objeto cliente
    }

    function createNewClient(client) { // Here we have the client object created before
        let transaction = DB.transaction(["crm"], "readwrite")

        // To write the object in the DB
        const objectStore = transaction.objectStore("crm")

        objectStore.add(client)

        transaction.onerror = function () {
            printAlert("There was an error, Not repeat email", "error")

            console.log("Transaction error")
        }

        transaction.oncomplete = function () {
            console.log("client added")

            printAlert("The client was added perfectly")

            setTimeout(() => {
                window.location.href = "index.html"
            }, 3000)
        }
    }

    function printAlert(message, type) {

        const alert = document.querySelector(".alert") // This alert it is to avoid repeat the error message, if there is something with the class "alert" the code not working, on the other hand if not the code make the div message

        if (!alert) {
            // Creating the div alert
            const divMessage = document.createElement("div")
            divMessage.classList.add("px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center", "boder", "alert")

            // Add class depend the type of error
            if (type === "error") {
                divMessage.classList.add("bg-red-100", "border-red-400", "text-red-700")
            } else {
                divMessage.classList.add("bg-green-100", "border-green-400", "text-green-700")
            }

            // Error message 
            divMessage.textContent = message

            // Add the divMessage to the DOM
            form.insertBefore(divMessage, document.querySelector("#formulario input[type = submit]"))
            // We can also use to add div message to the DOM: form.appendChild(divMessage)

            // Delete the error message
            setTimeout(() => {
                divMessage.remove()
            }, 3000)
        }
    }
})()