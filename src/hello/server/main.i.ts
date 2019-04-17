/**
 * 入口文件
 */
import { Env } from '../../pi/lang/env';
import { Struct } from '../../pi/struct/struct_mgr';
import { BonBuffer } from '../../pi/util/bon';
import { DBToMqttMonitor, registerDbToMqttMonitor } from '../../pi_pt/rust/pi_serv/js_db';
declare var env: Env;
declare var pi_modules;

// 数据库监听器， 需要初始化配置， 启动mqtt服务， rpc服务
const addDbMonitor = () => {
    const mqttServer = env.get('mqttServer');
    const buf = new BonBuffer();
    const roster = createRoster();
    console.log('!!!!!!!!!!!!!!!main.i.ts!!!!!!', roster);
    buf.writeMap(roster, (ware, value) => {
        buf.writeUtf8(ware);
        buf.writeMap(value, (tab, flag) => {
            buf.writeUtf8(tab);
            buf.writeBool(flag);
        });
    });
    const monitor = DBToMqttMonitor.new(mqttServer, buf.getBuffer());
    const dbMgr = env.dbMgr;
    registerDbToMqttMonitor((<any>dbMgr).inner, monitor);
};

// 创建一个监听名单
const createRoster = (): Map<string, Map<string, boolean>> => {
    const map = new Map();
    for (const id in pi_modules) {
        if (pi_modules.hasOwnProperty(id) && pi_modules[id].exports) {
            for (const kk in pi_modules[id].exports) {
                const c = pi_modules[id].exports[kk];
                if (Struct.isPrototypeOf(c) && c._$info) {
                    if (c._$info.notes && c._$info.notes.get('dbMonitor')) {
                        let m = map.get('file');
                        if (!m) {
                            m = new Map();
                            map.set('file', m);
                        }
                        m.set(c._$info.name, true);
                    }
                }
            }
        }
    }

    return map;
};

addDbMonitor();
