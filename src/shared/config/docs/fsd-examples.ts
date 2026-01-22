export const FSD_EXAMPLES = {
    validImport: `import { useAuthStore } from "@/entities/session"; // OK: feature -> entity
import { Button } from "@/shared/ui";         // OK: feature -> shared`,

    forbiddenViolation: `import { logoutFeature } from "@/features/auth"; // ERROR: entity -> feature (LAYER VIOLATION)`
};
