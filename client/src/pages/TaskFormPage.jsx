// manejamos el form con "react-hook-form"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(`Imprimiento parametros: ${params}`);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log("Actualizando");
      await updateTask(params.id, data);
      // Notifications:
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      // Notifications:
      toast.success("Task created", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("Obteniendo datos...");
        const res = await getTask(params.id);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
        console.log(res);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700  p-3 rounded-lg block w-full mb-3"
        />
        {/* Manejamos el error si aparece */}
        {errors.title && <span> Title is required</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700  p-3 rounded-lg block w-full mb-3"
        />
        {errors.description && <span> Description is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>

      {/* condicional */}
      {params.id && (
        <div className="flex justify-end">
          <button 
          className="bg-red-500 p-3 rounded-lg w-48 mt-3"
          onClick={async () => {
            const acepted = window.confirm("Are you sure?");
            if (acepted) {
              await deleteTask(params.id);
              // Notifications:
              toast.success("Task deleted", {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff",
                },
              });
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  );
}
