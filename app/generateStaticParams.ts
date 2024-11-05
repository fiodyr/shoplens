// app/(locale)/generateStaticParams.ts
export async function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'ru' }];
}