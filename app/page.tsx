import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en'); // или какую локаль вы хотите использовать по умолчанию
}