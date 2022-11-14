(function() {
    let DB

    const form = document.querySelector("#formulario")

    document.addEventListener("DOMContentLoaded", () => {
        
        conectDB()

        form.addEventListener("submit", validateClient)
    })

    function conectDB() {
        const openConexion = window.indexedDB.open("crm", 1)

        openConexion.onerror = function() {
            console.log("There was an error in the conexion with the DB")
        }

        openConexion.onsuccess = function() {
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

        if(name === "" || email === "" || phone === "" || company === "") {
            printAlert("All fills are obligatory", "error")

            return
        } 
    }

    function printAlert(message, type) {
        
    }
})()