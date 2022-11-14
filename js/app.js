(function(){
    let DB
    // We can use instead "DOMContentLoaded": 
    // window.addEventListener("load", function(event) {
    // console.log("Every sources are loaded")    
    // })
    document.addEventListener("DOMContentLoaded", () => {
        createDB()
    })

    // Create the DB of IndexDB
    function createDB() {
        const createDB = window.indexedDB.open("crm", 1)

        createDB.onerror = function() {
            console.log("There was an error")
        }

        createDB.onsuccess = function() {
            DB = createDB.result
            console.log("I am DB", DB)
        }

        createDB.onupgradeneeded = function(e) {
            const db = e.target.result
            console.log("I am db with e.target.result", db)
            const objectStore = db.createObjectStore("crm", { keyPath: "id", autoIncrement: true})

            objectStore.createIndex("name", "name", { unique: false })
            objectStore.createIndex("email", "email", { unique: true })
            objectStore.createIndex("phone", "phone", { unique: false })
            objectStore.createIndex("company", "company", { unique: false })
            objectStore.createIndex("id", "id", { unique: true })

            console.log("DB READY AND CREATED")
        }
    }
})()


