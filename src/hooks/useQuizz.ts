import { useRef } from "react";
import { DefaultValues, useFieldArray, useForm } from "react-hook-form";

type Answer = {
    value: string;
  };
  
  type Field = {
    question: Array<string>;
    answers: Array<Answer>;  
  };
  
  type FormValues = {
    fields: Array<Field>;
  };
  
  const defaultValues: DefaultValues<FormValues> = {
    fields: [
      {
        answers: [{ value: "Respuesta default" }],
        question: ["Pregunta"]
      }
    ]
  };
  
export const useQuizz = () => {
  
  const { control, handleSubmit, register } = useForm<FormValues>({ defaultValues });
  
  const dragQuestion = useRef<number>(0)
  const draggedOverQuestion = useRef<number>(0)
  
      
  const { fields : questions, append: appendQuestion, remove: removeQuestion, move: moveQuestion } = useFieldArray({ control, name: "questions" });
    
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return {
    dragQuestion,
    draggedOverQuestion,
    control,
    handleSubmit,
    register,
    onSubmit,
    questions,
    appendQuestion,
    removeQuestion,
    moveQuestion,
    
  }
}