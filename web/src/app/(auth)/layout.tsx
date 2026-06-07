import { Brand } from "@/components/brand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Brand className="text-lg" />
        </div>
        {children}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Acompanhe seus equipamentos do orçamento à entrega.
        </p>
      </div>
    </div>
  );
}
