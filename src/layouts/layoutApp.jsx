export default function LayoutAppRoot({ children }) {
  return (
    <main className="mx-auto w-[402px] border min-h-screen">
      <div className="mx-2 my-12">{children}</div>
    </main>
  );
}