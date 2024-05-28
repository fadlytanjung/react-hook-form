import { useForm } from "react-hook-form";

const errorLabel: Record<string, Record<string, string>> = {
  username: {
    required: "Username is required",
    minLength: "Min length is 5",
    pattern: "Email is invalid"
  },
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid }
  } = useForm<Record<string, string>>({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const onSubmit = (data: Record<string, string>) => {
    alert(JSON.stringify(data));
  };

  console.log({ errors })
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login User</h1>
        <div className="field">
          <label>Username</label>
          <input
            placeholder="Input Email"
            {...register("username", {
              required: true,
              minLength: 5,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            })}
            {...errors.username && { className: "error" }}
          />
          {
            errors.username &&
            errors.username.type &&
            <span>{errorLabel.username?.[errors.username.type]}</span>
          }
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Input Username"
            {...register("password")}
            {...errors.password && { className: "error" }}
          />
          {errors.username && <span>Password is required</span>}
        </div>
        <button type="submit" disabled={
          !isValid ||
          !Object.keys(dirtyFields).length
        }>
          Login
        </button>
      </form>
    </>
  )
}

export default App
