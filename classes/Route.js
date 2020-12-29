class Route {
    constructor(a,b,c,d){
        this.fileName=a;
        this.routeType=b;
        this.isMiddleware=c
        this.middlewares=[d];
    }
}