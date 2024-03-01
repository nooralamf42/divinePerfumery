import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signup, Login as LoginComponent} from "../components";

function Login() {
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
