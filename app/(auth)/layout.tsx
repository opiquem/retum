const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-indigo-100 h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
