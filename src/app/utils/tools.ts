/**
 * 常用工具
 */
declare var XLSX;
export const importRead = (f,ok) => { // 导入将excel读成json格式
    let wb;// 读取完成的数据
    const rABS = false; // 是否将文件读取为ArrayBuffer
    const reader = new FileReader();
    reader.onload = (e) =>  {// onload在读取完成时触发
        const data = e.target.result;// 取到读取的内容或是二进制或是arraybuffer
        if (rABS) {// 拿到excel中内容
            wb = XLSX.read(btoa(fixdata(data)), {// 手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        
        // 将所有数据类型改为字符串
        const sheetData = wb.Sheets[wb.SheetNames[0]];
        for (const k in sheetData) {
            if (typeof sheetData[k] === 'object') {
                sheetData[k].t = 's';
                sheetData[k].v = `${sheetData[k].v}`;
            }
        }
        const json = XLSX.utils.sheet_to_json(sheetData);
        ok && ok(json);
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);// 开始读取文件，将文件内容读成arraybuffer保存在result中
    } else {
        reader.readAsBinaryString(f);// 开始读取文件，将文件内容读成二进制保存在result中
    }
};

// 文件流转BinaryString
const fixdata = (data) => { 
    let o = '',
        l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));

    return o;
};

// 导出
export const jsonToExcelConvertor = (JSONhead:any,JSONData:any, FileName:any) => {
    if (JSONData === undefined) {
        alert('导出为空表');

        return;
    }
    // 先转化json
    const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    let excel = '<table>';
    let rowHead = '<tr>';
    // 设置表头
    JSONhead.forEach((item) => {
        rowHead += `<th>${item}</th>`;
    });
    // 换行
    excel += `${rowHead}</tr>`;
        // 设置数据
    for (let i = 0; i < arrData.length; i++) {
        let rowContent = '<tr>';
        const arr = [];
        for (let value of arrData[i]) {
            // console.log(arrData[i][index]);
                // var value = arrData[i][index] === "." ? "" : arrData[i][index];
            console.log('value=',value);
            console.log(typeof(value));
            const str = value.toString();
            arr.push(str);
            if (typeof(value) === 'number' && value.toString().length >= 12) {
                console.log('yes');
                // value = ','.concat(value.toString());
                value = ','.concat(value.toString());
                console.log('valueToStr=',value);
            }
            // rowContent += `<td>${arrData[i][index]}</td>`;
            rowContent += `<td>${value}</td>`;
        }
        excel += `${rowContent}</tr>`;
    }

    excel += '</table>';

    let excelFile = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:excel\' xmlns=\'http://www.w3.org/TR/REC-html40\'>';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += '<head>';
    excelFile += '<!--[if gte mso 9]>';
    excelFile += '<xml>';
    excelFile += '<x:ExcelWorkbook>';
    excelFile += '<x:ExcelWorksheets>';
    excelFile += '<x:ExcelWorksheet>';
    excelFile += '<x:Name>';
    excelFile += '{worksheet}';
    excelFile += '</x:Name>';
    excelFile += '<x:WorksheetOptions>';
    excelFile += '<x:DisplayGridlines/>';
    excelFile += '</x:WorksheetOptions>';
    excelFile += '</x:ExcelWorksheet>';
    excelFile += '</x:ExcelWorksheets>';
    excelFile += '</x:ExcelWorkbook>';
    excelFile += '</xml>';
    excelFile += '<![endif]-->';
    excelFile += '</head>';
    excelFile += '<body>';
    excelFile += excel;
    excelFile += '</body>';
    excelFile += '</html>';

    const uri = `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(excelFile)}`;

    const link = document.createElement('a');
    link.href = uri;

    // link.style = 'visibility:hidden';
    link.download = `${FileName}.xls`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const openDownloadDialog = (url, saveName) => {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
};

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
export const  sheet2blob = (sheet, sheetName?) => {
    sheetName = sheetName || 'sheet1';
    const workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    const wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    const wbout = XLSX.write(workbook, wopts);
    
    // 字符串转ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

        return buf;
    };
    // tslint:disable-next-line:no-unnecessary-local-variable
    const blob = new Blob([s2ab(wbout)], { type:'application/octet-stream' });
    
    return blob;
};