import AuthPage from '@/components/auth/AuthPage';

export const metadata = {
  title: "Sign In — CrimeNet AI",
  description: "Authorized investigator access terminal.",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
