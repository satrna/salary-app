import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteOvertime } from '@/app/lib/overtime_actions';

export function DeleteOvertime({ id }: { id: number }) {
    const deleteOvertimeWithId = deleteOvertime.bind(null, id);
  
    return (
      <form action={deleteOvertimeWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          Delete
        </button>
      </form>
    );
  }