import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, TimeInput} from "@nextui-org/react";


export default function EmployeeModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Add Data</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Employee</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  type="String"
                  placeholder="Enter your name"
                  variant="bordered"
                />
                <Input
                  label="Position"
                  placeholder="Enter your position"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Base Salary"
                  placeholder="Enter your Base salary"
                  type="number"
                  variant="bordered"
                />
                <Input
                  label="Allowance"
                  placeholder="Enter your Base Allowance"
                  type="number"
                  variant="bordered"
                />
                <TimeInput label="TimeIn" />
                <TimeInput label="TimeOut" />
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
