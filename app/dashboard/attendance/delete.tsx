import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteAttendance } from '@/app/lib/attendance_actions';

export function DeleteAttendance({ id }: { id: number }) {
    const deleteAttendanceWithId = deleteAttendance.bind(null, id);
  
    return (
      <form action={deleteAttendanceWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          Delete
        </button>
      </form>
    );
  }