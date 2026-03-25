import { Github, Linkedin, Mail, Send } from "lucide-react";
import { ElementType } from "react";

export interface CreatorConnection {
	id: "github" | "telegram" | "linkedin" | "email";
	icon: ElementType;
	href: string;
	isExternal?: boolean;
}

export const CREATOR_CONNECTIONS: CreatorConnection[] = [
	{
		id: "github",
		icon: Github,
		href: "https://github.com/KDF25",
		isExternal: true
	},
	{
		id: "telegram",
		icon: Send,
		href: "https://t.me/kdf_dev",
		isExternal: true
	},
	{
		id: "linkedin",
		icon: Linkedin,
		href: "https://www.linkedin.com/in/karimov-damir-faridovich/",
		isExternal: true
	},
	{
		id: "email",
		icon: Mail,
		href: "mailto:karimov.damir.faridovich@gmail.com",
		isExternal: false
	}
];
