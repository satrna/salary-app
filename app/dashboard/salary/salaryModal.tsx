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
import { createSalary } from "@/app/lib/salary_actions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

type OnSuccessHandler = () => void;

export function SubmitButton({ onSuccess }: { onSuccess: OnSuccessHandler }) {
  // Added onSuccess prop
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} onPress={onSuccess}>
      Save
    </Button>
  );
}

export default function SalaryModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(createSalary, initialState);
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
                  Add Salary
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    autoFocus
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    autoFocus
                    name="bonus"
                    label="Bonus"
                    type="Number"
                    defaultValue="0"
                    placeholder="Enter the bonus"
                    variant="bordered"
                  />
                  <Input
                    autoFocus
                    isRequired
                    name="deduction"
                    label="Deductions"
                    defaultValue="0"
                    type="Number"
                    placeholder="Enter the deductions"
                    variant="bordered"
                  />
                  <DatePicker
                    isRequired
                    name="date"
                    label="Date"
                    className="max-w-[284px]"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  {/* <Button color="primary" onPress={onClose}>
                  Save
                </Button> */}
                  <SubmitButton onSuccess={handleFormSuccess} />
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
