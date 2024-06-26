"use client"
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
import { useFormStatus } from "react-dom";
import { createOvertime } from "@/app/lib/overtime_actions";
import { useFormState } from 'react-dom'

const initialState = {
  message: "",
};

export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" disabled={pending}>
      Save
    </Button>
  )
}

export default function ChangeOvertimeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { pending } = useFormStatus()
  const [state, formAction] = useFormState(createOvertime, initialState);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Change Data
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form action={formAction}>
                <ModalHeader className="flex flex-col gap-1">
                  Change Data
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    autoFocus
                    label="Hours"
                    type="Number"
                    name="hours"
                    placeholder="Enter the hours"
                    variant="bordered"
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
                  {/* <Button
                    type="submit"
                    color="primary"
                    aria-disabled={pending}
                    onPress={onClose}
                  >
                    Save
                  </Button> */}
                  <SubmitButton />
                </ModalFooter>
                <p aria-live="polite" className="sr-only" role="status">
                  {state?.message}
                </p>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
