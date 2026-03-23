export default function Loading() {
	return (
		<div className="flex flex-col gap-8">
			<div className="animate-pulse h-12 w-2/3 rounded-md bg-muted" />
			<div className="animate-pulse h-64 rounded-md bg-muted" />
			<div className="animate-pulse h-48 rounded-md bg-muted" />
		</div>
	);
}
