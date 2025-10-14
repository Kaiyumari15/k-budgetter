type transaction = {
    id: String; // Record ID
    title: String;
    description: String;
    value: number;
    datetime: String; // ISO 8601 date string
    account: String; // Record ID of the linked account
    labels: String[];
    createdAt: String; // ISO 8601 date string
    updatedAt: String; // ISO 8601 date string
}
export default transaction;