import LoginForm from "@/ui/login/loginForm/loginForm";


export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div >
        {/* <h1>Welcome Home</h1> */}
        <LoginForm />
      </div>
    </main>
  );
}
