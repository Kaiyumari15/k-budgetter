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

async function createAccountsTable(client: Surreal): Promise<void> {
    const query = `
-- Define the 'accounts' table with strict schema enforcement
DEFINE TABLE accounts SCHEMAFULL;

-- Define the fields for the 'accounts' table
DEFINE FIELD name ON TABLE accounts TYPE string ASSERT $value != NONE;
DEFINE FIELD type ON TABLE accounts TYPE string;
DEFINE FIELD initialBalance ON TABLE accounts TYPE float DEFAULT 0;
DEFINE FIELD currentBalance ON TABLE accounts TYPE float DEFAULT 0;
DEFINE FIELD description ON TABLE accounts TYPE string;

-- Timestamps for tracking creation and updates
DEFINE FIELD createdAt ON TABLE accounts TYPE datetime VALUE time::now() READONLY;
DEFINE FIELD updatedAt ON TABLE accounts TYPE datetime VALUE time::now() ON UPDATE time::now();
    `;

    await client.query(query).catch((error) => {
        console.error("Failed to create 'accounts' table:", error);
        throw error;
    });
    return void 0;
}
