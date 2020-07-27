class Router {
    constructor() {
        this.routes = []
        this.root = "/"
    }

    add(path, handler) {
        this.routes.push({
            path,
            handler
        });
        return this;
    }

    remove(path) {
        this.routes = this.routes.filter(route => route.path !== path);
        return this;
    }

    clear() {
        this.routes = []
        return this;
    }

    removeSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    navigateTo(path = '') {
        window.history.pushState(null, null, this.root + this.removeSlashes(path));
        return this;
    }

    
    // getFragment() {
    //     let fragment = this.removeSlashes(decodeURI(location.pathname + location.search));
    //     fragment = fragment.replace(/\?(.*)$/, '');
    //     return this.removeSlashes(fragment);
    // }
}

const router = new Router();

router.add("/list", () => console.log("list router"));
router.add("/calendar", () => console.log("calendar router"));
router.add("/statistics", () => console.log("statistics router"));

const routerBtns = [...document.querySelectorAll(".router-btn")];
routerBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        router.navigateTo(e.target.getAttribute('route'));

        const $pageName = document.querySelector(".page-name");
        $pageName.innerText = location.pathname;
    })
})