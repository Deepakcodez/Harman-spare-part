"use client"
import Image from "next/image"
import {
  File,
  MoreHorizontal,
  Ship,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import useAllOrders from "@/hooks/orders/Order"
import React from "react"
import moment from 'moment'
import { exportTableToExcel } from "../_components/ExportToExcel"
import { PuffLoader } from "react-spinners"
import EditStatus from "../_components/EditStatus"
import OrderDetails from "../_components/OrderDetails"




export default function Orders() {
  const { data, isLoading, error } = useAllOrders()
  const [isEditStatus, setIsEditStatus] = React.useState<boolean>(false)
  const [isShowAddress, setIsShowAddress] = React.useState<boolean>(false)
  const [OrderId, setOrderId] = React.useState<string>("")
  const[isCOD, setIsCOD] = React.useState<boolean>(false)
  const [shippingDetail, setShippingDetail] = React.useState({})
  const[message, setMessage] = React.useState<string>("")

  const handleExport = () => {
    if (data?.orders) {
      exportTableToExcel(data.orders);
    }
  };
  
  React.useEffect(() => {
    console.log('>>>>>>>>>>>', data)
  },[data])

  const editHandler = (id: string,) => {
    setOrderId(id)
    setIsEditStatus(true)
    window.scrollTo(0, 0);
  }

  const showAddresstHandler= (order:any, message:string,  isCOD:boolean)=>{
    setIsShowAddress(true)
    setIsCOD(isCOD)
    setShippingDetail(order)
    setMessage(message)
  }
  return (
    <div  className="relative">
    {
      isShowAddress &&
      <OrderDetails
        setIsOpen={setIsShowAddress}
        // shippingId={shippingId} 
        shippingDetail={shippingDetail}
        message={message}
        isCOD={isCOD}  />
    }
      {
        isEditStatus &&
        <EditStatus
          setIsOpen={setIsEditStatus}
          orderId={OrderId}
          />
      }
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-auto">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Shipped</TabsTrigger>
              <TabsTrigger value="draft">Returned</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Out-For-Delivery
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
             
              <Button onClick={handleExport} size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>

            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  All the orders make by user.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {
                  isLoading ? <div className="h-full w-full flex items-center justify-center"> <PuffLoader size={60} color="#a78bfa" /></div> :
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead >Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Total Price
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Payment
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                        {
                          data?.orders && data?.orders.map((order: any, index: number) =>
                            <>
                              <TableRow key={`ALL_ORDERS_${index}`}>
                                <TableCell className="hidden sm:table-cell">
                                  <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={!order?.orderItems[0].image ? "/car.png" : order?.orderItems[0]?.image}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium ">
                                  {order.orderItems.map((item: any, idx: number) => (
                                    <div className="w-[16rem] truncate" key={`ORDER_ITEM_${idx}`}>
                                      <span className="border-b border-b-slate-400 truncate ">
                                        {item.name}
                                      </span>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    order?.orderStatus === "Delivered"
                                      ? "success"
                                      : order?.orderStatus === "Returned"
                                        ? "destructive"
                                        : "outline"
                                  }>{order?.orderStatus}</Badge>
                                </TableCell>
                                <TableCell>
                                  {order.orderItems.map((item: any, idx: number) => (
                                    <div key={`ORDER_ITEM_${idx}`}>
                                      <span className="border-b border-b-slate-400">
                                        {item.price}({item.quantity})
                                      </span>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {order.totalPrice}
                                </TableCell>
                                <TableCell className="hidden md:table-cell cursor-default">
                                  <Badge variant={order.paymentInfo.status === "Success" ? "success" : "outline"}  > {order.paymentInfo.status}</Badge>

                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {
                                    moment(order.createdAt).format("MMM Do YY, h:mm a")
                                  }
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => editHandler(order?._id, )}>Edit</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => showAddresstHandler(order, order?.userMessage, order?.isCOD)}>Detail</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            </>
                          )
                        }
                      </TableBody>
                    </Table>
                }

              </CardContent>
              {/* <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  products
                </div>
              </CardFooter> */}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
