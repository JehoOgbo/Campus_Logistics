export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col space-y-2">
        <div className="w-32 h-2 bg-primary animate-line-one "></div>
        <div className="w-32 h-2 bg-secondary animate-line-two"></div>
        <div className="w-32 h-2 bg-gradient-to-b from-[#1e3c72] to-[#2a5298] animate-line-three"></div>
      </div>
    </div>
  );
}
