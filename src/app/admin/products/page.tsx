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
import React from "react"
import { PuffLoader } from "react-spinners"
import useAllProductsAdmin from "@/hooks/products/ProductAdmin"
import EditProductDetails from "../_components/EditProductDetails"
import deleteProduct from "@/services/product/deleteProduct"


const Products = () => {
  const { data, isLoading, isError } = useAllProductsAdmin()
  const [productId, setProductId] = React.useState<string>("")
  const [isEditDetails, setIsEditDetails] = React.useState<boolean>(false)

  const editHandler = (id: string) => {
    setProductId(id);
    setIsEditDetails(true)
    window.scrollTo(0, 0);
  }

  const deleteHandler = async (id: string) => {
    await deleteProduct(id)
  }
  return (
    <div className="relative">

      {
        isEditDetails &&
        <EditProductDetails
          setIsOpen={setIsEditDetails}
          productId={productId} />
      }
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

              <Button size="sm" variant="outline" className="h-7 gap-1">
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
                <CardTitle>All Products</CardTitle>
                <CardDescription>
                  All the Products.
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
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Rating
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Category
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>

                        {
                          data?.products && data?.products.map((product: any, index: number) =>
                            <>
                              <TableRow key={`ALL_PRODUCTS_${index}`}>
                                <TableCell className="hidden sm:table-cell">
                                  <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={!product?.images ? "/car.png" : product?.images[0].url}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium w-5/12">
                                  <h1 >{product?.name}</h1>
                                </TableCell>

                                <TableCell>
                                  <h1>{product.stock}</h1>
                                </TableCell>

                                <TableCell>
                                  <h1>{product.price}</h1>
                                </TableCell>

                                <TableCell>
                                  <h1>{product.ratings}</h1>
                                </TableCell>

                                <TableCell>
                                  <h1>{product.category}</h1>
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
                                      <DropdownMenuItem onClick={() => editHandler(product?._id)}>Edit</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => deleteHandler(product?._id)}>Delete</DropdownMenuItem>
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
                {/* <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  products
                </div> */}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
export default Products