/**
 * 测试
 */
// #[rpc=rpcServer]
export const helloWorld = (str:string):string => {
    console.log('hello world!!!!!!!!!!! the send str is: ',str);

    return str;
};
