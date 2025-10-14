import Surreal from "surrealdb";

async function connectToDatabase(client: Surreal, endpoint: string, namespace: string, database: string): Promise<Surreal> {
    await client.connect(endpoint, {
        namespace: namespace,
        database: database,
    }).catch((error) => {
        console.error("Failed to connect to SurrealDB:", error);
        throw error;
    });
    return client;
}