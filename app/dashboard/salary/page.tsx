import { DataTable } from "./data-table";
import { Main, columns } from "./columns";

async function getData() {
    const res = await fetch("http://localhost:3000/api/salary", { cache: 'no-store' })
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
