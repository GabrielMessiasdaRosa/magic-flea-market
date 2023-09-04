export interface NewsAlertProps {}

const environment = String(process.env.NEXT_PUBLIC_ENVIRONMENT);
export default async function NewsAlert({}: NewsAlertProps) {
  if (environment === "production") return <></>;
  return (
    <div className="bg-yellow-200 border flex flex-col items-center justify-center">
      <div className="font-medium text-lg">Ambiente atual: {environment}</div>
    </div>
  );
}
