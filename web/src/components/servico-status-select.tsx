"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { NativeSelect } from "@/components/ui/native-select";
import { updateServicoStatus } from "@/lib/actions/servicos";
import { SERVICO_STATUS } from "@/lib/constants";

export function ServicoStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  // Garante que o status atual apareça mesmo se não estiver na lista padrão.
  const options = SERVICO_STATUS.includes(status)
    ? SERVICO_STATUS
    : [status, ...SERVICO_STATUS];

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    startTransition(async () => {
      const result = await updateServicoStatus(id, next);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Status atualizado.");
      }
    });
  }

  return (
    <NativeSelect
      className="h-8 w-44"
      defaultValue={status}
      disabled={pending}
      onChange={onChange}
      aria-label="Atualizar status"
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </NativeSelect>
  );
}
