export const NAMING_EXAMPLES = {
    syntaxGuidance: `// ❌ ЗАПРЕЩЕННЫЙ синтаксис
interface User { name: string; }
type Status = "active" | "idle";
function getData(args: any) { ... }

// ✅ РАЗРЕШЕННЫЙ синтаксис (по стандартам Tourfirm)
interface IUser {           // Префикс I
    name: string;
}

type TStatus = "active";   // Префикс T

enum ENUM_ROLE_TYPE {      // Префикс ENUM_ и суффикс _TYPE
    ADMIN = "ADMIN"
}

// Имена файлов в entities/types/
// user.interface.ts -> для интерфейсов (IUser)
// user.types.ts     -> для типов (TUserStatus)
// user-backend.interface.ts -> для ответов API

export const convertUserBackend = (data: any) => { ... } // Суффикс Backend для конвертеров`
};
