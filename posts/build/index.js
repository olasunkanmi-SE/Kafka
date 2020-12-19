"use strict";
var Post = /** @class */ (function () {
    function Post(hello) {
        this.hello = hello;
    }
    Post.prototype.greet = function () {
        console.log(this.hello);
    };
    return Post;
}());
