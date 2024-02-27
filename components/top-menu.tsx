import { LoginButton } from './login-button';

export const TopMenu = () => {
  return (
    <div className="fixed top-0 flex items-center justify-between w-screen py-4 px-8 bg-white shadow-md max-sm:px-1">
      <a href="/" className="text-xl">
        Acceuil
      </a>
      <nav className="flex items-center justify-between">
        <a href="/about" className="mr-4 border-r-2 border-x-zinc-400 pr-4">
          À Propos
        </a>
        <a href="/profile" className="mr-4 border-r-2 border-x-zinc-400 pr-4">
          Profile
        </a>
        <br />
        <LoginButton />
      </nav>
    </div>
  );
};
