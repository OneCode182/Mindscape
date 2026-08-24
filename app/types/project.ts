export interface Project {
	name: string;
	release: string;
	image?: string;
	link: string;
	featured?: boolean;
	organization?: string;
	type?: string;
	summary?: string;
	details?: string[];
	technologies?: string[];
}
