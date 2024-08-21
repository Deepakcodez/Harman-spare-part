import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AlertProps {
    headerMessage: string;
    message?: string;
    buttonText: string;
    buttonLink: string;
    isShow : boolean;
    setShow: (value: boolean) => void;
}

export const Alert: FC<AlertProps> = ({headerMessage, message, buttonText, buttonLink,isShow, setShow }) => {
    return (
        <div className="fixed inset-0 bg-violet-950/25 flex flex-col items-center justify-center text-center text-white z-[9999999]">

            <div className="bg-white text-black/75 rounded-lg shadow-md py-5 px-8 text-left flex flex-col gap-3 ring-1 ring-gray-200/50">
            <div>
                <p className="text-lg font-semibold">{headerMessage}</p>
                <p className="text-sm">{message}</p>
            </div>
                <div className="flex justify-end gap-2 mt-2">
                 <Button onClick={()=>setShow(!isShow)} variant="outline" >Cancel</Button>
                 <Link href={buttonLink}>
                 <Button  variant="hspButton2">{buttonText}</Button>
                 </Link>
                </div>
            </div>
        </div>
    );
};
