export enum Status {
	NEW = 'NEW',
	PROGRESS = 'PROGRESS',
	DELIVERED = 'DELIVERED',
}

export type Order = {
	id: number;
	name: string;
	phone: string;
	count: number;
	status: Status;
};
