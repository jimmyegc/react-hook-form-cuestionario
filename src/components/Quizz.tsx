import { useRef } from "react";
import { useQuizz } from "../hooks/useQuizz"
import { QuizzAnswers } from "./QuizzAnswers/QuizzAnswers"

export const Quizz = () => {
  const childRef = useRef(null)

  const { 
    handleSubmit,
    onSubmit,
    questions,
    dragQuestion,
    draggedOverQuestion,
    appendQuestion,
    removeQuestion,
    moveQuestion,
    control,
    register,    
  } = useQuizz()

  return (<>        
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Cuestionario:</legend>
        <button
          type="button"
          style={{ border: '1px solid blue'}}
          onClick={() =>
            appendQuestion({
              question: [""],
              answers: [{ value: "" }],              
            })
          }
        >
          +Pregunta
        </button>
        {questions.map((field, index) => (
          <fieldset key={field.id}             
            draggable 
            onDragStart={() => (dragQuestion.current = index)}
            onDragEnter={() => (draggedOverQuestion.current = index)}
            onDragEnd={() => moveQuestion(dragQuestion.current, draggedOverQuestion.current)}
            onDragOver={(e)=> e.preventDefault()}
            style={{ border: '1px solid #000', padding: 10}}>
            <legend>Pregunta #{index+1}</legend>
            <input type="text" placeholder="¿Pregunta?"
              {...register(`fields.${index}.question`)}
            />            
            <button type="button"
              style={{ border: '1px solid blue', padding: 8}}
              onClick={() => childRef.current.append()}
            >
              Agregar Respuesta
            </button>
            <button type="button" 
            style={{ border: '1px solid crimson', padding: 8}}
            onClick={() => removeQuestion(index)}>
              Eliminar Pregunta              
            </button>
            
            <QuizzAnswers               
              control={control}
              register={register}              
              parentFieldIndex={index}
              childRef={childRef}
            />                        
            
          </fieldset>
        ))}
        
      </fieldset>
      <button>Submit</button>
    </form>
    </>
  )
}
