import axiosInstance from './axios';

// Interface for user credentials
interface Credentials {
  email: string;
  password: string;
}

// Interface for signup details
interface SignupDetails extends Credentials {
  name: string;
}

// Function to handle user signup
export const signup = async (data: SignupDetails): Promise<string> => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data.token;
};

// Function to handle user login
export const login = async (data: Credentials): Promise<string> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data.token;
};
