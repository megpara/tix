export default function Container({ children }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-white w-full pb-10">
      {children}
    </div>
  );
}
