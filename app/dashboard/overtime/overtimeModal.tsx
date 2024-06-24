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
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createOvertime } from "@/app/lib/actions";
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

export default function OvertimeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { pending } = useFormStatus()
  const [state, formAction] = useFormState(createOvertime, initialState);

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
                  Add Overtime
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    autoFocus
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    variant="bordered"
                  />
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
