"use client";

import { useTransition } from "react";
import { CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { decidirOrcamento } from "@/lib/actions/orcamentos";

export function OrcamentoDecisao({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function decide(aprovado: boolean) {
    startTransition(async () => {
      const result = await decidirOrcamento(id, aprovado);
      if (result?.error) {
        toast.error(result.error);
      } else if (aprovado) {
        toast.success("Orçamento aprovado! Abrimos a ordem de serviço.");
      } else {
        toast.success("Orçamento recusado.");
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => decide(true)} disabled={pending}>
        {pending ? <Loader2Icon className="animate-spin" /> : <CheckIcon />}
        Aprovar
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => decide(false)}
        disabled={pending}
      >
        <XIcon />
        Recusar
      </Button>
    </div>
  );
}
