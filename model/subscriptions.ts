type Subscription = {
    id: string; // SurrealDB record ID
    title: string;
    description: string;
    value: number; // Subscription amount
    rrule: string; // Recurrence rule in iCalendar format
    startDate: string; // ISO 8601 date string
    createdAt: string; // ISO 8601 timestamp
    updatedAt: string; // ISO 8601 timestamp
}
export default Subscription;