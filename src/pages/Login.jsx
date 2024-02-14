import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Signup, Login as LoginComponent} from "../components";

function Login() {
  const { handleSubmit, register } = useForm();

  const submit = (formData) => {
    console.log(formData, "formdata");
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mx-auto w-full bg-white">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Signup</TabsTrigger>
      </TabsList>

      {/* //login */}
      <TabsContent value="account">
        <LoginComponent/>
      </TabsContent>

      {/* //signup */}
      <TabsContent value="password">
        <Signup/>
      </TabsContent>
    </Tabs>
  );
}

export default Login;
