import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const pdfGenerator = (row: any[]) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("en-US");
  doc.text("Revenue and profit report", 100, 15, { align: "center" });
  doc.text("Reporter: Nguyen Hung Vi", 46, 25, {
    align: "center",
  });
  doc.text(`Date: ${date}`, 35, 35, {
    align: "center",
  });
  autoTable(doc, {
    head: [["Period", "Revenue", "Profit"]],
    margin: { top: 45 },
    body: [...row],
  });

  doc.save();
};
