import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSalary } from '@/app/lib/salary_actions';

export function DeleteSalary({ id }: { id: number }) {
    const deleteSalaryWithId = deleteSalary.bind(null, id);
  
    return (
      <form action={deleteSalaryWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          Delete
        </button>
      </form>
    );
  }