import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signupSchema } from '../schemas/auth';

type SignupFormValues = z.infer<typeof signupSchema>;

export const useSignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
