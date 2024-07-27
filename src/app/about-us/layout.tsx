import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <div className="relative h-screen flex w-full items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">

                {children}

                <GridPattern
                    width={40}
                    height={40}
                    x={-1}
                    y={-1}
                    className={cn(
                        "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                    )}
                />
            </div>
        </>

    );
}

export default Layout