export interface NewsAlertProps {}

const environment = String(process.env.NEXT_PUBLIC_ENVIRONMENT);
export default async function NewsAlert({}: NewsAlertProps) {
  if (environment === "production") return null;
  return (
    <div className="flex items-center justify-center bg-yellow-400">
      <div className="py-5 text-lg">⚠️ Ambiente atual: {environment} ⚠️</div>
    </div>
  );
}
