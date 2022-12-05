import Surreal from "surrealdb.js";

let db_url = "http://127.0.0.1:8001/rpc";
let db_user = "root";
let db_pass = "root";

const db = new Surreal(db_url);

export async function initDB() {
    try {
        console.log("Initializing database...");
        if (!db_user || !db_pass || !db_url) {
            throw new Error("DB_USERNAME or DB_PASSWORD not set")
        }
        await db
            .connect(db_url)
            .then(() => {
                console.log("Connected to database");
            })
            .catch((err) => {
                console.log("Error connecting to database", err);
            });
        
        await db
            .signin({
                user: "root",
                pass: "root",
            })
            .then((res) => {
                console.log("Signed in to database", res);
            })
            .catch((err) => {
                console.log("Error signing in to database", err);
            });
        
        await db.use("test", "test");

        const todo = await db.select("todo");
        if(todo.length == 0){
            await db.create("todo", {
                text: 'Take out the trash',
                isDone: false
            });
    
            await db.create("todo", {
                text: 'Do the dishes',
                isDone: false
            });
    
            await db.create("todo", {
                text: 'Buy groceries',
                isDone: false
            });
        }

    } catch (err) {
        console.error(err);
    }
}
export default db;