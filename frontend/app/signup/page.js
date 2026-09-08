import AuthPage from '@/components/auth/AuthPage';

export const metadata = {
  title: "Register Account — CrimeNet AI",
  description: "Create investigator account for criminal network analysis.",
};

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
