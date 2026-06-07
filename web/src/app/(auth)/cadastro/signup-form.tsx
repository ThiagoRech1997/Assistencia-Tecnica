"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { EMPTY_FORM_STATE } from "@/lib/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { FieldError, FormAlert } from "@/components/form-feedback";

export function SignupForm() {
  const [state, formAction] = useActionState(signup, EMPTY_FORM_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <FormAlert message={state?.error} />

      <div className="space-y-1.5">
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" name="nome" autoComplete="name" required />
        <FieldError messages={state?.fieldErrors?.nome} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" name="cpf" inputMode="numeric" placeholder="000.000.000-00" required />
          <FieldError messages={state?.fieldErrors?.cpf} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            required
          />
          <FieldError messages={state?.fieldErrors?.telefone} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
          required
        />
        <FieldError messages={state?.fieldErrors?.email} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            required
          />
          <FieldError messages={state?.fieldErrors?.senha} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmarSenha">Confirmar senha</Label>
          <Input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            autoComplete="new-password"
            required
          />
          <FieldError messages={state?.fieldErrors?.confirmarSenha} />
        </div>
      </div>

      <SubmitButton className="w-full">Criar conta</SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
