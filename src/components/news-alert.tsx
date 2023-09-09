export interface NewsAlertProps {}

const environment = String(process.env.NEXT_PUBLIC_ENVIRONMENT);
export default async function NewsAlert({}: NewsAlertProps) {
  if (environment === "production") return <></>;
  return (
    <div className="flex flex-col items-center justify-center space-y-5 border bg-yellow-200">
      <div className="text-lg font-medium">Ambiente atual: {environment}</div>
    </div>
  );
}
