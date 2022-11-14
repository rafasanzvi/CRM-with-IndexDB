(function () {
    let DB
    // We can use instead "DOMContentLoaded": 
    // window.addEventListener("load", function(event) {
    // console.log("Every sources are loaded")    
    // })
    document.addEventListener("DOMContentLoaded", () => {
        createDB()

        // This function only is going to be working in the case that the DB exist
        if (window.indexedDB.open("crm", 1)) {
            toGetClients()
        }
    })

    // Create the DB of IndexDB
    function createDB() {
        const createDB = window.indexedDB.open("crm", 1)

        createDB.onerror = function () {
            console.log("There was an error")
        }

        createDB.onsuccess = function () {
            DB = createDB.result
            console.log("I am DB", DB)
        }

        createDB.onupgradeneeded = function (e) {
            const db = e.target.result
            console.log("I am db with e.target.result", db)
            const objectStore = db.createObjectStore("crm", { keyPath: "id", autoIncrement: true })

            objectStore.createIndex("name", "name", { unique: false })
            objectStore.createIndex("email", "email", { unique: true })
            objectStore.createIndex("phone", "phone", { unique: false })
            objectStore.createIndex("company", "company", { unique: false })
            objectStore.createIndex("id", "id", { unique: true })

            console.log("DB READY AND CREATED")
        }
    }

    function toGetClients() {
        const openConexion = window.indexedDB.open("crm", 1)

        openConexion.onerror = function () {
            console.log("There was an error in the conexion with the DB")
        }

        openConexion.onsuccess = function () {
            DB = openConexion.result

            const objectStore = DB.transaction("crm").objectStore("crm")

            objectStore.openCursor().onsuccess = function (e) {
                const cursor = e.target.result // El resultado que se ha ejecutado por medio del evento e

                if (cursor) { // El cursor lo que hace es iterar sobre los index de la DB
                 const { name, email, phone, company, id } = cursor.value

                 const clientList = document.querySelector("#listado-clientes")
                    clientList.innerHTML += ` 
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${name} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${phone}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${company}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                        </td>
                    </tr>
                `;

                    cursor.continue()
                } else {
                    console.log("No hay más registros...")
                }
            }
        }
    }
})()


