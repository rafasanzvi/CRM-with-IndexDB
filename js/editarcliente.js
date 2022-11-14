(function() {
    let DB

    document.addEventListener("DOMContentLoaded", () => {
        conectDB()

        // To verify the ID of the URL
        const parametersURL = new URLSearchParams(window.location.search)

        const idClient = parametersURL.get("id")

        if(idClient) {
            toGetClientId(idClient)
        }
    })

    function toGetClientId(id) {
        const transaction = DB.transaction(["crm"], "readwrite")
        const objectStore = transaction.objectStore("crm")

        console.log(objectStore)
    }

    function conectDB() {
        const openConexion = window.indexedDB.open("crm", 1)

        openConexion.onerror = function () {
            console.log("There was an error in the conexion with the DB")
        }

        openConexion.onsuccess = function () {
            DB = openConexion.result
        }
    }

})()