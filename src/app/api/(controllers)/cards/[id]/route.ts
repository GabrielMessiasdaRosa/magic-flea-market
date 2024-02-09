export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  return { status: 200, body: { data: { id: params.id } } };
}
