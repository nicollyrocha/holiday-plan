export interface Holiday {
	id?: number;
	title: string;
	description: string;
	date?: Date;
	locations: string[];
	participants: string[];
}
