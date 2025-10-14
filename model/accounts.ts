type account = {
    id: string; // SurrealDB record ID
    name: string;
    type: string;
    initialBalance: number;
    currentBalance: number;
    description?: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
};
export default account;