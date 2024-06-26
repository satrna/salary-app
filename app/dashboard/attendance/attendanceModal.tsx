import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  TimeInput,
  DatePicker,
} from "@nextui-org/react";
import { createAttendance } from "@/app/lib/attendance_actions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

type OnSuccessHandler = () => void;

export function SubmitButton({ onSuccess} :{ onSuccess: OnSuccessHandler }) { // Added onSuccess prop
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} onPress={onSuccess}>
      Save
    </Button>
  );
}

export default function AttendanceModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(createAttendance, initialState);
  const handleFormSuccess = () => {
    onOpenChange(); // Close the modal
    // Optionally, reset form fields, display a success message, etc.
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">
                Add Attendance
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                />
                <TimeInput
                  name="timein"
                  isRequired
                  label="TimeIn"
                  hourCycle={24}
                />
                <TimeInput
                  name="timeout"
                  isRequired
                  label="TimeOut"
                  hourCycle={24}
                />
                <DatePicker
                  name="date"
                  isRequired
                  label="Date"
                  className="max-w-[284px]"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <SubmitButton onSuccess={handleFormSuccess}/>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
