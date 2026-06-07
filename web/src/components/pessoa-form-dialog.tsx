"use client";

import { useActionState, useEffect, useState } from "react";
import { PencilIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { FieldError, FormAlert } from "@/components/form-feedback";
import { EMPTY_FORM_STATE, type FormState } from "@/lib/form";

interface PessoaDefaults {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
}

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

/** Diálogo de criação/edição de cliente ou funcionário (mesmos campos). */
export function PessoaFormDialog({
  mode,
  title,
  description,
  triggerLabel,
  action,
  defaults,
}: {
  mode: "create" | "edit";
  title: string;
  description: string;
  triggerLabel?: string;
  action: Action;
  defaults?: PessoaDefaults;
}) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) setFormKey((k) => k + 1); // estado do form "zera" a cada abertura
  }

  return (
    <>
      {mode === "create" ? (
        <Button onClick={() => handleOpenChange(true)}>
          <PlusIcon />
          {triggerLabel ?? "Novo"}
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Editar"
          onClick={() => handleOpenChange(true)}
        >
          <PencilIcon className="text-muted-foreground" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <PessoaFormBody
            key={formKey}
            action={action}
            defaults={defaults}
            onDone={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function PessoaFormBody({
  action,
  defaults,
  onDone,
}: {
  action: Action;
  defaults?: PessoaDefaults;
  onDone: () => void;
}) {
  const [state, formAction] = useActionState(action, EMPTY_FORM_STATE);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Salvo com sucesso.");
      onDone();
    }
  }, [state, onDone]);

  return (
    <form action={formAction} className="space-y-4">
      <FormAlert message={state?.error} />

      <div className="space-y-1.5">
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" name="nome" defaultValue={defaults?.nome} required />
        <FieldError messages={state?.fieldErrors?.nome} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            defaultValue={defaults?.cpf}
            inputMode="numeric"
            placeholder="000.000.000-00"
            required
          />
          <FieldError messages={state?.fieldErrors?.cpf} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            defaultValue={defaults?.telefone}
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
          defaultValue={defaults?.email}
          required
        />
        <FieldError messages={state?.fieldErrors?.email} />
      </div>

      <DialogFooter>
        <SubmitButton>Salvar</SubmitButton>
      </DialogFooter>
    </form>
  );
}
