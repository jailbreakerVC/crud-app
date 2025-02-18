import Card from "./components/card";
import FloatingButton from "./components/plusButton";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const response = await fetch("https://crud-app-lyart-three.vercel.app/api");
  const users = await response.json();
  console.log(users);

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">CRUD APPLICATION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card key={user.id} user={user} index={index} />
        ))}
      </div>
      <div class="fixed bottom-6 right-6">
        <FloatingButton />
      </div>
      <Toaster></Toaster>
    </div>
  );
}
