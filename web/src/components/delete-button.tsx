"use client";

import { useState, useTransition } from "react";
import { Loader2Icon, Trash2Icon } from "lucide-react";
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
import type { FormState } from "@/lib/form";

/**
 * Botão de remoção com confirmação em diálogo. Recebe uma Server Action já
 * vinculada ao id (ex.: `deleteCliente.bind(null, id)`).
 */
export function DeleteButton({
  action,
  title = "Confirmar remoção",
  description = "Esta ação não pode ser desfeita.",
  successMessage = "Removido com sucesso.",
}: {
  action: () => Promise<FormState>;
  title?: string;
  description?: string;
  successMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onConfirm() {
    startTransition(async () => {
      const result = await action();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(successMessage);
        setOpen(false);
      }
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Remover"
        onClick={() => setOpen(true)}
      >
        <Trash2Icon className="text-muted-foreground" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm} disabled={pending}>
              {pending && <Loader2Icon className="animate-spin" />}
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
