export function ZodImportance() {
	return (
		<section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
			<h3 className="font-bold text-lg mb-2">Почему это важно:</h3>
			<ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
				<li>
					<strong>Типизированный msg:</strong> Предотвращает опечатки
					в ключах i18n внутри схем.
				</li>
				<li>
					<strong>ENUM_FORM:</strong> Гарантирует совпадение имен
					полей в схеме, типах и HTML-форме.
				</li>
				<li>
					<strong>z.infer:</strong> Исключает необходимость ручного
					описания интерфейсов для форм.
				</li>
			</ul>
		</section>
	);
}
