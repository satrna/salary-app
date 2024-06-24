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
} from "@nextui-org/react";
import { createEmployee } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Save
    </Button>
  );
}

export default function EmployeeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(createEmployee, initialState);

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
                  Add Employee
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    isRequired
                    name="name"
                    label="Name"
                    type="String"
                    placeholder="Enter your name"
                    variant="bordered"
                  />
                  <Input
                    label="Position"
                    isRequired
                    name="position"
                    placeholder="Enter your position"
                    type="String"
                    variant="bordered"
                  />
                  <Input
                    label="Base Salary"
                    name="basesalary"
                    isRequired
                    placeholder="Enter your Base salary"
                    type="number"
                    variant="bordered"
                  />
                  <Input
                    label="Allowance"
                    isRequired
                    name="allowance"
                    placeholder="Enter your Base Allowance"
                    type="number"
                    defaultValue="0"
                    variant="bordered"
                  />
                  <TimeInput isRequired name="timeinput" label="TimeIn" />
                  <TimeInput isRequired name="timeoutput" label="TimeOut" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  {/* <Button color="primary" type="submit" onPress={onClose}>
                  Save
                </Button> */}
                  <SubmitButton />
                  <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                  </p>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
