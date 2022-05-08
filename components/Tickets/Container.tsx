export default function Container({ children }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-white h-full w-full">
      {children}
    </div>
  );
}
