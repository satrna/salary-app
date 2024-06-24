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

export default function SalaryModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Salary
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                />
                <Input
                  isRequired
                  autoFocus
                  label="Bonus"
                  type="Number"
                  defaultValue="0"
                  placeholder="Enter the bonus"
                  variant="bordered"
                />
                <Input
                  autoFocus
                  isRequired
                  label="Deductions"
                  defaultValue="0"
                  type="Number"
                  placeholder="Enter the deductions"
                  variant="bordered"
                />
                <DatePicker isRequired label="Date" className="max-w-[284px]" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
