import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut, Mail, UserRound } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";
import { useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER } from "@/lib/graphql/mutations/user";
import type { User } from "@/types";

const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email(),
});

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

type UpdateUserMutationData = {
  updateUser: User;
};

type UpdateUserMutationVariables = {
  updateUserId: string;
  data: { id: string; name: string; email: string };
};

export function Profile() {
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const { signup, user, logout, updateUser: updateUserStore } = useAuthStore();

  const [updateUser, { loading }] = useMutation<
    UpdateUserMutationData,
    UpdateUserMutationVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMutationData) => {
      const updatedValue = res.updateUser;

      if (updatedValue) {
        updateUserStore(updatedValue);
      }
    },
  });

  const onSubmit = async (formData: UpdateUserFormData) => {
    try {
      const signupMutate = await updateUser({
        variables: {
          updateUserId: user?.id ?? "",
          data: {
            id: user?.id ?? "",
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (signupMutate) {
        toast.success("Usuário atualizado com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao atualizar o usuário");
    }
  };

  useEffect(() => {
    form.reset({ email: user?.email, name: user?.name });
  }, [user]);

  return (
    <div className="flex size-full overflow-hidden items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-8 max-w-[28rem] w-full">
        <Card className="flex flex-col w-full rounded-xl">
          <CardHeader className="flex shrink-0 items-center">
            <div className="flex items-center justify-center shrink-0 size-16 bg-gray-300 text-gray-800 text-2xl rounded-full mb-6">
              <span>
                {user && user?.name.length > 0
                  ? user?.name[0].toUpperCase()
                  : ""}
              </span>
            </div>

            <CardTitle className="text-2xl font-bold truncate max-w-full">
              {user?.name}
            </CardTitle>

            <CardDescription className="w-full truncate text-center">
              {user?.email}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 ">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-6 flex-col border-t border-solid border-t-gray-200 pt-8"
            >
              <div className="flex w-full flex-col gap-4">
                <Field className="flex flex-col w-full gap-2">
                  <FieldLabel htmlFor="inline-start-input">
                    Nome completo
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id="inline-start-input"
                      type="text"
                      placeholder="Seu nome completo"
                      {...form.register("name")}
                      required
                    />

                    <InputGroupAddon align="inline-start">
                      <UserRound className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field className="flex flex-col w-full gap-2">
                  <FieldLabel htmlFor="inline-start-input">Email</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id="inline-start-input"
                      type="email"
                      placeholder="seu@email.com"
                      {...form.register("email")}
                      required
                      disabled
                    />

                    <InputGroupAddon align="inline-start">
                      <Mail className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription>
                    O e-mail não pode ser alterado
                  </FieldDescription>
                </Field>
              </div>

              <div className="flex w-full flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Salvar alterações
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  variant={"outline"}
                  onClick={logout}
                >
                  <LogOut className="size-[1.125rem] text-danger" />
                  Sair da conta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
