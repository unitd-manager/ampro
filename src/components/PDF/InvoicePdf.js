import React from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import Converter from 'number-to-words';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';
import api from '../../constants/api';


const PdfCreateInvoice = ({ invoiceId }) => {
  PdfCreateInvoice.propTypes = {
    invoiceId: PropTypes.any,
  };
  const [createInvoice, setCreateInvoice] = React.useState();
  const [invoice, setInvoice] = React.useState();
  const [Total, setTotal] = React.useState(0);




const getInvoiceItemById = () => {
  api
    .post('/orders/getOrderByOrderIdPDF', { order_id: invoiceId })
    .then((res) => {
      setCreateInvoice(res.data.data);
      //grand total
      let grandTotal = 0;
      
      res.data.data.forEach((elem) => {
        grandTotal += elem.cost_price;
      });
      setTotal(grandTotal);
    })
    .catch(() => {
    });
};

const getInvoiceById = () => {
  api
    .post('/orders/getOrderByOrderIdPDF', { order_id: invoiceId })
    .then((res) => {
      setInvoice(res.data.data[0]);
    
    })
    .catch(() => {
    });
};
console.log('data',createInvoice)
React.useEffect(() => {
  getInvoiceItemById();
  getInvoiceById();
}, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Sn',
          style: 'tableHead',
        },
        {
          text: 'Order Item',
          style: 'tableHead',
        },
        {
          text: 'Qty',
          style: 'tableHead',
        },
        {
          text: 'Discount',
          style: 'tableHead',
        },
        {
          text: 'Total Price',
          style: 'tableHead',
        },
      ],
    ];
       console.log('data1',createInvoice)
    createInvoice.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.qty ? element.qty : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.discount ? element.discount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.cost_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          style: 'tableBody2',
        },
       
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({  }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              return null;
            },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['101%'],
            body: [
              [
                {
                  text: `Invoice`,
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',

        {
          columns: [
            {
              stack: [
                {
                  text: ` Order Id: ${invoice.order_id ? invoice.order_id : ''}`,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
                {
                  text: ` Order Date : ${invoice.order_date ? invoice.order_date : ''}`,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `Order Status: ${invoice.order_status ? invoice.order_status : ''}`,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              
                 '\n',
              ],
            },
            '\n',
            {
              stack: [
                {
                  text: ` Name: ${invoice.cust_first_name ? invoice.cust_first_name : ''}`,
                  style: ['textSize'],
                  alignment:'left',
                  margin: [10, 0, 0, 0],
                },
                {
                  text: ` Shipping Address : ${invoice.shipping_address ? invoice.shipping_address : ''}`,
                  style: ['textSize'],
                  alignment:'left',
                  margin: [10, 0, 0, 0],
                },
                {
                  text: `Shipping Email: ${invoice.cust_email ? invoice.cust_email : ''} `,
                  style: ['textSize'],
                  alignment:'left',
                  margin: [10, 0, 0, 0],
                },
                {
                  text: `Payment Method: ${invoice.payment_method ? invoice.payment_method : ''} `,
                  style: ['textSize'],
                  alignment:'left',
                  margin: [10, 0,0, 0],
                },
              
                 '\n',
              ],
            },
          ],
        },
        '\n',

        {
          columns: [
            // {
            //   text: ` Shipping Address : `,
            //   style: 'textSize',
            //   bold: true,
            // },
          ],
        },
        '\n',

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              return null;
            },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [20, 150, 90, 80, 70, 70],

            body: productItems,
          },
        },
        '\n',
        {
          columns: [
            {
              text: ``,
              alignment: 'left',
              style: ['invoiceAdd', 'textSize'],
            },
      
          ],
        },
        {
          text: `Total $ :     ${Total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          alignment: 'right',
      margin: [0, 0, 25, 0],
      style: 'textSize',
        },
        '\n',
        { text: `Total $ :${Converter.toWords(Total)}` },
        '\n',


        {
          text: 'Terms and conditions : \n\n 1.The above rates are in Singapore Dollars. \n\n 2. Payment Terms 30 days from the date of Invoice \n\n  3.Payment should be made in favor of " CUBOSALE ENGINEERING PTE LTD " \n\n 4.Any discrepancies please write to us within 3 days from the date of invoice  \n\n\n 5. For Account transfer \n\n \n\n',
          style: 'textSize',
        },
        // {
        //   text: 'UNITED OVERSEAS BANK \n ACCT NAME: CUBOSALE ENGINEERING PTE LTD \n ACCT NO.:- 3923023427 \n Paynow By UEN : 201222688M   \n\n',
        //   style: 'textSize',
        //   bold: true,
        // },

        '\n\n',
      ],
      margin: [0, 50, 50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'right',
        },
        textSize: {
          fontSize: 10,
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Invoice
      </Button>
    </>
  );
};

export default PdfCreateInvoice;
