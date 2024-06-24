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

export default function AttendanceModal() {
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
                <TimeInput name="timein" isRequired label="TimeIn" />
                <TimeInput name="timeout" isRequired label="TimeOut" />
                <DatePicker name="date" isRequired label="Date" className="max-w-[284px]" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
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
