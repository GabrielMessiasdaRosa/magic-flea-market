"use client";

import { logoutConfirmationModalStore } from "@/store/confirmation-modal-store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export interface LogouConfirmationModal {}

export default function LogoutConfirmationModal({}: LogouConfirmationModal) {
  const { isConfirmationModalOpen, setIsConfirmationModalOpen } =
    logoutConfirmationModalStore();

  return (
    <Modal
      isOpen={isConfirmationModalOpen}
      placement={"auto"}
      className="w-full"
      closeButton={<></>}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Você tem certeza que deseja sair?
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                }}
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  signOut();
                }}
                variant="flat"
                color="primary"
                onPress={onClose}
              >
                Sair
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
