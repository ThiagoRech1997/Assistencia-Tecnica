import { Badge } from "@/components/ui/badge";
import {
  aprovacaoVariant,
  aprovacaoLabel,
  statusVariant,
} from "@/lib/constants";

export function AprovacaoBadge({ value }: { value: string }) {
  return <Badge variant={aprovacaoVariant(value)}>{aprovacaoLabel(value)}</Badge>;
}

export function StatusBadge({ value }: { value: string }) {
  return <Badge variant={statusVariant(value)}>{value || "—"}</Badge>;
}
