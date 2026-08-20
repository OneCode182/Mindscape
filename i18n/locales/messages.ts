import es_contact from './es/contact.json';
import es_global from './es/global.json';
import es_navigation from './es/navigation.json';
import es_writing from './es/writing.json';
import en_contact from './en/contact.json';
import en_global from './en/global.json';
import en_navigation from './en/navigation.json';
import en_writing from './en/writing.json';

const messages = {
	es: {
		navigation: es_navigation,
		contact: es_contact,
		global: es_global,
		writing: es_writing,
	},
	en: {
		navigation: en_navigation,
		contact: en_contact,
		global: en_global,
		writing: en_writing,
	},
};

export default messages;
