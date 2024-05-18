import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation } from "@tanstack/react-query";
import { DELETE } from "../api/employe-create";
interface DialogDeleteProps {
  employeeId: string;
  refetch: () => void;
}
const DialogDelete = ({ employeeId, refetch }: DialogDeleteProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return DELETE(id).then((response) => response);
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "etnrou no on error do mutation",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      refetch(); // atualiza toda o fetch
    },
  });
  return (
    <>
      <DeleteIcon
        cursor="pointer"
        color="red.500"
        fontSize={20}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => mutation.mutate({ id: employeeId })}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DialogDelete;
