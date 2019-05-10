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
        
        const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
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