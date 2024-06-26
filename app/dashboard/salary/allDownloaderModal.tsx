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
  DatePicker,
} from "@nextui-org/react";
import { createDownloadAll, State } from "@/app/lib/allActions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

const initialState: State = {
  message: null,
  total: null,
  bonus: null,
  overtime: null,
  daily: null,
  deduction: null,
};

type OnSuccessHandler = () => void;

export function SubmitButton({ onSuccess }: { onSuccess: OnSuccessHandler }) {
  // Added onSuccess prop
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} onPress={onSuccess}>
      Calculate
    </Button>
  );
}

export default function AllDownloaderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(createDownloadAll, initialState);
  const handleFormSuccess = () => {
    // Close the modal
    // Optionally, reset form fields, display a success message, etc.
  };
  return (
    <>
      <Button onPress={onOpen} className="bg-white">
        Show Total
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form action={formAction}>
                <ModalHeader className="flex flex-col gap-1">
                  Show All Employees Salary
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
                <div className="bg-white rounded-lg p-6 shadow-md">
                  {state.message && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total Daily Rate:</span>
                        <span>{state.daily}</span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total Overtime:</span>
                        <span>{state.overtime}</span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total Bonus:</span>
                        <span>{state.bonus}</span>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total Deduction:</span>
                        <span>{state.deduction}</span>
                      </div>

                      <div className="flex justify-between items-center mt-4 border-t pt-4">
                        <span className="font-bold text-lg">Total Salary:</span>
                        <span className="font-bold text-lg">{state.total}</span>
                      </div>
                    </>
                  )}
                </div>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <SubmitButton onSuccess={handleFormSuccess} />
                  <Button className="bg-green-400" variant="flat" onPress={onClose}>
                    Download
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
