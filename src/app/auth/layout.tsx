
 const Layout  = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="w-full h-screen  flex justify-center items-center ">
            {children}
        </div>
    );
}

export default Layout