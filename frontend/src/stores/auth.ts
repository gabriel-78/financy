import { apolloClient } from "@/lib/apollo";
import { REGISTER } from "@/lib/graphql/mutations/register";
import type { RegisterInput, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuhenticated: boolean;
  singup: (data: RegisterInput) => Promise<void>;
}

type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuhenticated: false,
      singup: async (value: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<RegisterMutationData>({
            mutation: REGISTER,
            variables: {
              name: value.name,
              email: value.email,
              password: value.password,
            },
          });

          if (data?.register) {
            const { token, user } = data.register;

            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token: token,
              isAuhenticated: true,
            });
          }
        } catch (error) {
          console.log("Erro ao fazer o cadastro");

          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
