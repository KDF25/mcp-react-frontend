import { BookIcon, SearchIcon } from "lucide-react";

export function I18nArchitectureLink() {
	return (
		<section className="bg-zinc-900 p-12 rounded-[3.5rem] border border-white/5 shadow-inner">
			<div className="space-y-8">
				<h3 className="text-5xl font-black tracking-tighter text-white">
					Архитектурная связь
				</h3>
				<div className="grid gap-10 md:grid-cols-2">
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-primary">
							<BookIcon className="size-5" />
							<h4 className="font-bold uppercase tracking-widest text-xs">
								Types Safety Hub
							</h4>
						</div>
						<p className="text-sm text-zinc-400 leading-relaxed italic">
							Файл <code>i18n.d.ts</code> является мостом между
							вашими JSON-матрицами и библиотекой i18next. Это
							делает невозможным использование несуществующего
							ключа в коде.
						</p>
					</div>
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-primary">
							<SearchIcon className="size-5" />
							<h4 className="font-bold uppercase tracking-widest text-xs">
								Checker Control
							</h4>
						</div>
						<p className="text-sm text-zinc-400 leading-relaxed italic">
							Механизм <code>i18n.checker.ts</code> гарантирует,
							что каждый новый ключ в английской версии будет
							немедленно подсвечен как ошибка в русской, пока не
							будет добавлен перевод.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
