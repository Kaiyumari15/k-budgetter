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

async function createTransactionsTable(client: Surreal): Promise<void> {
    const query = `
-- Define the 'transactions' table with strict schema enforcement
DEFINE TABLE transactions SCHEMAFULL;

-- Define the fields for the 'transactions' table
DEFINE FIELD title ON TABLE transactions TYPE string ASSERT $value != NONE;
DEFINE FIELD description ON TABLE transactions TYPE string;
DEFINE FIELD value ON TABLE transactions TYPE float ASSERT $value != 0;
DEFINE FIELD datetime ON TABLE transactions TYPE datetime DEFAULT time::now();

-- Link to a single record in the 'accounts' table. This is required.
DEFINE FIELD account ON TABLE transactions TYPE record<accounts> ASSERT $value != NONE;

-- Link to multiple records in the 'labels' table. This is optional.
DEFINE FIELD labels ON TABLE transactions TYPE array<record<labels>>;

-- Timestamps for tracking creation and updates
DEFINE FIELD createdAt ON TABLE transactions TYPE datetime VALUE time::now() READONLY;
DEFINE FIELD updatedAt ON TABLE transactions TYPE datetime VALUE time::now() ON UPDATE time::now();
    `;

    await client.query(query).catch((error) => {
        console.error("Failed to create 'transactions' table:", error);
        throw error;
    });
    return void 0;
}

async function createLabelsTable(client: Surreal): Promise<void> {
    const query = `
-- Define the 'labels' table with strict schema enforcement
DEFINE TABLE labels SCHEMAFULL;

-- Define the fields for the 'labels' table
DEFINE FIELD name ON TABLE labels TYPE string ASSERT $value != NONE;
DEFINE FIELD description ON TABLE labels TYPE string;
DEFINE FIELD colour ON TABLE labels TYPE string;

-- Timestamps for tracking creation and updates
DEFINE FIELD createdAt ON TABLE labels TYPE datetime VALUE time::now() READONLY;
DEFINE FIELD updatedAt ON TABLE labels TYPE datetime VALUE time::now() ON UPDATE time::now();
    `;

    await client.query(query).catch((error) => {
        console.error("Failed to create 'labels' table:", error);
        throw error;
    });
    return void 0;
}

async function createSubscriptionsTable(client: Surreal): Promise<void> {
    const query = `
-- Define the 'subscriptions' table with strict schema enforcement
DEFINE TABLE subscriptions SCHEMAFULL;

-- Define the fields for the 'subscriptions' table
DEFINE FIELD title ON TABLE subscriptions TYPE string ASSERT $value != NONE;
DEFINE FIELD description ON TABLE subscriptions TYPE string;
DEFINE FIELD value ON TABLE subscriptions TYPE float ASSERT $value != NONE;
DEFINE FIELD rrule ON TABLE subscriptions TYPE string;
DEFINE FIELD startDate ON TABLE subscriptions TYPE datetime DEFAULT time::now();

-- Link to a single record in the 'accounts' table. This is required.
DEFINE FIELD account ON TABLE subscriptions TYPE record<accounts> ASSERT $value != NONE;

-- Link to multiple records in the 'labels' table. This is optional.
DEFINE FIELD labels ON TABLE subscriptions TYPE array<record<labels>>;

-- Timestamps for tracking creation and updates
DEFINE FIELD createdAt ON TABLE subscriptions TYPE datetime VALUE time::now() READONLY;
DEFINE FIELD updatedAt ON TABLE subscriptions TYPE datetime VALUE time::now() ON UPDATE time::now();
    `;
    
    await client.query(query).catch((error) => {
        console.error("Failed to create 'subscriptions' table:", error);
        throw error;
    });
    return void 0;
}
