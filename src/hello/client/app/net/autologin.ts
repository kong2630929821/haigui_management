/**
 * 自动登录
 */

// =====================================导入
import { Client } from '../../../../pi/net/mqtt_c';
import { create } from '../../../../pi/net/rpc';
import { subscribe } from './init';

// 用户类型
export enum UserType {
    DEF = 1,
    WALLET
}

// 重登录状态
export enum ReLoginState {
    INIT,
    START,
    ING,
    END,
    ERROR
}

// 自动登录管理
export class AutoLoginMgr {
    public subMgr: SubMgr;
    private conState: boolean = false;
    private rootClient: Client;
    private clientRpc: any;
    private server: string;
    private port: number;
    private relogin: ReLoginState = ReLoginState.INIT;

    constructor(server?: string, port?: number) {
        this.server = server ? server : '127.0.0.1';
        this.port = port ? port : 9080;
        this.subMgr = new SubMgr();
    }

    // 连接服务器
    public connection(success?:Function,fail?:Function) {
        const options = {
            reconnect: true,
            timeout: 3,
            keepAliveInterval: 30,
            cleanSession: true,
            useSSL: false,
            mqttVersion: 3,
            onSuccess: () => {
                this.clientRpc = create(this.rootClient, (<any>self).__mgr);
                console.log('reconnect 连接成功！！！！！！！');
                // 连接成功
                this.conState = true;
                
                if (this.relogin === ReLoginState.START) {
                    console.log(`连接成功！！！`);
                    this.relogin = ReLoginState.ING;
                    // this.autoLogin();
                } else if (this.relogin === ReLoginState.ING) {
                    console.log(`重新打开APP！！！`);
                }
                success && success();
            },
            onFailure: (r) => {
                console.log('connect fail', r);
                if (!(typeof r === 'string')) {
                    this.reconnect();
                }
                fail && fail(r);
            }
        };
        const clientId = `clientId-${((Date.now() + Math.floor(Math.random() * 1000000) * 10000000).toString(36))}`;
        const client = new Client(this.server, this.port, clientId, null, options);
        this.rootClient = client;
        client.setOnConnectionLost((r) => {
            // 连接断开调用
            console.log(`连接断开！！！`);
            this.conState = false;
            this.relogin = ReLoginState.START;
        });

        return client;
    }

    // 重连
    public reconnect() {
        if (this.rootClient) {
            this.rootClient.reconnect();
        }

    }

    // 断开连接
    public disconnect() {
        if (this.rootClient) {
            try {
                this.rootClient.disconnect();
            } catch (err) {
                console.log(err);
            }
            
            this.relogin = ReLoginState.INIT;
        }
    }

    // 获取MATT客户端
    public getClient() {
        return this.rootClient;
    }
    // 获取rpc方法
    public getRpc() {
        return this.clientRpc;
    }
    // 设置连接状态
    public setState(state: boolean) {
        this.conState = state;
    }
    // 获取连接状态
    public getState() {
        return this.conState;
    }
}

// 订阅主题管理
class SubMgr {
    private subs: Map<string, object>;
    constructor() {
        this.subs = new Map();
    }
    // 更新订阅主题
    public update(topic: string, returnStruct: any, cb: Function) {
        this.subs.set(topic, { returnStruct, cb });
    }
    // 移除订阅主题
    public del(topic: string) {
        this.subs.delete(topic);
    }
    // 获取主题map
    public getSubs() {
        return this.subs;
    }
    // 重新定义所有主题
    public reSubs() {
        const map = this.subs;
        map.forEach((value: any, topic, _map) => {
            const returnStruct = value.returnStruct;
            const cb = value.cb;
            subscribe(topic, returnStruct, cb, false);
        });
    }
}
