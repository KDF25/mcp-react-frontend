export default function Loading() {
	return (
		<div className="flex flex-col gap-8">
			<div className="animate-pulse h-12 w-3/4 rounded-md bg-muted" />
			<div className="animate-pulse h-32 rounded-md bg-muted" />
			<div className="space-y-4">
				<div className="animate-pulse h-6 w-1/2 rounded-md bg-muted" />
				<div className="animate-pulse h-24 rounded-md bg-muted" />
			</div>
		</div>
	);
}
