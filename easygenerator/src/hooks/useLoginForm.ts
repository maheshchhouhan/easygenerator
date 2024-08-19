import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '../schemas/auth';

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
