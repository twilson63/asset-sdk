declare namespace _default {
    function init(env: Environment): Readonly<{
        create: (asset: any) => Promise<any>;
        get: (id: any, type: any) => Promise<any>;
    }>;
}
export default _default;
export type Environment = {
    arweaveInfo: any;
};
