const router           = require("koa-router")();
const shortcut_dao     = require("../dao/shortcut")();
const path             = "/urls";
const koaBody = require('koa-body')();

module.exports = function(server) {
  /**
   * @method create url
   * @param { url }
   * @uses post
   **/
  router.post( path + "/create" , koaBody, function *(next){
    var data = yield shortcut_dao.insertShortcut(this.request.body.url);
    this.body = { success: true , shortcut: data[0][0]};
  });

  /**
   * @method get all
   * @uses get
   **/
  router.get( path + "/all" , function *(next){
    var data = yield shortcut_dao.getAllShortcuts();
    this.body = { success: true , shortcuts: data};
  });

  /**
   * @method read url by id
   * @uses get
   * This method redirets to the url described by the id
   **/
  router.get( path + "/:id" , function *(next){
    var data = yield shortcut_dao.getShortcutById(this.params.id);
    this.redirect( data[0][0] );
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
}