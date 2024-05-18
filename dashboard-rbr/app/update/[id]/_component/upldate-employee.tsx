"use client";
import { PUT } from "@/app/api/employe-create";
import {
  Box,
  Button,
  Flex,
  FormErrorMessage,
  Input,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GET } from "@/app/api/employe-get";
import { useEffect } from "react";
import { converterDataParaFormatoInputDate } from "@/formats/date-format";
const formSchema = z.object({
  name: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  role: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  department: z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  date: z.coerce
    .date({
      required_error: "Data invalida",
    })
    .min(new Date("1900-01-01"), {
      message: "Data invalida",
    })
    .refine(
      (val) => {
        return val >= new Date("1900-01-01");
      },
      {
        message: "Data  inválida",
      },
    ),
});
type FormData = z.infer<typeof formSchema>;
interface UpdateEmployeeProps {
  employeeId: string;
}
const UpldateEmployee = ({ employeeId }: UpdateEmployeeProps) => {
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });
  const { data, isLoading } = useQuery({
    queryKey: ["empployee", employeeId],
    queryFn: () => GET(employeeId as string),
  });
  useEffect(() => {
    let dateString: string = "";
    if (data) {
      dateString = data.date as string;
    }
    setValue("name", data ? data.name : "", { shouldValidate: true });
    setValue("role", data ? data.role : "", { shouldValidate: true });
    setValue("department", data ? data.department : "", {
      shouldValidate: true,
    });
    setValue(
      "date",
      data ? converterDataParaFormatoInputDate(dateString) : "",
      { shouldValidate: true },
    );
  }, [data, setValue]);
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      let dataResponse = data;
      return PUT(employeeId, dataResponse).then((response) => response);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        toast({
          title: "Erro ao criar",
          description: data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Funcionario Criado",
          description: "Aguarde um momento",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/");
      }
    },
  });
  const onSubmit = async (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      {!isLoading ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" id="name" {...register("name")} required />
              {errors.name?.message && (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Cargo</FormLabel>
              <Input type="text" id="role" {...register("role")} />
              {errors.role?.message && (
                <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Departamento</FormLabel>
              <Input type="text" id="department" {...register("department")} />
              {errors.department?.message && (
                <FormErrorMessage>
                  {errors.department?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Data</FormLabel>
              <Input type="date" id="date" required {...register("date")} />
              {errors.date?.message && (
                <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button mt={8} colorScheme="teal" isLoading={false} type="submit">
              Submit
            </Button>
          </form>
        </Flex>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </>
  );
};

export default UpldateEmployee;
