"use client"
import Image from "next/image"
import {
  File,
  MoreHorizontal,
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




export default function Orders() {
  const { data, isLoading, error } = useAllOrders()

  React.useEffect(() => {
    console.log("o",data?.orders)
  })
  const handleExport = () => {
    if (data?.orders) {
      exportTableToExcel(data.orders);
    }
  };
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-x-auto">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
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
                                    src={!order?.orderItems[0].image ?"/car.png" :  order?.orderItems[0]?.image  }
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
                                  <Badge variant="outline">{order?.orderStatus}</Badge>
                                </TableCell>
                                <TableCell>
                                  {order.orderItems.map((item: any, idx: number) => (
                                    <div key={`ORDER_ITEM_${idx}`}>
                                      <span className="border-b border-b-slate-400">
                                        {item.price}
                                      </span>
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {order.totalPrice}
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
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem>Delete</DropdownMenuItem>
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
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
