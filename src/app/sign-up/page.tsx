import SignUpPage from '@/components/auth/SignUpPage';

export default async function SignUp({ searchParams }: { searchParams: any }) {
  const { email } = await searchParams;

  return <SignUpPage paramEmail={email} />;
}
