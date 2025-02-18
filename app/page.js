
import Card from "./components/card";

export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">CRUD APPLICATION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card key={user.id} user={user} index={index} />
        ))}
      </div>
      <button className="btn rounded-full"></button>
    </div>
  );
}