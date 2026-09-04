export interface Project {
	name: string;
	slug: string;
	date?: string;
	release: string;
	image?: string;
	imageFit?: 'cover' | 'contain';
	link: string;
	featured?: boolean;
	organization?: string;
	type?: string;
	summary?: string;
	details?: string[];
	technologies?: string[];
}
