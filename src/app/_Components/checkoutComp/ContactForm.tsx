"use client";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loadingAnimation from "@/../public/loadingballs.json";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import BlurIn from "@/components/magicui/blur-in";
import useCurrentUserStore from "@/Store/userStore/currentUser";
import useCurrentUser from "@/hooks/user/currentuser";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Enter valid name",
    }),
    email: z.string().min(2, {
        message: "Enter valid email",
    }),
    message: z.string().min(2, {
        message: "Enter meaningfull message",
    }),
   
});

export const ContactForm: FC = () => {
    const [isLoaderShow, setIsLoaderShow] = useState<boolean>(false)
    const {data:currentUserdetail} = useCurrentUser()
    const {currentUser, setCurrentUser} = useCurrentUserStore()
    
    const router = useRouter();



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: currentUser?.name || "",
            email :currentUser?.email || "",
            message : "",
        },
    });

    useEffect(() => {
        setCurrentUser(currentUserdetail)
        if (currentUserdetail) {
            setCurrentUser(currentUserdetail);
            form.reset({
                name: currentUser?.name || "",
                email: currentUser?.email || "",
                message: "",
            });
        }
    }, [currentUserdetail, form.reset, setCurrentUser]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {


    };

    return (
        <div className="md:px-12 px-6 py-5 h-auto text-black">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:w-3/4 ">
                  
                        <BlurIn
                            word="Contact-Us"
                            className="text-4xl font-bold text-black dark:text-white text-center"
                        />
                   
                    {/* name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your Name"
                                        {...field}
                                        className="text-black bg-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Enter your Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   

                    {/* message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter Your Message"
                                        id="message"
                                        {...field}
                                        className="h-24 min-h-24 max-h-24"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-7">
                        <Button
                            className="relative overflow-hidden "
                            variant={"hspButton"}
                            type="submit">
                            {
                                isLoaderShow ? <div className=" w-full h-full absolute bottom-8 "> <Lottie className="h-[6rem] w-auto overflow-hidden " animationData={loadingAnimation} loop={true} /></div>
                                    :
                                    <h1>Send</h1>
                            }

                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
