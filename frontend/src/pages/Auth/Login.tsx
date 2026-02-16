import logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = (formData: LoginFormData) => {
    console.log(formData);
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
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...form.register("email")}
                    required
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="email">Senha</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...form.register("password")}
                    required
                  />
                </div>
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
