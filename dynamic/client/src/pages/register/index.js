import { Link } from "react-router-dom";
import { useRegister } from "@refinedev/core";

export const RegisterPage = () => {
  const { mutate: register } = useRegister();

  const onSubmit = (e) => {
    e.preventDefault();

    const values = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    register(values, {
      onSuccess: () => {
        console.log("Registration successful!");
        // Redirect or perform any additional actions
      },
      onError: (error) => {
        console.log("Error occurred:", error);
        // Handle the error or display an error message
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>UserName</label>
        <input name="username" defaultValue="test" />
        <label>Email</label>
        <input name="email" defaultValue="test@refine.com" />
        <label>Password</label>
        <input name="password" defaultValue="refine" />
        <button type="submit">Submit</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
