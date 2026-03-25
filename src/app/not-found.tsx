export default function RootNotFound() {
	return (
		<html lang="en">
			<body>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "100vh",
						gap: "1.5rem",
						fontFamily: "system-ui, sans-serif"
					}}
				>
					<h1 style={{ fontSize: "3.75rem", fontWeight: 700 }}>
						404
					</h1>
					<p style={{ fontSize: "1.125rem", color: "#666" }}>
						Page not found
					</p>
					<a
						href="/"
						style={{
							padding: "0.5rem 1rem",
							borderRadius: "0.375rem",
							backgroundColor: "#111",
							color: "#fff",
							textDecoration: "none",
							fontSize: "0.875rem"
						}}
					>
						Back to Home
					</a>
				</div>
			</body>
		</html>
	);
}
