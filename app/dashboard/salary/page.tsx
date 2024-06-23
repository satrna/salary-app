import { DataTable } from "./data-table";
import { Main, columns } from "./columns";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

async function getData() {
    const res = await fetch(`${baseURL}/api/salary`, { cache: 'no-store' })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
