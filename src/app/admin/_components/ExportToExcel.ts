import * as XLSX from "xlsx";  // Import xlsx library

// Function to export table data to an Excel file
export const exportTableToExcel = (orders: any[]) => {
  // Map the order data to a format suitable for Excel
  const dataToExport = orders.map((order) => {
    return {
      "Order ID": order._id,
      "Product Names": order.orderItems.map((item: any) => item.name).join(", "), // Join product names
      "Status": order.orderStatus,
      "Total Price": order.totalPrice,
      "Created At": new Date(order.createdAt).toLocaleString(),
    };
  });

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, "orders.xlsx");
};
