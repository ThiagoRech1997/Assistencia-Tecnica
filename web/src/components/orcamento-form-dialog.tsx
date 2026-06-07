"use client";

import { useActionState, useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { SubmitButton } from "@/components/submit-button";
import { FieldError, FormAlert } from "@/components/form-feedback";
import { EMPTY_FORM_STATE } from "@/lib/form";
import { createOrcamento } from "@/lib/actions/orcamentos";

interface Ref {
  nome: string;
  email: string;
}

export function OrcamentoFormDialog({
  clientes,
  funcionarios,
}: {
  clientes: Ref[];
  funcionarios: Ref[];
}) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) setFormKey((k) => k + 1);
  }

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>
        <PlusIcon />
        Novo orçamento
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo orçamento</DialogTitle>
            <DialogDescription>
              Vincule um cliente e um responsável e descreva o item.
            </DialogDescription>
          </DialogHeader>
          <OrcamentoFormBody
            key={formKey}
            clientes={clientes}
            funcionarios={funcionarios}
            onDone={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function OrcamentoFormBody({
  clientes,
  funcionarios,
  onDone,
}: {
  clientes: Ref[];
  funcionarios: Ref[];
  onDone: () => void;
}) {
  const [state, formAction] = useActionState(createOrcamento, EMPTY_FORM_STATE);
  const [clienteEmail, setClienteEmail] = useState("");
  const [funcEmail, setFuncEmail] = useState("");

  const cliente = clientes.find((c) => c.email === clienteEmail);
  const func = funcionarios.find((f) => f.email === funcEmail);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Orçamento criado.");
      onDone();
    }
  }, [state, onDone]);

  const semCadastros = clientes.length === 0 || funcionarios.length === 0;

  return (
    <form action={formAction} className="space-y-4">
      <FormAlert message={state?.error} />

      {semCadastros && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-500">
          Cadastre ao menos um cliente e um funcionário antes de criar orçamentos.
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="descricao">Equipamento / problema</Label>
        <Textarea
          id="descricao"
          name="descricao"
          rows={2}
          placeholder="Ex.: Notebook Dell não liga"
          required
        />
        <FieldError messages={state?.fieldErrors?.descricao} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cliente">Cliente</Label>
          <NativeSelect
            id="cliente"
            value={clienteEmail}
            onChange={(e) => setClienteEmail(e.target.value)}
            required
          >
            <option value="">Selecione…</option>
            {clientes.map((c) => (
              <option key={c.email} value={c.email}>
                {c.nome}
              </option>
            ))}
          </NativeSelect>
          <input type="hidden" name="clienteEmail" value={clienteEmail} />
          <input type="hidden" name="clienteNome" value={cliente?.nome ?? ""} />
          <FieldError
            messages={
              state?.fieldErrors?.clienteEmail ?? state?.fieldErrors?.clienteNome
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="funcionario">Responsável</Label>
          <NativeSelect
            id="funcionario"
            value={funcEmail}
            onChange={(e) => setFuncEmail(e.target.value)}
            required
          >
            <option value="">Selecione…</option>
            {funcionarios.map((f) => (
              <option key={f.email} value={f.email}>
                {f.nome}
              </option>
            ))}
          </NativeSelect>
          <input type="hidden" name="funcionarioEmail" value={funcEmail} />
          <input type="hidden" name="funcionarioNome" value={func?.nome ?? ""} />
          <FieldError
            messages={
              state?.fieldErrors?.funcionarioEmail ??
              state?.fieldErrors?.funcionarioNome
            }
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="itemDescricao">Item / serviço</Label>
        <Input
          id="itemDescricao"
          name="itemDescricao"
          placeholder="Ex.: Troca de tela"
          required
        />
        <FieldError messages={state?.fieldErrors?.itemDescricao} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="itemQuantidade">Quantidade</Label>
          <Input
            id="itemQuantidade"
            name="itemQuantidade"
            type="number"
            min={1}
            step={1}
            defaultValue={1}
            required
          />
          <FieldError messages={state?.fieldErrors?.itemQuantidade} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="itemValor">Valor unitário (R$)</Label>
          <Input
            id="itemValor"
            name="itemValor"
            type="number"
            min={0}
            step="0.01"
            placeholder="0,00"
            required
          />
          <FieldError messages={state?.fieldErrors?.itemValor} />
        </div>
      </div>

      <DialogFooter>
        <SubmitButton>Criar orçamento</SubmitButton>
      </DialogFooter>
    </form>
  );
}
