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
import { Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email(),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof registerSchema>;

export function Singup() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(registerSchema),
  });

  const signup = useAuthStore((state) => state.signup);

  const navigate = useNavigate();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const signupMutate = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao realizar o cadastro");
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
            <CardTitle
              className="text-2xl font-bold"
              onClick={() => {
                console.log(form.getValues());
              }}
            >
              Criar conta
            </CardTitle>

            <CardDescription>
              Comece a controlar suas finanças ainda hoje
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-6 flex-col"
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

                  <FieldDescription>
                    A senha deve ter no mínimo 8 caracteres
                  </FieldDescription>
                </Field>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Cadastrar
              </Button>
            </form>

            <div className="flex w-full items-center justify-center gap-3 text-gray-500">
              <hr className="bg-gray-300 flex h-px w-full" />

              <span>ou</span>

              <hr className="bg-gray-300 flex h-px w-full" />
            </div>

            <div className="flex w-full flex-col gap-4 items-center">
              <CardDescription>Já tem uma conta?</CardDescription>

              <Button
                type="button"
                className="w-full"
                disabled={form.formState.isSubmitting}
                variant={"outline"}
                onClick={() => navigate("/login")}
              >
                <LogIn className="size-[1.125rem]" />
                Fazer login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
