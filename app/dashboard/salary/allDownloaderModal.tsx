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
  DateRangePicker,
  DatePicker
} from "@nextui-org/react";

export default function AllDownloaderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-white">
        Download Total
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Download All Employees Salary
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  name="firstDate"
                  isRequired
                  label="First Date"
                  className="max-w-[284px]"
                />
                <DatePicker
                  name="lastDate"
                  isRequired
                  label="Last Date"
                  className="max-w-[284px]"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Download
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
