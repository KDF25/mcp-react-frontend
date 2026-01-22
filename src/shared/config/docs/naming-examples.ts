export const NAMING_EXAMPLES = {
    syntaxGuidance: `// ❌ REJECTED syntax
interface User { name: string; }
type Status = "active" | "idle";
function getData(args: any) { ... }

// ✅ APPROVED syntax
interface IUser {           // Prefix I
    name: string;
}

type TStatus = "active";   // Prefix T

enum ENUM_ROLE {           // Prefix ENUM_
    ADMIN = "ADMIN"
}

export const convertUserBackend = (data: any) => { ... } // Suffix Backend`
};
