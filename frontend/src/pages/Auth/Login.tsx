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
import { Lock, Mail, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const loginMutate = await login({
        email: formData.email,
        password: formData.password,
      });

      if (loginMutate) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao realizar o login");
    }
  };

  return (
    <div className="flex size-full overflow-hidden items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-8 max-w-[28rem] w-full">
        <figure>
          <img src={logo} alt="Logo" />
        </figure>

        <Card className="flex flex-col w-full rounded-xl">
          <CardHeader className="flex shrink-0 items-center">
            <CardTitle className="text-2xl font-bold">Fazer login</CardTitle>

            <CardDescription>Entre na sua conta para continuar</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-6 flex-col"
            >
              <div className="flex w-full flex-col gap-4">
                <Field className="flex flex-col w-full gap-2">
                  <FieldLabel htmlFor="inline-start-input">Email</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id="inline-start-input"
                      type="email"
                      placeholder="mail@exemplo.com"
                      {...form.register("email")}
                      required
                    />

                    <InputGroupAddon align="inline-start">
                      <Mail className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field className="flex flex-col w-full gap-2">
                  <FieldLabel htmlFor="inline-start-input">Senha</FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id="inline-start-input"
                      type="password"
                      placeholder="Digite sua senha"
                      {...form.register("password")}
                      required
                    />

                    <InputGroupAddon align="inline-start">
                      <Lock className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Entrar
              </Button>
            </form>

            <div className="flex w-full items-center justify-center gap-3 text-gray-500">
              <hr className="bg-gray-300 flex h-px w-full" />

              <span>ou</span>

              <hr className="bg-gray-300 flex h-px w-full" />
            </div>

            <div className="flex w-full flex-col gap-4 items-center">
              <CardDescription>Ainda não tem uma conta?</CardDescription>

              <Button
                type="button"
                className="w-full"
                disabled={form.formState.isSubmitting}
                variant={"outline"}
                onClick={() => navigate("/singup")}
              >
                <UserRoundPlus className="size-[1.125rem]" />
                Criar conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
