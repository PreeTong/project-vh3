import React, { Component } from "react";
import logo from './../image/Picture1.png';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
        }
        this.printPDF = this.printPDF.bind(this);
        this.toDataURL = this.toDataURL.bind(this);
    }


    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }





    printPDF() {
        this.toDataURL(logo, (dataUrl) => {
            // console.log('RESULT:', dataUrl)
            let arr = [[{ text: 'VEHICLE EXPENSES FORM ( VH 3 )', style: 'tableHeader', colSpan: 16, alignment: 'center' }, 'Second', 'Third', 'The last one', {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
                , [{ image: dataUrl, style: 'tableHeader', rowSpan: 3, colSpan: 3, width: 200, height: 50, alignment: 'center' }, {}, {}, { text: `Name: `, colSpan: 7, alignment: 'center', style: 'tableHeader' }, {}, {}, {}, {}, {}, {}, { text: `EmployeeID : `, colSpan: 6, alignment: 'center', style: 'tableHeader' }, {}, {}, {}, {}]
                , [{}, {}, {}, { text: `Department : `, colSpan: 7, alignment: 'center', style: 'tableHeader' }, {}, {}, {}, {}, {}, {}, { text: `Division : `, colSpan: 2, alignment: 'center', style: 'tableHeader' }, {}, { text: `Register No. :`, colSpan: 4, alignment: 'center', style: 'tableHeader' }, {}, {}, {}]
                , [{}, {}, {}, { text: `Brand : `, colSpan: 9, alignment: 'left', style: 'tableHeader' }, {}, {}, {}, {}, {}, {}, {}, {}, { text: `Oil type : `, colSpan: 4, alignment: 'center', style: 'tableHeader' }, {}, {}, {}]
                , [{ text: 'No.', rowSpan: 2, alignment: 'center', style: 'tableHeader' }, { text: 'User Name', rowSpan: 2, alignment: 'center', style: 'tableHeader' }, { text: 'OBJECTIVE / PLACE / DESCRIPTION', rowSpan: 2, alignment: 'center', style: 'tableHeader' }, { text: 'CHECK OUT', colSpan: 3, alignment: 'center', style: 'tableHeader' }, {}, {}, { text: 'CHECK IN', colSpan: 3, alignment: 'center', style: 'tableHeader' }, {}, {}, { text: 'WORKING DISTANCE KM.', rowSpan: 2, alignment: 'center', style: 'tableHeader' }, { text: 'REFUEL', alignment: 'center', style: 'tableHeader', colSpan: 3 }, {}, {}, { text: 'Expressway', alignment: 'center', style: 'tableHeader', rowSpan: 2 }, { text: 'Carpark', alignment: 'center', style: 'tableHeader', rowSpan: 2 }, { text: 'Other Express', alignment: 'center', style: 'tableHeader', rowSpan: 2 }]
                , [{}, {}, {}, { text: 'D/M/Y', alignment: 'center', style: 'tableHeader' }, { text: 'TIME', alignment: 'center', style: 'tableHeader' }, { text: 'RM No.', alignment: 'center', style: 'tableHeader' }, { text: 'D/M/Y', alignment: 'center', style: 'tableHeader' }, { text: 'TIME', alignment: 'center', style: 'tableHeader' }, { text: 'RM No.', alignment: 'center', style: 'tableHeader' }, {}, { text: 'RM NO.', alignment: 'center', style: 'tableHeader' }, { text: 'LITR', alignment: 'center', style: 'tableHeader' }, { text: 'BATH', alignment: 'center', style: 'tableHeader' }, {}, {}, {}],
            ];
            for (let i = 1; i <= 30; i++) {

                if (i === 10) {
                    arr.push([i, 'Value 2', 'Value 32232232232232232232232232232232 2322322322322322322322322322322322322322322322322', '18/11/2019', {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
                }
                else {
                    arr.push([i, 'Value 2', 'Value 322322322322322322322322322322322 322322322322322322322322322322322322322322322322', '18/11/2019', {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
                }


            }

            // console.log(arr)

            var docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [10, 20, -10, 100],
                defaultStyle: {
                    font: 'THSarabunNew',
                    fontSize: 11
                },
                startPosition: {
                    pageNumber: 0, // the page this node starts on
                    pageOrientation: 'landscape', // the orientation of this page
                    left: 60, // the left position
                    right: 60, // the right position
                    verticalRatio: 0.2, // the ratio of space used vertically in this document (excluding margins)
                    horizontalRatio: 0.0  // the ratio of space used horizontally in this document (excluding margins)
                },
                header: function (currentNode, pageCount) {
                    return {
                        columns: [
                            { text: currentNode.toString() + " / " + pageCount.toString(), alignment: 'right', margin: [0, +5, 50, 0] },
                        ]
                    };
                },
                styles: {
                    tableHeader: {
                        bold: true,
                        fontSize: 11,
                        color: 'black'
                    }
                },
                content: [
                    {
                        //   layout: 'lightHorizontalLines', // optional
                        table: {
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            headerRows: 6,
                            dontBreakRows: true,
                            paddingTop: 0,
                            widths: ['2%', '11%', '37%', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 34, 26, 26, 28, 24, 24, 24],

                            body: arr,
                        }
                    },
                    // {
                    //     unbreakable: false,
                    //     stack: [                 	
                                        
                    //                     {
                    //                         columns: [
                    //                             {
                    //                                 text: '', width: '*'
                    
                    //                             },
                    //                             {
                    
                    //                                 layout: 'noBorders',
                    //                                     table: {
                    //                                         // headers are automatically repeated if the table spans over multiple pages
                    //                                         // you can declare how many rows should be treated as headers
                    //                                         //headerRows: 1,
                    //                                         widths: ["auto", "*"],
                    //                                         body: [
                    //                                           [{ text: "subtotal", style: 'total' }, { text: "678.00", alignment:'right', style: 'total' }],
                    //                                           [{ text: "tax", style: 'total' }, { text: "90.00", alignment: 'right', style: 'total' }],
                    //                                           [{ text: "discount", style: 'total' }, { text: "11.25", alignment: 'right', style: 'total' }],
                    //                                           [{ text: "Total", style: 'total' }, { text: "776.25", alignment: 'right', style: 'total' }],
                    //                                            [{ text: "Balance Due", style: 'total', bold: true, }, { text: "Rs. 776.25", alignment: 'right', style: 'total', bold: true }],
                    //                                         ]
                    //                                     },
                    //                                     width: '35%',
                    
                    
                    //                             }
                    //                         ]
                    //                     }
                    //     ]
                    // }
                ],
                
                // pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                //     // console.log(currentNode,followingNodesOnPage,nodesOnNextPage,previousNodesOnPage)
                //     // console.log(currentNode)
                //     // console.log(previousNodesOnPage)
                //     if (currentNode.text == "1") {
                //         docDefinition.content.splice(1, 0, ["2", 'Value sdss', 'Vsdsd22', '18/11/2019', {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
                //     }
                //     return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                // },
                


                footer: {
                    columns: [
                        { text: '________________', alignment: 'left', margin: [50, 50] },
                        { text: '________________   ASDSD', alignment: 'right', margin: [40, 50] }
                    ],
                    columnGap: 10
                },
            };
            // console.log(dd)
            // console.log(docDefinition)
            pdfMake.createPdf(docDefinition).open()
        })

    }

    componentDidMount() {
        this.printPDF()

    }



    render() {
        return (
            <div>
                <canvas></canvas>
                {/* <img src={logo} width="100" height="100" /> */}
            </div>
        )
    }
}

