import { notFound } from "next/navigation";

// Catch-all route for undefined paths within the locale scope
// Triggers the [locale]/not-found.tsx component
export default function CatchAllPage() {
	notFound();
}
