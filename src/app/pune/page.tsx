import { redirect } from 'next/navigation';

export default function PunePage() {
  redirect('/properties?city=pune');
}
